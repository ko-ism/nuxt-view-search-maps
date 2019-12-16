import axios from 'axios'

export const state = () => ({
  searched_data: [],
})

export const mutations = {
  clear_searched_data (state){
    state.searched_data = [];
  },
  add_searched_data (state, data){
    state.searched_data.push(data);
  }
}

export const actions = {
  init: () => {
  },
  search_id: async (context, id) => {
    context.commit('clear_searched_data')
    
    axios.post(process.env.API_URL, {id : id})
    .then(function(response) {
        const items = response.data;
        for (const item of items) {
              context.commit('add_searched_data',  item)
            };    
    })
    .catch(function(error) {
        console.log(error)
        // alert(error)
        // this.hasError = true
    })
    .finally(function() {
        // this.loading = false
    })

  },
  search_title: async (context, title) => {
    context.commit('clear_searched_data')
    
    axios.post(process.env.API_URL, {title : title})
    .then(function(response) {
        const items = response.data;
        for (const item of items) {
              context.commit('add_searched_data',  item)
            };
        
    })
    .catch(function(error) {
        console.log(error)
        // alert(error)
        // this.hasError = true
    })
    .finally(function() {
        // this.loading = false
    })

  }
}

export const getters = {
  getSearchResult: state => {
    return state.searched_data
  }
}