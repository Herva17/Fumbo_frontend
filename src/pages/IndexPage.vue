<template>
  <q-layout view="hHh lpR fFf">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    />

    <Navbar />
    <q-separator spaced />

    <BannerSection />
    <q-separator spaced />

    <CarouselSection />
    <q-separator spaced />

    <StorySection />
    <q-separator spaced />

    <TestimonialSection />
    <q-separator spaced />

    <InfoSection />
  </q-layout>
</template>

<script setup>
import Navbar from 'src/components/MainNavbar.vue'
import BannerSection from 'src/components/BannerSection.vue'
import CarouselSection from 'src/components/CarouselSection.vue'
import StorySection from 'src/components/StorySection.vue'
import TestimonialSection from 'src/components/TestimonialSection.vue'
import InfoSection from 'src/components/InfoSection.vue'
</script>
