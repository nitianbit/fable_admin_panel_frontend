<template>
  <div class="operator-dashboard">
    <!-- Welcome Section -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h5>Welcome, {{ operatorData?.companyName || "Operator" }}</h5>
          </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-8">
                  <p class="text-muted">
                    Manage your bus operations, view statistics, and access all
                    operator features from this dashboard.
                  </p>
                </div>
                <div class="col-md-4 text-right">
                  <div class="operator-status">
                    <span
                      class="badge"
                      :class="getStatusClass(operatorData?.status)"
                    >
                      {{ operatorData?.status || "Unknown" }}
                    </span>
                    <span
                      class="badge ml-2"
                      :class="
                        operatorData?.isVerified
                          ? 'badge-success'
                          : 'badge-warning'
                      "
                    >
                      {{
                        operatorData?.isVerified
                          ? "Verified"
                          : "Pending Verification"
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="card stat-card">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted f-w-600">Total Buses</h6>
                  <h4 class="m-b-0">{{ dashboardStats?.totalBuses || 0 }}</h4>
                </div>
                <div class="col-auto">
                  <i class="feather icon-bus text-c-blue f-18"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card stat-card">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted f-w-600">Active Buses</h6>
                  <h4 class="m-b-0">{{ dashboardStats?.activeBuses || 0 }}</h4>
                </div>
                <div class="col-auto">
                  <i class="feather icon-check-circle text-c-green f-18"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card stat-card">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted f-w-600">Fleet Size</h6>
                  <h4 class="m-b-0">
                    {{ dashboardStats?.fleetSize || 0 }}/{{
                      dashboardStats?.maxFleetSize || 0
                    }}
                  </h4>
                </div>
                <div class="col-auto">
                  <i class="feather icon-layers text-c-yellow f-18"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card stat-card">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted f-w-600">Max Seats</h6>
                  <h4 class="m-b-0">{{ dashboardStats?.maxNoOfSeats || 0 }}</h4>
                </div>
                <div class="col-auto">
                  <i class="feather icon-users text-c-red f-18"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fleet and Business Settings -->
      <div class="row">
        <div class="col-lg-12">
          <div class="card settings-card">
            <div class="card-header settings-header">
              <div class="d-flex align-items-center">
                <i class="feather icon-settings settings-icon"></i>
                <div>
                  <h5 class="mb-0">Fleet and Business Settings</h5>
                  <p class="text-muted mb-0 small">Update your fleet configuration and business parameters</p>
                </div>
              </div>
            </div>
            <div class="card-body settings-body">
              <div v-if="loading && !operatorId" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <p class="mt-3 text-muted">Loading settings...</p>
              </div>
              <form @submit.prevent="handleSettingsUpdate" v-else>
                <div class="row">
                  <div class="col-md-3 col-sm-6">
                    <div class="form-group">
                      <label class="form-label">
                        <i class="feather icon-users text-primary mr-1"></i>
                        Max Number of Seats *
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        v-model.number="settingsForm.maxNoOfSeats"
                        min="1"
                        max="100"
                        required
                        placeholder="Enter max seats"
                      />
                      <small class="form-text text-muted">Maximum seats per bus (1-100)</small>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6">
                    <div class="form-group">
                      <label class="form-label">
                        <i class="feather icon-layers text-warning mr-1"></i>
                        Max Fleet Size
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        v-model.number="settingsForm.maxFleetSize"
                        min="1"
                        placeholder="Enter fleet size"
                      />
                      <small class="form-text text-muted">Maximum buses in fleet</small>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6">
                    <div class="form-group">
                      <label class="form-label">
                        <i class="feather icon-percent text-success mr-1"></i>
                        Commission Rate (%)
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        v-model.number="settingsForm.commissionRate"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter rate"
                      />
                      <small class="form-text text-muted">Commission rate (0-100)</small>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6">
                    <div class="form-group">
                      <label class="form-label">
                        <i class="feather icon-calendar text-info mr-1"></i>
                        Payment Terms
                      </label>
                      <select class="form-control" v-model="settingsForm.paymentTerms">
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                      <small class="form-text text-muted">Payment frequency</small>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <div class="form-actions">
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg"
                        :disabled="submitting"
                      >
                        <i v-if="!submitting" class="feather icon-check-circle mr-2"></i>
                        <span
                          v-if="submitting"
                          class="spinner-border spinner-border-sm mr-2"
                        ></span>
                        {{ submitting ? "Updating..." : "Update Settings" }}
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-secondary btn-lg ml-2"
                        @click="resetSettingsForm"
                        :disabled="submitting"
                      >
                        <i class="feather icon-refresh-ccw mr-2"></i>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Information -->
      <div class="row">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5>Business Information</h5>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-sm-4">
                  <strong>Company Code:</strong>
                </div>
                <div class="col-sm-8">
                  <span class="badge badge-info">{{
                    operatorData?.companyCode || "N/A"
                  }}</span>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4">
                  <strong>Business Type:</strong>
                </div>
                <div class="col-sm-8">
                  {{ operatorData?.businessType || "N/A" }}
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4">
                  <strong>Commission Rate:</strong>
                </div>
                <div class="col-sm-8">
                  {{ dashboardStats?.commissionRate || operatorData?.commissionRate || settingsForm.commissionRate || 0 }}%
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4">
                  <strong>Payment Terms:</strong>
                </div>
                <div class="col-sm-8">
                  {{ dashboardStats?.paymentTerms || operatorData?.paymentTerms || settingsForm.paymentTerms || "N/A" }}
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4">
                  <strong>License Expiry:</strong>
                </div>
                <div class="col-sm-8">
                  <span
                    :class="
                      getLicenseExpiryClass(operatorData?.licenseExpiryDate)
                    "
                  >
                    {{ formatDate(operatorData?.licenseExpiryDate) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5>Contact Information</h5>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-sm-4">
                  <strong>Email:</strong>
                </div>
                <div class="col-sm-8">
                  <a :href="'mailto:' + operatorData?.email">{{
                    operatorData?.email || "N/A"
                  }}</a>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4">
                  <strong>Phone:</strong>
                </div>
                <div class="col-sm-8">
                  <a :href="'tel:' + operatorData?.phone">
                    {{ operatorData?.countryCode || "+91" }}
                    {{ operatorData?.phone || "N/A" }}
                  </a>
                </div>
              </div>
              <div class="row mb-3" v-if="operatorData?.alternatePhone">
                <div class="col-sm-4">
                  <strong>Alternate Phone:</strong>
                </div>
                <div class="col-sm-8">
                  <a :href="'tel:' + operatorData?.alternatePhone">
                    {{ operatorData?.countryCode || "+91" }}
                    {{ operatorData?.alternatePhone }}
                  </a>
                </div>
              </div>
              <div class="row mb-3" v-if="operatorData?.website">
                <div class="col-sm-4">
                  <strong>Website:</strong>
                </div>
                <div class="col-sm-8">
                  <a :href="operatorData?.website" target="_blank">{{
                    operatorData?.website
                  }}</a>
                </div>
              </div>
              <div class="row mb-3" v-if="operatorData?.contactPerson">
                <div class="col-sm-4">
                  <strong>Contact Person:</strong>
                </div>
                <div class="col-sm-8">
                  {{ operatorData?.contactPerson?.name || "N/A" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- Recent Activity -->
      <div class="row" v-if="recentActivity && recentActivity.length > 0">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h5>Recent Activity</h5>
            </div>
            <div class="card-body">
              <div class="activity-timeline">
                <div
                  v-for="(activity, index) in recentActivity"
                  :key="index"
                  class="activity-item"
                >
                  <div class="activity-icon">
                    <i :class="getActivityIcon(activity.type)"></i>
                  </div>
                  <div class="activity-content">
                    <h6>{{ activity.title }}</h6>
                    <p class="text-muted">{{ activity.description }}</p>
                    <small class="text-muted">{{
                      formatDate(activity.createdAt)
                    }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { operatorService } from "../../services";
import moment from "moment-timezone";

export default {
  name: "operatorDashboard",
  data() {
    return {
      loading: true,
      submitting: false,
      operatorId: null,
      operatorData: null,
      dashboardStats: null,
      recentActivity: [],
      settingsForm: {
        maxNoOfSeats: 50,
        maxFleetSize: 100,
        commissionRate: 0,
        paymentTerms: "Weekly",
      },
      originalSettings: {},
    };
  },
  async mounted() {
    await this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        this.loading = true;
        
        // First try to get dashboard data
        let dashboardResponse = null;
        try {
          console.log("Fetching operator dashboard data...");
          dashboardResponse = await operatorService.getDashboard();
          console.log("Dashboard API response:", dashboardResponse);
        } catch (dashboardError) {
          console.warn("Dashboard endpoint failed, will try profile endpoint:", dashboardError);
        }

        // If dashboard response is valid, use it
        if (dashboardResponse && dashboardResponse.status && dashboardResponse.data) {
          this.operatorData = dashboardResponse.data.operator || null;
          this.dashboardStats = dashboardResponse.data.stats || null;
          this.recentActivity = dashboardResponse.data.recentActivity || [];
        }

        // Always fetch profile to ensure we have operator data and ID
        // This is important for the settings form to work
        let profileResponse = null;
        try {
          console.log("Fetching operator profile...");
          profileResponse = await operatorService.getProfile();
          console.log("Profile API response:", profileResponse);
          
          if (profileResponse && profileResponse.status && profileResponse.data) {
            const profileData = profileResponse.data;
            
            // If we don't have operator data from dashboard, use profile data
            if (!this.operatorData) {
              this.operatorData = profileData;
            }
            
            // Extract operator ID from profile data
            this.operatorId = profileData._id || profileData.id || this.operatorId;
            
            // Merge profile data into operatorData if needed
            if (this.operatorData) {
              // Update operatorData with profile data to ensure we have latest values
              Object.assign(this.operatorData, {
                maxNoOfSeats: profileData.maxNoOfSeats || this.operatorData.maxNoOfSeats,
                maxFleetSize: profileData.maxFleetSize || this.operatorData.maxFleetSize,
                commissionRate: profileData.commissionRate || this.operatorData.commissionRate,
                paymentTerms: profileData.paymentTerms || this.operatorData.paymentTerms,
              });
            }
          } else if (profileResponse && profileResponse.data && !profileResponse.status) {
            // Some APIs return data directly without status wrapper
            const profileData = profileResponse.data;
            if (!this.operatorData) {
              this.operatorData = profileData;
            }
            this.operatorId = profileData._id || profileData.id || this.operatorId;
          }
        } catch (profileError) {
          console.error("Error fetching profile:", profileError);
          // If profile fetch fails with 401, it means token issue
          if (profileError?.response?.status === 401) {
            this.$toast.open({
              message: "Session expired. Please login again.",
              type: "error",
              position: "top-right",
              duration: 3000,
            });
            // Redirect to login after a delay
            setTimeout(() => {
              this.$router.push("/operator-login");
            }, 2000);
            return;
          }
        }

        // Extract operator ID and populate settings form
        if (this.operatorData) {
          if (!this.operatorId) {
            this.operatorId = this.operatorData._id || this.operatorData.id || null;
          }
          
          // Populate settings form from operator data
          this.settingsForm = {
            maxNoOfSeats: this.operatorData.maxNoOfSeats || this.dashboardStats?.maxNoOfSeats || 50,
            maxFleetSize: this.operatorData.maxFleetSize || this.dashboardStats?.maxFleetSize || 100,
            commissionRate: this.operatorData.commissionRate || this.dashboardStats?.commissionRate || 0,
            paymentTerms: this.operatorData.paymentTerms || this.dashboardStats?.paymentTerms || "Weekly",
          };
          
          // Store original settings for reset
          this.originalSettings = JSON.parse(JSON.stringify(this.settingsForm));
        }

        // If we still don't have operator data, show error
        if (!this.operatorData && !this.operatorId) {
          console.error("No operator data available");
          this.$toast.open({
            message: "Unable to load operator data. Please try again.",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        } else {
          console.log("Dashboard data loaded successfully:", {
            operator: this.operatorData,
            stats: this.dashboardStats,
            activity: this.recentActivity,
            operatorId: this.operatorId
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        
        // Check if it's an authentication error
        if (error?.response?.status === 401) {
          this.$toast.open({
            message: "Session expired. Please login again.",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
          setTimeout(() => {
            this.$router.push("/operator-login");
          }, 2000);
        } else {
          this.$toast.open({
            message: error?.response?.data?.message || "Failed to load dashboard data",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      if (!date) return "N/A";
      return moment(date).format("DD MMM YYYY");
    },
    getStatusClass(status) {
      switch (status) {
        case "Active":
          return "badge-success";
        case "Inactive":
          return "badge-secondary";
        case "Suspended":
          return "badge-danger";
        case "Pending":
          return "badge-warning";
        default:
          return "badge-secondary";
      }
    },
    getLicenseExpiryClass(expiryDate) {
      if (!expiryDate) return "";

      const expiry = moment(expiryDate);
      const now = moment();
      const daysUntilExpiry = expiry.diff(now, "days");

      if (daysUntilExpiry < 0) {
        return "text-danger font-weight-bold"; // Expired
      } else if (daysUntilExpiry < 30) {
        return "text-warning font-weight-bold"; // Expiring soon
      } else {
        return "text-success"; // Valid
      }
    },
    getActivityIcon(type) {
      switch (type) {
        case "bus":
          return "feather icon-bus text-primary";
        case "booking":
          return "feather icon-calendar text-success";
        case "route":
          return "feather icon-map text-info";
        case "payment":
          return "feather icon-credit-card text-warning";
        default:
          return "feather icon-activity text-secondary";
      }
    },
    async handleSettingsUpdate() {
      try {
        if (!this.operatorId) {
          this.$toast.open({
            message: "Operator ID not found. Please refresh the page.",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
          return;
        }

        this.submitting = true;
        
        // Prepare data for API
        const updateData = {
          maxNoOfSeats: this.settingsForm.maxNoOfSeats,
          maxFleetSize: this.settingsForm.maxFleetSize,
          commissionRate: this.settingsForm.commissionRate,
          paymentTerms: this.settingsForm.paymentTerms,
        };
        
        console.log("Updating settings with data:", updateData, "Operator ID:", this.operatorId);
        
        // Use operator ID to call PATCH /v1/operators/:operatorId
        const response = await operatorService.updateProfile(updateData, this.operatorId);
        
        console.log("Update response:", response);
        
        if (response && response.status) {
          this.$toast.open({
            message: response.message || "Settings updated successfully",
            type: "success",
            position: "top-right",
            duration: 3000,
          });
          
          // Refresh dashboard data to get updated values
          this.loading = true;
          await this.fetchDashboardData();
          
          // Update original settings
          this.originalSettings = JSON.parse(JSON.stringify(this.settingsForm));
        } else {
          this.$toast.open({
            message: response?.message || response?.data?.message || "Failed to update settings",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error updating settings:", error);
        this.$toast.open({
          message: error?.response?.data?.message || "An error occurred while updating settings",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.submitting = false;
      }
    },
    resetSettingsForm() {
      this.settingsForm = JSON.parse(JSON.stringify(this.originalSettings));
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header-title h4 {
  margin-bottom: 10px;
  color: #333;
}

.stat-card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card .card-body {
  padding: 20px;
}

.text-c-blue {
  color: #007bff !important;
}

.text-c-green {
  color: #28a745 !important;
}

.text-c-yellow {
  color: #ffc107 !important;
}

.text-c-red {
  color: #dc3545 !important;
}

.operator-status .badge {
  font-size: 12px;
  padding: 5px 10px;
}

.badge-success {
  background-color: #28a745;
}

.badge-warning {
  background-color: #ffc107;
  color: #212529;
}

.badge-info {
  background-color: #17a2b8;
}

.badge-danger {
  background-color: #dc3545;
}

.badge-secondary {
  background-color: #6c757d;
}

.activity-timeline {
  position: relative;
  padding-left: 30px;
}

.activity-timeline::before {
  content: "";
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e9ecef;
}

.activity-item {
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
}

.activity-icon {
  position: absolute;
  left: -22px;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.activity-content {
  flex: 1;
  padding-left: 15px;
}

.activity-content h6 {
  margin-bottom: 5px;
  color: #333;
}

.activity-content p {
  margin-bottom: 5px;
  font-size: 14px;
}

.text-danger.font-weight-bold {
  font-weight: bold !important;
}

.text-warning.font-weight-bold {
  font-weight: bold !important;
}

.btn-block {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-weight: 500;
}

.btn-block i {
  margin-right: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 5px;
  display: block;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.form-text {
  font-size: 12px;
  color: #6c757d;
  margin-top: 5px;
}

.form-actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.btn {
  border-radius: 8px;
  padding: 12px 30px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  border-color: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
  border-color: #2980b9;
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6268;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Settings Card Styles */
.settings-card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  margin-bottom: 30px;
}

.settings-card:hover {
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
}

.settings-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px 15px 0 0;
  padding: 20px 25px;
  border-bottom: none;
}

.settings-header h5 {
  color: white;
  font-weight: 600;
  margin-bottom: 5px;
}

.settings-header .text-muted {
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 13px;
}

.settings-icon {
  font-size: 24px;
  margin-right: 15px;
  color: white;
}

.settings-body {
  padding: 30px;
  background: #ffffff;
}

.form-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.form-label i {
  font-size: 16px;
}

.form-control {
  border-radius: 10px;
  border: 2px solid #e8ecef;
  padding: 12px 15px;
  font-size: 14px;
  transition: all 0.3s ease;
  height: auto;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15);
  outline: none;
}

.form-control::placeholder {
  color: #adb5bd;
  font-size: 13px;
}

.form-text {
  font-size: 12px;
  color: #6c757d;
  margin-top: 6px;
  display: block;
}

.form-actions {
  margin-top: 25px;
  padding-top: 25px;
  border-top: 2px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-lg {
  padding: 12px 35px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-outline-secondary {
  border: 2px solid #6c757d;
  color: #6c757d;
  background: transparent;
}

.btn-outline-secondary:hover:not(:disabled) {
  background: #6c757d;
  color: white;
  transform: translateY(-2px);
}

.btn-outline-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Loading State */
.py-5 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .settings-body {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-lg {
    width: 100%;
    justify-content: center;
  }
  
  .settings-header .d-flex {
    flex-direction: column;
    align-items: flex-start !important;
  }
  
  .settings-icon {
    margin-bottom: 10px;
    margin-right: 0;
  }
}
</style>
