<template>
  <div class="testimonial">
    <img :src="userImage" class="profile-img" width="300px" />
    <div class="user-name">Thierry</div>
    <blockquote class="testimonial-text">
      "Grâce à Fumbo, je connais mieux maintenant l’histoire de mon pays et je me sens beaucoup plus
      proche de ma communauté"
    </blockquote>
    <q-btn label="Devenir membre" color="black" class="cta-btn" />
  </div>
</template>

<script setup>
const userImage = new URL('/img/icone.jpg', import.meta.url).href
</script>

<style scoped>
.testimonial {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.user-name {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}
.testimonial-text {
  font-size: 18px;
  font-style: italic;
  margin: 20px 0;
  color: #333;
}
.cta-btn {
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
