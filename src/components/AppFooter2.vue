<template>
 <!-- Footer Cairn style -->
<footer class="app-footer2">
  <div class="footer-container">
    <!-- Logo et baseline -->
    <div class="footer-logo-block">
      <div class="footer-logo-group">
        <q-avatar size="70px" class="footer-logo-avatar">
          <img src="/img/fumbo_logo.png" alt="Fumbo logo" />
        </q-avatar>
        <div class="footer-logo-texts">
          <div class="footer-title">H_FUMBO</div>
          <div class="footer-subtitle">Plateforme scientifique africaine</div>
        </div>
      </div>
      <div class="footer-desc">
        L'âme des histoires africaines, plateforme scientifique et culturelle dédiée à la valorisation de la tradition orale.
      </div>
    </div>
    <!-- Raccourcis -->
    <div class="footer-links-block">
        <div class="footer-block-title">Raccourcis</div>
        <div class="footer-links">
          <q-btn flat to="/" label="Accueil" class="footer-link-btn" />
          <q-btn flat to="/connection" label="Ouvrages" class="footer-link-btn" />
          <q-btn flat to="/connection" label="Publier" class="footer-link-btn" />
          <q-btn flat to="/connection" label="Écrire" class="footer-link-btn" />
        </div>
      </div>
    <!-- Liens légaux -->
     <div class="footer-legal-block">
        <div class="footer-block-title">FUMBO Info</div>
        <div class="footer-legal">
          <a href="#" class="footer-legal-link">Mentions légales</a>
          <a href="#" class="footer-legal-link">CGU</a>
          <a href="#" class="footer-legal-link">Contact</a>
        </div>
      </div>
    <!-- Réseaux sociaux -->
     <div class="footer-social-block">
        <div class="footer-block-title">Retrouvez FUMBO sur :</div>
        <div class="footer-social">
          <q-btn flat round icon="fab fa-facebook-f" class="footer-social-btn facebook" href="#" target="_blank" />
          <q-btn flat round icon="fab fa-x-twitter" class="footer-social-btn twitter" href="#" target="_blank" />
          <q-btn flat round icon="fab fa-linkedin-in" class="footer-social-btn linkedin" href="#" target="_blank" />
          <q-btn flat round icon="fab fa-instagram" class="footer-social-btn instagram" href="#" target="_blank" />
        </div>
      </div>
    </div>
  <div class="footer-bottom">
    © {{ new Date().getFullYear() }} FUMBO. Tous droits réservés.
  </div>
</footer>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.app-footer2 {
  background: black;
  border-top: 1px solid #e0e0e0;
  padding: 32px 0 0 0;
  margin-top: 48px;
  font-size: 1rem;
  color: #333;
}
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  padding: 0 24px;
}
.footer-logo-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  min-width: 220px;
}
.footer-logo-group {
  display: flex;
  align-items: center;
  gap: 14px;
}
.footer-logo-avatar {
  background: none;
  border: 2px solid #1976d2;
}
.footer-logo-texts {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.footer-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: gray;
  letter-spacing: 0.5px;
}
.footer-subtitle {
  font-size: 0.85rem;
  color: #d0e8ff;
  font-weight: 400;
}
.footer-desc {
  font-size: 0.98rem;
  color: #d0e8ff;
  margin-top: 8px;
  max-width: 220px;
}
.footer-block-title {
  font-size: 1.08rem;
  font-weight: 600;
  color: gray;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}
.footer-links-block, .footer-legal-block, .footer-social-block {
  min-width: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer-link-btn {
  color: #d0e8ff;
  font-weight: 500;
  border-radius: 20px;
  text-align: left;
  transition: background 0.2s, color 0.2s;
}
.footer-link-btn:hover {
  background: #e3eafc;
  color: #1976d2;
}
.footer-legal {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.footer-legal-link {
  color: #d0e8ff;
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-legal-link:hover {
  color: #1976d2;
  text-decoration: none;
}
.footer-social {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
.footer-social-btn {
  color: #888;
  font-size: 1.2rem;
  background: transparent;
  transition: color 0.2s, transform 0.2s;
}
.footer-social-btn:hover {
  transform: scale(1.15);
}

.facebook:hover {
  color: #3b5998;
}
.instagram:hover {
  color: #e4405f;
}
.twitter:hover {
  color: black;
}
.linkedin:hover {
  color: #0077b5;
}
.footer-bottom {
  text-align: center;
  color: #aaa;
  font-size: 0.95rem;
  padding: 18px 0 8px 0;
  border-top: 1px solid #e0e0e0;
  margin-top: 24px;
}
@media (max-width: 900px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
  }
  .footer-logo-block, .footer-links-block, .footer-legal-block, .footer-social-block {
    align-items: center;
    min-width: unset;
  }
  .footer-links, .footer-legal {
    flex-direction: row;
    gap: 16px;
    justify-content: center;
  }
  .footer-desc {
    max-width: 100%;
    text-align: center;
  }
}
</style>