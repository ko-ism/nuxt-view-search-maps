import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'
// import googlemaps from '@maps'
import axios from 'axios'

const db = firebase.firestore()
const dataRef = db.collection(process.env.FIRESTORE_COLLECTION_NAME)

export const state = () => ({
  all_data: [],
  searched_data: [],
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  clear_searched_data (state){
    state.searched_data = [];
  },
  add_searched_data (state, data){
    state.searched_data.push(data);
  }
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('all_data', dataRef)
  }),
  search_id: async (context, id) => {
    context.commit('clear_searched_data')
    
    axios.post(process.env.API_URL, {id : id})
    .then(function(response) {
        const items = response.data;
        for (const item of items) {
              context.commit('add_searched_data',  item)
            };
        
    }.bind(this))
    .catch(function(error) {
        console.log(error)
        alert(error)
        this.hasError = true
    }.bind(this))
    .finally(function() {
        this.loading = false
    }.bind(this))

  },
  search_title: async (context, title) => {
    context.commit('clear_searched_data')
    
    axios.post(process.env.API_URL, {title : title})
    .then(function(response) {
        const items = response.data;
        for (const item of items) {
              context.commit('add_searched_data',  item)
            };
        
    }.bind(this))
    .catch(function(error) {
        console.log(error)
        alert(error)
        this.hasError = true
    }.bind(this))
    .finally(function() {
        this.loading = false
    }.bind(this))

  }
}

export const getters = {
  getAllData: state => {
    return state.all_data
  },
  getSearchedData: state => {
    // return state.all_data.filter(getSearchedData => getSearchedData.title == "蒙古タンメン中本 品川店")
    // return state.all_data.filter(data => data.title == "蒙古タンメン中本 品川店")
    let result = state.all_data.find(data => data.title.indexOf("目黒") != -1);
    console.log(result);
    return result
    // return state.all_data.find(data => data.title.indexOf("渋谷") != -1)
  },
  getCount: state => {
    return state.counter
  },
  getSearchResult: state => {
    return state.searched_data
  }
}