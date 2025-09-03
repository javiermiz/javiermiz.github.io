---
title: "How to Fix WooCommerce Stripe Store API Payment Data (When Documentation is Outdated)"
description: "Step-by-step guide to integrate Stripe payments with WooCommerce Store API using the correct payment_data structure that actually works"
published_date: 2025-09-03
category: "tutorials"
draft: false
seo_title: "How to Fix WooCommerce Stripe Store API Payment Data (When Documentation is Outdated)"
seo_description: "Step-by-step guide to integrate Stripe payments with WooCommerce Store API using the correct payment_data structure that actually works"
---

Building a headless WooCommerce checkout should be straightforward. You separate the frontend from WordPress, use the Store API for cart operations, and integrate Stripe for payments. Simple, right?

**Wrong.**

What should have been a two-day integration turned into a week-long detective story. The WooCommerce documentation is not just incomplete—it's actively misleading. It references deprecated Stripe methods that haven't worked properly in over two years.

If you're building a headless WooCommerce store with Stripe payments, this guide will save you from the same frustration I went through. More importantly, it shows you how to dig into plugin source code when documentation fails you.

## The Problem with WooCommerce Stripe Documentation

The official WooCommerce Store API documentation for Stripe payments tells you to use `stripe_source`:

> "For further information on generating a stripe_source please check the Stripe documentation."

**`stripe_source` has been deprecated by Stripe for years.** The modern approach uses Payment Methods and Payment Intents, but WooCommerce's docs haven't caught up.

When you try to follow the official documentation, you get cryptic errors like:

```
Invalid parameter(s): payment_data
```

No explanation of what's actually expected. No examples of working implementations. Just a dead end.

## The Real Architecture: Headless WooCommerce + Stripe

Before we dive into the solution, let's establish what we're actually building:

**Frontend (Astro/React/etc.)** ↔ **Store API** ↔ **WooCommerce Backend**

The frontend handles:

- Product display and selection
- Stripe Elements for secure card input
- Creating Stripe Payment Methods
- Sending checkout data to Store API

WooCommerce handles:

- Cart management via Store API
- Order processing
- Payment confirmation with Stripe

The critical piece is that **payment_data** structure that bridges your frontend Stripe integration with WooCommerce's expectations.

## How I Found the Real Solution

After days of trying different approaches based on outdated documentation, I took a different route: **I read the actual plugin source code**.

In `/wp-content/plugins/woocommerce-gateway-stripe/`, I found the function that actually processes Store API payments:

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

**This changed everything.** The plugin doesn't use `stripe_source` at all. It expects `wc-stripe-payment-method` with a Stripe Payment Method ID.

## The Correct Payment Data Structure

Based on the actual plugin code, this is what you need to send to `/wp-json/wc/store/v1/checkout`:

```json
{
  "billing_address": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address_1": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "postcode": "12345",
    "country": "US"
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

**Key insights:**

- Use `wc-stripe-payment-method`, not `payment_method_id` or `stripe_source`
- Set `wc-stripe-is-deferred-intent` to `true`
- Only include `wc-stripe-confirmation-token` if you have 3D Secure authentication
- Omit empty fields rather than sending `null` values

## Frontend Integration: Complete Stripe Elements Setup

Stripe Elements provides secure, pre-built UI components for collecting payment information. Here's the complete implementation from scratch:

### Step 1: Include Stripe.js Script

First, add Stripe.js to your HTML. This should be loaded directly from Stripe's CDN:

```html
<script src="https://js.stripe.com/v3/"></script>
```

Add this in your HTML `<head>` section before any other Stripe-related code.

### Step 2: HTML Structure for Checkout Form

Create a complete checkout form with Stripe Elements containers:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://js.stripe.com/v3/"></script>
    <style>
      .StripeElement {
        padding: 10px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      .StripeElement--focus {
        border-color: #007cba;
      }
      .error-message {
        color: #e74c3c;
        font-size: 14px;
        margin-top: 5px;
      }
      .hidden {
        display: none !important;
      }
      #submit-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    </style>
  </head>
  <body>
    <form id="checkout-form">
      <!-- Billing Information -->
      <h3>Billing Information</h3>
      <input type="text" id="first-name" placeholder="First Name" required />
      <input type="text" id="last-name" placeholder="Last Name" required />
      <input type="email" id="email" placeholder="Email" required />
      <input type="tel" id="phone" placeholder="Phone" required />
      <input type="text" id="address" placeholder="Address" required />
      <input type="text" id="city" placeholder="City" required />
      <input type="text" id="state" placeholder="State" required />
      <input type="text" id="postcode" placeholder="Postal Code" required />
      <select id="country" required>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="GB">United Kingdom</option>
      </select>

      <!-- Stripe Elements -->
      <h3>Payment Information</h3>
      <div id="card-number-element" class="StripeElement">
        <!-- Stripe Elements will create form elements here -->
      </div>
      <div id="card-expiry-element" class="StripeElement">
        <!-- Stripe Elements will create form elements here -->
      </div>
      <div id="card-cvc-element" class="StripeElement">
        <!-- Stripe Elements will create form elements here -->
      </div>

      <!-- Error display -->
      <div id="card-errors" class="error-message" role="alert"></div>

      <!-- Submit button -->
      <button type="submit" id="submit-button">
        <span id="button-text">Complete Order</span>
        <span id="spinner" class="hidden">Processing...</span>
      </button>
    </form>
  </body>
</html>
```

