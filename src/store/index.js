import Vue from 'vue'
import Vuex from 'vuex'
import json from '../initialData.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myJson: json,
    columns: json.titles,
    rows: json.items,
    perPage: 10,
    searchAll: '',
    pageNumber: 0,
    pageRange: 2,
    sortKey: '',
    isEdit: false
  },
  getters: {
    totalItems() {
      return this.rows.length
    }
  }
})