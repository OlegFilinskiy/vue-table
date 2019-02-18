<template>
  <div class="cell p-2" :cell="cell">
    {{cell}}
  </div>
</template>

<script>
    export default {
        props: {
            cell: [Number, String]
        },
        // computed: {
        //     cellWidth() {
        //         return {
        //             width: (100 / (Object.keys(this.titles).length + 1)) + '%'
        //         }
        //     }
        // }
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