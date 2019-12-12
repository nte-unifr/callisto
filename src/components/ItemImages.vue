<template>
  <div class="columns">
    <div class="column">
      <figure class="has-text-centered">
        <img class="item-image" v-bind:src="getThumbnail(images[0], 800)" v-bind:data-zoom="getThumbnail(images[0], 2400)">
      </figure>
    </div>
    <div class="column item-magnifier">
      <article class="message is-dark">
        <div class="message-body">
          <div class="columns">
            <div class="column is-2 is-size-3">
              <i class="fad fa-info-circle"></i>
            </div>
            <div class="column">
              Hover the image to zoom into details.
              <br>(Touch on mobile)
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import directus from '../mixins/Directus.vue'
  import Drift from 'drift-zoom'

  export default {
    mixins: [directus],
    props: ['images'],
    mounted() {
      let itemImage = this.$el.querySelector(".item-image")
      let itemMagnifier = this.$el.querySelector(".item-magnifier")
      new Drift(itemImage, {
        paneContainer: itemMagnifier,
        inlinePane: false
      })
    },
  }
</script>

<style scoped>
  .item-image:hover {
    cursor: zoom-in;
  }
  .item-magnifier {
    position: relative;
  }
</style>