// assets/js/auth.js - Authentication & Form Interaction Logic

document.addEventListener("DOMContentLoaded", function () {
  // 1. Password Visibility Toggle Functionality
  const passwordToggles = document.querySelectorAll(".password-toggle-btn");
  passwordToggles.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const targetInputId = this.dataset.target;
      const input = document.getElementById(targetInputId);
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";

      // Toggle Eye Icons
      const eyeOpen = this.querySelector(".eye-open");
      const eyeClosed = this.querySelector(".eye-closed");
      if (eyeOpen && eyeClosed) {
        eyeOpen.classList.toggle("hidden", isPassword);
        eyeClosed.classList.toggle("hidden", !isPassword);
      }
    });
  });

  // 2. Sign In Form Handler
  const signInForm = document.getElementById("sign-in-form");
  if (signInForm) {
    signInForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      clearFormErrors(this);

      const emailInput = document.getElementById("sign-in-email");
      const passwordInput = document.getElementById("sign-in-password");
      const rememberInput = document.getElementById("sign-in-remember");
      const submitBtn = document.getElementById("sign-in-submit-btn");
      const alertBox = document.getElementById("sign-in-alert");

      let hasError = false;

      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        showFieldError("sign-in-email", "Please enter a valid email address.");
        hasError = true;
      }

      if (!passwordInput.value) {
        showFieldError("sign-in-password", "Please enter your password.");
        hasError = true;
      }

      if (hasError) {
        triggerShake(signInForm);
        return;
      }

      // Start Loading State
      setButtonLoading(submitBtn, true, "Signing In...");

      try {
        const response = await fetch("backend/login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: emailInput.value.trim(),
            password: passwordInput.value,
            remember_me: rememberInput ? rememberInput.checked : false,
          }),
        });

        const data = await response.json();

        if (data.success) {
          showAlert(alertBox, "success", data.message || "Login successful! Redirecting...");
          setButtonLoading(submitBtn, false, "Success!");
          setTimeout(() => {
            window.location.href = data.redirect || "index.html";
          }, 800);
        } else {
          setButtonLoading(submitBtn, false, "Sign In");
          showAlert(alertBox, "error", data.message || "Invalid credentials.");
          triggerShake(signInForm);
          if (data.field) {
            showFieldError(`sign-in-${data.field}`, data.message);
          }
        }
      } catch (err) {
        setButtonLoading(submitBtn, false, "Sign In");
        showAlert(alertBox, "error", "Network or server error. Please try again.");
        triggerShake(signInForm);
      }
    });
  }

  // 3. Sign Up Form Handler
  const signUpForm = document.getElementById("sign-up-form");
  if (signUpForm) {
    signUpForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      clearFormErrors(this);

      const nameInput = document.getElementById("sign-up-name");
      const emailInput = document.getElementById("sign-up-email");
      const phoneInput = document.getElementById("sign-up-phone");
      const passwordInput = document.getElementById("sign-up-password");
      const confirmInput = document.getElementById("sign-up-confirm-password");
      const termsInput = document.getElementById("sign-up-terms");
      const submitBtn = document.getElementById("sign-up-submit-btn");
      const alertBox = document.getElementById("sign-up-alert");

      let hasError = false;

      if (!nameInput.value.trim()) {
        showFieldError("sign-up-name", "Please enter your full name.");
        hasError = true;
      }

      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        showFieldError("sign-up-email", "Please enter a valid email address.");
        hasError = true;
      }

      if (passwordInput.value.length < 6) {
        showFieldError("sign-up-password", "Password must be at least 6 characters.");
        hasError = true;
      }

      if (confirmInput && passwordInput.value !== confirmInput.value) {
        showFieldError("sign-up-confirm-password", "Passwords do not match.");
        hasError = true;
      }

      if (termsInput && !termsInput.checked) {
        showFieldError("sign-up-terms", "Please accept the terms and conditions.");
        hasError = true;
      }

      if (hasError) {
        triggerShake(signUpForm);
        return;
      }

      // Start Loading State
      setButtonLoading(submitBtn, true, "Creating Account...");

      try {
        const response = await fetch("backend/register.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            full_name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput ? phoneInput.value.trim() : "",
            password: passwordInput.value,
            confirm_password: confirmInput ? confirmInput.value : passwordInput.value,
          }),
        });

        const data = await response.json();

        if (data.success) {
          showAlert(alertBox, "success", data.message || "Account created! Redirecting...");
          setButtonLoading(submitBtn, false, "Success!");
          setTimeout(() => {
            window.location.href = data.redirect || "index.html";
          }, 900);
        } else {
          setButtonLoading(submitBtn, false, "Create Account");
          showAlert(alertBox, "error", data.message || "Registration failed.");
          triggerShake(signUpForm);
          if (data.field) {
            showFieldError(`sign-up-${data.field}`, data.message);
          }
        }
      } catch (err) {
        setButtonLoading(submitBtn, false, "Create Account");
        showAlert(alertBox, "error", "Network or server error. Please try again.");
        triggerShake(signUpForm);
      }
    });
  }

  // 4. Global Topbar User Session Sync
  initHeaderUserSync();
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(fieldId, message) {
  const errorEl = document.getElementById(`${fieldId}-error`);
  const inputEl = document.getElementById(fieldId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
    errorEl.style.opacity = "1";
  }
  if (inputEl) {
    inputEl.classList.add("border-red-500", "focus:border-red-500");
  }
}

function clearFormErrors(form) {
  const errorTexts = form.querySelectorAll("[id$='-error']");
  errorTexts.forEach((el) => {
    el.textContent = "";
    el.classList.add("hidden");
  });
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("border-red-500", "focus:border-red-500");
  });
  const alerts = form.querySelectorAll(".auth-feedback-alert");
  alerts.forEach((a) => {
    a.classList.add("hidden");
    a.textContent = "";
  });
}

function showAlert(alertBox, type, message) {
  if (!alertBox) return;
  alertBox.textContent = message;
  alertBox.classList.remove("hidden", "alert-success", "alert-error");
  if (type === "success") {
    alertBox.classList.add("alert-success");
  } else {
    alertBox.classList.add("alert-error");
  }
}

function setButtonLoading(btn, isLoading, text) {
  if (!btn) return;
  btn.disabled = isLoading;
  if (isLoading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = `<span class="inline-flex items-center gap-2"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>${text}</span>`;
  } else {
    btn.innerHTML = text || btn.dataset.originalText || "Submit";
  }
}

function triggerShake(element) {
  if (!element) return;
  element.classList.remove("animate-auth-shake");
  void element.offsetWidth; // Trigger reflow
  element.classList.add("animate-auth-shake");
}

async function initHeaderUserSync() {
  const loginLinks = document.querySelectorAll(".akshara-topbar-login");
  if (!loginLinks.length) return;

  try {
    const res = await fetch("backend/user.php");
    const data = await res.json();

    if (data && data.logged_in && data.user) {
      loginLinks.forEach((link) => {
        const firstName = escapeHtml(data.user.name.split(' ')[0]);
        const wrapper = document.createElement("span");
        wrapper.className = "inline-flex items-center gap-2 text-white text-sm font-medium";
        wrapper.innerHTML = `
          <span class="inline-flex items-center gap-1.5 font-semibold text-primary">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            Hi, ${firstName}
          </span>
          <a href="backend/logout.php" title="Sign Out" class="text-white/70 hover:text-red-300 text-xs underline duration-200">(Logout)</a>
        `;
        link.replaceWith(wrapper);
      });
    }
  } catch (e) {}
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
