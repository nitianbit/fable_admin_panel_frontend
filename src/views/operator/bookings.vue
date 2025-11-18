<template>
  <div class="operator-bookings">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h5>Bookings Management</h5>
            <p class="text-muted">View and manage your bus bookings</p>
          </div>
          <div class="card-body">
            <!-- Booking Statistics -->
            <div class="row mb-4">
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-calendar"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ bookingStats.totalBookings || 0 }}</h3>
                    <p>Total Bookings</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-check-circle"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ bookingStats.confirmedBookings || 0 }}</h3>
                    <p>Confirmed</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-clock"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ bookingStats.pendingBookings || 0 }}</h3>
                    <p>Pending</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="feather icon-dollar-sign"></i>
                  </div>
                  <div class="stat-content">
                    <h3>₹{{ bookingStats.totalRevenue || 0 }}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Filters -->
            <div class="filters-section mb-4">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Status</label>
                    <select
                      class="form-control"
                      v-model="filters.status"
                      @change="filterBookings"
                    >
                      <option value="">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Date Range</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="filters.date"
                      @change="filterBookings"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Search</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="filters.search"
                      @input="filterBookings"
                      placeholder="Search by booking ID, customer name..."
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>&nbsp;</label>
                    <button
                      class="btn btn-outline-secondary btn-block"
                      @click="resetFilters"
                    >
                      <i class="feather icon-refresh-cw"></i> Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bookings Table -->
            <div class="bookings-table">
              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <p class="mt-3">Loading bookings...</p>
              </div>

              <div
                v-else-if="filteredBookings.length === 0"
                class="text-center py-5"
              >
                <i
                  class="feather icon-calendar"
                  style="font-size: 48px; color: #ccc"
                ></i>
                <h5 class="mt-3">No Bookings Found</h5>
                <p class="text-muted">
                  No bookings match your current filters.
                </p>
              </div>

              <div v-else class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer</th>
                      <th>Route</th>
                      <th>Bus</th>
                      <th>Date & Time</th>
                      <th>Seats</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="booking in filteredBookings" :key="booking.id">
                      <td>
                        <span class="booking-id">#{{ booking.id }}</span>
                      </td>
                      <td>
                        <div class="customer-info">
                          <strong>{{ booking.customerName }}</strong>
                          <br />
                          <small class="text-muted">{{
                            booking.customerPhone
                          }}</small>
                        </div>
                      </td>
                      <td>
                        <div class="route-info">
                          <strong>{{ booking.from }} → {{ booking.to }}</strong>
                          <br />
                          <small class="text-muted">{{
                            booking.duration
                          }}</small>
                        </div>
                      </td>
                      <td>
                        <div class="bus-info">
                          <strong>{{ booking.busName }}</strong>
                          <br />
                          <small class="text-muted">{{
                            booking.busType
                          }}</small>
                        </div>
                      </td>
                      <td>
                        <div class="datetime-info">
                          <strong>{{ formatDate(booking.travelDate) }}</strong>
                          <br />
                          <small class="text-muted">{{
                            booking.departureTime
                          }}</small>
                        </div>
                      </td>
                      <td>
                        <span class="seats-info">{{
                          booking.seats.join(", ")
                        }}</span>
                      </td>
                      <td>
                        <span class="amount">₹{{ booking.totalAmount }}</span>
                      </td>
                      <td>
                        <span
                          class="status-badge"
                          :class="getStatusClass(booking.status)"
                        >
                          {{ booking.status }}
                        </span>
                      </td>
                      <td>
                        <div class="action-buttons">
                          <button
                            class="btn btn-sm btn-outline-primary"
                            @click="viewBooking(booking)"
                            title="View Details"
                          >
                            <i class="feather icon-eye"></i>
                          </button>
                          <button
                            v-if="booking.status === 'pending'"
                            class="btn btn-sm btn-outline-success"
                            @click="confirmBooking(booking)"
                            title="Confirm Booking"
                          >
                            <i class="feather icon-check"></i>
                          </button>
                          <button
                            v-if="booking.status === 'confirmed'"
                            class="btn btn-sm btn-outline-warning"
                            @click="cancelBooking(booking)"
                            title="Cancel Booking"
                          >
                            <i class="feather icon-x"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pagination -->
            <div
              v-if="filteredBookings.length > 0"
              class="pagination-section mt-4"
            >
              <nav aria-label="Bookings pagination">
                <ul class="pagination justify-content-center">
                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === 1 }"
                  >
                    <button
                      class="page-link"
                      @click="changePage(currentPage - 1)"
                    >
                      Previous
                    </button>
                  </li>
                  <li
                    v-for="page in totalPages"
                    :key="page"
                    class="page-item"
                    :class="{ active: page === currentPage }"
                  >
                    <button class="page-link" @click="changePage(page)">
                      {{ page }}
                    </button>
                  </li>
                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === totalPages }"
                  >
                    <button
                      class="page-link"
                      @click="changePage(currentPage + 1)"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
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
  name: "operatorBookings",
  data() {
    return {
      loading: true,
      bookings: [],
      filteredBookings: [],
      bookingStats: {
        totalBookings: 0,
        confirmedBookings: 0,
        pendingBookings: 0,
        totalRevenue: 0,
      },
      filters: {
        status: "",
        date: "",
        search: "",
      },
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
    };
  },
  async mounted() {
    await this.fetchBookings();
    await this.fetchBookingStats();
  },
  methods: {
    async fetchBookings() {
      try {
        this.loading = true;
        // This would be an API call to get operator's bookings
        // For now, we'll use mock data
        this.bookings = [
          {
            id: "BK001",
            customerName: "John Doe",
            customerPhone: "9876543210",
            from: "Mumbai",
            to: "Delhi",
            duration: "12 hours",
            busName: "City Express 1",
            busType: "AC",
            travelDate: "2024-01-20",
            departureTime: "22:00",
            seats: ["A1", "A2"],
            totalAmount: 3000,
            status: "confirmed",
          },
          {
            id: "BK002",
            customerName: "Jane Smith",
            customerPhone: "9876543211",
            from: "Mumbai",
            to: "Pune",
            duration: "3 hours",
            busName: "City Express 2",
            busType: "Non-AC",
            travelDate: "2024-01-21",
            departureTime: "08:00",
            seats: ["B1"],
            totalAmount: 300,
            status: "pending",
          },
        ];
        this.filteredBookings = [...this.bookings];
        this.calculatePagination();
      } catch (error) {
        console.error("Error fetching bookings:", error);
        this.$toast.open({
          message: "An error occurred while fetching bookings",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.loading = false;
      }
    },
    async fetchBookingStats() {
      try {
        const response = await operatorService.getDashboard();
        if (response && response.data && response.data.stats) {
          this.bookingStats = {
            totalBookings: 25,
            confirmedBookings: 20,
            pendingBookings: 3,
            totalRevenue: 45000,
          };
        }
      } catch (error) {
        console.error("Error fetching booking stats:", error);
      }
    },
    filterBookings() {
      let filtered = [...this.bookings];

      // Filter by status
      if (this.filters.status) {
        filtered = filtered.filter(
          (booking) =>
            booking.status.toLowerCase() === this.filters.status.toLowerCase()
        );
      }

      // Filter by date
      if (this.filters.date) {
        filtered = filtered.filter(
          (booking) => booking.travelDate === this.filters.date
        );
      }

      // Filter by search term
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase();
        filtered = filtered.filter(
          (booking) =>
            booking.id.toLowerCase().includes(searchTerm) ||
            booking.customerName.toLowerCase().includes(searchTerm) ||
            booking.customerPhone.includes(searchTerm)
        );
      }

      this.filteredBookings = filtered;
      this.currentPage = 1;
      this.calculatePagination();
    },
    resetFilters() {
      this.filters = {
        status: "",
        date: "",
        search: "",
      };
      this.filteredBookings = [...this.bookings];
      this.currentPage = 1;
      this.calculatePagination();
    },
    calculatePagination() {
      this.totalPages = Math.ceil(
        this.filteredBookings.length / this.itemsPerPage
      );
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    getStatusClass(status) {
      switch (status.toLowerCase()) {
        case "confirmed":
          return "status-confirmed";
        case "pending":
          return "status-pending";
        case "cancelled":
          return "status-cancelled";
        case "completed":
          return "status-completed";
        default:
          return "status-unknown";
      }
    },
    formatDate(date) {
      return moment(date).format("MMM DD, YYYY");
    },
    viewBooking(booking) {
      // Navigate to booking details page
      this.$router.push(`/operator/booking/${booking.id}`);
    },
    async confirmBooking(booking) {
      try {
        // This would be an API call to confirm the booking
        booking.status = "confirmed";
        this.bookingStats.confirmedBookings++;
        this.bookingStats.pendingBookings--;

        this.$toast.open({
          message: "Booking confirmed successfully",
          type: "success",
          position: "top-right",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error confirming booking:", error);
        this.$toast.open({
          message: "An error occurred while confirming booking",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      }
    },
    async cancelBooking(booking) {
      if (confirm("Are you sure you want to cancel this booking?")) {
        try {
          // This would be an API call to cancel the booking
          booking.status = "cancelled";
          this.bookingStats.confirmedBookings--;

          this.$toast.open({
            message: "Booking cancelled successfully",
            type: "success",
            position: "top-right",
            duration: 3000,
          });
        } catch (error) {
          console.error("Error cancelling booking:", error);
          this.$toast.open({
            message: "An error occurred while cancelling booking",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.operator-bookings {
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

.filters-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 0;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 5px;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 10px 15px;
  font-size: 14px;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table th {
  background: #f8f9fa;
  border: none;
  font-weight: 600;
  color: #2c3e50;
  padding: 15px;
}

.table td {
  border: none;
  padding: 15px;
  vertical-align: middle;
}

.booking-id {
  font-weight: 600;
  color: #3498db;
}

.customer-info strong {
  color: #2c3e50;
}

.route-info strong {
  color: #2c3e50;
}

.bus-info strong {
  color: #2c3e50;
}

.datetime-info strong {
  color: #2c3e50;
}

.seats-info {
  font-weight: 500;
  color: #2c3e50;
}

.amount {
  font-weight: 600;
  color: #27ae60;
  font-size: 16px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-confirmed {
  background-color: #d4edda;
  color: #155724;
}

.status-pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.status-completed {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-unknown {
  background-color: #e2e3e5;
  color: #383d41;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.btn {
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 11px;
}

.pagination {
  margin: 0;
}

.page-link {
  border-radius: 8px;
  margin: 0 2px;
  border: 1px solid #e0e0e0;
  color: #3498db;
}

.page-link:hover {
  background-color: #3498db;
  border-color: #3498db;
  color: white;
}

.page-item.active .page-link {
  background-color: #3498db;
  border-color: #3498db;
}

.page-item.disabled .page-link {
  color: #6c757d;
  background-color: #f8f9fa;
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
