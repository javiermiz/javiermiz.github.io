---
title: "Cómo Arreglar WooCommerce Stripe Store API Payment Data (Porque la Documentación está Desactualizada)"
description: "Guía paso a paso para integrar pagos Stripe con WooCommerce Store API usando la estructura payment_data correcta que realmente funciona"
published_date: 2025-09-03
category: "tutoriales"
draft: false
seo_title: "Cómo Arreglar WooCommerce Stripe Store API Payment Data (Porque la Documentación está Desactualizada)"
seo_description: "Guía paso a paso para integrar pagos Stripe con WooCommerce Store API usando la estructura payment_data correcta que realmente funciona"
---

Construir un checkout headless de WooCommerce debería ser sencillo. Separas el frontend de WordPress, usas la Store API para operaciones del carrito, e integras Stripe para pagos. Simple, ¿verdad?

**Falso.**

Lo que debería haber sido una integración de dos días se convirtió en una historia detectivesca de una semana. La documentación de WooCommerce no solo está incompleta—es activamente engañosa. Referencias métodos deprecados de Stripe que no han funcionado correctamente en más de dos años.

Si estás construyendo una tienda WooCommerce headless con pagos de Stripe, esta guía te ahorrará la misma frustración que pasé. Más importante, te muestra cómo investigar el código fuente del plugin cuando la documentación te falla.

## El Problema con la Documentación de WooCommerce Stripe

La documentación oficial de WooCommerce Store API para pagos con Stripe te dice que uses `stripe_source`:

> "For further information on generating a stripe_source please check the Stripe documentation."

**`stripe_source` ha estado deprecado por Stripe durante años.** El enfoque moderno usa Payment Methods y Payment Intents, pero la documentación de WooCommerce no se ha actualizado.

Cuando intentas seguir la documentación oficial, obtienes errores crípticos como:

```
Invalid parameter(s): payment_data
```

Sin explicación de qué se espera realmente. Sin ejemplos de implementaciones que funcionen. Solo un callejón sin salida.

## La Arquitectura Real: WooCommerce Headless + Stripe

Antes de sumergirnos en la solución, establecemos qué estamos construyendo realmente:

**Frontend (Astro/React/etc.)** ↔ **Store API** ↔ **Backend WooCommerce**

El frontend maneja:

- Visualización y selección de productos
- Stripe Elements para entrada segura de tarjetas
- Creación de Stripe Payment Methods
- Envío de datos de checkout a Store API

WooCommerce maneja:

- Gestión del carrito vía Store API
- Procesamiento de órdenes
- Confirmación de pagos con Stripe

La pieza crítica es esa estructura **payment_data** que conecta tu integración frontend de Stripe con las expectativas de WooCommerce.

## Cómo Encontré la Solución Real

Después de días intentando diferentes enfoques basados en documentación desactualizada, tomé un rumbo diferente: **leí el código fuente real del plugin**.

En `/wp-content/plugins/woocommerce-gateway-stripe/`, encontré la función que realmente procesa los pagos de Store API:

```javascript
const buildBlocksAPIPaymentData = ({
  expressPaymentType,
  paymentMethodId = "",
  confirmationTokenId = "",
}) => {
  return [
    {
      key: "payment_method",
      value: "stripe",
    },
    {
      key: "wc-stripe-payment-method",
      value: paymentMethodId,
    },
    {
      key: "wc-stripe-confirmation-token",
      value: confirmationTokenId,
    },
    {
      key: "express_payment_type",
      value: expressPaymentType,
    },
    {
      key: "wc-stripe-is-deferred-intent",
      value: true,
    },
  ];
};
```

**Esto cambió todo.** El plugin no usa `stripe_source` para nada. Espera `wc-stripe-payment-method` con un ID de Payment Method de Stripe.

## La Estructura Correcta de Payment Data

Basado en el código real del plugin, esto es lo que necesitas enviar a `/wp-json/wc/store/v1/checkout`:

```json
{
  "billing_address": {
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@ejemplo.com",
    "phone": "+1234567890",
    "address_1": "Calle Principal 123",
    "city": "Madrid",
    "state": "Madrid",
    "postcode": "28001",
    "country": "ES"
  },
  "payment_method": "stripe",
  "payment_data": [
    {
      "key": "payment_method",
      "value": "stripe"
    },
    {
      "key": "wc-stripe-payment-method",
      "value": "pm_1234567890abcdef"
    },
    {
      "key": "wc-stripe-is-deferred-intent",
      "value": true
    }
  ]
}
```

**Puntos clave:**

- Usa `wc-stripe-payment-method`, no `payment_method_id` o `stripe_source`
- Configura `wc-stripe-is-deferred-intent` como `true`
- Solo incluye `wc-stripe-confirmation-token` si tienes autenticación 3D Secure
- Omite campos vacíos en lugar de enviar valores `null`

