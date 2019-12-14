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
  search_id: (context, id) => {
    context.commit('clear_searched_data')
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(function(response) {
        // console.log(response.data.bpi)
        context.commit('add_searched_data', response)
    }.bind(this))
    .catch(function(error) {
        console.log(error)
        this.hasError = true
    }.bind(this))
    .finally(function() {
        this.loading = false
    }.bind(this))
  },
  search: firestoreAction((context, id) => {
    context.commit('clear_searched_data')
    dataRef.where('address_id', '==', id).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        console.log(doc.data().address_id);
        // this.add_searched_id(doc.data().address_id);
        context.commit('add_searched_data', doc.data())
        // state.searched_id.push(doc.data().address_id);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }),
  search_title: firestoreAction((context, title) => {
    context.commit('clear_searched_data')
    console.log(title);
    dataRef.where('title', '==', title).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        console.log(doc.data().title);
        // this.add_searched_id(doc.data().address_id);
        context.commit('add_searched_data', doc.data())
        // state.searched_id.push(doc.data().address_id);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }),
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