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
      <table-head :titles="titles" />
      <table-row v-for="(item, index) in filteredAllObjects"
                 :item="item"
                 :index="index"
                 :key="index"
                 :styleToCell="cellWidth" />
    </div>

    <!--Bootstrap Pagination-->
    <div class="overflow-auto mt-4 text-center">
      <div>
        <b-pagination size="md"
                      align="center"
                      :total-rows="totalItems"
                      v-model="currentPage"
                      :per-page="10" />
      </div>
    </div>
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
        totalItems: json.items.length,
        perPage: 10,
        currentPage: 1,
        searchAll: '',
        sortParam: ''
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
      },
      filteredAllObjects() {
        return this.items.filter(item => {

          for (let prop in item) {
            if(this.searchAll==='') return true;
            else return item[prop].toLowerCase().indexOf(this.searchAll.toLowerCase()) !== -1
          }
        })
      },
      sortedList(sortParam) {
        // if (typeof this.sortParam === "string") {
        //   return this.items.sort(sortByString)
        // } else if (typeof this.sortParam === "number") {
        //   return this.items.sort(sortByNumber)
        // } else {
        //   return this.items;
        // }
      }
    }
  }

  var sortByString = function (d1, d2) {return (d1.title.toLowerCase() > d2.title.toLowerCase()) ? 1 : -1;};
  var sortByNumber = function (d1, d2) { return (d1.price > d2.price) ? 1 : -1; };
</script>

<style lang="sass" scoped>
  .table
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.45)
    padding: 2rem 3rem

    &__filters
      border-top: 1px solid #000
</style>
