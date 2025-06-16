import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAbonnementStore = defineStore('abonnement', () => {
  // Liste des auteurs auxquels l'utilisateur est abonné (toujours un tableau)
  const abonnements = ref([])
  // Nombre d'abonnés par auteur (objet : { [id_auteur]: nombre })
  const abonnésCount = ref({})

  // Ajouter un abonnement (FormData)
 async function ajouterAbonnement(idAuteur, idAbonne) {
  try {
    if (!idAuteur || !idAbonne) return { succes: false, message: "id manquant" }
    const formData = new FormData()
    formData.append('id_auteur', idAuteur)
    formData.append('id_abonne', idAbonne)
    const res = await axios.post(
      `http://localhost:81/Api_bibliotheque/abonnement/ajouter/?user=herva&mdp=mdp`,
      formData
    )
    return res.data
  } catch (err) {
    return { succes: false, message: err.message }
  }
}

  // Récupérer le nombre d'abonnés pour un auteur (FormData)
  async function compterAbonnesAuteur(idAuteur) {
    try {
      const formData = new FormData()
      formData.append('id_auteur', idAuteur)
      const res = await axios.post(
        `http://localhost/Api_bibliotheque/abonnement/compter_abonnes_auteur/?user=herva&mdp=mdp`,
        formData
      )
      // Stocke le nombre dans l'objet abonnésCount
      abonnésCount.value[idAuteur] = res.data?.nombre || 0
      return abonnésCount.value[idAuteur]
    } catch (err) {
      console.error('Erreur lors du comptage des abonnés:', err)
      abonnésCount.value[idAuteur] = 0
      return 0
    }
  }

  // Vérifier si abonné (sécurisé)
  function isAbonne(idAuteur) {
    return (abonnements.value || []).includes(idAuteur)
  }

  // Réinitialiser les abonnements (utile pour logout)
  function resetAbonnements() {
    abonnements.value = []
    abonnésCount.value = {}
  }

  return {
    abonnements,
    abonnésCount,
    ajouterAbonnement,
    compterAbonnesAuteur,
    isAbonne,
    resetAbonnements,
  }
})
