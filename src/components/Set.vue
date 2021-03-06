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
                <input v-model.lazy="openID" class="input" type="text" placeholder="Open by ID" />
              </p>
              <p class="control">
                <button @click="open" class="button">Open</button>
              </p>
            </div>
          </div>
        </div>
        <Sorter @sort="setOrder" />
      </nav>
      <div class="level">
        <div class="level-left">
          <PickerText name="Titre" @pick="setFilter" />
          <PickerText name="Description" @pick="setFilter" />
          <Picker name="Periodes" @pick="setFilter" />
          <Picker name="Materiaux" @pick="setFilter" />
          <Picker name="Categories" @pick="setFilter" />
          <Picker name="Formes" @pick="setFilter" />
          <Picker name="Sujets" @pick="setFilter" />
          <PickerText name="Lieu de conservation" @pick="setFilter" />
        </div>
      </div>
      <progress class="progress is-primary" max="100" v-bind:class="{ 'is-hidden': loaded }"></progress>
      <div class="columns is-multiline">
        <div
          v-for="item in konmariItems"
          :key="item.id"
          class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
          :data-id="item.id"
        >
          <Card :entity="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import _ from "lodash";
import directus from "../mixins/Directus.vue";
import Card from "./Card.vue";
import Sorter from "./Sorter.vue";
import Picker from "./Picker.vue";
import PickerText from "./Picker-text.vue";

export default {
  components: {
    Card,
    Sorter,
    Picker,
    PickerText
  },
  mixins: [directus],
  data() {
    return {
      loaded: false,
      iItems: [],
      items: [],
      order: "id",
      title: "",
      description: "",
      periode: "",
      materiau: "",
      categorie: "",
      forme: "",
      sujet: "",
      lieuDeConservation: "",
      openID: ""
    };
  },
  async created() {
    this.items = await this.fetchItems();
    this.loaded = true;
  },
  computed: {
    konmariItems() {
      let konmari = this.items;
      let title = this.title;
      let description = this.description;
      let lieuDeConservation = this.lieuDeConservation;

      if (title != "") {
        konmari = _.filter(konmari, function(i) {
          return _.includes(_.toLower(i.titre), _.toLower(title));
        });
      }

      if (description != "") {
        konmari = _.filter(konmari, function(i) {
          return _.includes(_.toLower(i.description), _.toLower(description));
        });
      }

      if (this.periode != "") {
        let periode = this.periode.id;
        konmari = _.filter(konmari, function(i) {
          return i.periode != null && i.periode.id === periode;
        });
      }

      if (this.materiau != "") {
        let materiau = this.materiau.id;
        konmari = _.filter(konmari, function(i) {
          return i.materiau != null && i.materiau.id === materiau;
        });
      }

      if (this.categorie != "") {
        let categorie = this.categorie.id;
        konmari = _.filter(konmari, function(i) {
          return i.categorie != null && i.categorie.id === categorie;
        });
      }

      if (this.forme != "") {
        let forme = this.forme.id;
        konmari = _.filter(konmari, function(i) {
          return i.forme != null && i.forme.id === forme;
        });
      }

      if (this.sujet != "") {
        let sujet = this.sujet.id;
        konmari = _.filter(konmari, function(i) {
          let ids = _.map(i.sujets, "sujet.id");
          return _.includes(ids, sujet);
        });
      }

      if (lieuDeConservation != "") {
        konmari = _.filter(konmari, function(i) {
          return _.includes(
            _.toLower(i.lieu_de_conservation),
            _.toLower(lieuDeConservation)
          );
        });
      }

      return _.sortBy(konmari, [this.order]);
    }
  },
  methods: {
    setOrder(order) {
      if (order === "name") {
        this.order = "titre";
      } else {
        this.order = "id";
      }
    },
    setFilter(name, value) {
      if (name === "Periodes") {
        this.periode = value;
      } else if (name === "Materiaux") {
        this.materiau = value;
      } else if (name === "Categories") {
        this.categorie = value;
      } else if (name === "Formes") {
        this.forme = value;
      } else if (name === "Sujets") {
        this.sujet = value;
      } else if (name === "Titre") {
        this.title = value;
      } else if (name === "Description") {
        this.description = value;
      } else if (name === "Lieu de conservation") {
        this.lieuDeConservation = value;
      }
    },
    open() {
      this.$router.push({
        name: "itemDescription",
        params: { id: this.openID }
      });
    }
  }
};
</script>