<template>
  <main id="app" class="container py-4">
    <img class="logo d-block mx-auto mb-4" src="./assets/logo.svg" alt="StarWars logo">
    <div class="table">
      <table-head :titles="titles" />
      <table-row v-for="(item, index) in items"
                 :item="item"
                 :index="index"
                 :key="index"
                 :styleToCell="cellWidth" />
    </div>

    <!--Bootstrap Pagination-->
    <!--<div class="overflow-auto mt-4 text-center">-->
      <!--<div>-->
        <!--<b-pagination size="md"-->
                      <!--align="center"-->
                      <!--:total-rows="100"-->
                      <!--v-model="currentPage"-->
                      <!--:per-page="10" />-->
      <!--</div>-->
    <!--</div>-->

    <!--vuejs-paginate-->
    <!--<paginate-->
      <!--v-model="page"-->
      <!--:page-count="20"-->
      <!--:page-range="3"-->
      <!--:margin-pages="2"-->
      <!--:click-handler="clickCallback"-->
      <!--:prev-text="'Prev'"-->
      <!--:next-text="'Next'"-->
      <!--:container-class="'pagination'"-->
      <!--:page-class="'page-item'">-->
    <!--</paginate>-->
  </main>
</template>

<script>
  import json from './initialData.json'
  import TableHead from './components/TableHead'
  import TableRow from './components/TableRow'

  export default {
    name: 'app',
    components: {
      tableHead: TableHead,
      tableRow: TableRow
    },
    data() {
      return {
        myJson: json,
        titles: json.titles,
        items: json.items,
        totalItems: 0,
        perPage: 10,
        currentPage: 1
      }
    },
    methods: {
      clickCallback (pageNum) {
        console.log(pageNum)
      }
    },
    computed: {
      cellWidth() {
        return {
          width: (100 / (Object.keys(this.titles).length + 1)) + '%'
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .table
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.45)
    padding: 2rem 3rem
</style>
