
# Hotel Management System

A full-stack hotel booking application built using React, Node.js, Express.js, and MongoDB. Users can explore hotels, check room availability, book rooms, and manage their reservations.

**GitHub Repository:** https://github.com/sunnykumarin/Hotel-Management-System

## Features

- Browse hotels and available rooms.
- View room details and pricing.
- Check room availability for selected dates.
- Book rooms with check-in and check-out dates.
- Calculate the total booking price based on the number of nights.
- Manage hotel bookings.
- User authentication using Clerk.
- Payment integration using Stripe.
- Pay-at-hotel booking option.
- Booking confirmation emails using Nodemailer and Brevo SMTP.
- Image management using Cloudinary.
- Store application data in MongoDB.

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication and Integrations
- Clerk – User authentication
- Stripe – Payment processing
- Nodemailer – Email notifications
- Brevo – SMTP email delivery
- Cloudinary – Image management

## Project Structure

```text
Hotel-Management-System/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or a MongoDB Atlas account

You may also need accounts and credentials for Clerk, Stripe, Cloudinary, and Brevo, depending on the features you want to run.

### 1. Clone the Repository

```bash
git clone https://github.com/sunnykumarin/Hotel-Management-System.git
cd Hotel-Management-System
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and add the environment variables required by your application.

Example email configuration:

```env
SMTP_USER=your-brevo-smtp-login
SMTP_PASS=your-brevo-smtp-key
SENDER_EMAIL=your-verified-sender@example.com
```

Configure your MongoDB, Clerk, Stripe, and Cloudinary variables using the exact names expected by your backend code.

Start the backend using the script defined in `server/package.json`. For example:

```bash
npm run dev
```

If your project does not have a `dev` script, use the appropriate script defined in your `package.json`.

### 3. Set Up the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Configure any frontend environment variables required by your application, including the Clerk publishable key and backend API URL.

The frontend and backend must be configured to communicate with each other.

## Booking Workflow

1. The user selects a room.
2. The user chooses check-in and check-out dates and enters the number of guests.
3. The backend checks room availability.
4. The application calculates the total price using the room's nightly rate and booking duration.
5. The booking is stored in MongoDB.
6. The application attempts to send a booking confirmation email.
7. The user can use the supported payment option, including Pay At Hotel or the Stripe payment flow.

## Payment Integration

The project includes Stripe-related payment functionality.

For safe payment processing:

- Keep Stripe secret keys on the backend.
- Verify payment status on the server.
- Associate each payment with the correct booking.
- Validate payment webhook signatures when webhooks are used.
- Test transactions using Stripe test mode before enabling live payments.

## Email Notifications

The application uses Nodemailer with Brevo SMTP to send booking confirmation emails.

Required environment variables:

| Variable | Description |
|---|---|
| `SMTP_USER` | Brevo SMTP login |
| `SMTP_PASS` | Brevo SMTP key |
| `SENDER_EMAIL` | Verified sender email address |

If emails are not being delivered:

1. Verify the SMTP login and key in Brevo.
2. Ensure the sender email is verified.
3. Confirm that the backend loads the correct `.env` file.
4. Check the backend logs for SMTP authentication or delivery errors.
5. Check spam and junk folders.

SMTP authentication errors such as `535 5.7.8 Authentication failed` indicate that the SMTP server rejected the credentials supplied by the application.

## Security Considerations

- Never commit `.env` files or secret credentials.
- Validate booking dates and guest counts on the backend.
- Calculate booking totals on the server.
- Verify user authorization before allowing access to bookings.
- Verify payment status on the backend.
- Use HTTPS and secure environment variables in production.

## Future Improvements

- Automated tests for booking and payment workflows.
- Improved email delivery tracking.
- Better centralized error handling.
- Booking history and reservation management enhancements.
- Production deployment documentation.

## Author

**Sunny Kumar**

GitHub: https://github.com/sunnykumarin

---

This project is intended for learning and demonstration. Review configuration, authorization, payment handling, and deployment security before using it in production.
