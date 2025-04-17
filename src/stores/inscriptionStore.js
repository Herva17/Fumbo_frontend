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
          console.error("Champs manquants :", formData);
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

        console.log("Données envoyées à l'API :", Array.from(data.entries()));

        const response = await axios.post(
          'http://localhost/Api_bibliotheque/user/save/?user=herva&mdp=mdp',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log("Réponse complète de l'API :", response);
        console.log("Réponse de l'API (données) :", response.data);

        if (response.data.me && response.data.me.Reussite) {
          this.successMessage = response.data.me.Reussite;
        } else {
          this.error = response.data.me?.Erreur || 'Une erreur est survenue.';
        }
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
    },

    // async loginUser(credentials) {
    //   this.isLoading = true;
    //   this.error = null;
    //   this.user = null;

    //   try {
    //     // Validation des champs obligatoires
    //     if (!credentials.identifier || !credentials.password) {
    //       this.error = "Nom d'utilisateur ou email et mot de passe sont requis.";
    //       console.error("Champs manquants :", credentials);
    //       return;
    //     }

    //     const response = await axios.post(
    //       'http://localhost/Api_bibliotheque/user/login/?user=herva&mdp=mdp',
    //       {
    //         identifier: credentials.identifier, // Peut être un email ou un nom d'utilisateur
    //         password: credentials.password,
    //       },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       },
    //     );

    //     console.log("Réponse complète de l'API :", response);
    //     console.log("Réponse de l'API (données) :", response.data);

    //     if (response.data.me && response.data.me.Reussite) {
    //       this.user = response.data.me.Utilisateur; // Stocker les informations de l'utilisateur
    //       this.successMessage = response.data.me.Reussite;
    //     } else {
    //       this.error = response.data.me?.Erreur || 'Une erreur est survenue.';
    //     }
    //   } catch (err) {
    //     if (err.response) {
    //       this.error = err.response.data.message || "Erreur côté serveur.";
    //       console.error("Erreur API :", err.response.data);
    //     } else if (err.request) {
    //       this.error = "Le serveur ne répond pas.";
    //       console.error("Pas de réponse du serveur :", err.request);
    //     } else {
    //       this.error = err.message || "Une erreur inconnue est survenue.";
    //       console.error("Erreur :", err);
    //     }
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
  },
  getters: {
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getSuccessMessage: (state) => state.successMessage,
    getUser: (state) => state.user, // Récupérer les informations de l'utilisateur connecté
  },
})
