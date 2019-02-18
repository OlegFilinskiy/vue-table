<template>
  <div class="table__row row" :item="item">
    <div class="cell p-2" :style="cellWidth">{{index += 1}}</div>
    <div class="cell p-2" v-for="(cell, index) in item" :index="index" :key="index" :style="cellWidth">
      {{cell}}
    </div>
  </div>
</template>

<script>
  // import Cell from './Cell'

  export default {
      // components: {
      //     Cell
      // },
      props: {
          item: Object
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
    &__row
      border-bottom: 1px solid #000

    .cell
      border-right: 1px solid #000

      &:first-child
        border-left: 1px solid #000
</style>