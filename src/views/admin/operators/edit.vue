<template>
  <div>
    <section class="forms">
      <div class="row">
        <div class="col-lg-12">
          <Breadcrumb :breadcrumbs="breadcrumbs" />
        </div>
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Edit Operator</h4>
              <form @submit.prevent="handleSubmit" class="forms-sample">
                <div class="row">
                  <!-- Company Information -->
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="companyName"
                        >Company Name <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="companyName"
                        v-model="form.companyName"
                        placeholder="Enter company name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="companyCode"
                        >Company Code <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="companyCode"
                        v-model="form.companyCode"
                        placeholder="Enter company code"
                        required
                        @input="
                          form.companyCode = form.companyCode.toUpperCase()
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="businessType"
                        >Business Type <span class="text-danger">*</span></label
                      >
                      <select
                        class="form-control"
                        id="businessType"
                        v-model="form.businessType"
                        required
                      >
                        <option value="">Select Business Type</option>
                        <option value="Private">Private</option>
                        <option value="Government">Government</option>
                        <option value="Semi-Government">Semi-Government</option>
                        <option value="Cooperative">Cooperative</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email"
                        >Email <span class="text-danger">*</span></label
                      >
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="form.email"
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>

                  <!-- Contact Information -->
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phone"
                        >Phone <span class="text-danger">*</span></label
                      >
                      <input
                        type="tel"
                        class="form-control"
                        id="phone"
                        v-model="form.phone"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="countryCode">Country Code</label>
                      <input
                        type="text"
                        class="form-control"
                        id="countryCode"
                        v-model="form.countryCode"
                        placeholder="+91"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="alternatePhone">Alternate Phone</label>
                      <input
                        type="tel"
                        class="form-control"
                        id="alternatePhone"
                        v-model="form.alternatePhone"
                        placeholder="Enter alternate phone number"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="website">Website</label>
                      <input
                        type="url"
                        class="form-control"
                        id="website"
                        v-model="form.website"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <!-- Address Information -->
                  <div class="col-12">
                    <h5 class="mb-3">Address Information</h5>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="street">Street</label>
                      <input
                        type="text"
                        class="form-control"
                        id="street"
                        v-model="form.address.street"
                        placeholder="Enter street address"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="city">City</label>
                      <input
                        type="text"
                        class="form-control"
                        id="city"
                        v-model="form.address.city"
                        placeholder="Enter city"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="state">State</label>
                      <input
                        type="text"
                        class="form-control"
                        id="state"
                        v-model="form.address.state"
                        placeholder="Enter state"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="pincode">Pincode</label>
                      <input
                        type="text"
                        class="form-control"
                        id="pincode"
                        v-model="form.address.pincode"
                        placeholder="Enter pincode"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="country">Country</label>
                      <input
                        type="text"
                        class="form-control"
                        id="country"
                        v-model="form.address.country"
                        placeholder="Enter country"
                      />
                    </div>
                  </div>

                  <!-- Business Details -->
                  <div class="col-12">
                    <h5 class="mb-3">Business Details</h5>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="registrationNumber"
                        >Registration Number
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="registrationNumber"
                        v-model="form.registrationNumber"
                        placeholder="Enter registration number"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="gstNumber">GST Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="gstNumber"
                        v-model="form.gstNumber"
                        placeholder="Enter GST number"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="panNumber">PAN Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="panNumber"
                        v-model="form.panNumber"
                        placeholder="Enter PAN number"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="licenseNumber"
                        >License Number
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="licenseNumber"
                        v-model="form.licenseNumber"
                        placeholder="Enter license number"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="licenseExpiryDate"
                        >License Expiry Date
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="date"
                        class="form-control"
                        id="licenseExpiryDate"
                        v-model="form.licenseExpiryDate"
                        required
                      />
                    </div>
                  </div>

                  <!-- Contact Person -->
                  <div class="col-12">
                    <h5 class="mb-3">Contact Person</h5>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="contactPersonName"
                        >Contact Person Name
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="contactPersonName"
                        v-model="form.contactPerson.name"
                        placeholder="Enter contact person name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="contactPersonDesignation">Designation</label>
                      <input
                        type="text"
                        class="form-control"
                        id="contactPersonDesignation"
                        v-model="form.contactPerson.designation"
                        placeholder="Enter designation"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="contactPersonPhone"
                        >Contact Person Phone
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="tel"
                        class="form-control"
                        id="contactPersonPhone"
                        v-model="form.contactPerson.phone"
                        placeholder="Enter contact person phone"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="contactPersonEmail"
                        >Contact Person Email
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="email"
                        class="form-control"
                        id="contactPersonEmail"
                        v-model="form.contactPerson.email"
                        placeholder="Enter contact person email"
                        required
                      />
                    </div>
                  </div>

                  <!-- Account Settings -->
                  <div class="col-12">
                    <h5 class="mb-3">Account Settings</h5>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="form.password"
                        placeholder="Leave blank to keep current password"
                        minlength="6"
                      />
                      <small class="form-text text-muted"
                        >Leave blank to keep current password</small
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="status">Status</label>
                      <select
                        class="form-control"
                        id="status"
                        v-model="form.status"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <!-- Fleet Settings -->
                  <div class="col-12">
                    <h5 class="mb-3">Fleet Settings</h5>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="fleetSize">Fleet Size</label>
                      <input
                        type="number"
                        class="form-control"
                        id="fleetSize"
                        v-model="form.fleetSize"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="maxFleetSize">Max Fleet Size</label>
                      <input
                        type="number"
                        class="form-control"
                        id="maxFleetSize"
                        v-model="form.maxFleetSize"
                        placeholder="100"
                        min="1"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="maxNoOfSeats">Max Number of Seats</label>
                      <input
                        type="number"
                        class="form-control"
                        id="maxNoOfSeats"
                        v-model="form.maxNoOfSeats"
                        placeholder="50"
                        min="1"
                        max="100"
                      />
                    </div>
                  </div>

                  <!-- Commission & Payment -->
                  <div class="col-12">
                    <h5 class="mb-3">Commission & Payment</h5>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="commissionRate">Commission Rate (%)</label>
                      <input
                        type="number"
                        class="form-control"
                        id="commissionRate"
                        v-model="form.commissionRate"
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="paymentTerms">Payment Terms</label>
                      <select
                        class="form-control"
                        id="paymentTerms"
                        v-model="form.paymentTerms"
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    </div>
                  </div>

                  <!-- Additional Information -->
                  <div class="col-12">
                    <h5 class="mb-3">Additional Information</h5>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="description">Description</label>
                      <textarea
                        class="form-control"
                        id="description"
                        v-model="form.description"
                        rows="3"
                        placeholder="Enter description"
                      ></textarea>
                    </div>
                  </div>

                  <!-- Social Media -->
                  <div class="col-12">
                    <h5 class="mb-3">Social Media</h5>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="facebook">Facebook</label>
                      <input
                        type="url"
                        class="form-control"
                        id="facebook"
                        v-model="form.socialMedia.facebook"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="twitter">Twitter</label>
                      <input
                        type="url"
                        class="form-control"
                        id="twitter"
                        v-model="form.socialMedia.twitter"
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="instagram">Instagram</label>
                      <input
                        type="url"
                        class="form-control"
                        id="instagram"
                        v-model="form.socialMedia.instagram"
                        placeholder="https://instagram.com/yourhandle"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="linkedin">LinkedIn</label>
                      <input
                        type="url"
                        class="form-control"
                        id="linkedin"
                        v-model="form.socialMedia.linkedin"
                        placeholder="https://linkedin.com/company/yourcompany"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group text-center">
                  <button
                    type="submit"
                    class="btn btn-primary mr-2"
                    :disabled="loading"
                  >
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm mr-2"
                    ></span>
                    {{ loading ? "Updating..." : "Update Operator" }}
                  </button>
                  <router-link to="/operators" class="btn btn-light">
                    Cancel
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Breadcrumb from "../../../components/breadcrumb";
import { operatorService } from "../../../services";

