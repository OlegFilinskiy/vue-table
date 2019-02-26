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
      <app-table></app-table>
      <!--<app-pagination></app-pagination>-->
    </div>
  </main>
</template>

<script>
  import AppTable from './components/AppTable'
  import AppPagination from './components/Pagination'

  export default {
    name: 'app',
    components: {
      AppTable
    },
    data() {
      return {}
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
