<template>
  <div>
    <div class="cell p-2"
         v-for="(cell, index) in item"
         index="index"
         key="index"
         :style="cellWidth"
    >
      {{cell}}
    </div>
  </div>

</template>

<script>
  export default {
    props: ['item', 'cellWidth']
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