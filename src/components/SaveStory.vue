<template>
  <!-- Header amélioré -->
  <q-header elevated class="bg-white text-black shadow-sm">
    <q-toolbar>
      <q-btn flat class="text-weight-bold text-h5" to="/"> Fumbo </q-btn>
      <q-space />
      <q-input
        dense
        filled
        rounded
        placeholder="Rechercher..."
        class="q-mr-md animate__animated animate__fadeInRight"
        v-model="searchQuery"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        flat
        label="A propos"
        class="hover-underline-animation"
        to="/about"
      />
      <q-btn
        flat
        label="Publier"
        class="hover-underline-animation"
        to="/enregistrer"
      />
      <q-btn
        flat
        label="Ecrire"
        class="hover-underline-animation"
        to="enregistrer"
      />
      <q-btn
        flat
        label="Ouvrages"
        class="hover-underline-animation"
        to="/ouvrage"
      />

      <q-btn
        rounded
        unelevated
        color="black"
        label="S'inscrire"
        class="q-ml-md text-white hover-grow"
        to="/Enregistrer"
      />
    </q-toolbar>
  </q-header>

  <q-separator spaced />

  <!-- Contenu principal -->
  <div class="savestory">
    <!-- Section de description améliorée -->
    <section class="description bg-light-blue-1 q-pa-md rounded-borders">
      <h3 class="text-h4 text-weight-bold text-center q-mb-md">
        Tell Us Your Story!
      </h3>
      <p class="text-body1 text-center">
        Everyone has a story, and we want to hear yours! We listen to every
        pitch and if we like what we hear, we might air it on The Moth Radio
        Hour, or call you back to develop the story further for one of our Moth
        Mainstages.
      </p>
    </section>

    <!-- Section d'enregistrement améliorée -->
    <section class="record-story bg-light-green-1 q-pa-md rounded-borders">
      <h3 class="text-h4 text-weight-bold text-center q-mb-md">
        Record your Story
      </h3>
      <p class="text-body1 text-center">
        Now click on record and wow us with a 2-minute pitch of your story. Tell
        us the actual story - not what it's about or what it might be.
      </p>
      <div class="loading-section">
        <img src="/img/loading.jpg" alt="Loading" class="loading-image" />
      </div>
      <div class="record-button">
        <q-btn
          round
          color="red"
          icon="mic"
          size="lg"
          @click="startRecording"
          class="animate__animated animate__pulse animate__infinite"
        />
      </div>
      <p class="text-body1 text-center">
        Say it loud, say it proud. Some computer's microphone have a hard time
        recording a quiet voice.
      </p>
      <p class="text-body1 text-center">
        Note: The web recorder will automatically end your recording if there is
        silence for 6 seconds or more.
      </p>
    </section>

    <!-- Section d'écriture améliorée -->
    <section class="write-story bg-light-purple-1 q-pa-md rounded-borders">
      <h4 class="text-h4 text-weight-bold text-center q-mb-md">
        Write your Story
      </h4>
      <div class="loading-section">
        <img src="/img/write.jpg" alt="Loading" class="loading-image" />
      </div>
      <p class="text-body1 text-center">
        Summarize your story in a short paragraph.
      </p>
      <q-input
        v-model="storyText"
        type="textarea"
        placeholder="Write your story here (250 words max)"
        class="q-mb-md"
      />
      <q-btn flat label="Submit" @click="submitStory" class="full-width" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storyText: "",
    };
  },
  methods: {
    startRecording() {
      console.log("Recording started");
    },
    submitStory() {
      console.log("Story submitted:", this.storyText);
    },
  },
};
</script>

<style scoped>
.savestory {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.description,
.record-story,
.write-story {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 10px;
}

h1,
h2,
h3,
h4 {
  color: #333;
}

.loading-section {
  text-align: center;
  margin: 20px 0;
}

.loading-image {
  width: 100px;
  height: auto;
}

.record-button {
  text-align: center;
  margin: 20px 0;
}

.record-image {
  width: 100px;
  height: auto;
  cursor: pointer;
}

.record-image:hover {
  opacity: 0.8;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #a1a2a3ff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
}

/* Responsive Design */
@media (max-width: 600px) {
  .savestory {
    padding: 10px;
  }

  .description,
  .record-story,
  .write-story {
    padding: 15px;
  }

  h1,
  h2,
  h3,
  h4 {
    font-size: 1.5rem;
  }

  textarea {
    height: 100px;
  }
}
</style>
