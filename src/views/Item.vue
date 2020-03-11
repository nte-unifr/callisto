<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="card">
        <header class="card-header">
          <div class="card-header-icon">
            <figure class="image is-96x96" v-if="images[0] && pimage">
              <img v-bind:src="getThumbnail(images[0], '400cr')">
            </figure>
          </div>
          <div class="card-header-title">
            {{ title }}
          </div>
          <div class="card-header-icon card-id has-text-dark is-size-5">
            {{ id }}&nbsp;<i class="fad fa-hashtag"></i>
          </div>
        </header>
        <div class="card-content">
          <article v-if="error" class="message is-danger">
            <div class="message-body">
              {{ error }}
            </div>
          </article>
          <ItemTabs :description="description" :images="images" :pimage="pimage" :properties="properties" :sources="sources" />
          <router-view :description="description" :images="images" :pimage="pimage" :properties="properties" :sources="sources"></router-view>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<script>
  import utils from '../mixins/Utils.vue'
  import directus from '../mixins/Directus.vue'
  import ItemTabs from '../components/ItemTabs.vue'

  export default {
    components: { ItemTabs },
    mixins: [utils, directus],
    data() {
      return {
        id: '',
        title: '',
        description: '',
        images: [],
        properties: [],
        sources: [],
        error: ''
      }
    },
    created() {
      this.clipHtml()
      this.fetchItem(this.$route.params.id)
    }
  }
</script>

<style scoped>
  .card-id {
    margin-right: 40px;
  }
</style>