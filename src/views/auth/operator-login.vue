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
            <i class="feather icon-bus auth-icon"></i>
          </div>
          <h3 class="mb-4">Operator Login</h3>
          <form @submit.prevent="handleLogin" class="forms-sample">
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                v-model="form.email"
                placeholder="Email"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                v-model="form.password"
                placeholder="Password"
                required
              />
            </div>
            <div class="form-group text-left">
              <div class="checkbox checkbox-fill d-inline">
                <input
                  type="checkbox"
                  name="checkbox-fill-1"
                  id="checkbox-fill-a1"
                  v-model="form.rememberMe"
                />
                <label for="checkbox-fill-a1" class="cr">Save Details</label>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary shadow-2 mb-4"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm mr-2"
              ></span>
              {{ loading ? "Logging in..." : "Login as Operator" }}
            </button>
            <div class="text-center">
              <p class="mb-2 text-muted">
                <a href="#" @click.prevent="showForgotPassword = true"
                  >Forgot password?</a
                >
              </p>
              <p class="mb-0 text-muted">
                <a href="#/auth/login">Admin Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <b-modal
      v-model="showForgotPassword"
      title="Reset Password"
      size="md"
      :ok-title="forgotPasswordLoading ? 'Sending...' : 'Send Reset Link'"
      :ok-disabled="forgotPasswordLoading || !forgotPasswordForm.email"
      @ok="handleForgotPassword"
      @cancel="resetForgotPasswordForm"
    >
      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label for="forgotEmail">Email Address</label>
          <input
            type="email"
            class="form-control"
            id="forgotEmail"
            v-model="forgotPasswordForm.email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <p class="text-muted">
          We will send you a password reset link to your email address.
        </p>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { operatorService } from "../../services";
import TokenService from "../../services/token.service";
import { useAuth } from "../../store/useAuth";

export default {
  name: "operatorLogin",
  data() {
    return {
      loading: false,
      showForgotPassword: false,
      forgotPasswordLoading: false,
      form: {
        email: "",
        password: "",
        rememberMe: false,
      },
      forgotPasswordForm: {
        email: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        const response = await operatorService.login(
          this.form.email,
          this.form.password
        );

        if (response.token) {
          // Store operator token and data
          TokenService.setLocalAccessToken(response.token.accessToken);
          TokenService.setLocalRefreshToken(response.token.refreshToken);
          TokenService.setUser(response.operator);
          TokenService.setRole("operator");

          // Store in localStorage for persistence
          localStorage.setItem("userType", "operator");
          localStorage.setItem(
            "operatorData",
            JSON.stringify(response.operator)
          );

          // Update Pinia store for authentication state
          const auth = useAuth();
          auth.authToken = response.token;
          auth.isAuth = true;
          auth.getRolePermissions = []; // Operators don't need complex permissions
          auth.general = { userType: "operator" };

          this.$toast.open({
            message: response.message || "Login successful",
            type: "success",
            position: "top-right",
            duration: 3000,
          });

          // Redirect to operator dashboard
          this.$router.push("/operator/dashboard");
        } else {
          this.$toast.open({
            message:
              response.message ||
              "Login failed. Please check your credentials.",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        this.$toast.open({
          message: "An error occurred during login. Please try again.",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.loading = false;
      }
    },
    async handleForgotPassword() {
      this.forgotPasswordLoading = true;
      try {
        const response = await operatorService.sendPasswordReset(
          this.forgotPasswordForm.email
        );

        if (response.status) {
          this.$toast.open({
            message: response.message,
            type: "success",
            position: "top-right",
            duration: 5000,
          });
          this.showForgotPassword = false;
          this.resetForgotPasswordForm();
        } else {
          this.$toast.open({
            message: response.message || "Failed to send reset email",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Forgot password error:", error);
        this.$toast.open({
          message: "An error occurred. Please try again.",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.forgotPasswordLoading = false;
      }
    },
    resetForgotPasswordForm() {
      this.forgotPasswordForm.email = "";
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

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 30px;
  font-weight: 500;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.checkbox {
  margin-bottom: 0;
}

.checkbox input[type="checkbox"] {
  display: none;
}

.checkbox .cr {
  position: relative;
  display: inline-block;
  padding-left: 25px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.checkbox .cr:before {
  content: "";
  position: absolute;
  left: 0;
  top: 2px;
  width: 16px;
  height: 16px;
  border: 2px solid #ddd;
  border-radius: 3px;
  background: #fff;
  transition: all 0.3s ease;
}

.checkbox input[type="checkbox"]:checked + .cr:before {
  background: #667eea;
  border-color: #667eea;
}

.checkbox input[type="checkbox"]:checked + .cr:after {
  content: "✓";
  position: absolute;
  left: 3px;
  top: 0;
  color: white;
  font-size: 12px;
  font-weight: bold;
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
