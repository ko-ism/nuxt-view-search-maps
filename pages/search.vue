<template>
  <div class="map">
    ID検索<input type="text" v-model.number="searched_id">
    <nuxt-link @click.native="search" to="/search_result">検索実行</nuxt-link>
    <p>まだIDは1,2,3のどれかしかない。</p>
    タイトル検索<input type="text" v-model="searched_title">
    <nuxt-link @click.native="search_title" to="/search_result">検索実行</nuxt-link>
    <p>蒙古タンメン中本 渋谷店or目黒店or渋谷店のどれかしなかい。かつ、完全一致でしかFirestoreは検索できない</p>
  </div>
  
  
</template>

<script>
  import {gmapApi} from 'vue2-google-maps'
  export default {
    data: function() {
      return {
        searched_id: 0,
        searched_title: ''
      }

    },
    created: function() {
      
    },
    mounted: function() {
      
    },
    methods: {
      search(event){
        const id = this.searched_id
        this.$store.dispatch('view_maps/search', id)
        // this.$store.dispatch('view_maps/search_id', id)
      },
      search_title(event){
        const title = this.searched_title
        this.$store.dispatch('view_maps/search_title', title)
      }

    },
    computed: {
    }
  }


</script>


<style>

</style>