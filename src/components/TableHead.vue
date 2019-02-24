<template>
  <div class="table__head row mx-0">
    <div class="cell p-2" :style="cellWidth">№ <i class="fa fa-sort"></i></div>
    <div class="cell p-2"
         v-for="(title, index) in titles"
         :key="index"
         :index="index"
         :style="cellWidth"
    >{{title}} <i class="fa fa-sort"></i></div>
  </div>
</template>

<script>
  export default {
    props: ['titles'],
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
    &__head
      border-bottom: 1px solid #000
      border-top: 1px solid #000

    .cell
      border-right: 1px solid #000
      display: flex
      justify-content: space-between
      align-items: center
      cursor: pointer
      font-weight: bold
      background: #e9e9e9

      &:first-child
        border-left: 1px solid #000
</style>