### Step 3: Initialize Stripe Elements

After including the Stripe.js script, initialize Stripe with your publishable key:

```javascript
// Initialize Stripe (replace with your actual publishable key)
const stripe = Stripe("pk_test_51234567890abcdef"); // Your publishable key here

// Create Elements instance
const elements = stripe.elements();
```

### Step 4: Create and Style Card Elements

```javascript
// Custom styling for Stripe Elements
const elementStyles = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

// Create individual card elements (recommended approach)
const cardNumber = elements.create("cardNumber", { style: elementStyles });
const cardExpiry = elements.create("cardExpiry", { style: elementStyles });
const cardCvc = elements.create("cardCvc", { style: elementStyles });
```

### Step 5: Mount Elements to DOM

```javascript
// Mount each element to its container
cardNumber.mount("#card-number-element");
cardExpiry.mount("#card-expiry-element");
cardCvc.mount("#card-cvc-element");

// Set up real-time validation
const errorElement = document.getElementById("card-errors");

function handleCardChange(event) {
  if (event.error) {
    errorElement.textContent = event.error.message;
  } else {
    errorElement.textContent = "";
  }
}

// Listen for changes on all card elements
cardNumber.on("change", handleCardChange);
cardExpiry.on("change", handleCardChange);
cardCvc.on("change", handleCardChange);
```

### Step 6: Complete Form Handling Implementation

```javascript
// Handle form submission
const form = document.getElementById("checkout-form");
const submitButton = document.getElementById("submit-button");
const buttonText = document.getElementById("button-text");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Disable submit button and show loading state
  setSubmitButtonState(true);

  try {
    // Collect form data
    const billingData = collectBillingData();

    // Create Payment Method with Stripe
    const paymentMethod = await createPaymentMethod(billingData);
    if (!paymentMethod) {
      setSubmitButtonState(false);
      return; // Error already displayed
    }

    // Submit order to WooCommerce
    await submitOrderToWooCommerce(paymentMethod, billingData);
  } catch (error) {
    console.error("Payment failed:", error);
    errorElement.textContent = "Payment failed. Please try again.";
    setSubmitButtonState(false);
  }
});

// Collect billing data from form
function collectBillingData() {
  return {
    first_name: document.getElementById("first-name").value,
    last_name: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address_1: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    postcode: document.getElementById("postcode").value,
    country: document.getElementById("country").value,
  };
}

// Create Payment Method with Stripe
async function createPaymentMethod(billingData) {
  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: "card",
    card: cardNumber,
    billing_details: {
      name: `${billingData.first_name} ${billingData.last_name}`,
      email: billingData.email,
      phone: billingData.phone,
      address: {
        line1: billingData.address_1,
        city: billingData.city,
        state: billingData.state,
        postal_code: billingData.postcode,
        country: billingData.country,
      },
    },
  });

  if (error) {
    errorElement.textContent = error.message;
    return null;
  }

  console.log("Payment Method created:", paymentMethod.id);
  return paymentMethod;
}

// Submit order to WooCommerce via your API
async function submitOrderToWooCommerce(paymentMethod, billingData) {
  const checkoutData = {
    billing_address: billingData,
    payment_method: "stripe",
    payment_data: [
      {
        key: "payment_method",
        value: "stripe",
      },
      {
        key: "wc-stripe-payment-method",
        value: paymentMethod.id,
      },
      {
        key: "wc-stripe-is-deferred-intent",
        value: true,
      },
    ],
  };

  console.log("Sending checkout data:", checkoutData);

  const response = await fetch("/api/woocommerce/orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkoutData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  console.log("WooCommerce response:", result);

  if (result.success) {
    // Order created successfully
    console.log("Order created:", result.order.id);

    // Handle potential 3D Secure authentication
    if (result.order.payment_result?.status === "requires_action") {
      await handle3DSecure(result.order.payment_result);
    } else {
      // Redirect to success page
      window.location.href = "/order-confirmation";
    }
  } else {
    errorElement.textContent = result.message || "Order creation failed";
    setSubmitButtonState(false);
  }
}

// Handle 3D Secure authentication if required
async function handle3DSecure(paymentResult) {
  if (paymentResult.client_secret) {
    const { error } = await stripe.confirmCardPayment(
      paymentResult.client_secret,
    );

    if (error) {
      errorElement.textContent = error.message;
      setSubmitButtonState(false);
    } else {
      // Authentication successful, redirect to success page
      window.location.href = "/order-confirmation";
    }
  }
}

// Manage submit button loading state
function setSubmitButtonState(loading) {
  if (loading) {
    submitButton.disabled = true;
    buttonText.classList.add("hidden");
    spinner.classList.remove("hidden");
  } else {
    submitButton.disabled = false;
    buttonText.classList.remove("hidden");
    spinner.classList.add("hidden");
  }
}
```

