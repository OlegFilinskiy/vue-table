<template>
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
</template>

<script>
  export default {
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
      nextPage() {
        this.pageNumber++;
      },
      prevPage() {
        this.pageNumber--;
      },
      changePage(index) {
        this.pageNumber = index;
      }
    }
  }
</script>

<style lang="sass" scoped>
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