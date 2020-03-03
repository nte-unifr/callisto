import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Item from './views/Item.vue'
import ItemDescription from './components/ItemDescription.vue'
import ItemImages from './components/ItemImages.vue'
import ItemProperties from './components/ItemProperties.vue'
import ItemSources from './components/ItemSources.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/item/:id',
      name: 'item',
      component: Item,
      children: [
        {
          path: '',
          name: 'itemDescription',
          component: ItemDescription
        },
        {
          path: 'images',
          name: 'itemImages',
          component: ItemImages
        },
        {
          path: 'properties',
          name: 'itemProperties',
          component: ItemProperties
        },
        {
          path: 'sources',
          name: 'itemSources',
          component: ItemSources
        }
      ]
    },
    {
      path: '/fiche/:id',
      redirect: '/item/:id'
    }
  ]
})
