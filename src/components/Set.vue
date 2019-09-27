<template>
  <section class="section">
    <div class="container is-fluid">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{ items.length }}</strong> elements
            </p>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Find by title">
              </p>
              <p class="control">
                <button class="button">
                  Search
                </button>
              </p>
            </div>
          </div>
        </div>
        <Sorter @sort="sortItems" />
      </nav>
      <div class="columns is-multiline">
        <div v-for="item in items" :key="item.id" class="column is-one-quarter" :data-id="item.id">
          <Card :entity="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  import Card from './Card.vue'
  import Sorter from './Sorter.vue'

  export default {
    components: {
      Card, Sorter
    },
    data() {
      return {
        api: process.env.VUE_APP_API,
        path: 'items/Fiches',
        fields: 'id,titre,description,datation_debut,datation_fin,image.data,materiau.nom,categorie.nom,periode.nom,forme.nom,sujets.sujet.nom',
        sort: 'id',
        limit: -1,
        status: 'published',
        items: []
      }
    },
    created() {
      this.fetchItems()
    },
    methods: {
      fetchItems() {
        axios.get(this.api + this.path + '?fields=' + this.fields + '&sort=' + this.sort + '&limit=' + this.limit + '&status=' + this.status).then(result => {
          this.items = result.data.data
        })
      },
      sortItems(order) {
        if (order === 'name') {
          this.items = _.sortBy(this.items, ['titre'])
        } else {
          this.items = _.sortBy(this.items, ['id'])
        }
      }
    }
  }
</script>