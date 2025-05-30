<template>
  <div class="group-page">
    <!-- Header du groupe -->
    <div class="group-header">
      <h1>{{ groupName }}</h1>
      <p class="group-description">{{ groupDescription }}</p>
    </div>

    <!-- Zone de création de post -->
    <div class="post-creator glassmorphism-effect">
      <div class="user-avatar">
        <img :src="currentUser.avatar" alt="Votre avatar" />
      </div>
      <div class="post-input-container">
        <textarea
          v-model="newPostContent"
          placeholder="Partagez vos pensées avec le groupe..."
          @focus="showPostOptions = true"
        ></textarea>

        <!-- Prévisualisation image -->
        <div v-if="postImagePreview" class="image-preview">
          <img :src="postImagePreview" alt="Prévisualisation" />
          <button @click="removeImage" class="remove-image-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Options de post (apparaissent au focus) -->
        <div v-if="showPostOptions" class="post-options">
          <div class="options-left">
            <label for="post-image-upload" class="image-upload-btn">
              <i class="fas fa-image"></i>
              <input
                id="post-image-upload"
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                hidden
              />
            </label>
            <button class="emoji-picker-btn">
              <i class="far fa-smile"></i>
            </button>
          </div>
          <button class="post-submit-btn" :disabled="!newPostContent" @click="submitPost">
            Publier
          </button>
        </div>
      </div>
    </div>

    <!-- Fil des publications -->
    <div class="posts-feed">
      <div v-for="post in posts" :key="post.id" class="post-card glassmorphism-effect">
        <div class="post-header">
          <img :src="post.author.avatar" class="post-author-avatar" />
          <div class="post-author-info">
            <span class="author-name">{{ post.author.name }}</span>
            <span class="post-time">{{ formatTime(post.createdAt) }}</span>
          </div>
        </div>

        <div class="post-content">
          <p>{{ post.content }}</p>
          <img v-if="post.image" :src="post.image" class="post-image" />
        </div>

        <div class="post-actions">
          <button class="like-btn">
            <i class="far fa-heart"></i>
            <span>{{ post.likes }}</span>
          </button>
          <button class="comment-btn">
            <i class="far fa-comment"></i>
            <span>Commenter</span>
          </button>
          <button class="share-btn">
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Données du groupe (à remplacer par un appel API)

const groupName = ref('Nom du Groupe')
const groupDescription = ref('Description du groupe et ses règles de communauté')

// Données utilisateur (à remplacer par le store/vuex)
const currentUser = ref({
  id: 'user1',
  name: 'Vous',
  avatar: 'https://i.pravatar.cc/150?img=3',
})

// Fonctionnalité de publication
const newPostContent = ref('')
const postImage = ref(null)
const postImagePreview = ref(null)
const showPostOptions = ref(false)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    postImage.value = file
    postImagePreview.value = URL.createObjectURL(file)
  }
}

const removeImage = () => {
  postImage.value = null
  postImagePreview.value = null
}

const submitPost = async () => {
  if (!newPostContent.value) return

  const formData = new FormData()
  formData.append('content', newPostContent.value)
  if (postImage.value) {
    formData.append('image', postImage.value)
  }

  try {
    // Simulation d'envoi au backend
    const newPost = {
      id: Date.now().toString(),
      author: currentUser.value,
      content: newPostContent.value,
      image: postImagePreview.value,
      likes: 0,
      createdAt: new Date(),
    }

    posts.value.unshift(newPost)

    // Réinitialiser le formulaire
    newPostContent.value = ''
    postImage.value = null
    postImagePreview.value = null
    showPostOptions.value = false

    // Ici vous feriez normalement un appel API:
    // await axios.post(`/api/groups/${groupId}/posts`, formData)
  } catch (error) {
    console.error('Erreur lors de la publication:', error)
  }
}

// Affichage des posts
const posts = ref([
  {
    id: '1',
    author: {
      id: 'user2',
      name: 'Cœur brisé',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    content:
      'Bonjour à tous! Je suis nouveau ici et je voulais partager mes premières impressions sur ce groupe.',
    likes: 4,
    createdAt: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: '2',
    author: {
      id: 'user3',
      name: 'Rubier',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    content:
      'The https://crazy-cattle3d.org colorful, bouncy graphics perfectly match its silly tone. Expressive sheep and',
    likes: 2,
    createdAt: new Date(Date.now() - 3600000 * 7),
  },
])

// Fonction utilitaire
const formatTime = (date) => {
  const now = new Date()
  const diff = now - date
  const hours = Math.floor(diff / 3600000)

  if (hours < 1) {
    const minutes = Math.floor(diff / 60000)
    return `il y a ${minutes} min`
  } else if (hours < 24) {
    return `il y a ${hours} h`
  } else {
    return date.toLocaleDateString()
  }
}

// Chargement initial
onMounted(async () => {
  // Ici vous feriez normalement un appel API pour charger les infos du groupe:
  // const response = await axios.get(`/api/groups/${groupId}`)
  // groupName.value = response.data.name
  // groupDescription.value = response.data.description
  // posts.value = response.data.posts
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.group-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #2d3748;
}

.group-header {
  margin-bottom: 30px;
  text-align: center;
}

.group-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
}

.group-description {
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.5;
}

/* Zone de création de post */
.post-creator {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  transition: all 0.2s ease;
}

.glassmorphism-effect {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.post-input-container {
  flex: 1;
}

.post-input-container textarea {
  width: 100%;
  border: none;
  resize: none;
  min-height: 80px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding: 10px;
  border-radius: 8px;
  background: rgba(247, 250, 252, 0.7);
  transition: all 0.2s ease;
}

.post-input-container textarea:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}

.image-preview {
  position: relative;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  max-height: 300px;
}

.image-preview img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

.remove-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-image-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.post-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.options-left {
  display: flex;
  gap: 15px;
}

.image-upload-btn,
.emoji-picker-btn {
  background: none;
  border: none;
  color: #4a5568;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.image-upload-btn:hover,
.emoji-picker-btn:hover {
  background: #edf2f7;
  color: #2d3748;
}

.post-submit-btn {
  background: #4299e1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.post-submit-btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.post-submit-btn:not(:disabled):hover {
  background: #3182ce;
}

/* Fil des publications */
.posts-feed {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.post-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.post-author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.post-author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: #1a202c;
}

.post-time {
  font-size: 0.8rem;
  color: #718096;
}

.post-content p {
  margin-bottom: 15px;
  line-height: 1.5;
  white-space: pre-line;
}

.post-image {
  width: 100%;
  border-radius: 8px;
  margin-top: 10px;
  max-height: 400px;
  object-fit: contain;
}

.post-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #edf2f7;
}

.like-btn,
.comment-btn,
.share-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 20px;
  transition: all 0.2s ease;
}

.like-btn:hover,
.comment-btn:hover,
.share-btn:hover {
  background: #edf2f7;
}

.like-btn i,
.comment-btn i,
.share-btn i {
  font-size: 1rem;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-card {
  animation: fadeIn 0.3s ease-out forwards;
}

.post-card:nth-child(1) {
  animation-delay: 0.1s;
}
.post-card:nth-child(2) {
  animation-delay: 0.2s;
}
.post-card:nth-child(3) {
  animation-delay: 0.3s;
}
</style>
