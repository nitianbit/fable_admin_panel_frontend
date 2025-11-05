<template>
  <div class="operator-profile">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h5>Profile Settings</h5>
            <p class="text-muted">Update your operator profile information</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit" v-if="!loading">
              <div class="row">
                <!-- Company Information -->
                <div class="col-md-6">
                  <h6 class="section-title">Company Information</h6>
                  
                  <div class="form-group">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.companyName"
                      readonly
                      disabled
                    />
                    <small class="form-text text-muted">Company name cannot be changed</small>
                  </div>

                  <div class="form-group">
                    <label>Company Code *</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.companyCode"
                      readonly
                      disabled
                    />
                    <small class="form-text text-muted">Company code cannot be changed</small>
                  </div>

                  <div class="form-group">
                    <label>Business Type *</label>
                    <select class="form-control" v-model="form.businessType" disabled>
                      <option value="Private">Private</option>
                      <option value="Government">Government</option>
                      <option value="Semi-Government">Semi-Government</option>
                      <option value="Cooperative">Cooperative</option>
                    </select>
                    <small class="form-text text-muted">Business type cannot be changed</small>
                  </div>

                  <div class="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="form.email"
                      readonly
                      disabled
                    />
                    <small class="form-text text-muted">Email cannot be changed</small>
                  </div>
                </div>

                <!-- Contact Information -->
                <div class="col-md-6">
                  <h6 class="section-title">Contact Information</h6>
                  
                  <div class="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      class="form-control"
                      v-model="form.phone"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label>Alternate Phone</label>
                    <input
                      type="tel"
                      class="form-control"
                      v-model="form.alternatePhone"
                    />
                  </div>

                  <div class="form-group">
                    <label>Country Code</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.countryCode"
                      readonly
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <!-- Address Information -->
                <div class="col-md-6">
                  <h6 class="section-title">Address Information</h6>
                  
                  <div class="form-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.address.street"
                    />
                  </div>

                  <div class="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.address.city"
                    />
                  </div>

                  <div class="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.address.state"
                    />
                  </div>

                  <div class="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.address.pincode"
                    />
                  </div>
                </div>

                <!-- Contact Person Information -->
                <div class="col-md-6">
                  <h6 class="section-title">Contact Person Information</h6>
                  
                  <div class="form-group">
                    <label>Contact Person Name *</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.contactPerson.name"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label>Designation</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.contactPerson.designation"
                    />
                  </div>

                  <div class="form-group">
                    <label>Contact Person Phone *</label>
                    <input
                      type="tel"
                      class="form-control"
                      v-model="form.contactPerson.phone"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label>Contact Person Email *</label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="form.contactPerson.email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <!-- Fleet and Business Settings -->
                <div class="col-md-6">
                  <h6 class="section-title">Fleet and Business Settings</h6>
                  
                  <div class="form-group">
                    <label>Max Number of Seats *</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model.number="form.maxNoOfSeats"
                      min="1"
                      max="100"
                      required
                    />
                    <small class="form-text text-muted">Maximum number of seats per bus (1-100)</small>
                  </div>

                  <div class="form-group">
                    <label>Max Fleet Size</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model.number="form.maxFleetSize"
                      min="1"
                    />
                    <small class="form-text text-muted">Maximum number of buses in fleet</small>
                  </div>

                  <div class="form-group">
                    <label>Commission Rate (%)</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model.number="form.commissionRate"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <small class="form-text text-muted">Commission rate (0-100)</small>
                  </div>

                  <div class="form-group">
                    <label>Payment Terms</label>
                    <select class="form-control" v-model="form.paymentTerms">
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <!-- Additional Information -->
                <div class="col-md-6">
                  <h6 class="section-title">Additional Information</h6>
                  
                  <div class="form-group">
                    <label>Description</label>
                    <textarea
                      class="form-control"
                      rows="3"
                      v-model="form.description"
                      placeholder="Brief description about your company"
                    ></textarea>
                  </div>

                  <div class="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      class="form-control"
                      v-model="form.website"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <!-- Social Media -->
                <div class="col-md-6">
                  <h6 class="section-title">Social Media</h6>
                  
                  <div class="form-group">
                    <label>Facebook</label>
                    <input
                      type="url"
                      class="form-control"
                      v-model="form.socialMedia.facebook"
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>

                  <div class="form-group">
                    <label>Twitter</label>
                    <input
                      type="url"
                      class="form-control"
                      v-model="form.socialMedia.twitter"
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>

                  <div class="form-group">
                    <label>Instagram</label>
                    <input
                      type="url"
                      class="form-control"
                      v-model="form.socialMedia.instagram"
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </div>

                  <div class="form-group">
                    <label>LinkedIn</label>
                    <input
                      type="url"
                      class="form-control"
                      v-model="form.socialMedia.linkedin"
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="row">
                <div class="col-12">
                  <div class="form-actions">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="submitting"
                    >
                      <span
                        v-if="submitting"
                        class="spinner-border spinner-border-sm mr-2"
                      ></span>
                      {{ submitting ? "Updating..." : "Update Profile" }}
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary ml-2"
                      @click="resetForm"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <p class="mt-3">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { operatorService } from "../../services";

