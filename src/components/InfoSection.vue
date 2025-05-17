<template>
  <section class="info-section">
    <div class="column">
      <h3 class="section-title">À PROPOS DE <span class="highlight">FUMBO</span></h3>
      <ul class="link-list">
        <li>
          <router-link to="/Perso" class="link">
            <q-icon name="fas fa-users" class="icon" />
            Personnel
          </router-link>
        </li>
        <li>
          <router-link to="/Po" class="link">
            <q-icon name="shield" class="icon" />
            Politique de confidentialité
          </router-link>
        </li>
        <li>
          <router-link to="/Ml" class="link">
            <q-icon name="gavel" class="icon" />
            Code d’éthique et de conduite
          </router-link>
        </li>
      </ul>
    </div>
    <div class="column">
      <h3 class="section-title">PARTAGEZ VOTRE <span class="highlight">HISTOIRE</span></h3>
      <ul class="link-list">
        <li>
          <router-link to="/Rec" class="link">
            <q-icon name="fas fa-lightbulb" class="icon" />
            Astuces et recommandations pour la diffusion de contenu
          </router-link>
        </li>
        <li>
          <router-link to="/Cont" class="link">
            <q-icon name="fas fa-id-card" class="icon" />
            Fournir vos informations personnelles
          </router-link>
        </li>
      </ul>
    </div>
    <div class="column contact">
      <h3 class="section-title">FUMBO</h3>
      <div class="address-box">
        <p class="address">
          103, av Carmel, Q. Katindo <br />
          Goma, RDC
        </p>
      </div>

      <div class="social-icons">
        <q-btn flat round icon="fab fa-facebook" class="social-btn facebook" />
        <q-btn flat round icon="fab fa-instagram" class="social-btn instagram" />
        <q-btn flat round icon="fab fa-youtube" class="social-btn youtube" />
        <q-btn flat round icon="fab fa-linkedin" class="social-btn linkedin" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.info-section {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 40px 20px;
  background-color: #f9f9f9;
  justify-content: space-between;
}
.column {
  flex: 1 1 300px;
  min-width: 280px;
}
.section-title {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 20px;
}
.highlight {
  color: #007bff;
  font-weight: bold;
}
.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-list li {
  margin-bottom: 15px;
}

.link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #444;
  font-size: 1rem;
  transition: color 0.3s ease;
  font-weight: bold;
}

.link:hover {
  color: #007bff;
}

.icon {
  margin-right: 8px;
  font-size: 1.2rem;
  color: #007bff;
}

.contact .address {
  font-size: 0.9rem;
  margin-bottom: 15px;
  font-weight: bold;
}
.address-box {
  background-color: #f0f4f8;
  border-left: 4px solid #007BFF;
  border-radius: 8px;
  padding: 12px 16px;
  max-width: 300px;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.address {
  margin: 0;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
}

.social-icons {
  display: flex;
  gap: 10px;
}
.social-btn {
  font-size: 1.2rem;
  background: transparent;
  color: #fff;
  transition: 0.3s;
}
.social-btn:hover {
  transform: scale(1.2);
}
.facebook:hover {
  color: #3b5998;
}
.instagram:hover {
  color: #e4405f;
}
.youtube:hover {
  color: #ff0000;
}
.linkedin:hover {
  color: #0077b5;
}
</style>
