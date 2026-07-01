import Stripe from "stripe";
import Booking from "../models/Booking.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Stripe Webhook Signature Error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const bookingId = session.metadata?.bookingId;

        if (!bookingId) {
          console.warn("Booking ID not found in session metadata.");
          return res.sendStatus(200);
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
          console.warn(`Booking not found: ${bookingId}`);
          return res.sendStatus(200);
        }

        // Prevent duplicate updates
        if (booking.isPaid) {
          console.log(`Booking ${bookingId} already marked as paid.`);
          return res.sendStatus(200);
        }

        booking.isPaid = true;
        booking.paymentMethod = "Stripe";
        booking.status = "confirmed";

        await booking.save();

        console.log(`Payment successful for booking ${bookingId}`);

        break;
      }

      default:
        console.log(`Unhandled event: ${event.type}`);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error("Stripe Webhook Processing Error:", error);
    return res.sendStatus(500);
  }
};