export default {
  name: "operatorProfile",
  data() {
    return {
      loading: true,
      submitting: false,
      operatorId: null,
      form: {
        companyName: "",
        companyCode: "",
        businessType: "",
        email: "",
        phone: "",
        alternatePhone: "",
        countryCode: "91",
        address: {
          street: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
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
        maxNoOfSeats: 50,
        maxFleetSize: 100,
        commissionRate: 0,
        paymentTerms: "Weekly",
      },
      originalForm: {},
    };
  },
  async mounted() {
    await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        this.loading = true;
        const response = await operatorService.getProfile();
        
        if (response && response.data) {
          // Store operator ID for update requests
          this.operatorId = response.data._id || response.data.id || null;
          
          this.form = {
            companyName: response.data.companyName || "",
            companyCode: response.data.companyCode || "",
            businessType: response.data.businessType || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
            alternatePhone: response.data.alternatePhone || "",
            countryCode: response.data.countryCode || "91",
            address: {
              street: response.data.address?.street || "",
              city: response.data.address?.city || "",
              state: response.data.address?.state || "",
              pincode: response.data.address?.pincode || "",
              country: response.data.address?.country || "India",
            },
            contactPerson: {
              name: response.data.contactPerson?.name || "",
              designation: response.data.contactPerson?.designation || "",
              phone: response.data.contactPerson?.phone || "",
              email: response.data.contactPerson?.email || "",
            },
            description: response.data.description || "",
            website: response.data.website || "",
            socialMedia: {
              facebook: response.data.socialMedia?.facebook || "",
              twitter: response.data.socialMedia?.twitter || "",
              instagram: response.data.socialMedia?.instagram || "",
              linkedin: response.data.socialMedia?.linkedin || "",
            },
            maxNoOfSeats: response.data.maxNoOfSeats || 50,
            maxFleetSize: response.data.maxFleetSize || 100,
            commissionRate: response.data.commissionRate || 0,
            paymentTerms: response.data.paymentTerms || "Weekly",
          };
          
          // Store original form for reset functionality
          this.originalForm = JSON.parse(JSON.stringify(this.form));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        this.$toast.open({
          message: "An error occurred while fetching profile data",
          type: "error",
          position: "top-right",
          duration: 3000,
        });
      } finally {
        this.loading = false;
      }
    },
    async handleSubmit() {
      try {
        this.submitting = true;
        
        // Prepare data for API - include all updatable fields
        const updateData = {
          phone: this.form.phone,
          alternatePhone: this.form.alternatePhone,
          address: this.form.address,
          contactPerson: this.form.contactPerson,
          description: this.form.description,
          website: this.form.website,
          socialMedia: this.form.socialMedia,
          maxNoOfSeats: this.form.maxNoOfSeats,
          maxFleetSize: this.form.maxFleetSize,
          commissionRate: this.form.commissionRate,
          paymentTerms: this.form.paymentTerms,
        };
        
        // Use operator ID if available to call PATCH /v1/operator/:operatorId
        // Otherwise fall back to profile endpoint
        const response = await operatorService.updateProfile(updateData, this.operatorId);
        
        if (response && response.status) {
          this.$toast.open({
            message: response.message || "Profile updated successfully",
            type: "success",
            position: "top-right",
            duration: 3000,
          });
          
          // Update original form
          this.originalForm = JSON.parse(JSON.stringify(this.form));
        } else {
          this.$toast.open({
            message: response?.message || "Failed to update profile",
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
        this.submitting = false;
      }
    },
    resetForm() {
      this.form = JSON.parse(JSON.stringify(this.originalForm));
    },
  },
};
</script>

<style scoped>
.operator-profile {
  padding: 20px;
}

.section-title {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
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
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.form-control:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
}

.form-text {
  font-size: 12px;
  color: #6c757d;
}

.form-actions {
  margin-top: 30px;
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
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6268;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
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
</style>