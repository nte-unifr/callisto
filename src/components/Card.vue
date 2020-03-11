<template>
  <div :id="entity.id" class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ entity.titre }}
      </p>
      <p class="card-header-icon">
        {{ entity.id }}&nbsp;<i class="fad fa-hashtag"></i>
      </p>
    </header>
    <div class="card-content">
      <div class="media">
        <div v-if="entity.image && entity.image_publique" class="media-left">
          <figure class="image is-96x96">
            <img :src="getThumbnail(entity.image.private_hash, '400cr')" alt="">
          </figure>
        </div>
        <div class="media-content">
          <p class="content">{{ description }}</p>
        </div>
      </div>
      <div class="tags">
        <span v-for="(tag, index) in tags" :key="index" class="tag"><strong>{{ tag }}</strong></span>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="{ name: 'itemDescription', params: { id: entity.id }}" class="card-footer-item">
        <span class="icon"><i class="fad fa-file-search"></i></span> Details
      </router-link>
    </footer>
  </div>
</template>

<script>
  import _ from 'lodash'
  import utils from '../mixins/Utils.vue'
  import directus from '../mixins/Directus.vue'

  export default {
    mixins: [utils, directus],
    data() {
      return {
        shown: false,
      }
    },
    props: {
      entity: Object,
    },
    computed: {
      description: function() {
        return this.pretty(this.entity.description)
      },
      tags: function() {
        let tags = []
        let e = this.entity
        if (_.has(e, 'categorie.nom')) { tags.push(e.categorie.nom) }
        if (_.has(e, 'periode.nom')) { tags.push(e.periode.nom) }
        if (_.has(e, 'materiau.nom')) { tags.push(e.materiau.nom) }
        if (_.has(e, 'forme.nom')) { tags.push(e.forme.nom) }
        if (_.has(e, 'sujets')) {
          for (let sujet of e.sujets) {
            tags.push(sujet.sujet.nom)
          }
        }
        return tags
      }
    }
  }
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .card-footer {
    margin-top: auto;
  }
  .card-header-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .media-content {
    height: 96px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>