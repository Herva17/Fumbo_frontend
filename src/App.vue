<template>
  <q-layout>
    <NavBar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/MainNavbar.vue'
</script>
