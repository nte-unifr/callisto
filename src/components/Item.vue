<template>
  <div class="modal" v-bind:class="{ 'is-active': isActive }">
    <div @click="close" class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{ title }}
          </p>
          <p class="card-header-icon">
            {{ id }}&nbsp;<i class="fad fa-hashtag"></i>
          </p>
        </header>
        <div class="card-content">
          <div class="columns">
            <div class="column">
              <figure class="image is-1by1">
                <img v-bind:src="getThumbnail(image, 600)">
              </figure>
            </div>
            <div class="column is-two-thirds">
              <div class="tabs is-fullwidth">
                <ul>
                  <li v-bind:class="{ 'is-active': contentDisplay === 'description' }">
                    <a @click="contentDisplay = 'description'">
                      <span class="icon"><i class="fad fa-align-justify"></i></span>
                      <span>Description</span>
                    </a>
                  </li>
                  <li v-bind:class="{ 'is-active': contentDisplay === 'properties' }">
                    <a @click="contentDisplay = 'properties'">
                      <span class="icon"><i class="fad fa-table"></i></span>
                      <span>Properties</span>
                    </a>
                  </li>
                  <li v-bind:class="{ 'is-active': contentDisplay === 'sources' }">
                    <a @click="contentDisplay = 'sources'">
                      <span class="icon"><i class="fad fa-asterisk"></i></span>
                      <span>Sources</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="content">
                <div v-bind:class="{ 'is-hidden': contentDisplay != 'description' }">
                  {{ description }}
                </div>
                <table class="table is-bordered is-striped" v-bind:class="{ 'is-hidden': contentDisplay != 'properties' }">
                  <tr v-for="property in properties" :key="property.id">
                    <td>{{ property.attr }}</td>
                    <td>{{ property.val }}</td>
                  </tr>
                </table>
                <div v-bind:class="{ 'is-hidden': contentDisplay != 'sources' }">
                  <div class="box" v-for="source in sources" :key="source.id">
                    <p v-if="source.attr"><strong>{{ source.attr }}</strong></p>
                    <p v-html="source.val"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="close()" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
  import directus from '../mixins/Directus.vue'

  export default {
    props: {
      id: Number,
      isActive: Boolean
    },
    mixins: [directus],
    data() {
      return {
        title: '',
        description: '',
        image: '',
        properties: [],
        sources: [],
        contentDisplay: 'description',
        isLoaded: false
      }
    },
    watch: {
      isActive() {
        if (!this.isLoaded) {
          this.isLoaded = true
          this.fetchItem()
        }
      }
    },
    methods: {
      close() {
        this.$emit('show', false)
      }
    }
  }
</script>