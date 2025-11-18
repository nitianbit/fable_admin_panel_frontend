<template>
  <div class="operator-buses">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h5>My Buses</h5>
            <p class="text-muted">Manage your fleet of buses</p>
          </div>
          <div class="card-body">
            <!-- Fleet Statistics -->
            <div class="row mb-4">
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-bus"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ fleetStats.totalBuses || 0 }}</h3>
                    <p>Total Buses</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-check-circle"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ fleetStats.activeBuses || 0 }}</h3>
                    <p>Active Buses</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-users"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ fleetStats.maxNoOfSeats || 0 }}</h3>
                    <p>Max Seats</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-trending-up"></i>
                  </div>
                  <div class="stat-content">
                    <h3>
                      {{ fleetStats.fleetSize || 0 }}/{{
                        fleetStats.maxFleetSize || 0
                      }}
                    </h3>
                    <p>Fleet Size</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bus List -->
            <div class="bus-list">
              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <p class="mt-3">Loading buses...</p>
              </div>

              <div v-else-if="buses.length === 0" class="text-center py-5">
                <i
                  class="feather icon-bus"
                  style="font-size: 48px; color: #ccc"
                ></i>
                <h5 class="mt-3">No Buses Found</h5>
                <p class="text-muted">
                  You haven't added any buses to your fleet yet.
                </p>
                <button class="btn btn-primary" @click="showAddBusModal = true">
                  <i class="feather icon-plus"></i> Add Your First Bus
                </button>
              </div>

              <div v-else class="row">
                <div
                  v-for="bus in buses"
                  :key="bus.id"
                  class="col-md-6 col-lg-4 mb-4"
                >
                  <div class="bus-card">
                    <div class="bus-image">
                      <img
                        :src="bus.image || '/default-bus.jpg'"
                        :alt="bus.name"
                        class="img-fluid"
                      />
                      <div
                        class="bus-status"
                        :class="getStatusClass(bus.status)"
                      >
                        {{ bus.status }}
                      </div>
                    </div>
                    <div class="bus-content">
                      <h6 class="bus-name">{{ bus.name }}</h6>
                      <p class="bus-type">{{ bus.type }}</p>
                      <div class="bus-details">
                        <div class="detail-item">
                          <i class="feather icon-users"></i>
                          <span>{{ bus.seats }} Seats</span>
                        </div>
                        <div class="detail-item">
                          <i class="feather icon-map-pin"></i>
                          <span>{{ bus.route || "No Route" }}</span>
                        </div>
                      </div>
                      <div class="bus-actions">
                        <button
                          class="btn btn-sm btn-outline-primary"
                          @click="viewBus(bus)"
                        >
                          <i class="feather icon-eye"></i> View
                        </button>
                        <button
                          class="btn btn-sm btn-outline-secondary"
                          @click="editBus(bus)"
                        >
                          <i class="feather icon-edit"></i> Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Bus Button -->
            <div v-if="buses.length > 0" class="text-center mt-4">
              <button class="btn btn-primary" @click="showAddBusModal = true">
                <i class="feather icon-plus"></i> Add New Bus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Bus Modal -->
    <b-modal
      v-model="showAddBusModal"
      title="Add New Bus"
      size="lg"
      :ok-title="submitting ? 'Adding...' : 'Add Bus'"
      :ok-disabled="submitting"
      @ok="addBus"
      @cancel="resetBusForm"
    >
      <form @submit.prevent="addBus">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Bus Name *</label>
              <input
                type="text"
                class="form-control"
                v-model="busForm.name"
                required
                placeholder="Enter bus name"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Bus Type *</label>
              <select class="form-control" v-model="busForm.type" required>
                <option value="">Select Bus Type</option>
                <option value="AC">AC Bus</option>
                <option value="Non-AC">Non-AC Bus</option>
                <option value="Sleeper">Sleeper Bus</option>
                <option value="Semi-Sleeper">Semi-Sleeper Bus</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Number of Seats *</label>
              <input
                type="number"
                class="form-control"
                v-model="busForm.seats"
                required
                min="1"
                :max="fleetStats.maxNoOfSeats"
                placeholder="Enter number of seats"
              />
              <small class="form-text text-muted">
                Maximum allowed: {{ fleetStats.maxNoOfSeats }} seats
              </small>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Registration Number *</label>
              <input
                type="text"
                class="form-control"
                v-model="busForm.registrationNumber"
                required
                placeholder="Enter registration number"
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="busForm.description"
            placeholder="Enter bus description"
          ></textarea>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { operatorService } from "../../services";

