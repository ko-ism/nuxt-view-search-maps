<template>
  <div class="map">
    <!-- <form id="search" @submit.prevent="search"><input type="text" v-model.number="searched_id"><input type="submit"></form> -->
    <!-- <button v-on:click="clickevent">push</button>{{view_counts}} -->
    <!-- <button v-on:click="search(2)">search</button>{{view_search_result}} -->
    {{ view_search_result }}
    <GmapMap
      v-bind:center="center"
      v-bind:zoom="zoom"
      style="width: 500px; height: 500px"
      >
      <GmapMarker
        v-bind:key="index"


        v-for="(m, index) in view_search_result"
          v-bind:position="{lat: m.lat , lng: m.lng}"
          v-bind:title="m.title"
          v-bind:clickable="true"
          v-bind:draggable="true"
          v-on:click="view_infowin(m.title, m.overview, m.address, m.url, m.lat, m.lng)"
      /> 

      <GmapInfoWindow
          v-bind:options="infoOptions"
          v-bind:position="infoWindowPos"
          v-bind:opened="infoWinOpen"
          @closeclick="infoWinOpen=false"
        >
          <div class="infoWin" v-html="infoContent"></div>
      </GmapInfoWindow>

    </GmapMap>
    <nuxt-link to="/search">検索画面に戻る</nuxt-link>



</div>
  
  
</template>

<script>
  import {gmapApi} from 'vue2-google-maps'
  export default {
    data: function() {
      return {
        center: {lat: 35.681236, lng: 139.767125},
        zoom: 12,
        infoWindowPos: null,
        infoWinOpen: false,
        infoContent: {
        imageurl: null,
        title: null,
        address: null
        },
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
      }

    },
    created: function() {
      this.$store.dispatch('view_maps/init')
    },
    mounted: function() {
      
    },
    methods: {
      view_infowin(title, overview, address, url, lat, lng) {
        this.center = {lat: lat , lng: lng};
        this.infoWindowPos = {lat: lat , lng: lng};
        this.infoWinOpen = true;
        this.infoContent = '<table>' +  
          '<tr><th>title</th><td>' + title + '</td></tr>' + 
          '<tr><th>住所</th><td>' + address + '</td></tr>' +
          '<tr><th>概要</th><td>' + overview + '</td></tr>' + 
          '<tr><th>URL</th><td>' + '<a href="'+ url + '" target="_blank">URL</a>' + '</td></tr></table>';
      },
      clickevent(){
        this.$store.commit('view_maps/increment')   
      },
      search(event){
        const id = this.searched_id
        this.$store.dispatch('view_maps/search', id)
      }

    },
    computed: {
      view_address_lists() {
        // return this.$store.state.view_maps.all_data
        return this.$store.getters['view_maps/getAllData']
      },
      view_searched_lists() {
        return this.$store.getters['view_maps/getSearchedData']
      },
      view_counts() {
        return this.$store.getters['view_maps/getCount']
      },
      view_search_result() {
        return this.$store.getters['view_maps/getSearchResult']
      },
      google: gmapApi
    }
  }
  

</script>


<style>
.infoWin{
width: 100%;
border-collapse: separate;
border-spacing: 0px;
border-top: 1px solid #ccc;
border-left: 1px solid #ccc;
}
.infoWin th{
width:25%;
padding:10px;
text-align: left;
vertical-align: top;
color: #444;
background-color: #cee7ff;
border-left: 3px double #999;
border-top: 1px solid #fff;
border-right: 1px solid #8fd2ed;
border-bottom: 1px solid #ccc;
}
.infoWin td{
width:75%;
padding:10px;
background-color: #fafafa;
border-right: 1px solid #ccc;
border-bottom: 1px solid #ccc;
}
</style>