<template>
  <div class="auth-wrapper">
    <div class="auth-content">
      <div class="auth-bg">
        <span class="r"></span>
        <span class="r s"></span>
        <span class="r s"></span>
        <span class="r"></span>
      </div>
      <div class="card">
        <div class="card-body text-center">
          <div class="mb-4">
            <i class="feather icon-lock auth-icon"></i>
          </div>
          <h3 class="mb-4">Reset Password</h3>
          <p class="text-muted mb-4">Enter your new password below</p>

          <form @submit.prevent="handleResetPassword" class="forms-sample">
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                v-model="form.email"
                placeholder="Email Address"
                required
                readonly
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                v-model="form.password"
                placeholder="New Password"
                required
                minlength="6"
                :class="{ 'is-invalid': errors.password }"
              />
              <div v-if="errors.password" class="invalid-feedback">
                {{ errors.password }}
              </div>
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                v-model="form.confirmPassword"
                placeholder="Confirm New Password"
                required
                :class="{ 'is-invalid': errors.confirmPassword }"
              />
              <div v-if="errors.confirmPassword" class="invalid-feedback">
                {{ errors.confirmPassword }}
              </div>
            </div>

            <div class="password-requirements">
              <small class="text-muted">Password must contain:</small>
              <ul class="list-unstyled mt-2">
                <li :class="{ 'text-success': passwordChecks.length }">
                  <i
                    :class="
                      passwordChecks.length ? 'mdi mdi-check' : 'mdi mdi-close'
                    "
                  ></i>
                  At least 6 characters
                </li>
                <li :class="{ 'text-success': passwordChecks.uppercase }">
                  <i
                    :class="
                      passwordChecks.uppercase
                        ? 'mdi mdi-check'
                        : 'mdi mdi-close'
                    "
                  ></i>
                  One uppercase letter
                </li>
                <li :class="{ 'text-success': passwordChecks.lowercase }">
                  <i
                    :class="
                      passwordChecks.lowercase
                        ? 'mdi mdi-check'
                        : 'mdi mdi-close'
                    "
                  ></i>
                  One lowercase letter
                </li>
                <li :class="{ 'text-success': passwordChecks.number }">
                  <i
                    :class="
                      passwordChecks.number ? 'mdi mdi-check' : 'mdi mdi-close'
                    "
                  ></i>
                  One number
                </li>
              </ul>
            </div>

            <button
              type="submit"
              class="btn btn-primary shadow-2 mb-4"
              :disabled="loading || !isFormValid"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm mr-2"
              ></span>
              {{ loading ? "Resetting..." : "Reset Password" }}
            </button>

            <div class="text-center">
              <p class="mb-0 text-muted">
                <a href="#/auth/operator-login">Back to Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { operatorService } from "../../services";

export default {
  name: "operatorResetPassword",
  data() {
    return {
      loading: false,
      form: {
        email: "",
        password: "",
        confirmPassword: "",
        resetToken: "",
      },
      errors: {
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    passwordChecks() {
      const password = this.form.password;
      return {
        length: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
      };
    },
    isFormValid() {
      return (
        this.form.password &&
        this.form.confirmPassword &&
        this.form.password === this.form.confirmPassword &&
        Object.values(this.passwordChecks).every((check) => check) &&
        !this.errors.password &&
        !this.errors.confirmPassword
      );
    },
  },
  mounted() {
    // Get email and reset token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    this.form.email = urlParams.get("email") || "";
    this.form.resetToken = this.$route.params.resetToken || "";

    if (!this.form.email || !this.form.resetToken) {
      this.$toast.open({
        message: "Invalid reset link. Please request a new password reset.",
        type: "error",
        position: "top-right",
        duration: 5000,
      });
      this.$router.push("/auth/operator-login");
    }
  },
  watch: {
    "form.password"() {
      this.validatePassword();
    },
    "form.confirmPassword"() {
      this.validateConfirmPassword();
    },
  },
  methods: {
    validatePassword() {
      this.errors.password = "";

      if (!this.form.password) {
        return;
      }

      if (this.form.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters long";
        return;
      }

      if (!/[A-Z]/.test(this.form.password)) {
        this.errors.password =
          "Password must contain at least one uppercase letter";
        return;
      }

      if (!/[a-z]/.test(this.form.password)) {
        this.errors.password =
          "Password must contain at least one lowercase letter";
        return;
      }

      if (!/\d/.test(this.form.password)) {
        this.errors.password = "Password must contain at least one number";
        return;
      }
    },
    validateConfirmPassword() {
      this.errors.confirmPassword = "";

      if (!this.form.confirmPassword) {
        return;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = "Passwords do not match";
      }
    },
    async handleResetPassword() {
      if (!this.isFormValid) {
        this.$toast.open({
          message: "Please fix the form errors before submitting",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
        return;
      }

      this.loading = true;
      try {
        const response = await operatorService.resetPassword(
          this.form.email,
          this.form.password,
          this.form.resetToken
        );

        if (response.status) {
          this.$toast.open({
            message: response.message,
            type: "success",
            position: "top-right",
            duration: 5000,
          });

          // Redirect to login page after successful reset
          setTimeout(() => {
            this.$router.push("/auth/operator-login");
          }, 2000);
        } else {
          this.$toast.open({
            message: response.message || "Failed to reset password",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Reset password error:", error);
        this.$toast.open({
          message:
            "An error occurred while resetting password. Please try again.",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-content {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.auth-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.auth-bg span {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: ripple 15s infinite;
}

.auth-bg span:nth-child(1) {
  width: 80px;
  height: 80px;
  left: 10%;
  animation-delay: 0s;
}

.auth-bg span:nth-child(2) {
  width: 120px;
  height: 120px;
  left: 20%;
  animation-delay: 2s;
}

.auth-bg span:nth-child(3) {
  width: 100px;
  height: 100px;
  left: 70%;
  animation-delay: 4s;
}

.auth-bg span:nth-child(4) {
  width: 60px;
  height: 60px;
  left: 80%;
  animation-delay: 6s;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.auth-icon {
  font-size: 48px;
  color: #667eea;
}

.form-control {
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  font-size: 14px;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 30px;
  font-weight: 500;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.password-requirements {
  text-align: left;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.password-requirements ul {
  margin-bottom: 0;
}

.password-requirements li {
  margin-bottom: 5px;
  font-size: 12px;
  color: #6c757d;
}

.password-requirements li.text-success {
  color: #28a745 !important;
}

.password-requirements li i {
  margin-right: 5px;
  font-size: 14px;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.text-muted a {
  color: #667eea;
  text-decoration: none;
}

.text-muted a:hover {
  text-decoration: underline;
}
</style>