## Handling 3D Secure Authentication

Modern payment processing often requires 3D Secure authentication. When this happens:

1. Stripe returns a Payment Intent with `status: 'requires_action'`
2. You call `stripe.confirmCardPayment()` to handle the authentication
3. User completes authentication in their bank's interface
4. Stripe provides a Confirmation Token
5. You include this token in a second checkout attempt

```json
{
  "key": "wc-stripe-confirmation-token",
  "value": "ctok_confirmation_token_id"
}
```

## Environment Variables You Actually Need

```bash
# WooCommerce REST API (for products, gateways, orders)
WORDPRESS_BASE_URL=https://your-woocommerce-site.com
WOO_CONSUMER_KEY=ck_your_consumer_key
WOO_CONSUMER_SECRET=cs_your_consumer_secret

# Stripe integration (for frontend)
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

**Note:** You don't need `STRIPE_SECRET_KEY` if you're letting WooCommerce handle all payment processing through the Store API. The secret key is only required if you need to validate Payment Methods server-side before sending to WooCommerce.

## Testing and Debugging Your Integration

### Common Errors and What They Mean

**`"payment_data[X][value] is not of type string,boolean"`**

- You're sending `null` or `undefined` values
- **Solution:** Send empty strings `""` or omit the field entirely

**`"Invalid parameter(s): payment_data"`**

- Wrong field names or structure
- **Solution:** Use exactly `wc-stripe-payment-method`, not `payment_method_id`

**`"Payment processing failed"`**

- Usually a Stripe configuration issue
- **Solution:** Check WooCommerce logs and verify Stripe plugin setup

### Debug Process

1. **Start with minimal payload** - only required fields
2. **Add fields one by one** - easier to isolate problems
3. **Check WooCommerce logs** - WooCommerce → Status → Logs
4. **Test with Stripe test cards** - use `4242424242424242` for success
5. **Verify Cart-Token** - ensure you're sending a valid cart token

### Essential Testing Checklist

- [ ] Can create Payment Method with Stripe.js
- [ ] Cart operations work (add item, get cart)
- [ ] Basic checkout succeeds with minimal data
- [ ] 3D Secure cards work properly
- [ ] Error handling displays user-friendly messages

## Backend API Endpoint Example

Your `/api/woocommerce/orders/create` endpoint should handle the checkout data:

```javascript
// Example for Astro API route: src/pages/api/woocommerce/orders/create.ts
export async function POST({ request }) {
  try {
    const checkoutData = await request.json();

    // Add cart_token if you're managing cart state
    if (!checkoutData.cart_token) {
      checkoutData.cart_token = await getCartToken(request);
    }

    // Send to WooCommerce Store API
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
          message: result.message || "Checkout failed",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
```

## Why Documentation Fails (And How to Overcome It)

This experience highlights a bigger problem in the WordPress ecosystem: **documentation lags behind code changes**.

WooCommerce's Stripe integration has evolved significantly:

- Old: Sources API (`stripe_source`)
- Current: Payment Methods API (`wc-stripe-payment-method`)
- Future: Payment Element (unified payment UI)

But the documentation still references the old approach.

**When documentation fails you:**

1. **Read the plugin source code** - It's the ultimate source of truth
2. **Check recent GitHub commits** - Look for API changes and new features
3. **Inspect working examples** - Use browser dev tools on live WooCommerce checkouts
4. **Test incrementally** - Build your integration step by step, validating each piece

## The Complete Working Flow

The end-to-end process that actually works:

1. **Initialize session:** GET `/wp-json/wc/store/v1/cart` to get cart token
2. **Add products:** POST to `/wp-json/wc/store/v1/cart/add-item` with cart token
3. **Collect payment:** Create Stripe Payment Method on frontend
4. **Process checkout:** POST to `/wp-json/wc/store/v1/checkout` with proper payment_data
5. **Handle authentication:** Process 3D Secure if required
6. **Complete order:** WooCommerce processes payment and creates order

## Moving Forward

The WooCommerce + Stripe integration will continue evolving. Stripe is pushing toward their new Payment Element, and WooCommerce will eventually update their APIs to match.

**Stay ahead of changes:**

- Follow the WooCommerce GitHub repository for API updates
- Test your integration regularly with different card types
- Monitor Stripe's developer changelog for breaking changes
- Keep your WooCommerce and Stripe plugin versions updated

## Key Takeaways

Building headless WooCommerce with Stripe doesn't have to be painful, but you need the right information:

- **Ignore the official documentation** for Stripe payment_data - it's outdated
- **Use `wc-stripe-payment-method`** with Payment Method IDs, not stripe_source
- **Read plugin source code** when documentation fails you
- **Handle 3D Secure properly** with Confirmation Tokens
- **Test with real cards** that trigger different authentication flows

The integration is actually straightforward once you know what WooCommerce actually expects. The hard part is finding that information when the docs point you in the wrong direction.

This guide should save you the week of frustration I went through. But more importantly, it shows you how to dig deeper when official documentation isn't enough.

**Have questions about headless WooCommerce integrations?** The comment section is open, and I'm always happy to help solve these kinds of technical puzzles.
