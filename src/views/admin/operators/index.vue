<template>
  <div>
    <section class="tables">
      <div class="row">
        <div class="col-lg-12">
          <Breadcrumb :breadcrumbs="breadcrumbs" />
        </div>
        <div class="col-lg-12 grid-margin stretch-card">
          <vue-bootstrap4-table
            :rows="rows"
            :columns="columns"
            :config="config"
            @on-change-query="onChangeQuery"
            @refresh-data="onRefreshData"
            :total-rows="total_rows"
            :classes="classes"
            :show-loader="showLoader"
          >
            <template slot="companyName" slot-scope="props">
              <div class="d-flex align-items-center">
                <b-avatar
                  class="mr-2"
                  variant="primary"
                  :text="props.row.companyName.charAt(0)"
                  :src="props.row.documents?.logo"
                ></b-avatar>
                <span class="mr-auto">{{ props.row.companyName }}</span>
              </div>
            </template>

            <template slot="global-search-clear-icon">
              <i class="mdi mdi-bus"></i>
            </template>

            <template slot="refresh-button-text">
              <i class="mdi mdi-sync-alert"></i> Refresh
            </template>
            <template slot="reset-button-text">
              <i class="mdi mdi-broom"></i> Reset filters
            </template>

            <template slot="status" slot-scope="props">
              <b-form-select
                v-model="props.row.status"
                v-if="props.column.name == 'status'"
                :class="
                  props.row.status == 'Active'
                    ? 'text-success'
                    : props.row.status == 'Pending'
                    ? 'text-warning'
                    : 'text-danger'
                "
                :options="statusOptions"
                @change="updateStatus(props.row.status, props.row._id)"
              ></b-form-select>
            </template>

            <template slot="isVerified" slot-scope="props">
              <b-badge
                :variant="props.row.isVerified ? 'success' : 'warning'"
                class="p-2"
              >
                {{ props.row.isVerified ? "Verified" : "Pending" }}
              </b-badge>
            </template>

            <template slot="createdAt" slot-scope="props">
              {{ momentFormat(props.row.createdAt, dateFormat.value) }}
            </template>

            <template slot="action" slot-scope="props">
              <span v-if="props.column.name == 'action'">
                <b-dropdown
                  id="dropdown-left"
                  text="Actions"
                  variant="outline-info"
                  class="m-2"
                >
                  <b-dropdown-item @click="viewRow(props.row)">
                    <span class="text-dark">
                      <i class="mdi mdi-eye"></i> View
                    </span>
                  </b-dropdown-item>
                  <b-dropdown-item :href="'#/operator/' + props.row._id">
                    <span class="text-primary">
                      <i class="mdi mdi-pencil"></i> Edit
                    </span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    v-if="!props.row.isVerified"
                    @click="verifyOperator(props.row._id)"
                  >
                    <span class="text-success">
                      <i class="mdi mdi-check-circle"></i> Verify
                    </span>
                  </b-dropdown-item>
                  <b-dropdown-item @click.stop="deleteRow(props.row._id)">
                    <span class="text-danger">
                      <i class="mdi mdi-delete"></i> Delete
                    </span>
                  </b-dropdown-item>
                </b-dropdown>
              </span>
            </template>

            <template slot="paginataion-previous-button"> Previous </template>
            <template slot="paginataion-next-button"> Next </template>
            <template slot="vbt-action-buttons">
              <div
                class="btn-group float-right"
                role="group"
                aria-label="Basic example"
              >
                <router-link to="/operator/create" class="btn btn-primary mr-2">
                  <i class="mdi mdi-plus"></i> Add Operator
                </router-link>
                <download-excel
                  class="btn btn-success mr-2"
                  :data="excelDownload"
                  :name="excelName"
                >
                  Excel <i class="mdi mdi-file-excel-box"></i>
                </download-excel>
              </div>
            </template>
          </vue-bootstrap4-table>

          <!---START VIEW Modal--->
          <b-modal
            ref="myModalRefOperator"
            :title="title"
            size="lg"
            :ok-title="modaloktitle"
            @hidden="hideModal"
            @ok="handleOk"
          >
            <span v-if="modalView == true">
              <modalView :modalData="modalData" />
            </span>
          </b-modal>
          <!--END VIEW modal--->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Breadcrumb from "../../../components/breadcrumb";
