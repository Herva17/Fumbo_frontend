<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="q-pa-md">
        <q-breadcrumbs class="q-mb-md">
          <q-breadcrumbs-el label="Groupes" to="/groupes" />
          <q-breadcrumbs-el :label="group.name" />
        </q-breadcrumbs>

        <q-card class="group-detail-card q-mb-lg shadow-5">
          <q-img :src="groupImagePath" :alt="group.name" style="height: 300px">
            <div class="absolute-bottom text-white bg-transparent">
              <div class="text-h4 text-weight-bold">{{ group.name }}</div>
              <div class="text-subtitle1">{{ group.shortDescription }}</div>
            </div>
          </q-img>

          <q-separator />
        </q-card>

        <div class="row q-col-gutter-md">
          <div class="col-md-8">
            <q-card class="q-mb-md shadow-3">
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="discussions" icon="forum" label="Discussions" />
                <q-tab name="events" icon="event" label="Événements" />
                <q-tab name="members" icon="people" label="Membres" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="discussions">
                  <!-- Formulaire de création de post simplifié -->
                  <q-card flat bordered class="q-mb-md">
                    <q-card-section>
                      <div class="text-h6 text-weight-medium">Rédiger un nouveau post</div>
                      <q-input
                        v-model="newPost.content"
                        label="Partagez vos pensées..."
                        type="textarea"
                        outlined
                        dense
                        class="q-mb-sm"
                        rows="3"
                      />
                      <div class="row justify-between items-center">
                        <div>
                          <q-btn
                            round
                            dense
                            flat
                            icon="image"
                            @click="triggerFileInput"
                            class="q-mr-sm"
                          />
                          <input
                            ref="fileInput"
                            type="file"
                            accept="image/*"
                            style="display: none"
                            @change="handleImageUpload"
                            multiple
                          />
                        </div>
                        <q-btn
                          label="Publier"
                          flat
                          color="primary"
                          @click="publishPost"
                          :loading="isPublishing"
                        />
                      </div>
                      <!-- Aperçu des images sélectionnées -->
                      <div v-if="newPost.images.length > 0" class="q-mt-sm">
                        <div class="row q-gutter-sm">
                          <div
                            v-for="(img, index) in newPost.images"
                            :key="index"
                            class="relative-position"
                          >
                            <q-img
                              :src="img.url"
                              style="width: 100px; height: 100px"
                              class="rounded-borders"
                            />
                            <q-btn
                              icon="close"
                              size="xs"
                              round
                              dense
                              flat
                              class="absolute-top-right bg-white"
                              @click="removeImage(index)"
                            />
                          </div>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>

                  <!-- Liste des discussions -->
                  <div v-if="discussionsWithFullPaths.length > 0">
                    <q-list bordered separator>
                      <q-item
                        v-for="discussion in discussionsWithFullPaths"
                        :key="discussion.id"
                        class="q-my-sm discussion-item"
                      >
                        <q-item-section>
                          <!-- En-tête avec avatar, nom et date -->
                          <div class="row items-center q-mb-sm">
                            <q-avatar size="40px" class="q-mr-sm">
                              <img :src="discussion.authorAvatarPath" :alt="discussion.author" />
                            </q-avatar>
                            <div>
                              <div class="text-weight-bold">{{ discussion.author }}</div>
                              <div class="text-caption text-grey">
                                {{ formatDateTime(discussion.date) }}
                              </div>
                            </div>
                          </div>

                          <!-- Titre et contenu -->
                          <div class="text-h6 text-weight-bold q-mb-xs">{{ discussion.title }}</div>
                          <div class="text-body1 q-mb-md">{{ discussion.content }}</div>

                          <!-- Image (si existante) -->
                          <div
                            v-if="discussion.images && discussion.images.length > 0"
                            class="q-mb-md"
                          >
                            <div class="row q-gutter-sm">
                              <div
                                v-for="(img, index) in discussion.images"
                                :key="index"
                                class="relative-position"
                              >
                                <q-img
                                  :src="img"
                                  style="max-width: 200px; max-height: 200px; border-radius: 8px"
                                  class="cursor-pointer"
                                  @click="openImageDialog(img)"
                                />
                              </div>
                            </div>
                          </div>

                          <!-- Actions (like/réponse) -->
                          <div class="row items-center q-mt-sm">
                            <q-btn
                              flat
                              dense
                              icon="favorite_border"
                              label="Like"
                              class="q-mr-md"
                              @click="toggleLike(discussion)"
                            />
                            <q-btn
                              flat
                              dense
                              icon="chat_bubble_outline"
                              label="Répondre"
                              @click="toggleReply(discussion.id)"
                            />
                          </div>

                          <!-- Zone de réponse (apparaît quand on clique sur Répondre) -->
                          <div v-if="activeReply === discussion.id" class="q-mt-md">
                            <q-input
                              v-model="replyText"
                              outlined
                              placeholder="Votre réponse..."
                              type="textarea"
                              dense
                              class="q-mb-sm"
                            />
                            <div class="row justify-end">
                              <q-btn
                                label="Annuler"
                                flat
                                color="grey"
                                class="q-mr-sm"
                                @click="activeReply = null"
                              />
                              <q-btn
                                label="Envoyer"
                                color="primary"
                                @click="sendReply(discussion)"
                                :loading="isSendingReply"
                              />
                            </div>
                          </div>

                          <!-- Liste des réponses (optionnel) -->
                          <div
                            v-if="discussion.replies && discussion.replies.length > 0"
                            class="q-mt-md replies-section"
                          >
                            <div
                              v-for="reply in discussion.replies"
                              :key="reply.id"
                              class="q-py-sm reply-item"
                            >
                              <div class="row items-center q-mb-xs">
                                <q-avatar size="30px" class="q-mr-sm">
                                  <img :src="reply.authorAvatarPath" :alt="reply.author" />
                                </q-avatar>
                                <div>
                                  <div class="text-caption text-weight-medium">
                                    {{ reply.author }}
                                  </div>
                                  <div class="text-caption text-grey">
                                    {{ formatDateTime(reply.date) }}
                                  </div>
                                </div>
                              </div>
                              <div class="text-body2">{{ reply.content }}</div>
                            </div>
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div v-else class="text-center q-pa-md text-grey">
                    Aucune discussion pour le moment.
                  </div>
                </q-tab-panel>

                <q-tab-panel name="events">
                  <!-- Contenu des événements -->
                  <div v-if="group.events && group.events.length > 0">
                    <q-list bordered separator>
                      <q-item
                        v-for="event in group.events"
                        :key="event.id"
                        clickable
                        v-ripple
                        class="q-my-sm"
                      >
                        <q-item-section avatar>
                          <q-icon name="event" color="primary" size="lg" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-bold">{{ event.title }}</q-item-label>
                          <q-item-label caption>
                            {{ formatDateTime(event.date) }} · {{ event.location }}
                          </q-item-label>
                          <q-item-label class="q-mt-xs">{{ event.description }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-btn label="Participer" color="positive" outline size="sm" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div v-else class="text-center q-pa-md text-grey">Aucun événement à venir</div>
                </q-tab-panel>

                <q-tab-panel name="members">
                  <!-- Liste des membres -->
                  <div v-if="group.membersList && group.membersList.length > 0">
                    <div class="row q-col-gutter-md">
                      <div
                        v-for="member in membersWithAvatarPath.slice(0, 5)"
                        :key="member.id"
                        clickable
                      >
                        <q-card flat bordered class="member-card">
                          <q-img
                            :src="member.avatarPath"
                            :alt="member.name"
                            ratio="1"
                            class="rounded-borders"
                          />
                          <q-card-section class="text-center">
                            <div class="text-subtitle1 text-weight-medium">{{ member.name }}</div>
                            <div class="text-caption text-grey">{{ member.role }}</div>
                            <q-btn
                              v-if="!member.isCurrentUser"
                              label="Suivre"
                              color="primary"
                              size="sm"
                              outline
                              class="q-mt-sm"
                            />
                          </q-card-section>
                        </q-card>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center q-pa-md text-grey">Aucun membre à afficher</div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>

          <!-- Sidebar -->
          <div class="col-md-4">
            <q-card class="q-mb-md">
              <q-card-section class="bg-white text-black">
                <div class="text-h6">À propos de ce groupe</div>
              </q-card-section>
              <q-card-section>
                <p>{{ group.aboutText }}</p>
              </q-card-section>
            </q-card>

            <q-card>
              <q-card-section class="bg-white text-black">
                <div class="text-h6">Membres actifs</div>
              </q-card-section>
              <q-card-section>
                <q-list dense>
                  <q-item
                    v-for="member in membersWithAvatarPath.slice(0, 5)"
                    :key="member.id"
                    clickable
                  >
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="member.avatarPath" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ member.name }}</q-item-label>
                      <q-item-label caption
                        >Dernière activité: {{ member.lastActivity }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Dialog pour afficher l'image en grand -->
        <q-dialog v-model="imageDialog.open">
          <q-img :src="imageDialog.src" style="max-width: 90vw; max-height: 90vh" />
        </q-dialog>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const route = useRoute()
const tab = ref('discussions')
const imageDialog = ref({
  open: false,
  src: '',
})
const fileInput = ref(null)

const cleanupOldImages = () => {
  const now = Date.now()
  const oneWeek = 7 * 24 * 60 * 60 * 1000 // 1 semaine en ms

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('img-')) {
      const timestamp = parseInt(key.split('-')[1])
      if (now - timestamp > oneWeek) {
        localStorage.removeItem(key)
      }
    }
  }
}

