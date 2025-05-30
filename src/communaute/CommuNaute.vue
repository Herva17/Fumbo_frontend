<template>
  <div class="community-platform">
    <!-- Header avec effet de verre léger -->
    <div class="light-header">
      <h1 class="community-title">Groupes</h1>
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Rechercher un groupe..." />
      </div>
    </div>

    <!-- Grille de groupes -->
    <div class="grid-container">
      <!-- Remplacez le groupe statique par une boucle v-for -->
      <div
        v-for="group in groups"
        :key="group.id"
        class="light-card"
        :data-category="group.category"
      >
        <div class="card-content">
          <div class="icon-container">
            <svg viewBox="0 0 24 24" class="group-icon">
              <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" />
              <path d="M12 7l-5 5 5 5 5-5-5-5z" />
            </svg>
          </div>
          <h3>{{ group.name }}</h3>
          <p>{{ group.description }}</p>
          <div class="join-button text-white" @click="redirectToGroup(group.id)">Rejoindre</div>
        </div>
        <div class="card-background" :style="{ backgroundImage: `url(${group.image})` }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommuNaute',
  data() {
    return {
      groups: [
        {
          id: 1,
          slug: 'art-africain',
          name: 'Art Africain Contemporain',
          description: 'Explorez les expressions artistiques modernes du continent',
          fullDescription:
            "Ce groupe est dédié à la promotion et à la discussion de l'art africain contemporain...",
          image:
            'https://images.unsplash.com/photo-1610220941051-1ad7b2f64c70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          category: 'art',
        },
        {
          id: 2,
          slug: 'cuisine-afro',
          name: 'Cuisine Afro-Caribéenne',
          description: 'Saveurs authentiques et techniques culinaires ancestrales',
          fullDescription: 'Découvrez et partagez les recettes traditionnelles afro-caribéennes...',
          image:
            'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          category: 'food',
        },
        // Ajoutez les autres groupes de la même manière
      ],
    }
  },

  methods: {
    redirectToGroup(groupId) {
      const group = this.groups.find((g) => g.id === groupId)
      if (group) {
        this.$router.push({
          name: 'group-detail',
          params: { slug: group.slug },
        })
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

:root {
  --primary-blue: #1976d2;
  --light-blue: #0995f8ff;
  --white: #ffffff;
  --light-gray: #f5f5f5;
  --text-dark: #212121;
  --text-light: #757575;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.community-platform {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Manrope', sans-serif;
  color: var(--text-dark);
  background-color: var(--light-gray);
  min-height: 100vh;
}

.light-header {
  background-color: var(--white);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--card-shadow);
  text-align: center;
}

.community-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1.5rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: var(--white);
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid var(--light-blue);
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.1);
  transition: all 0.3s ease;
}

.search-bar:hover {
  border-color: var(--primary-blue);
}

.search-bar i {
  color: var(--primary-blue);
  margin-right: 1rem;
  font-size: 1.1rem;
}

.search-bar input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-dark);
  font-size: 1rem;
  outline: none;
}

.search-bar input::placeholder {
  color: var(--text-light);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.light-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 280px;
  cursor: pointer;
  background: var(--white);
  box-shadow: var(--card-shadow);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  animation: cardEntrance 0.6s ease-out both;
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.light-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.2);
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
  opacity: 0.8;
}

.card-content {
  position: relative;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgb(20, 70, 251));
  z-index: 2;
}

.icon-container {
  width: 50px;
  height: 50px;
  background-color: var(--primary-blue);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.group-icon {
  width: 24px;
  height: 24px;
  fill: var(--white);
}

.light-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.light-card p {
  font-size: 0.9rem;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.join-button {
  align-self: flex-start;
  padding: 0.6rem 1.5rem;
  background-color: var(--primary-blue);
  color: var(--white);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.light-card:hover .join-button {
  background-color: #1565c0;
}

/* Effets spécifiques par catégorie */
.light-card[data-category='art'] .card-background::after {
  background-color: rgba(25, 118, 210, 0.3);
}

.light-card[data-category='food'] .card-background::after {
  background-color: rgba(56, 142, 60, 0.3);
}

.light-card[data-category='literature'] .card-background::after {
  background-color: rgba(94, 53, 177, 0.3);
}

.light-card[data-category='education'] .card-background::after {
  background-color: rgba(0, 131, 143, 0.3);
}

.light-card[data-category='spirituality'] .card-background::after {
  background-color: rgba(69, 90, 100, 0.3);
}

.light-card[data-category='music'] .card-background::after {
  background-color: rgba(245, 124, 0, 0.3);
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .community-title {
    font-size: 2.2rem;
  }

  .light-card {
    height: 260px;
  }
}

@media (max-width: 480px) {
  .light-header {
    padding: 1.5rem;
  }

  .grid-container {
    grid-template-columns: 1fr;
  }

  .community-title {
    font-size: 2rem;
  }
}
</style>
