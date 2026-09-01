# Auth Flow Prototype

This is a dependency-free front-end prototype for the account access flows:

- Sign in
- Sign up
- Forgot password
- Reset password from a recovery link
- Change password for a signed-in account

Open `index.html` directly in a browser to try it. The app uses a mock auth adapter by default and stores a demo session in `localStorage`.

## Supabase Integration Shape

All auth calls are isolated in `auth-adapter.js`. When the backend is ready, provide a real Supabase client as `window.supabaseAuthClient` before `auth-adapter.js` loads, or replace the adapter methods with framework-native imports.

The adapter is already shaped around Supabase Auth:

```js
supabase.auth.signInWithPassword({ email, password })
supabase.auth.signUp({
  email,
  password,
  options: { emailRedirectTo }
})
supabase.auth.resetPasswordForEmail(email, { redirectTo })
supabase.auth.updateUser({ password })
supabase.auth.updateUser({ password, current_password })
supabase.auth.signOut()
```

For a Next.js or other SSR implementation, use `@supabase/ssr` so sessions are available through cookies on both client and server. Configure the Supabase dashboard redirect URLs to include the reset-password destination, for example:

```txt
https://your-app.example.com/#/reset-password
http://localhost:3000/#/reset-password
```

## Production Notes

- Do not expose a Supabase service-role or secret key in browser code.
- Password-reset responses should not reveal whether an account exists.
- Supabase email confirmations and password resets require email delivery. The default email provider is limited, so configure custom SMTP before production.
- The signed-in change-password flow can send `current_password` when current-password verification is required.
