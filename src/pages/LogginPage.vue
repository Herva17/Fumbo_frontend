<template>
  <q-page class="login-page flex flex-center">
    <q-card class="q-pa-md q-card-shadow animated-card">
      <!-- Titre -->
      <q-card-section>
        <div class="text-h5 text-center text-primary q-mb-xs">Bienvenue</div>
        <div class="text-subtitle2 text-center text-grey-7">
          Connectez-vous pour commencer à écrire
        </div>
      </q-card-section>

      <!-- Boutons d'inscription -->
      <q-card-section>
        <q-btn
          class="full-width q-mb-sm google-btn"
          icon="fab fa-google"
          label="Se connecter avec Google"
          color="red"
          unelevated
          @click="signInWithGoogle"
        />

        <q-btn
          class="full-width phone-btn"
          icon="fas fa-phone"
          label="Se connecter avec un numéro"
          color="green"
          unelevated
          @click="signInWithPhone"
        />
        <q-separator spaced />
        <q-btn
          class="full-width phone-btn"
          icon="fas fa-phone"
          label="Se connecter avec votre e-mail"
          color="black"
          unelevated
          @click="signInWithMail"
        />
      </q-card-section>

      <q-separator spaced />
      <!-- <div class="text-center text-grey q-mb-md">Ou utilisez votre compte</div> -->

      <!-- <q-card-section>
        <q-form @submit.prevent="loginUser" class="q-gutter-md">
           Champ Email -->
      <!-- <q-input
            v-model="email"
            type="email"
            label="Adresse email"
            filled
            dense
            clearable
            outlined
            :rules="[(val) => !!val || 'L\'email est requis']"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

           Champ Mot de passe -->
      <!-- <q-input
        v-model="password"
        type="password"
        label="Mot de passe"
        filled
        dense
        clearable
        outlined
        :rules="[(val) => !!val || 'Le mot de passe est requis']"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input> -->

      <!-- Bouton de connexion -->
      <!-- <q-btn
        label="Se connecter"
        type="submit"
        color="primary"
        unelevated
        class="full-width q-mt-md"
        icon="login"
      /> -->

      <!-- Liens secondaires -->
      <q-card-actions align="between" class="q-mt-sm">
        <q-btn
          flat
          label="Mot de passe oublié ?"
          color="primary"
          @click="redirectToForgotPassword"
        />
        <q-btn
          flat
          label="Créer un compte"
          color="secondary"
          @click="redirectToRegister"
        />
      </q-card-actions>
      <!-- Conditions d'utilisation -->
      <q-card-section class="text-center text-grey-7">
        <div class="text-caption">
          Cliquez sur « Se connecter » pour accepter les conditions
          d’utilisation de Fumbo et reconnaître que la politique de
          confidentialité de Medium s’applique à vous.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const users = ref([
      {
        id: 1,
        nom: "Thierry",
        email: "thierrynirere@gmail.com",
        password: "12345",
      },
    ]);

    const email = ref("");
    const password = ref("");

    const loginUser = () => {
      const user = users.value.find(
        (u) => u.email === email.value && u.password === password.value
      );
      if (user) {
        alert(`Bienvenue, ${user.nom} !`);
        localStorage.setItem("username", user.nom);
        router.push("/accueil");
      } else {
        alert("Identifiants incorrects. Veuillez réessayer.");
      }
    };

    const signInWithGoogle = () => {
      alert("Connexion avec Google en cours...");
      // Implémenter l'authentification Google avec Firebase ou OAuth
    };

    const signInWithPhone = () => {
      alert("Connexion avec un numéro en cours...");
      // Implémenter l'authentification par numéro avec Firebase
    };

    const redirectToForgotPassword = () => {
      alert("Redirection vers la réinitialisation du mot de passe.");
    };

    const redirectToRegister = () => {
      router.push("/enregistrer");
    };

    return {
      email,
      password,
      loginUser,
      signInWithGoogle,
      signInWithPhone,
      redirectToForgotPassword,
      redirectToRegister,
    };
  },
};
</script>

<style scoped>
/* Style général pour la page */
.login-page {
  background: linear-gradient(135deg, #2575fc, #cbcbcb);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Style de la carte */
.q-card-shadow {
  width: 400px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

/* Animation au survol */
.animated-card:hover {
  transform: scale(1.02);
}

/* Bouton pleine largeur */
.full-width {
  width: 100%;
}

/* Styles pour les boutons */
.google-btn {
  background-color: rgb(137, 135, 135) !important;
  color: white !important;
  transition: transform 0.2s ease-in-out;
}
.google-btn:hover {
  transform: scale(1.05);
}

.phone-btn {
  background-color: rgb(137, 135, 135) !important;
  color: white !important;
  transition: transform 0.2s ease-in-out;
}
.phone-btn:hover {
  transform: scale(1.05);
}

.gmail-btn {
  background-color: rgb(137, 135, 135) !important;
  color: rgb(255, 255, 255) !important;
  transition: transform 0.2s ease-in-out;
}
.gmail-btn:hover {
  transform: scale(1.05);
}

/* Séparateur */
.text-grey {
  color: #7a8fa6;
}
</style>
