const routes = {
  "": "sign-in",
  "sign-in": "sign-in",
  "sign-up": "sign-up",
  "forgot-password": "forgot-password",
  "reset-password": "reset-password",
  "account/password": "account-password",
};

const screenRoot = document.querySelector("#screen-root");
const adapterMode = document.querySelector("#adapter-mode");
const sessionChip = document.querySelector("#session-chip");

adapterMode.textContent = window.authAdapter.mode;

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [path] = hash.split("?");
  return routes[path] || "sign-in";
}

function getHashParams() {
  const hash = window.location.hash;
  const queryIndex = hash.indexOf("?");
  if (queryIndex === -1) {
    return new URLSearchParams();
  }
  return new URLSearchParams(hash.slice(queryIndex + 1));
}

function renderSession() {
  const session = window.authAdapter.getSession();
  if (!session) {
    sessionChip.textContent = "No active session";
    sessionChip.className = "session-chip";
    return;
  }

  sessionChip.textContent = `Signed in as ${session.email}`;
  sessionChip.className = "session-chip active";
}

function setActiveNav(route) {
  document.querySelectorAll("[data-route-link]").forEach((link) => {
    link.toggleAttribute("aria-current", link.dataset.routeLink === route);
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  const longEnough = password.length >= 8;
  const hasLetter = /[a-z]/i.test(password);
  const hasNumber = /\d/.test(password);
  return longEnough && hasLetter && hasNumber;
}

function showMessage(form, text, type = "info") {
  const slot = form.querySelector(".message-slot");
  slot.textContent = text;
  slot.className = `message-slot ${type}`;
}

function setFormLoading(form, isLoading) {
  const button = form.querySelector(".primary-action");
  if (!button) {
    return;
  }

  if (isLoading) {
    button.dataset.defaultLabel = button.textContent.trim();
    button.textContent = button.dataset.loadingLabel;
    button.disabled = true;
    return;
  }

  button.textContent = button.dataset.defaultLabel || button.textContent;
  button.disabled = false;
}

function requireFields(form, fields) {
  for (const field of fields) {
    const input = form.elements[field];
    if (!input || !input.value.trim()) {
      throw new Error("Please complete every required field.");
    }
  }
}

function readPasswordPair(form) {
  const password = form.elements.password.value;
  const confirmPassword = form.elements.confirmPassword.value;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  if (!validatePassword(password)) {
    throw new Error("Use at least 8 characters with a letter and a number.");
  }

  return password;
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const flow = form.dataset.flow;

  try {
    setFormLoading(form, true);
    showMessage(form, "", "info");

    if (flow === "sign-in") {
      requireFields(form, ["email", "password"]);
      const email = form.elements.email.value.trim();
      const password = form.elements.password.value;
      if (!validateEmail(email)) {
        throw new Error("Enter a valid email address.");
      }
      await window.authAdapter.signIn({ email, password });
      showMessage(form, "Signed in. You can now try the change password screen.", "success");
      renderSession();
      return;
    }

    if (flow === "sign-up") {
      requireFields(form, ["email", "password", "confirmPassword"]);
      const email = form.elements.email.value.trim();
      const password = readPasswordPair(form);
      if (!validateEmail(email)) {
        throw new Error("Enter a valid email address.");
      }
      await window.authAdapter.signUp({ email, password });
      showMessage(form, "Account created. In Supabase, this usually sends a confirmation email.", "success");
      return;
    }

    if (flow === "forgot-password") {
      requireFields(form, ["email"]);
      const email = form.elements.email.value.trim();
      if (!validateEmail(email)) {
        throw new Error("Enter a valid email address.");
      }
      await window.authAdapter.requestPasswordReset({ email });
      showMessage(form, "If an account exists for that email, a reset link will be sent.", "success");
      return;
    }

    if (flow === "reset-password") {
      requireFields(form, ["password", "confirmPassword"]);
      const password = readPasswordPair(form);
      await window.authAdapter.updatePassword({ password });
      showMessage(form, "Password updated. You can sign in with the new password.", "success");
      renderSession();
      return;
    }

    if (flow === "account-password") {
      requireFields(form, ["currentPassword", "password", "confirmPassword"]);
      const password = readPasswordPair(form);
      await window.authAdapter.updatePassword({
        password,
        currentPassword: form.elements.currentPassword.value,
      });
      showMessage(form, "Password changed for the active account.", "success");
      renderSession();
    }
  } catch (error) {
    showMessage(form, error.message, "error");
  } finally {
    setFormLoading(form, false);
  }
}

function renderSignedOutGate() {
  const wrapper = document.createElement("div");
  wrapper.className = "empty-state";
  wrapper.innerHTML = `
    <p class="eyebrow">Session required</p>
    <h2>Sign in to change your password</h2>
    <p>The change password flow is reserved for an active user session. The reset-password flow handles recovery links.</p>
    <a class="primary-link" href="#/sign-in">Go to sign in</a>
  `;
  screenRoot.replaceChildren(wrapper);
}

function renderScreen() {
  const route = getRoute();
  const template = document.querySelector(`#${route}-template`);
  const session = window.authAdapter.getSession();
  const hashParams = getHashParams();
  const isRecoveryPreview =
    route === "reset-password" &&
    (hashParams.has("mockRecovery") || hashParams.has("code") || hashParams.has("access_token"));

  setActiveNav(route === "reset-password" ? "forgot-password" : route);
  renderSession();

  if (route === "account-password" && !session) {
    renderSignedOutGate();
    return;
  }

  if (!template) {
    window.location.hash = "#/sign-in";
    return;
  }

  const node = template.content.cloneNode(true);
  const form = node.querySelector("form");
  form.addEventListener("submit", handleSubmit);

  const signOutButton = form.querySelector("[data-action='sign-out']");
  if (signOutButton) {
    signOutButton.addEventListener("click", async () => {
      await window.authAdapter.signOut();
      renderSession();
      window.location.hash = "#/sign-in";
    });
  }

  if (isRecoveryPreview) {
    const heading = node.querySelector(".form-heading p:last-child");
    heading.textContent = "A recovery session is active, so this page can safely collect the new password.";
  }

  screenRoot.replaceChildren(node);
}

window.addEventListener("hashchange", renderScreen);
renderScreen();
