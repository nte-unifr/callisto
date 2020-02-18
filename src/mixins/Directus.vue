<script>
  import axios from 'axios'
  import _ from 'lodash'

  export default {
    data() {
      return {
        directus: {
          api: 'https://eddb.unifr.ch',
          path: '/items/Fiches',
          project: 'callisto',
          about: '/items/about?fields=content,media.*',
          set: {
            fields: 'id,titre,description,datation_debut,datation_fin,image.private_hash,materiau.*,categorie.*,periode.*,forme.*,sujets.sujet.*',
            sort: 'id',
            limit: '-1',
            status: 'published'
          },
          item: {
            fields: '*,materiau.nom,categorie.nom,periode.nom,centre_producteur.nom,forme.nom,sujets.sujet.nom,image.private_hash',
          },
          eddb: {
            project: 'nte',
            about: '/items/about',
            projects: '/items/projects?sort=title'
          }
        }
      }
    },
    methods: {
      async fetchItems() {
        try {
          const response = await axios.get(this.directus.api + '/' + this.directus.project + this.directus.path, {
            params: {
              fields: this.directus.set.fields,
              sort: this.directus.set.sort,
              limit: this.directus.set.limit,
              status: this.directus.set.status
            }
          })
          return response.data.data
        } catch (error) {
          return []
        }
      },
      // item has title, description, image, properties[], sources[]
      fetchItem(id) {
        axios.get(this.directus.api + '/' + this.directus.project + this.directus.path + '/' + id + '?fields=' + this.directus.item.fields).then(result => {
          let data = result.data.data
          let properties = []
          let sources = []
          let images = []

          if (_.has(data, 'datation_debut') && _.has(data, 'datation_fin')) { properties.push({ attr: "Datation", val: data.datation_debut + ' à ' + data.datation_fin}) }
          if (_.has(data, 'periode.nom')) { properties.push({ attr: "Période", val: data.periode.nom }) }
          if (_.has(data, 'materiau.nom')) { properties.push({ attr: "Matériau", val: data.materiau.nom }) }
          if (_.has(data, 'categorie.nom')) { properties.push({ attr: "Catégorie", val: data.categorie.nom }) }
          if (_.has(data, 'forme.nom')) { properties.push({ attr: "Forme", val: data.forme.nom }) }
          if (_.has(data, 'sujets')) {
            let sujets = []
            for (let sujet of data.sujets) {
              sujets.push(sujet.sujet.nom)
            }
            properties.push({ attr: 'Sujets', val: _.join(sujets, ', ')})
          }
          if (_.has(data, 'dimensions')) { properties.push({ attr: "Dimensions", val: data.dimensions }) }
          if (_.has(data, 'lieu_de_decouverte')) { properties.push({ attr: "Lieu de découverte", val: data.lieu_de_decouverte }) }
          if (_.has(data, 'lieu_de_conservation')) { properties.push({ attr: "Lieu de conservation", val: data.lieu_de_conservation }) }
          if (_.has(data, 'centre_producteur.nom')) { properties.push({ attr: "Centre producteur", val: data.centre_producteur.nom }) }

          if (_.has(data, 'sources')) { sources.push({ attr: "", val: data.sources }) }
          if (_.has(data, 'bibliographie')) { sources.push({ attr: "Bibliographie", val: data.bibliographie }) }

          if (_.has(data, 'image') && data.image != null) { images.push(data.image.private_hash) }
          
          this.id = id
          this.title = data.titre
          this.description = data.description
          this.images = images
          this.properties = properties
          this.sources = sources
        })
      },
      async fetchFilters(filter) {
        axios.get(this.directus.api + '/' + this.directus.project + '/items/' + filter + '?fields=*&sort=nom').then(result => {
          this.choices = result.data.data
        })
      },
      fetchAbout() {
        axios.get(this.directus.api + '/' + this.directus.project + this.directus.about).then(result => {
          let data = result.data.data[0]
          this.about = data.content
          if (_.has(data, 'media.data.full_url')) {
            this.aboutImage = data.media.data.full_url
          }
        })
      },
      fetchEddbAbout() {
        axios.get(this.directus.api + '/' + this.directus.eddb.project + this.directus.eddb.about).then(result => {
          this.eddbAbout = result.data.data[0].content
        })
      },
      fetchEddbProjects() {
        axios.get(this.directus.api + '/' + this.directus.eddb.project + this.directus.eddb.projects).then(result => {
          this.eddbProjects = result.data.data
        })
      },
      getThumbnail(hash, key) {
        // keys are 400cr, 800co, 2400co
        return this.directus.api + '/' + this.directus.project + '/assets/' + hash + '?key=' + key
      }
    }
  }
</script>