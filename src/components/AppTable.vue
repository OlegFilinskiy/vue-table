<template>
  <table>
    <thead>
    <tr>
      <th v-for="(col, index) in columns"
          @click="sortBy(index)"
          :class="{ active: sortKey == col }">
        {{ col }}
        <span class="arrow" :class="sortOrders[index] > 0 ? 'asc' : 'dsc'">
          </span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in filteredRows">
      <td v-for="cell in row">
        {{ cell }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      rows: Array,
      columns: Object,
      searchFilter: String
    },
    data() {
      let sortOrders = {}
      Object.keys(this.columns).forEach(function (col) {
        sortOrders[col] = 1
      });
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    computed: {
      filteredRows() {
        let sortKey = this.sortKey;
        let searchFilter = this.searchFilter && this.searchFilter.toLowerCase();
        let order = this.sortOrders[sortKey] || 1;
        let rows = this.rows;
        if (searchFilter) {
          rows = rows.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(searchFilter) > -1
            })
          })
        }
        if (sortKey) {
          rows = rows.slice().sort(function (a, b) {
            a = a[sortKey];
            b = b[sortKey];
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return rows
      }
    },
    methods: {
      sortBy(index) {
        this.sortKey = index;
        this.sortOrders[index] = this.sortOrders[index] * -1
      }
    }
  }
</script>

<style lang="sass" scoped>
  table
    width: 100%

  th
    background: #e9e9e9
    cursor: pointer

  td, th
    border-right: 1px solid #dee2e6
    &:first-child
      border-left: 1px solid #dee2e6
  tr
    &:last-child
      td
        border-bottom: 1px solid #dee2e6

  th
    &.active
      .arrow
        opacity: 1

  .arrow
    display: inline-block
    vertical-align: middle
    width: 0
    height: 0
    margin-left: 5px
    opacity: 0.66

  .arrow
    &.asc
      border-left: 4px solid transparent
      border-right: 4px solid transparent
      border-bottom: 4px solid #000

  .arrow
    &.dsc
      border-left: 4px solid transparent
      border-right: 4px solid transparent
      border-top: 4px solid #000
</style>