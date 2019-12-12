<template>
  <div class="modal is-active">
    <div class="modal-background" @click="goBack"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-image">
          <figure v-if="aboutImage" class="image">
            <img :src="aboutImage" alt="" />
          </figure>
        </div>
        <div class="card-content">
          <div v-html="about" class="content"></div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="goBack"></button>
  </div>
</template>

<script>
  import rooting from '../mixins/Rooting.vue'
  import directus from '../mixins/Directus.vue'

  export default {
    mixins: [rooting, directus],
    data() {
      return {
        about: '',
        aboutImage: ''
      }
    },
    created() {
      this.fetchAbout()
    }
  }
</script>