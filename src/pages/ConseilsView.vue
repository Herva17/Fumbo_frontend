<template>
  <div class="layout" ref="pdfContent">
    <!-- <aside class="sidebar">
      
      <nav>
        <ul>
          <li><a href="#astuces"><i class="fas fa-lightbulb"></i> Astuces</a></li>
          <li><a href="#recommandations"><i class="fas fa-check-circle"></i> Recommandations</a></li>
        </ul>
      </nav>
      
    </aside> -->

    <main class="content">
      
      <div class="action-buttons">
        
        <button @click="printPage"><i class="fas fa-print"></i> Imprimer</button>
        <button @click="sharePage"><i class="fas fa-share-alt"></i> Partager</button>
        <button @click="exportPDF"><i class="fas fa-file-pdf"></i> Exporter PDF</button>
        <BackButton />
      </div>

      <h1 class="page-title">Astuces & Recommandations pour la Diffusion de Contenu</h1>

      <section class="section" id="astuces">
        <h2 class="section-title"><i class="fas fa-lightbulb icon"></i> Astuces</h2>
        <ul class="section-list">
          <li>Utilisez des titres clairs et accrocheurs.</li>
          <li>Structurez le contenu avec des paragraphes courts.</li>
          <li>Ajoutez des visuels pertinents.</li>
          <li>Relisez pour corriger fautes et incohérences.</li>
          <li>Optimisez pour le SEO (balises, mots-clés).</li>
        </ul>
      </section>

      <section class="section" id="recommandations">
        <h2 class="section-title"><i class="fas fa-check-circle icon"></i> Recommandations</h2>
        <ul class="section-list">
          <li>Citez vos sources (droits d’auteur).</li>
          <li>Publiez régulièrement.</li>
          <li>Adaptez le ton à votre public.</li>
          <li>Évitez les contenus offensants.</li>
          <li>Testez la lisibilité sur mobile et desktop.</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '../components/BackButton.vue'

const pdfContent = ref(null)

const printPage = () => {
  window.print()
}

const sharePage = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: 'Découvrez ces astuces et recommandations !',
        url: window.location.href,
      })
    } catch {
      alert("Le partage a été annulé ou a échoué.")
    }
  } else {
    alert("Le partage n'est pas supporté sur ce navigateur.")
  }
}

const exportPDF = async () => {
  const html2pdf = (await import('html2pdf.js')).default
  const opt = {
    margin: 0.5,
    filename: 'astuces_recommandations.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }
  html2pdf().from(pdfContent.value).set(opt).save()
}
</script>

<style>

.page-root {
  margin: 0;
  background-color: #f3f4f6;
  font-family: 'Segoe UI', sans-serif;
  
}

.layout {
  display: flex;
  min-height: 100vh;
}

/* .sidebar {
  width: 220px;
  background-color: #0f172a;
  color: white;
  padding: 30px 20px;
  position: fixed;
  height: 100%;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin-bottom: 20px;
}

.sidebar nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}

.sidebar nav ul li a i {
  margin-right: 10px;
}

.sidebar nav ul li a:hover {
  color: #38bdf8;
} */

.content {
  margin-left: 240px;
  padding: 40px 30px;
  flex: 1;
}

.page-title {
  font-size: 32px;
  margin-bottom: 40px;
  color: #0f172a;
  animation: fadeIn 1s ease-in-out;
  font-weight: bold;
}

.section {
  background-color: #ffffff;
  border-left: 4px solid #0369a1;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease-in-out;
  
}

.section-title {
  font-size: 22px;
  color: #0369a1;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.section-title .icon {
  margin-right: 8px;
}

.section-list {
  list-style: disc;
  padding-left: 20px;
}

.section-list li {
  margin-bottom: 10px;
  transition: transform 0.3s;
  font-weight: bold;
}

.section-list li:hover {
  transform: translateX(5px);
}

/* Boutons */
.action-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.action-buttons button {
  background-color: #0369a1;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.action-buttons button i {
  margin-right: 6px;
}

.action-buttons button:hover {
  background-color: #0c4a6e;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
   
</style>