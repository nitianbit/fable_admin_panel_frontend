<template>
  <div class="operator-routes">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h5>My Routes</h5>
            <p class="text-muted">Manage your bus routes and schedules</p>
          </div>
          <div class="card-body">
            <!-- Route Statistics -->
            <div class="row mb-4">
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-map"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ routeStats.totalRoutes || 0 }}</h3>
                    <p>Total Routes</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-clock"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ routeStats.activeRoutes || 0 }}</h3>
                    <p>Active Routes</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-calendar"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ routeStats.totalTrips || 0 }}</h3>
                    <p>Total Trips</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-users"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ routeStats.totalBookings || 0 }}</h3>
                    <p>Total Bookings</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Route List -->
            <div class="route-list">
              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <p class="mt-3">Loading routes...</p>
              </div>

              <div v-else-if="routes.length === 0" class="text-center py-5">
                <i class="feather icon-map" style="font-size: 48px; color: #ccc;"></i>
                <h5 class="mt-3">No Routes Found</h5>
                <p class="text-muted">You haven't created any routes yet.</p>
                <button class="btn btn-primary" @click="showAddRouteModal = true">
                  <i class="feather icon-plus"></i> Create Your First Route
                </button>
              </div>

              <div v-else class="row">
                <div
                  v-for="route in routes"
                  :key="route.id"
                  class="col-md-6 col-lg-4 mb-4"
                >
                  <div class="route-card">
                    <div class="route-header">
                      <h6 class="route-name">{{ route.name }}</h6>
                      <span class="route-status" :class="getStatusClass(route.status)">
                        {{ route.status }}
                      </span>
                    </div>
                    <div class="route-content">
                      <div class="route-path">
                        <div class="path-point">
                          <i class="feather icon-map-pin"></i>
                          <span>{{ route.from }}</span>
                        </div>
                        <div class="path-line">
                          <i class="feather icon-arrow-right"></i>
                        </div>
                        <div class="path-point">
                          <i class="feather icon-map-pin"></i>
                          <span>{{ route.to }}</span>
                        </div>
                      </div>
                      <div class="route-details">
                        <div class="detail-item">
                          <i class="feather icon-clock"></i>
                          <span>{{ route.duration }}</span>
                        </div>
                        <div class="detail-item">
                          <i class="feather icon-dollar-sign"></i>
                          <span>₹{{ route.fare }}</span>
                        </div>
                        <div class="detail-item">
                          <i class="feather icon-bus"></i>
                          <span>{{ route.buses }} Buses</span>
                        </div>
                      </div>
                      <div class="route-actions">
                        <button
                          class="btn btn-sm btn-outline-primary"
                          @click="viewRoute(route)"
                        >
                          <i class="feather icon-eye"></i> View
                        </button>
                        <button
                          class="btn btn-sm btn-outline-secondary"
                          @click="editRoute(route)"
                        >
                          <i class="feather icon-edit"></i> Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Route Button -->
            <div v-if="routes.length > 0" class="text-center mt-4">
              <button
                class="btn btn-primary"
                @click="showAddRouteModal = true"
              >
                <i class="feather icon-plus"></i> Create New Route
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Route Modal -->
    <b-modal
      v-model="showAddRouteModal"
      title="Create New Route"
      size="lg"
      :ok-title="submitting ? 'Creating...' : 'Create Route'"
      :ok-disabled="submitting"
      @ok="addRoute"
      @cancel="resetRouteForm"
    >
      <form @submit.prevent="addRoute">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Route Name *</label>
              <input
                type="text"
                class="form-control"
                v-model="routeForm.name"
                required
                placeholder="Enter route name"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Status *</label>
              <select class="form-control" v-model="routeForm.status" required>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>From Location *</label>
              <input
                type="text"
                class="form-control"
                v-model="routeForm.from"
                required
                placeholder="Enter starting location"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>To Location *</label>
              <input
                type="text"
                class="form-control"
                v-model="routeForm.to"
                required
                placeholder="Enter destination"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Duration (hours) *</label>
              <input
                type="number"
                class="form-control"
                v-model="routeForm.duration"
                required
                min="1"
                placeholder="Enter duration in hours"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Fare (₹) *</label>
              <input
                type="number"
                class="form-control"
                v-model="routeForm.fare"
                required
                min="1"
                placeholder="Enter fare amount"
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="routeForm.description"
            placeholder="Enter route description"
          ></textarea>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { operatorService } from "../../services";

