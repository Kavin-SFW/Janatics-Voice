# Setup Guide - Neon Database & Authentication

This application uses Neon Database with Neon Auth for authentication and data storage.

## Prerequisites

- Node.js and npm installed
- A Neon account (sign up at https://neon.tech)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_NEON_DATA_API_URL=https://ep-blue-mode-ahtyfkg8.apirest.c-3.us-east-1.aws.neon.tech/neondb/rest/v1
VITE_NEON_AUTH_URL=https://ep-blue-mode-ahtyfkg8.auth.c-3.us-east-1.aws.neon.tech
```

### Getting Your URLs

1. **Data API URL**: This is provided when you provision the Neon Data API. It follows the pattern:
   `https://[endpoint].apirest.[region].aws.neon.tech/[database]/rest/v1`

2. **Auth URL**: This is provided when you provision Neon Auth. It follows the pattern:
   `https://[endpoint].auth.[region].aws.neon.tech`

You can find these URLs in your Neon Console under your project settings.

## Database Schema

The application uses the following tables:

- `meetings` - Stores meeting information
- `meeting_participants` - Stores participants for each meeting
- `transcripts` - Stores meeting transcripts
- `action_items` - Stores action items from meetings
- `decisions` - Stores decisions made in meetings

All tables have Row Level Security (RLS) enabled, so users can only access their own data.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your actual Neon URLs (see above)

4. Start the development server:
```bash
npm run dev
```

## Authentication

The app uses Neon Auth (powered by Better Auth) for authentication. Users can:

- Sign up with email and password
- Sign in with their credentials
- Access protected routes (dashboard, meetings, etc.)

## API Usage

The app uses the Neon Data API for all database operations. The API client is located in `src/lib/api.ts` and handles:

- Authentication (sign in, sign up, sign out)
- Meeting CRUD operations
- Participant management
- Transcript management
- Action item management
- Decision management

All API requests automatically include the authentication token from Neon Auth.

## Troubleshooting

### Authentication Issues

If you're having trouble signing in:

1. Verify your `VITE_NEON_AUTH_URL` is correct
2. Check that Neon Auth is properly provisioned in your Neon project
3. Ensure cookies are enabled in your browser

### Database Connection Issues

If you're having trouble connecting to the database:

1. Verify your `VITE_NEON_DATA_API_URL` is correct
2. Check that the Data API is provisioned in your Neon project
3. Ensure your authentication token is valid

### CORS Issues

If you encounter CORS errors, make sure:

1. Your Neon project allows connections from your domain
2. The Data API is configured to accept requests from your origin

## Next Steps

- Create your first user account by signing up
- Start creating meetings
- Add participants and transcripts
- Track action items and decisions
