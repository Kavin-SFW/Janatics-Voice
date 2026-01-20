# Authentication Troubleshooting Guide

## SSL Certificate Error Fix

If you're seeing `ERR_CERT_COMMON_NAME_INVALID` errors, the Auth URL format might be incorrect.

### Current Configuration

Your `.env.local` file should have:
```env
VITE_NEON_AUTH_URL=https://ep-blue-mode-ahtyfkg8.auth.c-3.us-east-1.aws.neon.tech/neondb/auth
VITE_NEON_DATA_API_URL=https://ep-blue-mode-ahtyfkg8.apirest.c-3.us-east-1.aws.neon.tech/neondb/rest/v1
```

### If SSL Error Persists

1. **Check Neon Console**: 
   - Go to your Neon project dashboard
   - Navigate to the "Auth" section
   - Copy the exact "Auth Base URL" shown there
   - Update your `.env.local` with that exact URL

2. **Try Alternative URL Formats**:
   ```env
   # Format 1: With database path
   VITE_NEON_AUTH_URL=https://ep-blue-mode-ahtyfkg8.auth.c-3.us-east-1.aws.neon.tech/neondb/auth
   
   # Format 2: Base URL only (SDK adds paths)
   VITE_NEON_AUTH_URL=https://ep-blue-mode-ahtyfkg8.auth.c-3.us-east-1.aws.neon.tech
   
   # Format 3: Alternative domain format
   VITE_NEON_AUTH_URL=https://ep-blue-mode-ahtyfkg8.neonauth.c-3.us-east-1.aws.neon.build/neondb/auth
   ```

3. **Verify Auth is Provisioned**:
   - In Neon Console, ensure "Auth" shows as "Enabled"
   - Check that the endpoint_id matches: `ep-blue-mode-ahtyfkg8`

4. **Restart Dev Server**:
   After changing `.env.local`, restart your dev server:
   ```bash
   npm run dev
   ```

### Testing the Auth URL

You can test if the Auth URL is accessible by opening it in your browser:
```
https://ep-blue-mode-ahtyfkg8.auth.c-3.us-east-1.aws.neon.tech/neondb/auth/get-config
```

If this returns JSON configuration, the URL is correct. If you get an SSL error, the URL format is wrong.

### Using the Neon Auth SDK

The code now uses `@neondatabase/auth` SDK which should handle URL routing automatically. The SDK will:
- Add `/api/auth` paths to your base URL
- Handle session management
- Manage tokens automatically

If you're still getting errors, the issue is likely the base URL format in your environment variable.
