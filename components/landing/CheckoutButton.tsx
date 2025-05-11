"use client";

import React from "react";
import { getStripe } from "@/lib/getStripe";

const CheckoutButton = () => {
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Acceso completo a StorelyAI",
                },
                unit_amount: 2000, // 20 USD
              },
              quantity: 1,
            },
          ],
        }),
      });

      if (!res.ok) {
        console.error("Error creando la sesión de checkout");
        return;
      }

      const data = await res.json();
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Error en handleCheckout:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      style={{
        backgroundColor: "#814DED",
        color: "white",
        fontSize: "1rem",
        padding: "0.8rem 2rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        transition: "0.3s ease",
      }}
    >
      Empezar ahora por 20$
    </button>
  );
};

export default CheckoutButton;
