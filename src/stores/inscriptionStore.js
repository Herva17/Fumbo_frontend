import { defineStore } from 'pinia'
import axios from 'axios'

export const useInscriptionStore = defineStore('inscription', {
  state: () => ({
    isLoading: false,
    error: null,
    successMessage: '',
    user: null, // Stocker les informations de l'utilisateur connecté
  }),
  actions: {
    async registerUser(formData) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = '';

      try {
        // Validation des champs obligatoires
        if (!formData.username || !formData.prenom || !formData.email || !formData.password || !formData.bio || !formData.image || !formData.id_nationalite) {
          this.error = "Tous les champs obligatoires doivent être remplis.";
          return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
          if (key === 'image' && formData[key]) {
            data.append(key, formData[key]); // Ajout de l'image si elle existe
          } else if (key === 'nationalite') {
            data.append(key, parseInt(formData[key], 10)); // Convertir nationalite en entier
          } else {
            data.append(key, formData[key]);
          }
        });

        const response = await axios.post(
          'http://localhost:81/Api_Bibliotheque/user/save/?user=herva&mdp=mdp',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response.data.me && response.data.me.Reussite) {
          this.successMessage = response.data.me.Reussite;
        } else {
          this.error = response.data.me?.Erreur || 'Une erreur est survenue.';
        }
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.message || "Erreur côté serveur.";
        } else if (err.request) {
          this.error = "Le serveur ne répond pas.";
        } else {
          this.error = err.message || "Une erreur inconnue est survenue.";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getSuccessMessage: (state) => state.successMessage,
    getUser: (state) => state.user, // Récupérer les informations de l'utilisateur connecté
  },
})
