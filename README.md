# Lawfirm Marketplace

A modern marketplace platform connecting clients with legal professionals. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User authentication and authorization
- Lawyer profiles and search
- Real-time booking system
- Review and rating system
- Secure payment processing
- Advanced filtering and search
- Responsive design

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payment**: Stripe
- **Styling**: Tailwind CSS with custom components
- **Form Handling**: React Hook Form with Yup validation
- **Date Handling**: date-fns
- **API Client**: Axios

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (for payments)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lawfirm_marketplace"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_PUBLIC_KEY="your-stripe-public-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lawfirm-marketplace.git
cd lawfirm-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/     # React components
├── pages/         # Next.js pages
├── styles/        # CSS styles
├── lib/           # Utility functions
├── types/         # TypeScript types
├── hooks/         # Custom React hooks
├── services/      # API services
├── config/        # Configuration files
└── middleware/    # API middleware
```

## API Routes

- `POST /api/auth/*` - Authentication endpoints
- `GET /api/lawyers` - Get list of lawyers
- `GET /api/lawyers/:id` - Get lawyer details
- `POST /api/bookings/create` - Create a booking
- `GET /api/bookings/:id` - Get booking details
- `POST /api/reviews` - Create a review
- `GET /api/reviews/:lawyerId` - Get lawyer reviews

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@lawfirmmarketplace.com or open an issue in the repository. 