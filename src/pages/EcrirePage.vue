<template>
  <div class="story-editor">
    <nav class="navbar">
      <div class="navbar-left">
        <button class="options-button" @click="toggleOptions">
          ☰ Détails de l'histoire
        </button>
      </div>
      <div class="navbar-right">
        <!-- Boutons d'actions -->
        <q-btn flat round icon="notifications" class="q-mr-sm notif">
          <q-badge floating color="red">3</q-badge>
        </q-btn>
        <q-btn flat round icon="account_circle" class="text-black">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item>
                <q-avatar size="50px" class="q-mr-md">
                  <q-img src="~assets/user-avatar.png" />
                </q-avatar>
                <q-item-section>
                  <q-item-label class="text-h6">Thierry Nirere</q-item-label>
                  <q-item-label caption>Editeur</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple to="/profil">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Profil</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section class="text-negative"
                  >Déconnexion</q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat round icon="share" class="text-black">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-ripple @click="exportToPDF">
                <q-item-section avatar>
                  <q-icon name="picture_as_pdf" />
                </q-item-section>
                <q-item-section>Exporter en PDF</q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="generateShareLink">
                <q-item-section avatar>
                  <q-icon name="link" />
                </q-item-section>
                <q-item-section>Créer un lien de publication</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </nav>

    <div class="editor-container">
      <div class="options-panel" :class="{ 'options-panel-open': showOptions }">
        <div class="form-group">
          <label for="title">Titre</label>
          <input
            id="title"
            v-model="storyDetails.title"
            placeholder="Titre de l'histoire"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="storyDetails.description"
            placeholder="Description de l'histoire"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="main-characters">Personnages Principaux</label>
          <input
            id="main-characters"
            v-model="storyDetails.mainCharacters"
            placeholder="Personnages principaux"
          />
        </div>
        <div class="form-group">
          <label for="category">Catégorie</label>
          <input
            id="category"
            v-model="storyDetails.category"
            placeholder="Catégorie de l'histoire"
          />
        </div>
        <button class="save-details-button" @click="saveDetails">
          Enregistrer détails
        </button>
      </div>

      <div class="editor-content">
        <h1 class="title">Raconter votre histoire...</h1>
        <textarea
          v-model="story"
          placeholder="Commencer à racoter une histoire ..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      story: "",
      showOptions: true,
      storyDetails: {
        title: "",
        description: "",
        mainCharacters: "",
        category: "",
      },
    };
  },
  created() {
    this.loadStoryFromLocalStorage();
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    saveDetails() {
      console.log("Story details saved:", this.storyDetails);
      this.saveStoryToLocalStorage();
    },
    publishStory() {
      console.log("Story published:", this.story);
    },
    exportToPDF() {
      // Générer un PDF avec jsPDF
      const doc = new jsPDF();
      doc.text(this.storyDetails.title, 10, 10);
      doc.text(this.storyDetails.description, 10, 20);
      doc.text(this.story, 10, 40);
      doc.save("story.pdf");
    },
    generateShareLink() {
      const shareData = {
        title: this.storyDetails.title,
        description: this.storyDetails.description,
        story: this.story,
      };
      const encodedData = encodeURIComponent(JSON.stringify(shareData));
      const shareUrl = `${window.location.origin}/shared-story?data=${encodedData}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Lien de partage copié !");
    },
    saveStoryToLocalStorage() {
      const storyData = {
        story: this.story,
        details: this.storyDetails,
      };
      localStorage.setItem("savedStory", JSON.stringify(storyData));
    },
    loadStoryFromLocalStorage() {
      const savedStory = localStorage.getItem("savedStory");
      if (savedStory) {
        const parsedData = JSON.parse(savedStory);
        this.story = parsedData.story;
        this.storyDetails = parsedData.details;
      }
    },
  },
};
</script>

<style scoped>
.story-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.options-button {
  padding: 10px 20px;
  background-color: #3273dc;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.options-button:hover {
  background-color: #276cda;
}

.status {
  padding: 5px 10px;
  background-color: #ffdd57;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
}

.navbar-right {
  display: flex;
  gap: 10px;
}

.publish-button,
.notification-button,
.login-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.publish-button {
  background-color: #3273dc;
  color: #fff;
}

.publish-button:hover {
  background-color: #276cda;
}

.notification-button {
  background-color: #f0f0f0;
  color: #333;
}

.notification-button:hover {
  background-color: #e0e0e0;
}

.login-button {
  background-color: #48c774;
  color: #fff;
}

.login-button:hover {
  background-color: #3ec469;
}

.editor-container {
  display: flex;
  gap: 20px;
}

.options-panel {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.options-panel-open {
  transform: translateX(0);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.save-details-button {
  padding: 10px 20px;
  background-color: #3273dc;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.save-details-button:hover {
  background-color: #276cda;
}

.editor-content {
  flex-grow: 1;
}

.title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

textarea {
  width: 100%;
  height: 400px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  background-color: #fff;
}
</style>