import { operatorService } from "../../../services";
import moment from "moment-timezone";
import downloadExcel from "vue-json-excel";
import modalView from "./modelView";
import VueBootstrap4Table from "vue-bootstrap4-table";
import { mapState } from "pinia";
import { useApp } from "../../../store/useApp";
import { getDateFormat } from "../../../helpers/utils";

export default {
  name: "operators",
  data() {
    return {
      title: "",
      breadcrumbs: {
        title: "Operators List",
        b1: "Manage Operators",
        b2: "Operators",
        b3: "Index",
        link: false,
        name: "Operator lists",
      },
      statusOptions: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
        { text: "Suspended", value: "Suspended" },
        { text: "Pending", value: "Pending" },
      ],
      showLoader: true,
      modaloktitle: "",
      rows: [],
      columns: [
        {
          label: "Company Name",
          name: "companyName",
          sort: true,
        },
        {
          label: "Company Code",
          name: "companyCode",
          sort: true,
        },
        {
          label: "Business Type",
          name: "businessType",
          sort: true,
        },
        {
          label: "Email",
          name: "email",
          sort: true,
        },
        {
          label: "Phone",
          name: "phone",
          sort: true,
        },
        {
          label: "Contact Person",
          name: "contactPerson",
          sort: true,
        },
        {
          label: "Status",
          name: "status",
          filter: {
            type: "select",
            placeholder: "Select Status",
            mode: "multi",
            options: [
              { name: "Active", value: "Active" },
              { name: "Inactive", value: "Inactive" },
              { name: "Suspended", value: "Suspended" },
              { name: "Pending", value: "Pending" },
            ],
          },
          sort: false,
        },
        {
          label: "Verified",
          name: "isVerified",
          sort: true,
        },
        {
          label: "Max Seats",
          name: "maxNoOfSeats",
          sort: true,
        },
        { label: "Created At", name: "createdAt", sort: true },
        { label: "Action", name: "action" },
      ],
      config: {
        server_mode: true,
        loaderText: "Updating...",
        pagination: true,
        per_page_options: [10, 20, 30, 50, 100],
        global_search: {
          placeholder: "Enter search operator",
          visibility: true,
          case_sensitive: false,
          showClearButton: false,
          searchOnPressEnter: false,
          searchDebounceRate: 1000,
        },
        highlight_row_hover_color: "silver",
        highlight_row_hover: true,
        card_mode: true,
      },
      dropdowns: [],
      classes: {
        table: " table-bordered  table-striped",
      },
      queryParams: {
        sort: [],
        filters: [],
        global_search: "",
        per_page: 10,
        page: 1,
      },
      total_rows: 0,
      modalView: false,
      modalData: {},
    };
  },
  components: {
    Breadcrumb,
    VueBootstrap4Table,
    downloadExcel,
    modalView,
  },
  computed: {
    excelDownload() {
      return operatorService.tranform(this.rows);
    },
    excelName() {
      return this.breadcrumbs.title + "_" + moment().local().unix();
    },
    ...mapState(useApp, ["dateFormat"]),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    momentFormat(createdAt, format) {
      return getDateFormat(createdAt, format);
    },
    updateStatus(status, id) {
      operatorService.changeStatus(id, status).then((response) => {
        if (response.status) {
          this.$toast.open({
            message: response.message,
            type: "success",
            position: "top-right",
            duration: 3000,
          });
        } else {
          this.$toast.open({
            message: response.message,
            type: "danger",
            position: "top-right",
            duration: 3000,
          });
        }
      });
    },
    verifyOperator(id) {
      this.$swal
        .fire({
          title: "Verify Operator?",
          text: "Are you sure you want to verify this operator?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#28a745",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Yes, verify it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            operatorService.verify(id).then((response) => {
              if (response.status) {
                this.$swal.fire("Verified!", response.message, "success");
                this.$toast.open({
                  message: response.message,
                  type: "success",
                  position: "top-right",
                  duration: 3000,
                });
                this.fetchData();
              } else {
                this.$swal.fire("Error!", response.message, "error");
                this.$toast.open({
                  message: response.message,
                  type: "error",
                  position: "top-right",
                  duration: 3000,
                });
              }
            });
          }
        });
    },
    viewRow(data) {
      this.title = "Operator Details";
      this.modalView = true;
      this.modaloktitle = "Ok";
      this.$refs.myModalRefOperator.show();
      this.modalData = data;
    },
    async deleteRow(id) {
      try {
        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              operatorService.delete(id).then((response) => {
                if (
                  typeof response.data === "object" &&
                  response.data.status === 403
                ) {
                  this.$swal.fire(response.data.message, "", "error");
                  this.$toast.open({
                    message: response.data.message,
                    type: "error",
                    position: "top-right",
                    duration: 3000,
                  });
                  this.showLoader = false;
                } else if (response.status) {
                  this.$swal.fire("Deleted!", response.message, "success");
                  this.$toast.open({
                    message: response.message,
                    type: "success",
                    position: "top-right",
                    duration: 3000,
                  });
                  this.showLoader = true;
                  this.fetchData();
                }
              });
            }
          });
      } catch (e) {
        this.$toast.open({
          message: e,
          type: "error",
          position: "top-right",
          duration: 5000,
        });
      }
    },
    hideModal() {
      this.$refs.myModalRefOperator.hide();
      this.modalView = false;
    },
    handleOk() {
      this.$refs.myModalRefOperator.hide();
      this.modalView = false;
    },
    onChangeQuery(queryParams) {
      this.queryParams = queryParams;
      this.showLoader = true;
      this.fetchData();
    },
    onRefreshData() {
      this.showLoader = true;
      this.fetchData();
    },
    fetchData() {
      console.log("Fetching operators data with params:", this.queryParams);
      operatorService
        .getAll(this.queryParams)
        .then((response) => {
          console.log("Operators API response:", response);
          if (response && response.data) {
            this.total_rows = response.data.totalRecords || 0;
            this.rows = response.data.operators || [];
          } else {
            console.error("Invalid response structure:", response);
            this.rows = [];
            this.total_rows = 0;
          }
          this.showLoader = false;
        })
        .catch((error) => {
          console.error("Error fetching operators:", error);
          this.$toast.open({
            message: "Failed to fetch operators data",
            type: "error",
            position: "top-right",
            duration: 3000,
          });
          this.rows = [];
          this.total_rows = 0;
          this.showLoader = false;
        });
    },
    enableDropdowns() {
      this.$el
        .querySelectorAll('[data-toggle="dropdown"]')
        .forEach(($dropdownToggle) => {
          const $dropdown = $dropdownToggle.nextElementSibling;
          let isShown = false;

          function setIsShown(state) {
            isShown = state;
            $dropdown.classList.toggle("show", isShown);
          }

          if (!this.dropdowns.includes($dropdown)) {
            this.dropdowns.push($dropdown);

            $dropdownToggle.addEventListener("click", (event) => {
              event.preventDefault();
              setIsShown(!isShown);
            });

            $dropdown.addEventListener("click", (event) => {
              event.preventDefault();
              setIsShown(false);
            });

            $dropdown.clickOutsideEvent = (event) => {
              const isDropdownOrChildren =
                $dropdown === event.target || $dropdown.contains(event.target);
              const isDropdownToggleOrChildren =
                $dropdownToggle === event.target ||
                $dropdownToggle.contains(event.target);

              if (!isDropdownOrChildren && !isDropdownToggleOrChildren) {
                setIsShown(false);
              }
            };
            document.addEventListener("click", $dropdown.clickOutsideEvent);
          }
        });
    },
  },
  updated() {
    this.enableDropdowns();
  },
  destroyed() {
    this.dropdowns.forEach(($dropdown) => {
      document.removeEventListener("click", $dropdown.clickOutsideEvent);
    });
  },
};
</script>

<style scoped>
.form-control {
  height: 28px !important;
}
</style>
