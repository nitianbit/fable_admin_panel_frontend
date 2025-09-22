<template>
  <div>
    <section class="forms">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-header">
            <div class="page-header-title">
              <h4 class="m-b-10">Operator Profile</h4>
            </div>
            <ul class="breadcrumb-title">
              <li class="breadcrumb-item">
                <a href="#/operator/dashboard">
                  <i class="feather icon-home"></i>
                </a>
              </li>
              <li class="breadcrumb-item">
                <a href="#!">Profile</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Update Profile</h4>
              <form @submit.prevent="handleSubmit" class="forms-sample">
                <div class="row">
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
                    {{ loading ? "Updating..." : "Update Profile" }}
                  </button>
                  <router-link to="/operator/dashboard" class="btn btn-light">
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
import { operatorService } from "../../services";

export default {
  name: "operatorProfile",
  data() {
    return {
      loading: false,
      form: {
        phone: "",
        alternatePhone: "",
        address: {
          street: "",
          city: "",
          state: "",
          pincode: "",
        },
        contactPerson: {
          name: "",
          designation: "",
          phone: "",
          email: "",
        },
        description: "",
        website: "",
        socialMedia: {
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
        },
      },
    };
  },
  async mounted() {
    await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await operatorService.getProfile();

        if (response.status && response.data) {
          const profile = response.data;

          // Populate form with profile data (only allowed fields)
          this.form = {
            phone: profile.phone || "",
            alternatePhone: profile.alternatePhone || "",
            address: {
              street: profile.address?.street || "",
              city: profile.address?.city || "",
              state: profile.address?.state || "",
              pincode: profile.address?.pincode || "",
            },
            contactPerson: {
              name: profile.contactPerson?.name || "",
              designation: profile.contactPerson?.designation || "",
              phone: profile.contactPerson?.phone || "",
              email: profile.contactPerson?.email || "",
            },
            description: profile.description || "",
            website: profile.website || "",
            socialMedia: {
              facebook: profile.socialMedia?.facebook || "",
              twitter: profile.socialMedia?.twitter || "",
              instagram: profile.socialMedia?.instagram || "",
              linkedin: profile.socialMedia?.linkedin || "",
            },
          };
        } else {
          this.$toast.open({
            message: "Failed to fetch profile data",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        this.$toast.open({
          message: "An error occurred while fetching profile data",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      }
    },
    async handleSubmit() {
      this.loading = true;
      try {
        const response = await operatorService.updateProfile(this.form);

        if (response.status) {
          this.$toast.open({
            message: response.message,
            type: "success",
            position: "top-right",
            duration: 3000,
          });
          this.$router.push("/operator/dashboard");
        } else {
          this.$toast.open({
            message: response.message || "Failed to update profile",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        this.$toast.open({
          message: "An error occurred while updating profile",
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
.forms {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header-title h4 {
  margin-bottom: 10px;
  color: #333;
}

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

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #333;
  margin-bottom: 20px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  padding: 10px 30px;
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

.btn-light {
  border-radius: 8px;
  padding: 10px 30px;
}
</style>
