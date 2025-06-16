// stores/nationalitesStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useNationalitesStore = defineStore('nationalites', {
  state: () => ({
    nationalites: [],
    isLoading: false,
    error: null,
    message: '', // Pour stocker le message d'accueil
  }),
  actions: {
    async fetchNationalites() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(
          'http://localhost:81/Api_bibliotheque/nationalite/select/?user=herva&mdp=mdp'
        );

        console.log("Structure complète de la réponse:", response.data);

        const nationalites = response.data.me;

        if (Array.isArray(nationalites)) {
          this.nationalites = nationalites.map(nationalite => ({
            ...nationalite,
            image: `http://localhost:81/Api_bibliotheque/${nationalite.image}`
          }));
        } else {
          console.error("La réponse n'est pas un tableau valide.");
          this.nationalites = [];
        }

        console.log("Nationalités stockées :", this.nationalites);
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.message || "Erreur côté serveur.";
          console.error("Erreur API :", err.response.data);
        } else if (err.request) {
          this.error = "Le serveur ne répond pas.";
          console.error("Pas de réponse du serveur :", err.request);
        } else {
          this.error = err.message || "Une erreur inconnue est survenue.";
          console.error("Erreur :", err);
        }
      } finally {
        this.isLoading = false;
      }
    }
  },
  getters: {
    getNationalites: (state) => state.nationalites,
    getIsLoading: (state) => state.isLoading,
    getMessage: (state) => state.message, // Pour accéder au message
  },
})
