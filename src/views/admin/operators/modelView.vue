<template>
  <div class="operator-details">
    <div class="row">
      <!-- Company Information -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="mdi mdi-domain"></i> Company Information
            </h5>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Company Name:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.companyName || "N/A" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Company Code:</strong>
              </div>
              <div class="col-sm-8">
                <b-badge variant="info">{{
                  modalData.companyCode || "N/A"
                }}</b-badge>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Business Type:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.businessType || "N/A" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Registration Number:</strong>
              </div>
              <div class="col-sm-8">
                {{ modalData.registrationNumber || "N/A" }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>GST Number:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.gstNumber || "N/A" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>PAN Number:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.panNumber || "N/A" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>License Number:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.licenseNumber || "N/A" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>License Expiry:</strong>
              </div>
              <div class="col-sm-8">
                <span
                  :class="getLicenseExpiryClass(modalData.licenseExpiryDate)"
                >
                  {{ formatDate(modalData.licenseExpiryDate) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="mdi mdi-account"></i> Contact Information
            </h5>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Email:</strong>
              </div>
              <div class="col-sm-8">
                <a :href="'mailto:' + modalData.email">{{
                  modalData.email || "N/A"
                }}</a>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Phone:</strong>
              </div>
              <div class="col-sm-8">
                <a :href="'tel:' + modalData.phone">
                  {{ modalData.countryCode || "+91" }}
                  {{ modalData.phone || "N/A" }}
                </a>
              </div>
            </div>
            <div class="row mb-3" v-if="modalData.alternatePhone">
              <div class="col-sm-4">
                <strong>Alternate Phone:</strong>
              </div>
              <div class="col-sm-8">
                <a :href="'tel:' + modalData.alternatePhone">
                  {{ modalData.countryCode || "+91" }}
                  {{ modalData.alternatePhone }}
                </a>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Website:</strong>
              </div>
              <div class="col-sm-8">
                <a
                  v-if="modalData.website"
                  :href="modalData.website"
                  target="_blank"
                >
                  {{ modalData.website }}
                </a>
                <span v-else>N/A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Person -->
      <div class="col-md-6" v-if="modalData.contactPerson">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="mdi mdi-account-circle"></i> Contact Person
            </h5>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Name:</strong>
              </div>
              <div class="col-sm-8">
                {{ modalData.contactPerson.name || "N/A" }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Designation:</strong>
              </div>
              <div class="col-sm-8">
                {{ modalData.contactPerson.designation || "N/A" }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Phone:</strong>
              </div>
              <div class="col-sm-8">
                <a :href="'tel:' + modalData.contactPerson.phone">
                  {{ modalData.contactPerson.phone || "N/A" }}
                </a>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Email:</strong>
              </div>
              <div class="col-sm-8">
                <a :href="'mailto:' + modalData.contactPerson.email">
                  {{ modalData.contactPerson.email || "N/A" }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Address Information -->
      <div class="col-md-6" v-if="modalData.address">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="mdi mdi-map-marker"></i> Address
            </h5>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Street:</strong>
              </div>
              <div class="col-sm-8">
                {{ modalData.address.street || "N/A" }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>City:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.address.city || "N/A" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>State:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.address.state || "N/A" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Pincode:</strong>
              </div>
              <div class="col-sm-8">
                {{ modalData.address.pincode || "N/A" }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Country:</strong>
              </div>
              <div class="col-sm-8">
                {{ modalData.address.country || "N/A" }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fleet & Business Information -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="mdi mdi-bus"></i> Fleet & Business
            </h5>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Fleet Size:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.fleetSize || 0 }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Max Fleet Size:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.maxFleetSize || 0 }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Max Seats:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.maxNoOfSeats || 0 }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Commission Rate:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.commissionRate || 0 }}%</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Payment Terms:</strong>
              </div>
              <div class="col-sm-8">{{ modalData.paymentTerms || "N/A" }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Status & Verification -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="mdi mdi-information"></i> Status & Verification
            </h5>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Status:</strong>
              </div>
              <div class="col-sm-8">
                <b-badge :variant="getStatusVariant(modalData.status)">
                  {{ modalData.status || "N/A" }}
                </b-badge>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Verified:</strong>
              </div>
              <div class="col-sm-8">
                <b-badge
                  :variant="modalData.isVerified ? 'success' : 'warning'"
                >
                  {{ modalData.isVerified ? "Yes" : "No" }}
                </b-badge>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Created At:</strong>
              </div>
              <div class="col-sm-8">{{ formatDate(modalData.createdAt) }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Updated At:</strong>
              </div>
              <div class="col-sm-8">{{ formatDate(modalData.updatedAt) }}</div>
            </div>
            <div class="row mb-3" v-if="modalData.verifiedAt">
              <div class="col-sm-4">
                <strong>Verified At:</strong>
              </div>
              <div class="col-sm-8">{{ formatDate(modalData.verifiedAt) }}</div>
            </div>
            <div class="row mb-3" v-if="modalData.lastLoginAt">
              <div class="col-sm-4">
                <strong>Last Login:</strong>
              </div>
              <div class="col-sm-8">
                {{ formatDate(modalData.lastLoginAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="col-12" v-if="modalData.description">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="mdi mdi-text"></i> Description
            </h5>
          </div>
          <div class="card-body">
            <p>{{ modalData.description }}</p>
          </div>
        </div>
      </div>

      <!-- Social Media -->
      <div
        class="col-12"
        v-if="modalData.socialMedia && hasSocialMedia(modalData.socialMedia)"
      >
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="mdi mdi-share-variant"></i> Social Media
            </h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3" v-if="modalData.socialMedia.facebook">
                <a
                  :href="modalData.socialMedia.facebook"
                  target="_blank"
                  class="btn btn-primary btn-sm"
                >
                  <i class="mdi mdi-facebook"></i> Facebook
                </a>
              </div>
              <div class="col-md-3" v-if="modalData.socialMedia.twitter">
                <a
                  :href="modalData.socialMedia.twitter"
                  target="_blank"
                  class="btn btn-info btn-sm"
                >
                  <i class="mdi mdi-twitter"></i> Twitter
                </a>
              </div>
              <div class="col-md-3" v-if="modalData.socialMedia.instagram">
                <a
                  :href="modalData.socialMedia.instagram"
                  target="_blank"
                  class="btn btn-danger btn-sm"
                >
                  <i class="mdi mdi-instagram"></i> Instagram
                </a>
              </div>
              <div class="col-md-3" v-if="modalData.socialMedia.linkedin">
                <a
                  :href="modalData.socialMedia.linkedin"
                  target="_blank"
                  class="btn btn-primary btn-sm"
                >
                  <i class="mdi mdi-linkedin"></i> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "modalView",
  props: {
    modalData: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "N/A";
      return moment(date).format("DD MMM YYYY, hh:mm A");
    },
    getStatusVariant(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Suspended":
          return "danger";
        case "Pending":
          return "warning";
        default:
          return "secondary";
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
    hasSocialMedia(socialMedia) {
      return (
        socialMedia.facebook ||
        socialMedia.twitter ||
        socialMedia.instagram ||
        socialMedia.linkedin
      );
    },
  },
};
</script>

<style scoped>
.operator-details .card {
  margin-bottom: 20px;
}

.operator-details .card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.operator-details .card-title {
  color: #495057;
  font-size: 16px;
}

.operator-details .row {
  margin-bottom: 10px;
}

.operator-details strong {
  color: #495057;
}

.text-danger.font-weight-bold {
  font-weight: bold !important;
}

.text-warning.font-weight-bold {
  font-weight: bold !important;
}
</style>
