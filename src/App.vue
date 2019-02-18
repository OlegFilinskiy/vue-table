<template>
  <main class="container py-4">
    <img class="logo d-block mx-auto mb-4" src="./assets/logo.svg" alt="StarWars logo">
    <div class="table">
      <!--<table-head :titles="titles"/>-->
      <!--<table-row :items="items" :style="cellWidth"/>-->
      <div class="table__head row">
        <div class="cell p-2" :style="cellWidth">№ <i class="fa fa-sort"></i></div>
        <div class="cell p-2" v-for="(title, index) in titles" :index="index" :key="index" :style="cellWidth">
          {{title}} <i class="fa fa-sort"></i>
        </div>
      </div>
      <div class="table__row row" v-for="(item, index) in items" :index="index" :key="index">
        <div class="cell p-2" :style="cellWidth">
          {{index + 1}}
        </div>
        <div class="cell p-2" v-for="cell in item" :style="cellWidth">
          {{cell}}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import json from './initialData.json'
  // import TableHead from './components/TableHead'
  // import TableRow from './components/TableRow'

  export default {
    name: 'app',
    // components: {
    //   tableHead: TableHead
    // },
    data() {
      return {
        myJson: json,
        titles: json.titles,
        items: json.items
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

    &__head
      border-bottom: 1px solid #000
      border-top: 1px solid #000

      .cell
        display: flex
        justify-content: space-between
        align-items: center
        cursor: pointer
        font-weight: bold
        background: #e9e9e9

    &__row
      border-bottom: 1px solid #000

    .cell
      border-right: 1px solid #000

      &:first-child
        border-left: 1px solid #000
</style>
