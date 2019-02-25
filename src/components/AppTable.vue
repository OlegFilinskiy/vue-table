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

    <div class="pagin">
      <div class="text-center mt-3">Page {{pageNumber + 1}} of {{pageCount}}</div>
      <div class="d-flex justify-content-center align-items-center mt-3 pb-1">
        <button
          class="btn btn-primary btn-nav"
          :disabled="pageNumber === 0"
          @click="prevPage">
          Previous
        </button>
        <ul class="pagin__list mx-2 mx-md-3 my-0 p-0 d-flex justify-content-center align-items-center">
          <li class="pagin__item"
              v-for="(page, index) in pages"
          >
            <a href="#"
               @click.prevent="changePage(index)"
               :class="{ current: (pageNumber + 1) == page }"
            >
              {{ page }}
            </a>
          </li>
        </ul>
        <button
          class="btn btn-primary btn-nav"
          :disabled="pageNumber >= pageCount -1"
          @click="nextPage">
          Next
        </button>
      </div>
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
        pageNumber: 0,
        pageRange: 2,
        isEdit: false
      }
    },
    computed: {
      pageCount() {
        let l = this.rows.length;
        let s = this.perPage;
        return Math.floor(l / s);
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
      },
      rangeStart() {
        let start = this.pageNumber - this.pageRange;
        return (start > 0) ? start : 1;
      },
      rangeEnd() {
        let end = this.pageNumber + this.pageRange;
        return (end < this.pageCount) ? end : this.pageCount;
      },
      pages() {
        let pages = [];
        for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
          pages.push(i);
        }
        return pages
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
      changePage(index) {
        this.pageNumber = index;
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

  .pagin
    &__list
      list-style: none

    &__item
      a
        display: block
        padding: 0 10px
        border-radius: 4px
        text-decoration: none
        color: #999
        margin: 0 6px
        background: transparent
        transition: all .2s
        border: 1px solid #ccc

        &:hover,
        &.current
          border-color: #007bff
          color: #007bff

        @media (max-width: 568px)
          padding: 0 5px

  .btn-nav
    width: 100px

    @media (max-width: 568px)
      width: 60px
      font-size: 12px
      padding: 3px
</style>