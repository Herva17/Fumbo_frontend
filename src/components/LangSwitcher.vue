<template>
  <q-select
    v-model="selectedLang"
    :options="languageOptions"
    dense
    outlined
    emit-value
    map-options
    class="custom-lang-select"
    dropdown-icon="language"
  >
    <!-- Affichage de la langue sélectionnée -->
    <template v-slot:selected>
      <div class="selected-lang">
        <img :src="getFlag(selectedLang)" class="lang-flag" alt="Flag" />
        <span>{{ getLangLabel(selectedLang) }}</span>
      </div>
    </template>

    <!-- Options dans la liste déroulante -->
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <img :src="getFlag(scope.opt.value)" class="lang-flag" alt="Flag" />
        </q-item-section>
        <q-item-section>
          {{ scope.opt.label }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { LocalStorage } from 'quasar'

const { locale } = useI18n()
const selectedLang = ref(locale.value)

// Liste des langues avec drapeaux
const languages = {
  'fr-FR': { label: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
  'en-US': { label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
  'sw-SW': { label: 'Dr Congo', flag: 'https://flagcdn.com/w40/cd.png' },
}

// Options pour `q-select`
const languageOptions = Object.entries(languages).map(([key, value]) => ({
  label: value.label,
  value: key,
}))

// Récupérer l'URL du drapeau
const getFlag = (lang) => languages[lang]?.flag || languages['fr-FR'].flag

// Récupérer le nom de la langue
const getLangLabel = (lang) => languages[lang]?.label || 'Français'

// Observer les changements de `selectedLang` pour modifier la langue
watch(selectedLang, (newLang) => {
  locale.value = newLang
  LocalStorage.set('selectedLanguage', newLang)
})

// Charger la langue enregistrée au démarrage
onMounted(() => {
  const savedLang = LocalStorage.getItem('selectedLanguage')
  if (savedLang) {
    selectedLang.value = savedLang
    locale.value = savedLang
  }
})
</script>

<style scoped>
/* Largeur et apparence générale */
.custom-lang-select {
  width: 160px;
  border-radius: 8px;
  background: #f9f9f9;
}

/* Style du champ sélectionné */
.selected-lang {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

/* Drapeaux */
.lang-flag {
  width: 24px;
  height: 16px;
  border-radius: 3px;
}

/* Option sélectionnée */
.q-item:hover {
  background-color: #f1f1f1;
}
</style>
