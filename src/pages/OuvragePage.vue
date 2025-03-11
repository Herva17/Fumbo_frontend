<template>
  <div class="ouvrage-page">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-left">
        <q-btn flat round icon="arrow_back" @click="goBack" class="nav-btn" />
      </div>
      <div class="navbar-right">
        <q-btn flat round icon="notifications" class="nav-btn">
          <q-badge floating color="red">3</q-badge>
        </q-btn>

        <q-btn flat round icon="account_circle" class="nav-btn">
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-ripple to="/profil">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Profil</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/settings">
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section>Paramètres</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn flat round icon="share" class="nav-btn">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-ripple @click="shareAsLink">
                <q-item-section avatar>
                  <q-icon name="link" />
                </q-item-section>
                <q-item-section>Partager en tant que lien</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="shareAsFile">
                <q-item-section avatar>
                  <q-icon name="attach_file" />
                </q-item-section>
                <q-item-section>Partager en tant que fichier</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </nav>

    <!-- Détails de l'ouvrage -->
    <div class="details-container">
      <h4 class="section-title">📖 Détails de l'ouvrage</h4>
      <q-card flat bordered class="details-card">
        <q-card-section>
          <q-input
            v-model="ouvrageDetails.title"
            label="Titre de l'ouvrage"
            outlined
            dense
            @input="saveToLocalStorage"
          />
          <q-input
            v-model="ouvrageDetails.author"
            label="Auteur"
            outlined
            dense
            @input="saveToLocalStorage"
          />
          <q-input
            v-model="ouvrageDetails.publisher"
            label="Maison d'édition"
            outlined
            dense
            @input="saveToLocalStorage"
          />
          <q-input
            v-model="ouvrageDetails.category"
            label="Catégorie"
            outlined
            dense
            @input="saveToLocalStorage"
          />
          <q-input
            v-model="ouvrageDetails.description"
            label="Description"
            type="textarea"
            outlined
            dense
            @input="saveToLocalStorage"
          />
        </q-card-section>
      </q-card>
    </div>

    <!-- Uploads -->
    <div class="upload-container">
      <h4 class="section-title">📂 Insérer un nouvel ouvrage</h4>

      <div class="upload-section">
        <!-- Téléchargement de l'image -->
        <q-card class="upload-card">
          <q-card-section>
            <label class="upload-label">📷 Cover de l'ouvrage</label>
            <q-file
              v-model="coverFile"
              label="Insérer une image"
              accept="image/*"
              outlined
              dense
              @change="uploadCover"
            />
            <div v-if="ouvrageDetails.cover" class="preview-container">
              <img
                :src="ouvrageDetails.cover"
                alt="Cover du livre"
                class="image-preview"
              />
            </div>
          </q-card-section>
        </q-card>

        <!-- Téléchargement du fichier de l'ouvrage -->
        <q-card class="upload-card">
          <q-card-section>
            <label class="upload-label">📑 Fichier de l'ouvrage</label>
            <q-file
              v-model="fileUpload"
              label="Insérer un fichier"
              accept=".pdf,.doc,.docx,.epub"
              outlined
              dense
              @change="uploadFile"
            />
            <div v-if="ouvrageDetails.fileName" class="preview-container">
              <p>
                Fichier sélectionné :
                <strong>{{ ouvrageDetails.fileName }}</strong>
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-btn color="yellow" class="save-btn" @click="saveOuvrage"
      >💾 Enregistrer</q-btn
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      ouvrageDetails: {
        title: "",
        author: "",
        publisher: "",
        category: "",
        description: "",
        cover: null,
        file: null,
        fileName: "",
      },
      coverFile: null,
      fileUpload: null,
    };
  },
  created() {
    this.loadFromLocalStorage();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    shareAsLink() {
      alert("Partage en tant que lien généré !");
    },
    shareAsFile() {
      alert("Partage en tant que fichier en cours...");
    },
    uploadCover(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.ouvrageDetails.cover = e.target.result;
          this.saveToLocalStorage();
        };
        reader.readAsDataURL(file);
      }
    },
    uploadFile(event) {
      const file = event.target.files[0];
      if (file) {
        this.ouvrageDetails.file = file;
        this.ouvrageDetails.fileName = file.name;
        this.saveToLocalStorage();
      }
    },
    saveOuvrage() {
      this.saveToLocalStorage();
      alert("Ouvrage enregistré avec succès !");
    },
    saveToLocalStorage() {
      localStorage.setItem(
        "ouvrageDetails",
        JSON.stringify(this.ouvrageDetails)
      );
    },
    loadFromLocalStorage() {
      const savedData = localStorage.getItem("ouvrageDetails");
      if (savedData) {
        this.ouvrageDetails = JSON.parse(savedData);
      }
    },
  },
};
</script>

<style scoped>
.ouvrage-page {
  max-width: 900px;
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
  background-color: #a5a6a7;
  padding: 10px;
  border-radius: 8px;
}

.nav-btn {
  color: white;
}

.details-container,
.upload-container {
  margin-top: 20px;
}

.details-card {
  padding: 15px;
}

.upload-section {
  display: flex;
  gap: 20px;
}

.upload-card {
  flex: 1;
  padding: 15px;
}

.upload-label {
  font-weight: bold;
}

.preview-container {
  margin-top: 10px;
  text-align: center;
}

.image-preview {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.save-btn {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #48c774;
  color: white;
  border-radius: 8px;
}

.save-btn:hover {
  background-color: #3ec469;
}
</style>
