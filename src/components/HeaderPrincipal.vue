<template>
  <q-header elevated class="app-header">
    <q-toolbar class="header-toolbar q-gutter-md">
      <!-- Logo principal -->
      <q-btn flat to="/" class="logo-btn flex items-center no-padding">
        <q-avatar size="90px" class="logo-avatar">
          <img src="/img/fumbo_logo.png" alt="H-FUMBO logo" />
        </q-avatar>
        <div class="logo-text-container q-ml-sm">
          <div class="logo-title text-blue-grey-10">H_FUMBO</div>
          <div class="logo-subtitle">Plateforme scientifique africaine</div>
        </div>
      </q-btn>

      <q-space />



      <!-- Menu déroulant animé -->
      <div class="header-actions">
        <q-btn flat icon="menu" ref="menuBtn" aria-label="Menu" />
        <q-menu anchor="bottom right" self="top right" :offset="[0, 8]" transition-show="jump-down" transition-hide="jump-up">
          <q-list style="min-width: 200px">
            <q-item to="/editeurs" flat class="full-width justify-start" label="Éditeurs" icon="book">
              <q-item-section avatar>
                <q-icon name="library_books" color="primary" />
              </q-item-section>
              <q-item-section>Éditeurs</q-item-section>
            </q-item>
            <q-item to="/instituts" flat class="full-width justify-start" label="Institutions" icon="domain">
              <q-item-section avatar>
                <q-icon name="apartment" color="secondary" />
              </q-item-section>
              <q-item-section>Institutions</q-item-section>
            </q-item>
            <q-item to="/auteurs" flat class="full-width justify-start" label="Auteurs" icon="person">
              <q-item-section avatar>
                <q-icon name="person" color="deep-orange" />
              </q-item-section>
              <q-item-section>Auteurs</q-item-section>
            </q-item>
            <q-item to="/actualites" flat class="full-width justify-start" label="Actualités" icon="campaign">
              <q-item-section avatar>
                <q-icon name="campaign" color="teal" />
              </q-item-section>
              <q-item-section>Actualités</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>

    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  background: linear-gradient(135deg, #004b85, #0d5ea1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
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
  color: black;
  letter-spacing: 0.5px;
}

.logo-subtitle {
  font-size: 0.85rem;
  color: #d0e8ff;
  font-weight: 400;
}
</style>
