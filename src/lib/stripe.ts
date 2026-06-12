import Stripe from 'stripe';

const stripeApiKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeApiKey ? new Stripe(stripeApiKey, {
  apiVersion: '2026-05-27.dahlia',
  typescript: true,
}) : null;

export function isStripeConfigured(): boolean {
  return stripe !== null && !!process.env.STRIPE_WEBHOOK_SECRET;
}

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';