// Appelez cette fonction périodiquement ou au montage du composant
onMounted(() => {
  cleanupOldImages()
})

const newPost = ref({
  content: '',
  images: [], // Stocke maintenant des objets { file: File, url: string }
  isAnonymous: false,
})

const isPublishing = ref(false)

const group = ref({
  id: null,
  name: 'blague',
  shortDescription: 'groupe sur les humours africaines',
  aboutText: 'blagues afriacaines',
  image: 'default-group.jpg', // Nom du fichier par défaut
  members: 2,
  discussions: 0,
  createdAt: '15/01/2025',
  tags: [],
  creator: 'herve bamba',
  discussionsList: [],

  events: ['blague du jour'],
  membersList: [
    {
      id: 1,
      name: 'Herve bamba',
      avatar: 'herve.jpg',
      role: 'membre actif',
      lastActivity: 'il y a 2 heures',
    },
    {
      id: 2,
      name: 'simba babalao',
      avatar: 'simba.jpg',
      role: 'admin',
      lastActivity: "A l'instant",
    },
  ],
})

// Chemin complet vers l'image du groupe
const groupImagePath = computed(() => {
  return `/img/${group.value.image}`
})

// Nouveaux états pour gérer les réponses
const activeReply = ref(null)
const replyText = ref('')
const isSendingReply = ref(false)

