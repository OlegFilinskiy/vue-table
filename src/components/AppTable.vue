<template>
  <div class="table__wrapper">
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th v-for="(col, index) in columns"
            @click="sortBy(index)"
            :class="{ active: sortKey == index }"
        >
          <span>{{ col }}</span>
          <span class="arrow" :class="sortOrders[index] > 0 ? 'asc' : 'dsc'"></span>
        </th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in filteredRows">
        <td>{{ index + (pageNumber * 10) + 1 }}</td>
        <td v-for="(cell, key) in row">
          <span v-if="!isEdit">{{ cell }}</span>
          <input type="text"
                 class="input-edit"
                 :name="key"
                 :value="cell"
                 v-if="isEdit">
        </td>
        <td class="actions">
          <button type="button"
                  v-if="!isEdit"
                  class="btn btn-warning btn-sm btn-edit"
                  @click="onEdit(index)"
          >Edit
          </button>
          <button type="button"
                  v-if="isEdit"
                  class="btn btn-success btn-sm btn-edit"
                  @click="onSave(index)"
          >Save
          </button>
          <button type="button"
                  class="btn btn-danger btn-sm btn-edit"
                  @click="onDelete(index)"
          >Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      let sortOrders = {};
      Object.keys(this.titles).forEach(function (col) {
        sortOrders[col] = 1
      });
      return {
        sortOrders: sortOrders
      }
    },
    computed: {
      columns() {
        return this.$store.state.titles
      },
      rows() {
        return this.$store.state.items
      },
      searchAll() {
        return this.$store.state.searchAll
      },
      perPage() {
        return this.$store.state.perPage
      },
      totalItems() {
        return this.$store.getters.totalItems
      },
      pageNumber() {
        return this.$store.state.pageNumber
      },
      pageRange() {
        return this.$store.state.pageRange
      },
      sortKey() {
        return this.$store.state.sortKey
      },
      isEdit() {
        return this.$store.state.isEdit
      },
      pageCount() {
        return Math.floor(this.totalItems / this.perPage);
      },
      filteredRows() {
        let start = this.pageNumber * this.perPage;
        let end = start + this.perPage;
        let sortKey = this.sortKey;
        let searchFilter = this.searchAll && this.searchAll.toLowerCase();
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
      onEdit(index) {
        this.isEdit = !this.isEdit;
        console.log("onEdit", index);
      },
      onSave(index) {
        this.isEdit = !this.isEdit;
        console.log("onSave", index);
      },
      onDelete(index) {
        console.log("onDelete", index);
        this.rows.splice(index, 1)
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
        background: #cecece
        .arrow
          opacity: 1

    td, th
      border-right: 1px solid #dee2e6
      max-width: 80px
      font-size: 13px
      padding: .5rem
      vertical-align: middle

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

    .actions
      white-space: nowrap

      .btn
        font-size: 10px

    .input-edit
      max-width: 73px
      padding: 2px
</style>