export default {
  name: "operatorEdit",
  data() {
    return {
      loading: false,
      operatorId: null,
      breadcrumbs: {
        title: "Edit Operator",
        b1: "Manage Operators",
        b2: "Operators",
        b3: "Edit",
        link: true,
        name: "Edit Operator",
      },
      form: {
        companyName: "",
        companyCode: "",
        businessType: "",
        email: "",
        phone: "",
        countryCode: "91",
        alternatePhone: "",
        website: "",
        address: {
          street: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
        },
        registrationNumber: "",
        gstNumber: "",
        panNumber: "",
        licenseNumber: "",
        licenseExpiryDate: "",
        contactPerson: {
          name: "",
          designation: "",
          phone: "",
          email: "",
        },
        password: "",
        status: "Pending",
        fleetSize: 0,
        maxFleetSize: 100,
        maxNoOfSeats: 50,
        commissionRate: 0,
        paymentTerms: "Weekly",
        description: "",
        socialMedia: {
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
        },
      },
    };
  },
  components: {
    Breadcrumb,
  },
  async mounted() {
    this.operatorId = this.$route.params.id;
    await this.fetchOperator();
  },
  methods: {
    async fetchOperator() {
      try {
        const response = await operatorService.getById(this.operatorId);

        if (response.status && response.data) {
          const operator = response.data;

          // Populate form with operator data
          this.form = {
            companyName: operator.companyName || "",
            companyCode: operator.companyCode || "",
            businessType: operator.businessType || "",
            email: operator.email || "",
            phone: operator.phone || "",
            countryCode: operator.countryCode || "91",
            alternatePhone: operator.alternatePhone || "",
            website: operator.website || "",
            address: {
              street: operator.address?.street || "",
              city: operator.address?.city || "",
              state: operator.address?.state || "",
              pincode: operator.address?.pincode || "",
              country: operator.address?.country || "India",
            },
            registrationNumber: operator.registrationNumber || "",
            gstNumber: operator.gstNumber || "",
            panNumber: operator.panNumber || "",
            licenseNumber: operator.licenseNumber || "",
            licenseExpiryDate: operator.licenseExpiryDate
              ? new Date(operator.licenseExpiryDate).toISOString().split("T")[0]
              : "",
            contactPerson: {
              name: operator.contactPerson?.name || "",
              designation: operator.contactPerson?.designation || "",
              phone: operator.contactPerson?.phone || "",
              email: operator.contactPerson?.email || "",
            },
            password: "", // Don't populate password
            status: operator.status || "Pending",
            fleetSize: operator.fleetSize || 0,
            maxFleetSize: operator.maxFleetSize || 100,
            maxNoOfSeats: operator.maxNoOfSeats || 50,
            commissionRate: operator.commissionRate || 0,
            paymentTerms: operator.paymentTerms || "Weekly",
            description: operator.description || "",
            socialMedia: {
              facebook: operator.socialMedia?.facebook || "",
              twitter: operator.socialMedia?.twitter || "",
              instagram: operator.socialMedia?.instagram || "",
              linkedin: operator.socialMedia?.linkedin || "",
            },
          };
        } else {
          this.$toast.open({
            message: "Failed to fetch operator details",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
          this.$router.push("/operators");
        }
      } catch (error) {
        console.error("Error fetching operator:", error);
        this.$toast.open({
          message: "An error occurred while fetching operator details",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
        this.$router.push("/operators");
      }
    },
    async handleSubmit() {
      this.loading = true;
      try {
        // Remove empty password from update data
        const updateData = { ...this.form };
        if (!updateData.password) {
          delete updateData.password;
        }

        const response = await operatorService.update(
          this.operatorId,
          updateData
        );

        if (response.status) {
          this.$toast.open({
            message: response.message,
            type: "success",
            position: "top-right",
            duration: 3000,
          });
          this.$router.push("/operators");
        } else {
          this.$toast.open({
            message: response.message || "Failed to update operator",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error updating operator:", error);
        this.$toast.open({
          message: "An error occurred while updating the operator",
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
.form-control {
  height: 40px !important;
}

textarea.form-control {
  height: auto !important;
}

.text-danger {
  color: #dc3545 !important;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>
