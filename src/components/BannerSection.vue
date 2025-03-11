<template>
  <div class="banner-container">
    <q-img src="/img/book3.jpg" class="banner-image">
      <div class="banner-overlay">
        <div class="text-h4 text-white text-center text-weight-bold">Bienvenue sur Fumbo</div>
        <div class="text-subtitle1 text-white text-center q-mt-md">
          Là où les histoires prennent vie et trouvent leur public.
        </div>
      </div>
    </q-img>
  </div>
</template>

<style scoped>
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