export default {
  name: "operatorBuses",
  data() {
    return {
      loading: true,
      submitting: false,
      showAddBusModal: false,
      buses: [],
      fleetStats: {
        totalBuses: 0,
        activeBuses: 0,
        fleetSize: 0,
        maxFleetSize: 0,
        maxNoOfSeats: 0,
      },
      busForm: {
        name: "",
        type: "",
        seats: "",
        registrationNumber: "",
        description: "",
      },
    };
  },
  async mounted() {
    await this.fetchBuses();
    await this.fetchFleetStats();
  },
  methods: {
    async fetchBuses() {
      try {
        this.loading = true;
        // This would be an API call to get operator's buses
        // For now, we'll use mock data
        this.buses = [
          {
            id: 1,
            name: "City Express 1",
            type: "AC",
            seats: 45,
            status: "Active",
            route: "Mumbai - Delhi",
            image: "/bus1.jpg",
          },
          {
            id: 2,
            name: "City Express 2",
            type: "Non-AC",
            seats: 50,
            status: "Maintenance",
            route: "Mumbai - Pune",
            image: "/bus2.jpg",
          },
        ];
      } catch (error) {
        console.error("Error fetching buses:", error);
        this.$toast.open({
          message: "An error occurred while fetching buses",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.loading = false;
      }
    },
    async fetchFleetStats() {
      try {
        const response = await operatorService.getDashboard();
        if (response && response.data && response.data.stats) {
          this.fleetStats = response.data.stats;
        }
      } catch (error) {
        console.error("Error fetching fleet stats:", error);
      }
    },
    getStatusClass(status) {
      switch (status.toLowerCase()) {
        case "active":
          return "status-active";
        case "maintenance":
          return "status-maintenance";
        case "inactive":
          return "status-inactive";
        default:
          return "status-unknown";
      }
    },
    viewBus(bus) {
      // Navigate to bus details page
      this.$router.push(`/operator/bus/${bus.id}`);
    },
    editBus(bus) {
      // Navigate to bus edit page
      this.$router.push(`/operator/bus/${bus.id}/edit`);
    },
    async addBus() {
      try {
        this.submitting = true;

        // Validate form
        if (
          !this.busForm.name ||
          !this.busForm.type ||
          !this.busForm.seats ||
          !this.busForm.registrationNumber
        ) {
          this.$toast.open({
            message: "Please fill in all required fields",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
          return;
        }

        // This would be an API call to add a new bus
        // For now, we'll add it to the local array
        const newBus = {
          id: Date.now(),
          ...this.busForm,
          status: "Active",
          route: "No Route",
          image: "/default-bus.jpg",
        };

        this.buses.push(newBus);
        this.fleetStats.totalBuses++;
        this.fleetStats.activeBuses++;
        this.fleetStats.fleetSize++;

        this.$toast.open({
          message: "Bus added successfully",
          type: "success",
          position: "top-right",
          duration: 3000,
        });

        this.showAddBusModal = false;
        this.resetBusForm();
      } catch (error) {
        console.error("Error adding bus:", error);
        this.$toast.open({
          message: "An error occurred while adding bus",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.submitting = false;
      }
    },
    resetBusForm() {
      this.busForm = {
        name: "",
        type: "",
        seats: "",
        registrationNumber: "",
        description: "",
      };
    },
  },
};
</script>

<style scoped>
.operator-buses {
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

.bus-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.bus-card:hover {
  transform: translateY(-5px);
}

.bus-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.bus-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bus-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-active {
  background-color: #d4edda;
  color: #155724;
}

.status-maintenance {
  background-color: #fff3cd;
  color: #856404;
}

.status-inactive {
  background-color: #f8d7da;
  color: #721c24;
}

.status-unknown {
  background-color: #e2e3e5;
  color: #383d41;
}

.bus-content {
  padding: 20px;
}

.bus-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.bus-type {
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 15px;
}

.bus-details {
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 14px;
  color: #2c3e50;
}

.detail-item i {
  margin-right: 8px;
  width: 16px;
  color: #3498db;
}

.bus-actions {
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

.form-text {
  font-size: 12px;
  color: #6c757d;
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
