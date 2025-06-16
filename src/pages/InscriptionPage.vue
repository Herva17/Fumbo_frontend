<template>
  <q-page class="register-page flex flex-center">
    <div class="register-scroll-area">
      <q-card class="q-pa-md q-card-shadow animated-card">
        <!-- Affichage du message de succès en haut -->
        <q-dialog v-model="showSuccessModal" persistent>
          <q-card class="text-center success-card">
            <q-card-section>
              <q-icon name="thumb_up" size="50px" color="green" />
              <div class="text-h6 text-positive q-mt-sm">Votre compte a été créé avec succès !</div>
              <div class="text-caption q-mt-sm">Veiller vous connectez avec votre email</div>
              <q-spinner-dots size="40px" color="primary" class="q-mt-md" />
            </q-card-section>
          </q-card>
        </q-dialog>

        <!-- Titre et description motivationnelle -->
        <q-card-section>
          <div class="text-h4 text-center text-primary q-mb-sm">Créez un compte</div>
          <div class="text-center text-grey-8 q-mb-md" style="font-size: 16px;">
            Rejoignez la communauté Fumbo et partagez vos histoires, découvrez des ouvrages uniques, échangez avec d'autres passionnés et accédez à des livres gratuits ou exclusifs.<br>
            <span class="text-primary text-weight-bold">Publiez, lisez, inspirez et soyez inspiré !</span>
          </div>
        </q-card-section>

        <!-- Formulaire d'inscription -->
        <q-card-section>
          <q-form @submit="register" ref="formRef">
            <div class="text-caption text-grey-7 q-mb-xs">
              Votre nom d'auteur pour être reconnu par la communauté.
            </div>
            <q-input
              v-model="form.username"
              label="Nom"
              outlined
              dense
              class="q-mb-md"
              :rules="[(val) => !!val || 'Le nom est requis']"
            />
            <div class="text-caption text-grey-7 q-mb-xs">
              Votre prénom pour personnaliser votre profil.
            </div>
            <q-input
              v-model="form.prenom"
              label="Prénom"
              outlined
              dense
              class="q-mb-md"
              :rules="[(val) => !!val || 'Le prénom est requis']"
            />
            <div class="text-caption text-grey-7 q-mb-xs">
              Utilisez une adresse email valide pour recevoir les notifications et sécuriser votre compte.
            </div>
            <q-input
              v-model="form.email"
              label="Email"
              type="email"
              outlined
              dense
              class="q-mb-md"
              :rules="[validateEmail]"
            />
            <div class="text-caption text-grey-7 q-mb-xs">
              Choisissez un mot de passe sécurisé pour protéger votre compte.
            </div>
            <q-input
              v-model="form.password"
              label="Mot de passe"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
              class="q-mb-md"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="togglePasswordVisibility"
                />
              </template>
            </q-input>
            <div class="text-caption text-grey-7 q-mb-xs">
              Présentez-vous en quelques mots pour que les autres membres puissent mieux vous connaître.
            </div>
            <q-input
              v-model="form.bio"
              label="Biographie"
              outlined
              dense
              class="q-mb-md"
            />
            <div class="text-caption text-grey-7 q-mb-xs">
              Ajoutez une photo de profil pour personnaliser votre compte.
            </div>
            <q-uploader
              v-model="form.image"
              label="Télécharger une image"
              outlined
              dense
              class="q-mb-md"
              accept="image/*"
              @added="onImageAdded"
            />
            <div class="text-caption text-grey-7 q-mb-xs">
              Sélectionnez votre nationalité pour enrichir votre profil et découvrir des ouvrages de votre pays.
            </div>
            <q-select
              v-model="form.id_nationalite"
              label="Nationalité"
              outlined
              dense
              :options="nationalites"
              option-label="nom_nationalite"
              option-value="id_nationalite"
              emit-value
              map-options
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-img
                      :src="getFullUrl(scope.opt.image)"
                      style="width: 24px; height: 16px; border-radius: 50px;"
                      alt="Image de la nationalité"
                    />
                  </q-item-section>
                  <q-item-section>
                    {{ scope.opt.nom_nationalite }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-btn
              label="S'inscrire"
              type="submit"
              color="primary"
              unelevated
              class="full-width q-mt-md"
              :loading="isLoading"
            />
          </q-form>

          <!-- Affichage des messages d'erreur -->
          <div v-if="error" class="text-negative q-mt-md">{{ error }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useInscriptionStore } from '../stores/inscriptionStore.js'
import { useNationalitesStore } from '../stores/nationalitesStore.js'

// Initialisation du store
const inscriptionStore = useInscriptionStore()
const nationalitesStore = useNationalitesStore()
const router = useRouter()

// Chemin de base pour les fichiers/images (adapte si besoin)
const BASE_URL = 'http://localhost:81/'

// Fonction utilitaire pour corriger les chemins relatifs
function getFullUrl(path) {
  if (!path) return '/img/default-book.jpg'
  if (path.startsWith('http')) return path
  return BASE_URL + path.replace(/^(\.\.\/)+/, '')
}

// Fonction pour échapper les caractères spéciaux HTML
function escapeHtml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#039;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Formulaire réactif
const form = ref({
  username: '',
  prenom: '',
  email: '',
  password: '',
  bio: '',
  image: null,
  id_nationalite: null,
})

// Référence pour le formulaire
const formRef = ref(null)

// Gestion de la visibilité du mot de passe
const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Validation de l'email
const validateEmail = (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(val) || 'Veuillez entrer une adresse e-mail valide avec un arobase (@).'
}

// Méthode pour gérer l'ajout de l'image
const onImageAdded = (files) => {
  if (files.length > 0) {
    form.value.image = files[0] // Stocke le fichier sélectionné
    console.log('Image ajoutée :', files[0])
  }
}

// Chargement des nationalités au montage du composant
onMounted(() => {
  nationalitesStore.fetchNationalites()
  resetMessages() // Réinitialise les messages d'erreur et de succès
})

// Computed properties pour les nationalités et les états de chargement
const nationalites = computed(() => nationalitesStore.getNationalites)
const isLoading = computed(() => inscriptionStore.getIsLoading)
const error = computed(() => inscriptionStore.getError)


// État de la modale de succès
const showSuccessModal = ref(false)

// Méthodes
const register = async () => {
  console.log('Valeur de nationalité avant envoi :', form.value.id_nationalite)
  if (!form.value.id_nationalite) {
    console.error('Aucune nationalité sélectionnée !')
    return
  }

  // On échappe ici les champs texte
  const formToSend = {
    ...form.value,
    bio: escapeHtml(form.value.bio),
    username: escapeHtml(form.value.username),
    prenom: escapeHtml(form.value.prenom)
  }

  await inscriptionStore.registerUser(formToSend)

  if (!inscriptionStore.getError) {
    // Réinitialiser les validations du formulaire
    formRef.value.resetValidation()

    // Afficher la modale de succès
    showSuccessModal.value = true

    // Redirection après 5 secondes
    setTimeout(() => {
      showSuccessModal.value = false
      router.push('/connection')
    }, 5000)
  }
}

// Réinitialise les messages d'erreur et de succès
const resetMessages = () => {
  inscriptionStore.error = null
  inscriptionStore.successMessage = null
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #2575fc, #cbcbcb);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  /* Le scroll sera sur la page entière */
  overflow-y: auto;
  overflow-x: hidden; /* Empêche la barre de scroll horizontale */
}

.register-scroll-area {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  /* Pas de scroll ici */
  overflow: visible;
}

.q-card-shadow {
  max-width: 450px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.animated-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
}

.full-width {
  width: 100%;
}

.text-negative {
  color: #e53935;
  font-weight: bold;
  text-align: center;
}

.text-positive {
  color: #43a047;
  font-weight: bold;
  text-align: center;
}

.success-card {
  border: 1px solid #43a047;
  background-color: #e8f5e9;
  border-radius: 8px;
  padding: 20px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
