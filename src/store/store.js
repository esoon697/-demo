import Vue from 'vue'
import Vuex from 'vuex'
import listData from '../datas/list-data'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    listData: {},
    moviesData: {}
  },

  mutations: {
    getListData (state, {listdataArr}) {
      console.log('mutations')
      state.listData = listdataArr
    },
    getMoviesData (state, {moviesData}) {
      console.log('getMoviesData mutations')
      console.log(moviesData)
      state.moviesData = moviesData
    }
  },

  actions: {
    getListData ({commit}) {
      console.log('actions')
      setTimeout(() => {
        commit('getListData', listData)
      }, 1000)
    },
    getMoviesData ({commit}) {
      wx.request({
        url: 'http://t.yushu.im/v2/movie/top250',
        success: (res) => {
          const moviesData = res.data.subjects
          console.log(moviesData)
          commit('getMoviesData', {moviesData})
        },
        fail: (error) => {
          console.log(error)
        }
      })
    }
  },
  getters: {}
})

export default store
