<template>
  <table class="table is-bordered is-striped is-fullwidth">
    <tbody>
      <tr v-for="property in properties" :key="property.id">
        <td>{{ property.attr }}</td>
        <td>{{ property.val }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: ['properties'],
  }
</script>