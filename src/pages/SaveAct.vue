<!-- <template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg shadow-2" style="max-width: 400px; width: 100%">
      <q-card-section>
        <div class="text-h6 text-center">Inscription</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="user.name" label="Nom" outlined dense />
        <q-input
          v-model="user.email"
          label="Email"
          type="email"
          outlined
          dense
          class="q-mt-md"
        />
        <q-input
          v-model="user.password"
          label="Mot de passe"
          type="password"
          outlined
          dense
          class="q-mt-md"
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn label="S'inscrire" color="primary" @click="register" />
      </q-card-actions>
      <q-card-section class="text-center">
        <q-btn
          flat
          label="Déjà un compte ? Connectez-vous"
          @click="$router.push('/login')"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      console.log("Utilisateur enregistré:", this.user);
      this.$router.push("/add-book"); // Redirige vers la page d'ajout d'ouvrage
    },
  },
};
</script> -->
