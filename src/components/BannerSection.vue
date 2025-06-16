<template>
  <div class="cairn-style">
    <q-page class="home-page">
      <div class="banner-container">
        <q-img src="/img/hero-about.jpg" class="banner-image">
          <div class="banner-overlay">
            <div class="text-h4 text-white text-center text-weight-bold">Bienvenue sur Fumbo</div>
            <div class="text-subtitle1 text-white text-center q-mt-md">
              Là où les histoires prennent vie et trouvent leur public.
            </div>
          </div>
        </q-img>
      </div>
    </q-page>
  </div>
</template>

<style scoped>
.cairn-style {
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}
.home-background {
  min-height: 100vh;
  background: rgb(185, 208, 239); /* ou le même background que HomePage.vue */
}
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.banner-container {
  width: 100%;
  height: 300px;
  position: relative;
}
.banner-image {
  height: 100%;
  object-fit: cover;
}
.banner-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
}
</style>
