<template lang="html">
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item nav-profile">
          <router-link to="/operator/profile" class="nav-link">
            <div class="profile-image">
              <img
                class="img-xs rounded-circle"
                :src="operatorData?.documents?.logo || '/default-operator.png'"
                alt="operator logo"
              />
              <div class="dot-indicator bg-success"></div>
            </div>
            <div class="text-wrapper">
              <div class="profile-name">{{ operatorData?.companyName || 'Operator' }}</div>
              <div class="designation">{{ operatorData?.contactPerson?.name || 'Contact Person' }}</div>
            </div>
          </router-link>
        </li>
        <li class="nav-item nav-category">Operator Menu</li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'operator-dashboard' }">
            <i class="menu-icon typcn typcn-home-outline typcn-3x"></i>
            <span class="menu-title">Console</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout">
            <i class="menu-icon typcn typcn-power"></i>
            <span class="menu-title">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import TokenService from "../../services/token.service";
import { useAuth } from "../../store/useAuth";

export default {
  name: "OperatorSidebar",
  data() {
    return {
      operatorData: null,
    };
  },
  mounted() {
    this.loadOperatorData();
  },
  methods: {
    loadOperatorData() {
      // Load operator data from localStorage or API
      const storedData = localStorage.getItem("operatorData");
      if (storedData) {
        this.operatorData = JSON.parse(storedData);
      }
    },
    logout() {
      // Clear all operator authentication data
      TokenService.removeUser();
      TokenService.removeRole();
      TokenService.removeAccessToken();
      TokenService.removeRefreshToken();
      localStorage.removeItem("userType");
      localStorage.removeItem("operatorData");
      
      // Clear Pinia store
      const auth = useAuth();
      auth.$reset();
      
      // Redirect to operator login
      this.$router.push("/auth/operator-login");
    },
  },
};
</script>

<style scoped>
.app-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: #2c3e50;
  z-index: 1000;
  overflow-y: auto;
}

.sidebar {
  padding: 0;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  border-bottom: 1px solid #34495e;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #34495e;
  color: #3498db;
}

.nav-link.router-link-active {
  background-color: #3498db;
  color: white;
}

.nav-profile {
  background-color: #34495e;
  border-bottom: 2px solid #3498db;
}

.profile-image {
  position: relative;
  margin-right: 15px;
}

.profile-image img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.dot-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #2c3e50;
}

.text-wrapper {
  flex: 1;
}

.profile-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
}

.designation {
  font-size: 12px;
  color: #bdc3c7;
}

.nav-category {
  background-color: #34495e;
  color: #95a5a6;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 20px;
  border-bottom: none;
}

.menu-icon {
  margin-right: 15px;
  font-size: 18px;
  width: 20px;
  text-align: center;
}

.menu-title {
  flex: 1;
  font-size: 14px;
}

.menu-arrow {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.nav-link[aria-expanded="true"] .menu-arrow {
  transform: rotate(90deg);
}

.sub-menu {
  background-color: #34495e;
  padding-left: 0;
}

.sub-menu .nav-link {
  padding: 12px 20px 12px 50px;
  font-size: 13px;
  color: #bdc3c7;
}

.sub-menu .nav-link:hover {
  background-color: #2c3e50;
  color: #3498db;
}

.sub-menu .nav-link.router-link-active {
  background-color: #3498db;
  color: white;
}
</style>
