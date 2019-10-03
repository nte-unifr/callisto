<template>
  <div v-bind:class="{ 'is-active': active }" class="modal">
    <div @click="close" class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <img :src="media">
          </figure>
        </div>
        <div class="card-content">
          <div v-html="about" class="content"></div>
        </div>
      </div>
    </div>
    <button @click="close" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
  export default {
    props: ['about', 'media', 'active'],
    methods: {
      close() {
        this.$emit('toggle', false)
      }
    }
  }
</script>