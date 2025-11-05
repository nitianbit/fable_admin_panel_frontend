<template>
  <div class="operator-layout">
    <!-- Operator Sidebar -->
    <OperatorSidebar />
    
    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Top Header -->
      <header class="operator-header">
        <div class="header-content">
          <div class="header-left">
            <button 
              class="sidebar-toggle" 
              @click="toggleSidebar"
              v-if="isMobile"
            >
              <i class="feather icon-menu"></i>
            </button>
            <h4 class="page-title">{{ pageTitle }}</h4>
          </div>
          <div class="header-right">
            <div class="operator-info">
              <span class="operator-name">{{ operatorData?.companyName || 'Operator' }}</span>
              <span class="operator-status" :class="getStatusClass(operatorData?.status)">
                {{ operatorData?.status || 'Unknown' }}
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import OperatorSidebar from "../../components/partials/OperatorSidebar.vue";

export default {
  name: "OperatorLayout",
  components: {
    OperatorSidebar,
  },
  data() {
    return {
      isMobile: false,
      operatorData: null,
    };
  },
  computed: {
    pageTitle() {
      // Get page title from route meta or default
      return this.$route.meta?.title || "Operator Dashboard";
    },
  },
  mounted() {
    this.loadOperatorData();
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    loadOperatorData() {
      const storedData = localStorage.getItem("operatorData");
      if (storedData) {
        this.operatorData = JSON.parse(storedData);
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
    },
    toggleSidebar() {
      // Toggle sidebar for mobile
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.toggle("sidebar-open");
      }
    },
    getStatusClass(status) {
      switch (status) {
        case "Active":
          return "status-active";
        case "Pending":
          return "status-pending";
        case "Suspended":
          return "status-suspended";
        case "Inactive":
          return "status-inactive";
        default:
          return "status-unknown";
      }
    },
  },
};
</script>

<style scoped>
.operator-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-content {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
}

.operator-header {
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-left {
  display: flex;
  align-items: center;
}

.sidebar-toggle {
  background: none;
  border: none;
  font-size: 20px;
  color: #6c757d;
  margin-right: 15px;
  cursor: pointer;
  padding: 5px;
}

.sidebar-toggle:hover {
  color: #495057;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

.header-right {
  display: flex;
  align-items: center;
}

.operator-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.operator-name {
  font-weight: 600;
  color: #2c3e50;
}

.operator-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-active {
  background-color: #d4edda;
  color: #155724;
}

.status-pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-suspended {
  background-color: #f8d7da;
  color: #721c24;
}

.status-inactive {
  background-color: #e2e3e5;
  color: #383d41;
}

.status-unknown {
  background-color: #f8f9fa;
  color: #6c757d;
}

.page-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .operator-header {
    padding: 0 15px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .operator-info {
    flex-direction: column;
    gap: 5px;
    align-items: flex-end;
  }
  
  .operator-name {
    font-size: 14px;
  }
  
  .operator-status {
    font-size: 10px;
    padding: 2px 8px;
  }
}

/* Sidebar toggle for mobile */
@media (max-width: 768px) {
  .app-sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .app-sidebar.sidebar-open {
    transform: translateX(0);
  }
}
</style>
