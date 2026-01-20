# Janatics Voice - AI-Powered Meeting Intelligence

A full-stack meeting management application with real-time transcription, AI-powered summaries, and action item tracking. Built with React, TypeScript, Neon Database, and Neon Auth.

## Features

- 🔐 **Authentication** - Secure user authentication with Neon Auth
- 📊 **Dashboard** - View all your meetings and statistics
- 🎙️ **Live Meetings** - Record and transcribe meetings in real-time
- 📝 **Transcripts** - Full meeting transcripts with speaker identification
- ✅ **Action Items** - Track tasks and decisions from meetings
- 🔒 **Row Level Security** - Data isolation per user

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Neon account (sign up at https://neon.tech)

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_NEON_DATA_API_URL=https://ep-blue-mode-ahtyfkg8.apirest.c-3.us-east-1.aws.neon.tech/neondb/rest/v1
   VITE_NEON_AUTH_URL=https://ep-blue-mode-ahtyfkg8.auth.c-3.us-east-1.aws.neon.tech
   ```
   
   > **Note:** These URLs are already configured for the existing Neon project. If you're using a different project, update them accordingly.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080`

5. **Create an account:**
   - Click "Sign up" to create a new account
   - Or sign in if you already have one

## Database Setup

The database schema is already set up in your Neon project with the following tables:

- `meetings` - Meeting information
- `meeting_participants` - Participants for each meeting
- `transcripts` - Meeting transcripts
- `action_items` - Action items from meetings
- `decisions` - Decisions made in meetings

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## Project Structure

```
src/
├── components/        # React components
│   ├── dashboard/    # Dashboard-specific components
│   ├── landing/      # Landing page components
│   └── ui/           # shadcn/ui components
├── contexts/         # React contexts (Auth, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utilities and API client
└── pages/            # Page components
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **UI:** shadcn/ui, Tailwind CSS
- **Database:** Neon (PostgreSQL)
- **Authentication:** Neon Auth (Better Auth)
- **API:** Neon Data API (PostgREST)
- **State Management:** TanStack Query

## Documentation

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## How can I edit this code?

You can edit this code using your preferred IDE.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project to any static hosting service that supports Vite applications, such as:

- **Vercel** - [Deploy Vite to Vercel](https://vercel.com/docs/frameworks/vite)
- **Netlify** - [Deploy Vite to Netlify](https://docs.netlify.com/integrations/frameworks/vite/)
- **Cloudflare Pages** - [Deploy Vite to Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/vite/)

Make sure to set your environment variables in your hosting platform's dashboard.
