<template>
  <div class="search_result">
    <h2>検索結果</h2>
    {{ view_search_result }}
    <table>
      <tr>
        <th>address_id</th>
        <th>title</th>
        <th>lat(緯度)</th>
        <th>lng(経度)</th>
        <th>address</th>
        <th>overview</th>
        <th>url</th>
      </tr>
      <tr v-for="result in view_search_result" :key="result.id">
        <td>{{result.address_id}}</td>
        <td>{{result.title}}</td>
        <td>{{result.lat}}</td>
        <td>{{result.lng}}</td>
        <td>{{result.address}}</td>
        <td>{{result.overview}}</td>
        <td><a v-bind:href="result.url">URL</a></td>
      </tr>
    </table>



    <nuxt-link to="/maps">検索結果地図表示</nuxt-link>
    <nuxt-link to="/search">検索画面に戻る</nuxt-link>
  </div>
  
</template>

<script>
  export default {
    data: function() {
      return {
      }

    },
    created: function() {
      
    },
    mounted: function() {
      
    },
    methods: {
    },
    computed: {
      view_search_result() {
        return this.$store.getters['view_maps/getSearchResult']
      },
    }
  }


</script>


<style>
table {
  width: 100%;
  border-collapse:separate;
  border-spacing: 0;
}

table th:first-child{
  border-radius: 5px 0 0 0;
}

table th:last-child{
  border-radius: 0 5px 0 0;
  border-right: 1px solid #3c6690;
}

table th{
  text-align: center;
  color:white;
  background: linear-gradient(#829ebc,#225588);
  border-left: 1px solid #3c6690;
  border-top: 1px solid #3c6690;
  border-bottom: 1px solid #3c6690;
  box-shadow: 0px 1px 1px rgba(255,255,255,0.3) inset;
  width: 10%;
  padding: 10px 0;
}

table td{
  text-align: center;
  border-left: 1px solid #a8b7c5;
  border-bottom: 1px solid #a8b7c5;
  border-top:none;
  box-shadow: 0px -3px 5px 1px #eee inset;
  width: 10%;
  padding: 10px 0;
}


table td:last-child{
  border-right: 1px solid #a8b7c5;
}

table tr:last-child td:first-child {
  border-radius: 0 0 0 5px;
}

table tr:last-child td:last-child {
  border-radius: 0 0 5px 0;
}

</style>