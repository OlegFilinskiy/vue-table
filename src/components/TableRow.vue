<template>
  <div>
    <div class="table__row row"
         v-for="(item, index) in items"
         :index="index"
         :key="index"
    >
      <div class="cell p-2" :style="cellWidth">{{index + 1}}</div>
      <div class="cell p-2"
           v-for="(cell, index) in item"
           :index="index"
           :key="index"
           :style="cellWidth"
      >
        {{cell}}
      </div>
    </div>
  </div>
</template>

<script>
  import Cell from './Cell'

  export default {
    components: {
        Cell
    },
    props: ['items', 'cellWidth']
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