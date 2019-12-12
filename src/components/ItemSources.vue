<template>
  <div>
    <div class="box content" v-for="source in sources" :key="source.id">
      <p v-if="source.attr" class="title is-6">{{ source.attr }}</p>
      <p v-html="source.val"></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['sources'],
  }
</script>