## Integración Frontend: Setup Esencial de Stripe

En el frontend, necesitas crear Stripe Payment Methods usando la API moderna:

### Setup Rápido de Stripe

```html
<!-- Incluir Stripe.js -->
<script src="https://js.stripe.com/v3/"></script>

<!-- Contenedores para inputs de tarjeta -->
<div id="card-number-element"></div>
<div id="card-expiry-element"></div>
<div id="card-cvc-element"></div>
<div id="card-errors"></div>
```

```javascript
// Inicializar y montar Stripe Elements
const stripe = Stripe("pk_test_tu_clave_publica");
const elements = stripe.elements();

const cardNumber = elements.create("cardNumber");
cardNumber.mount("#card-number-element");

// Crear Payment Method al procesar pago
const { paymentMethod, error } = await stripe.createPaymentMethod({
  type: "card",
  card: cardNumber,
  billing_details: {
    name: `${first_name} ${last_name}`,
    email: email,
  },
});

// Usar paymentMethod.id en tu request a WooCommerce
```

La clave está en usar `stripe.createPaymentMethod()` para obtener un Payment Method ID, luego enviar ese ID a WooCommerce con el nombre de campo correcto.

## Cómo Encontrar Lo Que WooCommerce Realmente Espera

Cuando la documentación oficial falla, necesitas convertirte en detective. El proceso es directo pero requiere paciencia:

### Método 1: Leer el Código Fuente del Plugin

El enfoque más confiable es examinar los archivos reales del plugin de Stripe:

1. **Navega a tu instalación de WordPress**
2. **Ve a** `/wp-content/plugins/woocommerce-gateway-stripe/`
3. **Busca** el directorio `includes/` y archivos relacionados con "Store API" o "Blocks"
4. **Encuentra funciones** que manejen el procesamiento de `payment_data`

Aquí es donde encontré `buildBlocksAPIPaymentData()` - la función que reveló la estructura real.

### Método 2: Inspeccionar Requests de Red

Usa las herramientas de desarrollador de tu navegador en un checkout WooCommerce funcional:

1. **Abre una tienda WooCommerce en vivo** con Stripe habilitado
2. **Abre Herramientas de Desarrollador** (F12) → pestaña Network
3. **Completa una compra de prueba** y observa los requests
4. **Encuentra el request POST** a `/wp-json/wc/store/v1/checkout`
5. **Examina el payload** para ver la estructura real de payment_data

### Método 3: Habilitar Debug Logging

Obtén información detallada de errores desde WooCommerce:

```php
// Agregar a wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);

// Revisar logs en /wp-content/debug.log
// También revisar WooCommerce → Status → Logs
```

### Método 4: Investigación en Repositorio GitHub

Busca en los repositorios oficiales por cambios recientes:

- **WooCommerce Core:** `woocommerce/woocommerce`
- **Plugin Stripe:** `woocommerce/woocommerce-gateway-stripe`

Busca commits que mencionen "Store API", "Blocks", o "payment_data" para entender cambios recientes.

## Configuración Requerida de WooCommerce

Más allá de obtener la estructura payment_data correcta, necesitas configuración apropiada de WooCommerce:

### Variables de Entorno Requeridas

```bash
# Acceso a WooCommerce REST API
WORDPRESS_BASE_URL=https://tu-sitio-woocommerce.com
WOO_CONSUMER_KEY=ck_tu_consumer_key
WOO_CONSUMER_SECRET=cs_tu_consumer_secret

# Integración frontend Stripe
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica
```

### Checklist de Configuración WooCommerce

**Configuración Store API:**

- Habilitar Store API (debería estar activo por defecto)
- Configurar headers CORS para tu dominio frontend
- Probar que operaciones de carrito funcionen desde tu frontend

**Setup Gateway Stripe:**

- Instalar y activar plugin WooCommerce Stripe
- Configurar con credenciales de tu cuenta Stripe
- Habilitar método de pago "Stripe"
- Probar con tarjetas de prueba de Stripe

