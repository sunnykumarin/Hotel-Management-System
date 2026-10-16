
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

## Images
<img width="1916" height="1090" alt="Screenshot 2026-10-16 182528" src="https://github.com/user-attachments/assets/37b588f1-0120-45ea-8da7-d0b9ddf4ec48" />
<img width="1917" height="1093" alt="Screenshot 2026-10-16 182605" src="https://github.com/user-attachments/assets/4fe7636e-ee95-453e-a26a-a3ba86f78afd" />
<img width="1912" height="1091" alt="Screenshot 2026-10-16 182626" src="https://github.com/user-attachments/assets/ecb2bbab-e43a-457a-991b-dbbc5ac7e0c4" />
<img width="1917" height="1092" alt="Screenshot 2026-10-16 182643" src="https://github.com/user-attachments/assets/d4cb6849-ae1e-498f-a026-c762c8572fc8" />
<img width="1917" height="1095" alt="Screenshot 2026-10-16 182657" src="https://github.com/user-attachments/assets/0f9e040a-6dcf-4cc0-beba-810acfefd96f" />
<img width="1917" height="1091" alt="Screenshot 2026-10-16 182728" src="https://github.com/user-attachments/assets/5d027cd2-ab38-4052-a4d8-d1cfe7beeb08" />
<img width="1917" height="1090" alt="Screenshot 2026-10-16 182748" src="https://github.com/user-attachments/assets/ae913596-2cd6-4de0-ab5c-935a50291107" />
<img width="1912" height="1091" alt="Screenshot 2026-10-16 182626" src="https://github.com/user-attachments/assets/f45b8c49-eb0e-4a72-9ee7-6936236136e1" />
<img width="1917" height="1092" alt="Screenshot 2026-10-16 182643" src="https://github.com/user-attachments/assets/bf0bf3a7-938c-410a-be0d-82ef94f2a233" />
<img width="1917" height="1095" alt="Screenshot 2026-10-16 182657" src="https://github.com/user-attachments/assets/5c208e53-48ed-4e40-8c60-e7119758931b" />
<img width="1917" height="1091" alt="Screenshot 2026-10-16 182728" src="https://github.com/user-attachments/assets/1b509c3e-0d8e-49cd-b6e5-996d077a6253" />
<img width="1917" height="1090" alt="Screenshot 2026-10-16 182748" src="https://github.com/user-attachments/assets/e3b4f4b0-8866-4bec-b56a-067900dcff53" />
<img width="1917" height="1087" alt="Screenshot 2026-10-16 182819" src="https://github.com/user-attachments/assets/e5e14ae5-4e3a-47cf-ba23-2cad86b57d4d" />
<img width="1917" height="1088" alt="Screenshot 2026-10-16 182848" src="https://github.com/user-attachments/assets/cda4f5ec-4334-434a-b3fc-a0d603ea7e6e" />

## Author

**Sunny Kumar**

GitHub: https://github.com/sunnykumarin

---

This project is intended for learning and demonstration. Review configuration, authorization, payment handling, and deployment security before using it in production.
