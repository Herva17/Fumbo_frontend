<template>
    <section class="contact-container" id="contact">
      <BackButton />
      <div class="map-container">
        <div class="map-iframe">
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            title="map"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.1161132383813!2d29.205895874185824!3d-1.6737196361706503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd0f26ed024195%3A0x41de59a10eb8289!2sHibaigle%20SAS!5e0!3m2!1sfr!2scd!4v1725280512461!5m2!1sfr!2scd"
          ></iframe>
        </div>
        <h2 class="section-title" @mouseover="hovered = true" @mouseleave="hovered = false">
          <span class="section-title-span">Contact</span>
        </h2>
        <div class="contact-details">
          <div class="contact-box">
            <div class="contact-info">
              <span class="contact-label">Address</span>
              <span>8 Av.Beni Q. Katindo, C.Goma Nord-Kivu/Goma, RDC</span>
              <span class="contact-desc">N'hésite pas à nous contacter pour un guide professionnel.</span>

              <div class="contact-form">
                <form action="">
                  <div class="form-group">
                    <label for="name">Contact</label>
                    <input type="text" id="name" :placeholder="contact" />
                  </div>

                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" :placeholder="write" />
                  </div>

                  <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" rows="4" :placeholder="write"></textarea>
                  </div>

                  <div>
                    <button type="submit">Contactez-nous</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

</template>

<script setup>
import { ref } from 'vue'
import BackButton from '../components/BackButton.vue'

const hovered = ref(false)
</script>

<style>
.contact-container {
  position: relative;
  padding: 60px 50px;
}

.map-container {
  position: relative;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background-color: rgba(255, 255, 255, 0.05);
}

.map-iframe {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #0369a1;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.3s ease;
}

.section-title:hover {
  color: #0c4a6e;
  transform: scale(1.05) translateY(-5px);
}

.section-title-span {
  padding: 5px 10px;
  background-color: #e2e8f0;
  display: inline-block;
}

.contact-details {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.contact-box {
  background-color: rgba(3, 7, 18, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
}

.contact-info {
  color: white;
  font-size: 14px;
}

.contact-label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.contact-desc {
  display: block;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

.contact-form {
  padding-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: white;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #0369a1;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #0369a1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0c4a6e;
}
</style>
