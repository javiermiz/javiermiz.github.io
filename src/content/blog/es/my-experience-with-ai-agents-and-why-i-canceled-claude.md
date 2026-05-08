---
title: "Mi experiencia con los agentes de IA y por qué cancelé mi suscripción de Claude"
description: "De pagar suscripciones a tener 3 bots de Telegram por $5 de API. Mi viaje con modelos locales, Hermes, pi.dev y Deepseek."
published_date: 2026-05-07
category: "tecnología"
draft: false
---

Todo empezó como empiezan casi todas estas historias. Pagando una suscripción.

Pagaba $20 dólares al mes por Claude Pro. Al principio no me parecía mal, pero luego me empecé a topar con los límites de mensajes y las restricciones de uso todo el tiempo. La única forma de tener más era pagar $200 dólares por el siguiente nivel, y honestamente no iba a hacer eso solo para tener límites más grandes. Se sentía como pagar un carro y que te dijeran cuántos kilómetros puedes manejar al mes.

Esa frustración me llevó a investigar.

## El agujero de los modelos locales

Empecé a leer sobre modelos locales. La idea de correr inteligencia artificial en mi propia computadora, sin depender de internet, sin límites, sin pagar mensualidades. Sonaba demasiado bien.

Y al principio, la verdad, no entendía nada. Había herramientas como **Ollama**, que básicamente es la forma más sencilla de bajar y ejecutar modelos locales. Escribes un comando en la terminal y en segundos tienes un modelo funcionando. También **LM Studio** y **Cherry Studio**, que son interfaces gráficas para hacer lo mismo si no quieres tocar la terminal. Un montón de herramientas, cada una prometiendo hacerlo más fácil.

Me sumergí en ese mundo y justo cuando empecé, Alibaba había lanzado **Qwen 3.6**, un modelo que entraba perfecto en mi MacBook Pro M4 Pro con 48GB de RAM. Lo instalé, lo probé, y ver un modelo respondiendo preguntas en mi propia máquina, sin internet, se sintió como magia. Le agregué **MCP**, que es el Model Context Protocol, un estándar que permite que los modelos se conecten con herramientas externas como archivos, bases de datos o lo que necesites. Las posibilidades se abrieron un montón.

Estuve así un rato, experimentando, viendo qué podía hacer. Y como todo en este mundo, quería más.

## OpenCLAW y el primer bajón

Descubrí **OpenCLAW**, un framework más avanzado para construir sistemas agénticos. Lo configuré, lo puse a correr, y funcionaba. Lentísimo. Fue overkill para mi laptop.

Ahí aprendí algo importante. El problema no era el modelo, era todo lo que le ponía alrededor. Estos frameworks te inyectan un prompt de sistema enorme para darte contexto, y procesar eso desde cero cada vez consume muchísimo tiempo. No importa qué tan rápido sea tu modelo si antes de responder tiene que masticar páginas enteras de instrucciones. Ese descubrimiento, aunque frustrante, me llevó a la siguiente herramienta.

## pi.dev, el game changer

Ahí fue cuando encontré **pi.dev**. Y esto sí cambió las cosas.

pi.dev optimiza el prompt que le mandas al modelo para que sea eficiente. Su system prompt es corto, bien estructurado, sin grasa. De repente mi modelo local volaba. Era capaz de resolver problemas complejos, escribir código, pensar en varios pasos. Todo funcionaba como debería. Fue lo mejor que experimenté en toda esa etapa. Por primera vez sentí que tener un modelo local no era un experimento, sino algo realmente útil.

## Llegó Hermes y la necesidad de algo más grande

Pero igual sentía que me faltaba algo. Quería algo que pudiera controlar desde mi teléfono, que estuviera disponible donde sea, con lo que pudiera chatear y que pudiera controlar mi PC desde cualquier lugar.

Ahí llegó **Hermes Agent**. Es un framework que te permite tener asistentes con personalidad conectados a Telegram, capaces de ejecutar código, investigar en internet, controlar archivos. Todo desde un chat. Lo configuré en muy poco tiempo. El mismo sistema me guió. En un rato tenía **3 bots de Telegram** funcionando, cada uno con su propósito y su personalidad distinta. Uno para research, otro para ayudarme con tareas técnicas, otro nomás por experimentar.

Pero cuando hice correr Hermes con mi modelo local, volvió el problema de siempre. La velocidad. Hacer tareas en paralelo con un modelo local simplemente no es viable, incluso con pi.dev optimizando todo. Y la magia de tener agentes se pierde cuando tienes que esperar 30 segundos por cada respuesta.

## La lección de los cinco dólares

Ahí recordé que hacía dos años había comprado **cinco dólares de crédito en la API de Deepseek**. No los había usado nunca. Estaban ahí, intactos.

Los conecté. Y de pronto todo funcionó increíble. Rápido, fluido, sin límites artificiales. Mis tres bots empezaron a trabajar con **Deepseek V4 Flash** y la diferencia fue abismal. Hacen research, me ayudan con el día a día, y hasta rolean con las personalidades que les puse, porque honestamente me parece divertido ver cómo responden. Cinco dólares. Después de dos años todavía tengo saldo.

Fue irónico darme cuenta de que lo que resolvió todos mis problemas no fue más hardware, más configuración, ni más herramientas. Fue conectar una API que compré hace dos años y había olvidado.

## Mi setup hoy

Al final aprendí que no hay una herramienta que haga todo perfecto. Cada una tiene su lugar, y el truco está en saber cuándo usar cada una.

**Hermes** gestiona los proyectos, escribe planes y mantiene el contexto a largo plazo. Para eso usa Deepseek. Es ideal para tareas que requieren memoria, entender el contexto completo de un proyecto, y coordinar múltiples pasos.

**pi.dev** lo uso para programar y ejecutar código rápido. Su system prompt corto y su capacidad de paralelizar tareas lo hacen mucho más eficiente para eso. Para desarrollo puro, sigue siendo mi herramienta principal.

Deepseek V4 Flash corre en ambos. Hasta ahora lo he encontrado súper.

## Lo que me llevo de todo esto

Los modelos locales son increíbles para aprender y experimentar. Te dan una comprensión de cómo funciona realmente esta tecnología que nunca tendrías si solo usas APIs. Te obligan a entender prompts, contextos, limits, y todo lo que normalmente está abstraído cuando solo haces clic en un chat.

Pero cuando quieres velocidad, confiabilidad y tareas en paralelo, una API barata es imbatible. No necesitas gastar cien dólares al mes. Con cinco dólares de crédito que compré hace dos años y todavía no termino, tengo más capacidad desde mi teléfono que la que tenía sentado frente a mi computadora pagando suscripciones.

Adiós Claude con sus límites restrictivos. Adiós a pagar mensualidades por algo que usas a medias. Hoy tengo tres bots funcionando desde Telegram, controlo mi computadora desde donde sea, y escribí este post desde el teléfono mientras estaba fuera de casa, dictándole a uno de mis agentes que me ayudó a estructurarlo y corregirlo sin perder mi voz.

¿Y lo mejor de todo? Esto es apenas el inicio. Cada semana descubro algo nuevo que puedo hacer con este setup. Y la sensación de estar construyendo tu propio sistema, con tus propias reglas, sin que una suscripción te diga hasta dónde puedes llegar, no se compara con nada.