const membersWithAvatarPath = computed(() => {
  return group.value.membersList.map((member) => ({
    ...member,
    avatarPath: `/img/${member.avatar}`,
  }))
})

const discussionsWithFullPaths = computed(() => {
  if (!group.value.discussionsList || !Array.isArray(group.value.discussionsList)) {
    return []
  }
  return group.value.discussionsList.map((discussion) => ({
    ...discussion,
    authorAvatarPath: `/img/${discussion.authorAvatar}`,
    // On ne transforme plus les chemins ici car les images sont déjà en base64
  }))
})

// Fonction pour liker une discussion
const toggleLike = (discussion) => {
  discussion.isLiked = !discussion.isLiked
  discussion.likes += discussion.isLiked ? 1 : -1
}

// Fonction pour afficher/masquer la zone de réponse
const toggleReply = (discussionId) => {
  activeReply.value = activeReply.value === discussionId ? null : discussionId
  if (!activeReply.value) replyText.value = ''
}

// Fonction pour envoyer une réponse
const sendReply = async (discussion) => {
  if (!replyText.value.trim()) return

  isSendingReply.value = true
  try {
    // Simuler un envoi API
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Remplacer 'simba.jpg' par l'avatar de l'utilisateur actuel
    // Par exemple, si l'utilisateur actuel est stocké dans une variable user
    const currentUserAvatar = 'simba.jpg' // À remplacer par la variable réelle de l'utilisateur

    const newReply = {
      id: Date.now(),
      author: 'simba', // Remplacez par le nom de l'utilisateur actuel
      authorAvatar: currentUserAvatar, // Utilisez le nom du fichier avatar
      authorAvatarPath: `/img/${currentUserAvatar}`, // Ajoutez le chemin complet
      content: replyText.value,
      date: new Date().toISOString(),
    }

    if (!discussion.replies) discussion.replies = []
    discussion.replies.unshift(newReply)
    discussion.comments += 1

    replyText.value = ''
    activeReply.value = null

    $q.notify({
      type: 'positive',
      message: 'Réponse envoyée!',
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: "Erreur lors de l'envoi",
    })
  } finally {
    isSendingReply.value = false
  }
}

const formatDateTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

const openImageDialog = (src) => {
  imageDialog.value.src = src
  imageDialog.value.open = true
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const files = event.target.files
  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.type.match('image.*')) {
      const url = URL.createObjectURL(file)
      newPost.value.images.push({ file, url })
    }
  }

  // Réinitialiser l'input pour permettre la sélection des mêmes fichiers
  event.target.value = ''
}

const removeImage = (index) => {
  // Libérer l'URL de l'objet
  URL.revokeObjectURL(newPost.value.images[index].url)
  newPost.value.images.splice(index, 1)
}

const publishPost = async () => {
  if (!newPost.value.content.trim()) {
    $q.notify({
      type: 'negative',
      message: 'Veuillez écrire un message',
    })
    return
  }

  isPublishing.value = true
  try {
    // Convertir toutes les images en base64
    const imagePromises = newPost.value.images.map((imgObj) => fileToBase64(imgObj.file))
    const savedImages = await Promise.all(imagePromises)

    // Créer la nouvelle discussion avec les images en base64
    const newDiscussion = {
      id: Date.now(),
      title:
        newPost.value.content.substring(0, 30) + (newPost.value.content.length > 30 ? '...' : ''),
      content: newPost.value.content,
      author: newPost.value.isAnonymous ? 'Anonyme' : 'Utilisateur Actuel',
      authorAvatar: 'default-avatar.jpg',
      isAnonymous: newPost.value.isAnonymous,
      date: new Date().toISOString(),
      comments: 0,
      images: savedImages, // Stocker directement les données base64
      likes: 0,
      isLiked: false,
      replies: [],
    }

    // Initialiser discussionsList si non défini
    if (!group.value.discussionsList) {
      group.value.discussionsList = []
    }

    // Ajouter la nouvelle discussion
    group.value.discussionsList.unshift(newDiscussion)
    group.value.discussions += 1

    // Réinitialiser le formulaire
    newPost.value = {
      content: '',
      images: [],
      isAnonymous: false,
    }

    $q.notify({
      type: 'positive',
      message: 'Post publié avec succès!',
    })
  } catch (error) {
    console.error('Erreur lors de la publication:', error)
    $q.notify({
      type: 'negative',
      message: 'Erreur lors de la publication du post',
    })
  } finally {
    isPublishing.value = false
  }
}
// Helper function to convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

onMounted(async () => {
  const groupSlug = route.params.slug
  try {
    const response = await api.get(`/groups/${groupSlug}`)
    group.value = response.data

    // Exemple de données pour la démo
    if (!group.value.aboutText) {
      group.value.aboutText =
        "Bonjour étranger! J'aimerais faire votre connaissance, alors racontez-moi votre histoire."
    }
    if (!group.value.rules.length) {
      group.value.rules = [
        'Respectez les autres membres',
        'Pas de spam ou de publicité',
        'Contenu approprié uniquement',
      ]
    }

    // Si l'image n'est pas définie, utiliser une image par défaut
    if (!group.value.image) {
      group.value.image = 'default-group.jpg'
    }
  } catch (error) {
    console.error('Erreur lors du chargement du groupe:', error)
    // Rediriger vers la page 404 si le groupe n'existe pas
    // router.push('/404')
  }
})
</script>

<style lang="scss" scoped>
.group-detail-card {
  border-radius: 8px;
  overflow: hidden;

  .q-img {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    }

    .absolute-bottom {
      padding: 20px;
    }
  }
}

.member-card {
  transition: transform 0.3s;
  border-radius: 8px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .q-img {
    height: 150px;
  }
}

.q-tab-panel {
  padding: 16px;
}

.q-item {
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
}

// Style pour l'aperçu des images
.relative-position {
  position: relative;
  .q-btn {
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
}

.discussion-item {
  background: white;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;
}

.replies-section {
  border-left: 3px solid #eee;
  padding-left: 12px;
  margin-left: 8px;
}

.reply-item {
  border-bottom: 1px solid #f5f5f5;
  &:last-child {
    border-bottom: none;
  }
}

.q-btn {
  text-transform: none;
  font-size: 0.9em;
}
</style>