**Headers CORS (Crítico):**
Agregar esto a tu `functions.php` de WordPress o plugin personalizado:

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://tu-dominio-frontend.com');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, Cart-Token');
        return $value;
    });
});
```

## Testing y Debugging de Tu Integración

### Errores Comunes y Qué Significan

**`"payment_data[X][value] is not of type string,boolean"`**

- Estás enviando valores `null` o `undefined`
- **Solución:** Envía strings vacíos `""` u omite el campo completamente

**`"Invalid parameter(s): payment_data"`**

- Nombres de campos o estructura incorrectos
- **Solución:** Usa exactamente `wc-stripe-payment-method`, no `payment_method_id`

**`"Payment processing failed"`**

- Usualmente un problema de configuración de Stripe
- **Solución:** Revisar logs de WooCommerce y verificar setup del plugin Stripe

### Proceso de Debug

1. **Empezar con payload mínimo** - solo campos requeridos
2. **Agregar campos de uno en uno** - más fácil aislar problemas
3. **Revisar logs de WooCommerce** - WooCommerce → Status → Logs
4. **Probar con tarjetas de prueba Stripe** - usar `4242424242424242` para éxito
5. **Verificar Cart-Token** - asegurar que envías un cart token válido

### Checklist Esencial de Testing

- [ ] Puede crear Payment Method con Stripe.js
- [ ] Operaciones de carrito funcionan (agregar item, obtener carrito)
- [ ] Checkout básico funciona con datos mínimos
- [ ] Tarjetas 3D Secure funcionan correctamente
- [ ] Manejo de errores muestra mensajes amigables al usuario

## Ejemplo de Endpoint Backend API

Tu endpoint `/api/woocommerce/orders/create` debería manejar los datos de checkout:

```javascript
// Ejemplo para ruta API de Astro: src/pages/api/woocommerce/orders/create.ts
export async function POST({ request }) {
  try {
    const checkoutData = await request.json();

    // Agregar cart_token si estás gestionando estado de carrito
    if (!checkoutData.cart_token) {
      checkoutData.cart_token = await getCartToken(request);
    }

    // Enviar a WooCommerce Store API
    const response = await fetch(
      `${process.env.WORDPRESS_BASE_URL}/wp-json/wc/store/v1/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cart-Token": checkoutData.cart_token,
        },
        body: JSON.stringify(checkoutData),
      },
    );

    const result = await response.json();

    if (response.ok) {
      return new Response(
        JSON.stringify({
          success: true,
          order: result,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: result.message || "Checkout falló",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    console.error("Error de checkout:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
```

## Por Qué Falla la Documentación (Y Cómo Superarlo)

Esta experiencia destaca un problema mayor en el ecosistema de WordPress: **la documentación se queda atrás de los cambios de código**.

La integración Stripe de WooCommerce ha evolucionado significativamente:

- Viejo: Sources API (`stripe_source`)
- Actual: Payment Methods API (`wc-stripe-payment-method`)
- Futuro: Payment Element (UI unificada de pago)

Pero la documentación todavía referencia el enfoque viejo.

**Cuando la documentación te falla:**

1. **Lee el código fuente del plugin** - Es la fuente definitiva de verdad
2. **Revisa commits recientes en GitHub** - Busca cambios de API y nuevas características
3. **Inspecciona ejemplos funcionales** - Usa herramientas dev del navegador en checkouts WooCommerce en vivo
4. **Prueba incrementalmente** - Construye tu integración paso a paso, validando cada pieza

## El Flujo de Trabajo Completo que Funciona

El proceso end-to-end que realmente funciona:

1. **Inicializar sesión:** GET `/wp-json/wc/store/v1/cart` para obtener cart token
2. **Agregar productos:** POST a `/wp-json/wc/store/v1/cart/add-item` con cart token
3. **Recopilar pago:** Crear Stripe Payment Method en frontend
4. **Procesar checkout:** POST a `/wp-json/wc/store/v1/checkout` con payment_data apropiado
5. **Manejar autenticación:** Procesar 3D Secure si se requiere
6. **Completar orden:** WooCommerce procesa pago y crea orden

## Avanzando

La integración WooCommerce + Stripe continuará evolucionando. Stripe está empujando hacia su nuevo Payment Element, y WooCommerce eventualmente actualizará sus APIs para coincidir.

**Manténte adelante de los cambios:**

- Sigue el repositorio GitHub de WooCommerce para actualizaciones de API
- Prueba tu integración regularmente con diferentes tipos de tarjetas
- Monitorea el changelog de desarrollador de Stripe para cambios breaking
- Mantén tus versiones de WooCommerce y plugin Stripe actualizadas

## Puntos Clave

Construir WooCommerce headless con Stripe no tiene que ser doloroso, pero necesitas la información correcta:

- **Ignora la documentación oficial** para payment_data de Stripe - está desactualizada
- **Usa `wc-stripe-payment-method`** con Payment Method IDs, no stripe_source
- **Lee código fuente del plugin** cuando la documentación te falle
- **Maneja 3D Secure apropiadamente** con Confirmation Tokens
- **Prueba con tarjetas reales** que desencadenen diferentes flujos de autenticación

La integración es realmente directa una vez que sabes lo que WooCommerce realmente espera. La parte difícil es encontrar esa información cuando los docs te apuntan en la dirección equivocada.

Esta guía debería ahorrarte la semana de frustración que pasé. Pero más importante, te muestra cómo profundizar cuando la documentación oficial no es suficiente.

**¿Tienes preguntas sobre integraciones WooCommerce headless?** La sección de comentarios está abierta, y siempre estoy feliz de ayudar a resolver este tipo de puzzles técnicos.
