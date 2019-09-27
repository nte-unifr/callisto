<template>
  <div>
    <div :id="entity.id" class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ entity.titre }}
        </p>
        <p class="card-header-icon">
          <span class="tag is-dark is-rounded">#{{ entity.id }}</span>
        </p>
      </header>
      <div class="card-content">
        <div class="media">
          <div v-if="entity.image" class="media-left">
            <figure class="image is-96x96">
              <img :src="entity.image.data.thumbnails[0].url" alt="">
            </figure>
          </div>
          <div class="media-content">
            <p class="content">{{ prettyDescription }}</p>
          </div>
        </div>
        <div class="tags">
          <span v-for="(tag, index) in tags" :key="index" class="tag"><strong>{{ tag }}</strong></span>
        </div>
      </div>
      <footer class="card-footer">
        <a @click="show(true)" class="card-footer-item"><span class="icon"><i class="fad fa-file-search"></i></span> Details</a>
      </footer>
    </div>
    <Item :id="entity.id" :isActive="shown" @show="show" />
  </div>
</template>

<script>
  import he from 'he'
  import _ from 'lodash'
  import st from 'striptags'
  import Item from './Item.vue'

  export default {
    components: {
      Item
    },
    data() {
      return {
        shown: false,
      }
    },
    props: {
      entity: Object,
    },
    computed: {
      prettyDescription: function() {
        let description = ''
        let size = 120
        if (this.entity.description) {
          description = he.decode(this.entity.description)
          description = st(description)
          if (description.length > size) {
            description = description.substring(0, size) + '...'
          }
        }
        return description
      },
      tags: function() {
        let tags = []
        let e = this.entity
        if (_.has(e, 'categorie.nom')) { tags.push(e.categorie.nom) }
        if (_.has(e, 'periode.nom')) { tags.push(e.periode.nom) }
        if (_.has(e, 'materiau.nom')) { tags.push(e.materiau.nom) }
        if (_.has(e, 'forme.nom')) { tags.push(e.forme.nom) }
        return tags
      }
    },
    methods: {
      show: function(status) {
        this.shown = status
      }
    }
  }
</script>

<style scoped>
  .card {
    display:flex;
    flex-direction: column;
    height: 100%;
  }
  .card-footer {
    margin-top: auto;
  }
</style>