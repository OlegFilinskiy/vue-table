<template>
  <main id="app" class="container py-4">
    <img class="logo d-block mx-auto mb-4" src="./assets/logo.svg" alt="StarWars logo">
    <div class="table">
      <div class="input-group my-3">
        <input type="text" class="form-control" v-model="searchAll" placeholder="Quick Search" aria-label="searchAll">
        <div class="input-group-append">
          <span class="input-group-text px-5" id="searchAll">Search filter</span>
        </div>
      </div>

      <app-table
          :rows="items"
          :columns="titles"
          :per-page="perPage"
          :search-filter="searchAll">
      </app-table>
    </div>
  </main>
</template>

<script>
  import json from './initialData.json'
  import AppTable from './components/AppTable'

  export default {
    name: 'app',
    components: {
      AppTable
    },
    data() {
      return {
        searchAll: '',
        myJson: json,
        titles: json.titles,
        items: json.items,
        totalItems: json.items.length,
        perPage: 10
      }
    }
  }
</script>

<style lang="sass" scoped>
  .table
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.45)
    padding: 2rem 3rem
    @media (max-width: 992px)
      padding: 1.5rem

    &__filters
      border-top: 1px solid #000

    &__wrapper
      overflow: auto
</style>
