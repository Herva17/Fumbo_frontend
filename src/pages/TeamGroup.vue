<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <BackButton />
    <!-- Section Notre Équipe -->
    <section class="equipe-section w-full">
      <div class="container">
        <h2 class="section-title">
          <span class="subtitle">{{ $t('personnel.title1') }}</span>
          {{ $t('personnel.Dsc1') }}
        </h2>

        <div class="team-list">
          <div v-for="member in team" :key="member.name" class="team-card">
            <div class="card-image-container">
              <img :src="member.image" :alt="member.name" class="card-image" />
            </div>
            <div class="card-content">
              <h3 class="card-name">{{ member.name }}</h3>
              <p class="card-role">{{ member.role }}</p>
              <p class="card-bio">{{ member.bio }}</p>
              <div class="card-skills">
                <span v-for="skill in member.skills" :key="skill" class="skill">{{ skill }}</span>
              </div>
              <div class="card-links">
                <a
                  :href="member.links.github"
                  class="link-github"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <i class="fab fa-github"></i>
                </a>
                <a
                  :href="member.links.linkedin"
                  class="link-linkedin"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <i class="fab fa-linkedin"></i>
                </a>
                <a
                  :href="member.links.twitter"
                  class="link-twitter"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <i class="fab fa-x-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Formulaire -->
    <section class="form-section w-full mt-10">
      <div class="form-container">
        <h3 class="form-title">{{ $t('personnel.title2') }}</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label>{{ $t('personnel.Dsc2') }}</label>
            <input type="text" v-model="nom" required />
          </div>

          <div class="form-group">
            <label>{{ $t('personnel.Dsc3') }}</label>
            <input type="email" v-model="email" required />
          </div>

          <div class="form-group">
            <label>{{ $t('personnel.Dsc4') }}</label>
            <select v-model="poste" required>
              <option disabled value="">-- {{ $t('personnel.Dsc5') }} --</option>
              <option value="developpement">{{ $t('personnel.Dsc6') }}</option>
              <option value="design">{{ $t('personnel.Dsc7') }}</option>
              <option value="marketing">{{ $t('personnel.Dsc8') }}</option>
              <option value="autre">{{ $t('personnel.Dsc9') }}</option>
            </select>
          </div>

          <div class="form-group" v-if="poste === 'autre'">
            <label>{{ $t('personnel.Dsc10') }}</label>
            <input type="text" v-model="autrePoste" required />
          </div>

          <button type="submit" class="submit-btn">{{ $t('personnel.Dsc11') }}</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '../components/BackButton.vue'

const team = ref([
  {
    name: 'Thierry NIRERE',
    role: 'Manager',
    bio: 'Spécialiste en realisation front-end',
    skills: ['Vue.js'],
    image: '/img/avatar2.jpeg',
    links: {
      github: 'https://github.com/thierry-xo',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Josue SAPALA',
    role: 'Developpeur',
    bio: 'Spécialiste en realisation backend',
    skills: ['SQL', 'Vue.js', 'PHP'],
    image: '/img/avatar1.png',
    links: {
      github: 'https://github.com/Sapala-Akonkwa-Josue',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Hervey IRAGI',
    role: 'Developpeur',
    bio: 'Spécialiste en realisation front-end et backend',
    skills: ['SQL', 'Vue.js', 'PHP'],
    image: '/img/avatar3.jpeg',
    links: {
      github: 'https://github.com/Herva17',
      linkedin: '#',
      twitter: '#',
    },
  },
  // Ajoutez d'autres membres ici...
])

const nom = ref('')
const email = ref('')
const poste = ref('')
const autrePoste = ref('')

const submitForm = () => {
  const domaine = poste.value === 'autre' ? autrePoste.value : poste.value
  console.log(`Candidature reçue : ${nom.value}, ${email.value}, Domaine : ${domaine}`)
  alert(`Merci ${nom.value}, votre candidature en ${domaine} a été envoyée !`)

  // Réinitialisation
  nom.value = ''
  email.value = ''
  poste.value = ''
  autrePoste.value = ''
}
</script>

<style scoped>
.equipe-section {
  padding: 10px 20px;
  background: #f5f7fa;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: auto;
}

/* Titre */
.section-title {
  border: 2px solid #0284c7; /* Cadre bleu */
  background-color: #f0f9ff; /* Fond doux et professionnel */
  padding: 20px;
  border-radius: 8px; /* Coins arrondis */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* Ombre discrète */
  max-width: 700px;
  margin: 40px auto;
  text-align: center;
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  color: #1e293b;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  font-size: 22px;
  font-weight: bold;
}

.section-title:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.subtitle {
  display: block;
  color: #0284c7;
  font-size: 30px;
  /* text-transform: uppercase; */
  /* margin-bottom: 0px; */
}

/* Liste horizontale */
.team-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

/* Carte membre */
.team-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  width: 320px;
  flex-shrink: 0;
  padding: 10px;
}

.team-card:hover {
  transform: translateY(-5px);
}

.card-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #f0f9ff;
}

.card-image {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 16px;
  text-align: center;
}

.card-name {
  font-size: 20px;
  font-weight: bold;
  color: #0369a1;
  margin-bottom: 4px;
}

.card-role {
  font-size: 14px;
  color: #64748b;
  font-style: italic;
  margin-bottom: 10px;
}

.card-bio {
  font-size: 14px;
  color: #334155;
  margin-bottom: 12px;
}

.card-skills .skill {
  display: inline-block;
  background-color: #e0f2fe;
  color: #0369a1;
  font-size: 12px;
  padding: 4px 8px;
  margin: 2px;
  border-radius: 10px;
}

.card-links {
  margin-top: 10px;
}

.card-links a {
  font-size: 20px;
  margin: 0 8px;
  color: #888;
  transition: color 0.3s ease;
}

/* Hover personnalisé par réseau */
.card-links .link-github:hover {
  color: #333; /* Couleur GitHub */
}

.card-links .link-linkedin:hover {
  color: #0077b5; /* Bleu LinkedIn */
}

.card-links .link-twitter:hover {
  color: black; /* Bleu Twitter/X */
}

/* Formulaire */
.form-section {
  padding: 60px 20px 80px;
  background-color: #f9fafb;
  width: 600px;
  height: 300px;
}

.form-container {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
  max-width: 600px;
  margin: 0 auto;
}

.form-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #0c4a6e;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #334155;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
}

.submit-btn {
  display: block;
  background-color: #0284c7;
  color: white;
  font-weight: bold;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0369a1;
}
</style>