export default {
  name: "operatorRoutes",
  data() {
    return {
      loading: true,
      submitting: false,
      showAddRouteModal: false,
      routes: [],
      routeStats: {
        totalRoutes: 0,
        activeRoutes: 0,
        totalTrips: 0,
        totalBookings: 0,
      },
      routeForm: {
        name: "",
        status: "",
        from: "",
        to: "",
        duration: "",
        fare: "",
        description: "",
      },
    };
  },
  async mounted() {
    await this.fetchRoutes();
    await this.fetchRouteStats();
  },
  methods: {
    async fetchRoutes() {
      try {
        this.loading = true;
        // This would be an API call to get operator's routes
        // For now, we'll use mock data
        this.routes = [
          {
            id: 1,
            name: "Mumbai - Delhi Express",
            from: "Mumbai",
            to: "Delhi",
            duration: "12 hours",
            fare: 1500,
            status: "Active",
            buses: 3,
          },
          {
            id: 2,
            name: "Mumbai - Pune Local",
            from: "Mumbai",
            to: "Pune",
            duration: "3 hours",
            fare: 300,
            status: "Active",
            buses: 2,
          },
        ];
      } catch (error) {
        console.error("Error fetching routes:", error);
        this.$toast.open({
          message: "An error occurred while fetching routes",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.loading = false;
      }
    },
    async fetchRouteStats() {
      try {
        const response = await operatorService.getDashboard();
        if (response && response.data && response.data.stats) {
          this.routeStats = {
            totalRoutes: 2,
            activeRoutes: 2,
            totalTrips: 45,
            totalBookings: 120,
          };
        }
      } catch (error) {
        console.error("Error fetching route stats:", error);
      }
    },
    getStatusClass(status) {
      switch (status.toLowerCase()) {
        case "active":
          return "status-active";
        case "inactive":
          return "status-inactive";
        case "maintenance":
          return "status-maintenance";
        default:
          return "status-unknown";
      }
    },
    viewRoute(route) {
      // Navigate to route details page
      this.$router.push(`/operator/route/${route.id}`);
    },
    editRoute(route) {
      // Navigate to route edit page
      this.$router.push(`/operator/route/${route.id}/edit`);
    },
    async addRoute() {
      try {
        this.submitting = true;
        
        // Validate form
        if (!this.routeForm.name || !this.routeForm.status || !this.routeForm.from || !this.routeForm.to || !this.routeForm.duration || !this.routeForm.fare) {
          this.$toast.open({
            message: "Please fill in all required fields",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
          return;
        }

        // This would be an API call to add a new route
        // For now, we'll add it to the local array
        const newRoute = {
          id: Date.now(),
          ...this.routeForm,
          buses: 1,
        };
        
        this.routes.push(newRoute);
        this.routeStats.totalRoutes++;
        if (newRoute.status === "Active") {
          this.routeStats.activeRoutes++;
        }
        
        this.$toast.open({
          message: "Route created successfully",
          type: "success",
          position: "top-right",
          duration: 3000,
        });
        
        this.showAddRouteModal = false;
        this.resetRouteForm();
      } catch (error) {
        console.error("Error adding route:", error);
        this.$toast.open({
          message: "An error occurred while creating route",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.submitting = false;
      }
    },
    resetRouteForm() {
      this.routeForm = {
        name: "",
        status: "",
        from: "",
        to: "",
        duration: "",
        fare: "",
        description: "",
      };
    },
  },
};
</script>

<style scoped>
.operator-routes {
  padding: 20px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.stat-icon i {
  font-size: 24px;
  color: white;
}

.stat-content h3 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
}

.stat-content p {
  margin: 0;
  color: #7f8c8d;
  font-size: 14px;
}

.route-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.route-card:hover {
  transform: translateY(-5px);
}

.route-header {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.route-name {
  margin: 0;
  font-weight: 600;
  font-size: 16px;
}

.route-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.status-inactive {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.status-maintenance {
  background-color: rgba(255, 193, 7, 0.3);
  color: white;
}

.status-unknown {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.route-content {
  padding: 20px;
}

.route-path {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.path-point {
  display: flex;
  align-items: center;
  flex: 1;
}

.path-point i {
  margin-right: 8px;
  color: #3498db;
}

.path-line {
  margin: 0 15px;
  color: #3498db;
}

.route-details {
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #2c3e50;
}

.detail-item i {
  margin-right: 8px;
  width: 16px;
  color: #3498db;
}

.route-actions {
  display: flex;
  gap: 10px;
}

.btn {
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 11px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 5px;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  font-size: 14px;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border-radius: 15px 15px 0 0;
  padding: 20px;
}

.card-header h5 {
  margin: 0;
  font-weight: 600;
}

.card-body {
  padding: 30px;
}

.text-center {
  text-align: center;
}

.py-5 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
