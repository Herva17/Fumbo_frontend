<template>
  <q-header elevated class="app-header2">
    <q-toolbar class="header-toolbar">
      <q-btn flat to="/" class="logo-btn flex items-center no-padding">
        <q-avatar size="90px" class="logo-avatar">
          <img src="/img/fumbo_logo.png" alt="H-FUMBO logo" />
        </q-avatar>
        <div class="logo-text-container q-ml-sm">
          <div class="logo-title text-blue-grey-10">H_FUMBO</div>
          <div class="logo-subtitle">Plateforme scientifique africaine</div>
        </div>
      </q-btn>

      <q-space class="spacer" />

      <div class="user-actions">
        <!-- <q-btn round dense flat icon="person" to="/account" class="action-btn">
          <q-tooltip>Mon compte</q-tooltip>
        </q-btn>
        <q-btn round dense flat icon="shopping_cart" to="/cart" class="action-btn">
          <q-tooltip>Panier</q-tooltip>
        </q-btn> -->
        <!-- Sélecteur de langue -->
        <LangSwitcher class="q-ml-md" />

        <q-btn flat label="Connexion" to="/login" class="login-btn" />
      </div>
    </q-toolbar>

    
  
  </q-header>
  <MainNavbar class="main-nav" />
</template>

<script>
import MainNavbar from 'src/components/MainNavbar.vue'
import LangSwitcher from 'src/components/LangSwitcher.vue'

export default {
  components: {
    MainNavbar,
    LangSwitcher,
  },
}
</script>

<style lang="scss" scoped>
.app-header2 {
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.header-toolbar {
  padding: 12px 32px;
  min-height: 80px;
  display: flex;
  align-items: center;
}

.logo-btn {
  text-align: left;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.92;
  }
}

.logo-avatar {
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
}

.logo-text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: gray;
  letter-spacing: 0.5px;
}

.logo-subtitle {
  font-size: 0.85rem;
  color: #d0e8ff;
  font-weight: 400;
}

.search-container {
  margin: 0 24px;
  flex-grow: 1;
  max-width: 500px;
}

.spacer {
  flex-grow: 1;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 12px;

  .action-btn {
    color: white;
    transition: all 0.3s ease;
    width: 36px;
    height: 36px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }

    .q-icon {
      font-size: 1.2rem;
    }
  }

  .login-btn {
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    padding: 6px 16px;
    text-transform: none;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: white;
    }
  }
}

.main-nav {
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  :deep(.q-tab) {
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    padding: 0 20px;
    min-height: 48px;
    text-transform: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }

    &.q-tab--active {
      color: white;
      font-weight: 600;
    }
  }
}

@media (max-width: 1023px) {
  .header-toolbar {
    padding: 8px 16px;
  }

  .search-container {
    margin: 0 12px;
    max-width: 300px;
  }

  .logo-text-container {
    display: none;
  }
}

@media (max-width: 767px) {
  .search-container {
    display: none;
  }
}
</style>
