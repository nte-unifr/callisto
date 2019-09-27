<template>
  <div class="level-right">
    <div class="level-item">
      <span class="icon is-medium">
        <i class="fad fa-sort-amount-down-alt fa-lg"></i>
        <span class="is-sr-only">Sort by</span>
      </span>
    </div>
    <div class="level-item">
      <div class="buttons has-addons">
        <button @click="sort('id')" v-bind:class="idState" class="button">ID</button>
        <button @click="sort('name')" v-bind:class="nameState" class="button">Name</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        order: 'id',
      }
    },
    computed: {
      idState: function () {
        return { 'is-primary': this.order === 'id' }
      },
      nameState: function () {
        return { 'is-primary': this.order === 'name' }
      }
    },
    methods: {
      sort: function(by) {
        this.order = by
        this.$emit('sort', this.order)
      }
    }
  }
</script>