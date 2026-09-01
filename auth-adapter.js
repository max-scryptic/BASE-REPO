(function attachAuthAdapter() {
  const SESSION_KEY = "auth-flow-demo-session";
  const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  let cachedSession = readMockSession();

  function readMockSession() {
    try {
      return JSON.parse(window.localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  }

  function writeMockSession(session) {
    cachedSession = session;
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function clearMockSession() {
    cachedSession = null;
    window.localStorage.removeItem(SESSION_KEY);
  }

  async function withSupabaseFallback(method, mockImplementation) {
    if (!window.supabaseAuthClient) {
      return mockImplementation();
    }

    const result = await method(window.supabaseAuthClient);
    if (result && result.error) {
      throw new Error(result.error.message || "Supabase auth request failed.");
    }
    return result;
  }

  window.authAdapter = {
    mode: window.supabaseAuthClient ? "Supabase auth adapter" : "Mock auth adapter",

    getSession() {
      return cachedSession;
    },

    async signIn({ email, password }) {
      const result = await withSupabaseFallback(
        (supabase) => supabase.auth.signInWithPassword({ email, password }),
        async () => {
          await delay(450);
          const session = {
            email,
            signedInAt: new Date().toISOString(),
          };
          writeMockSession(session);
          return { data: { session } };
        },
      );
      const userEmail = result?.data?.session?.user?.email || result?.data?.user?.email;
      if (userEmail) {
        writeMockSession({ email: userEmail, signedInAt: new Date().toISOString() });
      }
      return result;
    },

    async signUp({ email, password }) {
      const result = await withSupabaseFallback(
        (supabase) =>
          supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}${window.location.pathname}#/sign-in`,
            },
          }),
        async () => {
          await delay(550);
          return { data: { user: { email } } };
        },
      );
      const userEmail = result?.data?.session?.user?.email;
      if (userEmail) {
        writeMockSession({ email: userEmail, signedInAt: new Date().toISOString() });
      }
      return result;
    },

    async requestPasswordReset({ email }) {
      return withSupabaseFallback(
        (supabase) =>
          supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}${window.location.pathname}#/reset-password`,
          }),
        async () => {
          await delay(550);
          return { data: {} };
        },
      );
    },

    async updatePassword({ password, currentPassword }) {
      const result = await withSupabaseFallback(
        (supabase) =>
          supabase.auth.updateUser({
            password,
            ...(currentPassword ? { current_password: currentPassword } : {}),
          }),
        async () => {
          await delay(500);
          const session = readMockSession() || {
            email: "recovery-session@example.com",
            signedInAt: new Date().toISOString(),
          };
          writeMockSession({ ...session, passwordUpdatedAt: new Date().toISOString() });
          return { data: { user: { email: session.email } } };
        },
      );
      const userEmail = result?.data?.user?.email;
      if (userEmail) {
        writeMockSession({
          email: userEmail,
          signedInAt: cachedSession?.signedInAt || new Date().toISOString(),
          passwordUpdatedAt: new Date().toISOString(),
        });
      }
      return result;
    },

    async signOut() {
      const result = await withSupabaseFallback(
        (supabase) => supabase.auth.signOut(),
        async () => {
          await delay(250);
          clearMockSession();
          return { error: null };
        },
      );
      clearMockSession();
      return result;
    },
  };
})();
