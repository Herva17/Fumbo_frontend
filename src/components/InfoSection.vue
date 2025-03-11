<template>
  <section class="info-section">
    <div class="column">
      <h3 class="section-title">À PROPOS DE <span class="highlight">FUMBO</span></h3>
      <ul>
        <li><q-icon name="person" class="icon" /> Personnel</li>
        <span>
          <router-link to="/Po" class="flex items-center space-x-2 mt-4">
            <li><q-icon name="shield" class="icon" /> Politique de confidentialité</li>
          </router-link>
        </span>
        <span>
          <router-link to="Ml" class="flex items-center space-x-2 mt-4">
            <li><q-icon name="gavel" class="icon" /> Code d’éthique et de conduite</li>
          </router-link>
        </span>
      </ul>
    </div>
    <div class="column">
      <h3 class="section-title">PARTAGEZ VOTRE <span class="highlight">HISTOIRE</span></h3>
      <ul>
        <li>
          <q-icon name="lightbulb" class="icon" /> Conseils et astuces pour partager une histoire
        </li>
        <li><q-icon name="send" class="icon" /> Soumettre vos données personnelles</li>
      </ul>
    </div>
    <div class="column contact">
      <h3 class="section-title">FUMBO</h3>
      <p class="address">
        103, av Carmel, Q. Katindo <br />
        Goma, RDC
      </p>
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
  justify-content: space-around;
  background: #1a1a1a;
  color: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  margin-top: 50px;
}
.column {
  flex: 1;
  max-width: 300px;
}
.section-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: bold;
}
.highlight {
  color: #ffcc00;
}
ul {
  list-style: none;
  padding: 0;
}
ul li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.9rem;
}
.icon {
  margin-right: 8px;
  color: #ffcc00;
}
.contact .address {
  font-size: 0.9rem;
  margin-bottom: 15px;
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
