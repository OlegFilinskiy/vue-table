<template>
  <main class="container py-5">
    <h1 class="text-center mb-5">My table</h1>
    <div class="table px-3">
      <TableHead :titles="titles" />
      <!--<TableRow v-for="(item, index) in items" :index="index" :key="index" />-->
      <div class="table__row row" v-for="(item, index) in items" :index="index" :key="index">
        <div class="cell p-2" :style="cellWidth">
          {{index += 1}}
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
    import TableHead from './components/TableHead'
    // import TableRow from './components/TableRow'

    export default {
        name: 'app',
        components: {
            TableHead
        },
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

    &__row
      border-bottom: 1px solid #000

    .cell
      border-right: 1px solid #000

      &:first-child
        border-left: 1px solid #000
</style>
