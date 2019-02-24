<template>
  <div class="table__row row mx-0">
    <div class="cell p-2"
         :style="styleToCell"
    >{{index + 1}}</div>

    <div class="cell p-2"
         v-for="(cell, index) in item"
         :key="index"
         :style="styleToCell"
    >{{cell}}</div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'styleToCell', 'index']
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