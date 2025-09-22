<template>
  <div>
    <section class="dashboard">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-header">
            <div class="page-header-title">
              <h4 class="m-b-10">Operator Dashboard</h4>
            </div>
            <ul class="breadcrumb-title">
              <li class="breadcrumb-item">
                <a href="#/dashboard">
                  <i class="feather icon-home"></i>
                </a>
              </li>
              <li class="breadcrumb-item">
                <a href="#!">Operator Dashboard</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
                  {{ operatorData?.commissionRate || 0 }}%
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4">
                  <strong>Payment Terms:</strong>
                </div>
                <div class="col-sm-8">
                  {{ operatorData?.paymentTerms || "N/A" }}
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

      <!-- Quick Actions -->
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h5>Quick Actions</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-3 mb-3">
                  <button
                    class="btn btn-primary btn-block"
                    @click="editProfile"
                  >
                    <i class="feather icon-edit"></i> Edit Profile
                  </button>
                </div>
                <div class="col-md-3 mb-3">
                  <button class="btn btn-info btn-block" @click="viewBuses">
                    <i class="feather icon-bus"></i> Manage Buses
                  </button>
                </div>
                <div class="col-md-3 mb-3">
                  <button class="btn btn-success btn-block" @click="viewRoutes">
                    <i class="feather icon-map"></i> View Routes
                  </button>
                </div>
                <div class="col-md-3 mb-3">
                  <button
                    class="btn btn-warning btn-block"
                    @click="viewBookings"
                  >
                    <i class="feather icon-calendar"></i> View Bookings
                  </button>
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
    </section>
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
      operatorData: null,
      dashboardStats: null,
      recentActivity: [],
    };
  },
  async mounted() {
    await this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await operatorService.getDashboard();

        if (response.status && response.data) {
          this.operatorData = response.data.operator;
          this.dashboardStats = response.data.stats;
          this.recentActivity = response.data.recentActivity || [];
        } else {
          this.$toast.open({
            message: "Failed to fetch dashboard data",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        this.$toast.open({
          message: "An error occurred while fetching dashboard data",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
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
    editProfile() {
      this.$router.push("/operator/profile");
    },
    viewBuses() {
      this.$router.push("/operator/buses");
    },
    viewRoutes() {
      this.$router.push("/operator/routes");
    },
    viewBookings() {
      this.$router.push("/operator/bookings");
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
</style>
