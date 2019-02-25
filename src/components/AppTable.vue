<template>
  <div class="table__wrapper">
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th v-for="(col, index) in columns"
            @click="sortBy(index)"
            :class="{ active: sortKey == col }">
          {{ col }}
          <span class="arrow" :class="sortOrders[index] > 0 ? 'asc' : 'dsc'">
            </span>
        </th>
        <th>Select</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in filteredRows">
        <td>{{ index + 1 }}</td>
        <td v-for="cell in row">
          {{ cell }}
        </td>
        <td>
          <button type="button"
                  class="btn btn-warning btn-sm btn-edit"
                  @click="onEdit(index)"
          >Edit</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p class="text-center mt-3">Page {{pageNumber + 1}} of {{pageCount}}</p>
    <div class="d-flex justify-content-center mt-3">
      <button
          class="btn btn-primary mr-2"
          :disabled="pageNumber === 0"
          @click="prevPage">
        Previous
      </button>
      <button
          class="btn btn-primary btn-nav"
          :disabled="pageNumber >= pageCount -1"
          @click="nextPage">
        Next
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      rows: Array,
      columns: Object,
      searchFilter: String,
      perPage: Number
    },
    data() {
      let sortOrders = {}
      Object.keys(this.columns).forEach(function (col) {
        sortOrders[col] = 1
      });

      return {
        sortKey: '',
        sortOrders: sortOrders,
        pageNumber: 0
      }
    },
    computed: {
      pageCount(){
        let l = this.rows.length;
        let s = this.perPage;
        return Math.floor(l/s);
      },
      filteredRows() {
        let start = this.pageNumber * this.perPage;
        let end = start + this.perPage;

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
          }).slice(start, end)
        }
        return rows.slice(start, end)
      }
    },
    methods: {
      sortBy(index) {
        this.pageNumber = 0;
        this.sortKey = index;
        this.sortOrders[index] = this.sortOrders[index] * -1
      },
      nextPage() {
        this.pageNumber++;
      },
      prevPage() {
        this.pageNumber--;
      },
      onEdit(index) {
        console.log(index);
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
    white-space: nowrap

    &.active
      .arrow
        opacity: 1

  td, th
    border-right: 1px solid #dee2e6
    &:first-child
      border-left: 1px solid #dee2e6
  tr
    &:last-child
      td
        border-bottom: 1px solid #dee2e6

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

  .btn-nav
    width: 100px
</style>