<template>
  <div class="content" v-html="description"></div>
</template>

<script>
  export default {
    props: ['description'],
  }
</script>