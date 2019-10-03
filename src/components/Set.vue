<template>
  <section class="section">
    <div class="container is-fluid">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{ konmariItems.length }} / {{ items.length }}</strong> elements
            </p>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input v-model.lazy="title" class="input" type="text" placeholder="Find by title">
              </p>
              <p class="control">
                <button class="button">
                  Search
                </button>
              </p>
            </div>
          </div>
        </div>
        <Sorter @sort="setOrder" />
      </nav>
      <progress class="progress is-primary" max="100" v-bind:class="{ 'is-hidden': loaded }"></progress>
      <div class="columns is-multiline">
        <div v-for="item in konmariItems" :key="item.id" class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd" :data-id="item.id">
          <Card :entity="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import _ from 'lodash'
  import directus from '../mixins/Directus.vue'
  import Card from './Card.vue'
  import Sorter from './Sorter.vue'

  export default {
    components: {
      Card, Sorter
    },
    mixins: [directus],
    data() {
      return {
        loaded: false,
        iItems: [],
        items: [],
        order: 'id',
        title: ''
      }
    },
    async created() {
      this.items = await this.fetchItems()
      this.loaded = true
    },
    computed: {
      konmariItems() {
        let konmari = this.items
        let title = this.title
        if (title != '') {
          konmari = _.filter(konmari, function(i) {
            return _.includes(_.toLower(i.titre), _.toLower(title))
          })
        }
        return _.sortBy(konmari, [this.order])
      }
    },
    methods: {
      setOrder(order) {
        if (order === 'name') {
          this.order = 'titre'
        } else {
          this.order = 'id'
        }
      }
    }
  }
</script>