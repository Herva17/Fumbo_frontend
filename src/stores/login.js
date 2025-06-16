import { defineStore } from 'pinia'
import axios from 'axios'

export const useLoginStore = defineStore('login', {
  state: () => ({
    email: '',
    password: '',
    isLoading: false,
    error: null,
    user: {
      id_user: null,
      username: '',
      prenom: '',
      image: '',
      bio: '',
      email: '',
      nationalite: '',
    }, // Pour stocker les informations de l'utilisateur connecté
  }),
  actions: {
    async loginUser() {
      this.isLoading = true;
      this.error = null;

      if (!this.email || !this.password) {
        this.error = 'Veuillez remplir tous les champs.';
        this.isLoading = false;
        return;
      }

      try {
        // Construire un objet FormData
        const formData = new FormData();
        formData.append('email', this.email);
        formData.append('password', this.password);

        console.log('Données envoyées à l\'API (FormData) :', {
          email: this.email,
          password: this.password,
        });

        // Envoyer la requête avec FormData
        const response = await axios.post(
          'http://localhost:81/Api_bibliotheque/user/login/?user=herva&mdp=mdp',
          formData, // Envoyer le FormData
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Spécifier le type multipart/form-data
            },
          }
        );

        console.log('Réponse complète de l\'API :', response.data);

        // Ajuster la logique en fonction de la structure réelle de la réponse de votre API
        const apiResponse = response.data;

        if (apiResponse.me && apiResponse.me.me && apiResponse.me.me.Reussite === "Connexion réussie") {
          this.user = apiResponse.me.me.Utilisateur; // Stocker les informations de l'utilisateur
          localStorage.setItem('user', JSON.stringify(this.user)); // Sauvegarder dans le localStorage
          console.log('Utilisateur connecté :', this.user);
        } else {
          this.error = apiResponse.me?.me?.Message || 'Une erreur est survenue lors de la connexion.';
          console.error('Erreur API :', apiResponse);
        }
      } catch (err) {
        if (err.response) {
          console.error('Erreur API :', err.response.data);
          this.error = err.response.data.me?.me?.Message || 'Erreur côté serveur.';
        } else if (err.request) {
          console.error('Pas de réponse du serveur :', err.request);
          this.error = 'Le serveur ne répond pas.';
        } else {
          console.error('Erreur inconnue :', err.message);
          this.error = 'Une erreur inconnue est survenue.';
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    getEmail: (state) => state.email,
    getPassword: (state) => state.password,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getUser: (state) => state.user, // Pour accéder aux informations de l'utilisateur connecté
  },
});
