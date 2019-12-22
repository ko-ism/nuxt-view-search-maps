<template>
  <div>
    <h2>検索画面</h2>
    <input class="search-box" type="text" v-model.number="searched_id">
    <nuxt-link class="btn-square" @click.native="search_id" to="/search_result">id検索</nuxt-link><br />
    <input class="search-box" type="text" v-model="searched_title">
    <nuxt-link class="btn-square" @click.native="search_title" to="/search_result">title検索</nuxt-link><br />
    
    <nuxt-link to="/view_data">全件データ表示</nuxt-link><br />
    <p>[memo]idは1,2,3のどれか。</p>
    <p>[memo]titleは蒙古タンメン中本 品川店or目黒店or渋谷店のどれか。</p>

  </div>
  
  
</template>

<script>
  import {gmapApi} from 'vue2-google-maps'

  export default {
    data: function() {
      return {
        searched_id: '',
        searched_title: ''
      }

    },
    created: function() {
      
    },
    mounted: function() {
      
    },
    methods: {
      search_id(event){
        const id = this.searched_id
        this.$store.dispatch('view_maps/search_id', id)
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

.search-box {
  box-sizing: border-box;
  border: 1px solid #999;
  padding: 3px 5px;
  border-radius: 5px;
  height: 2.0em;
  width: 245px;
  overflow: hidden;

}

.btn-square {
  display: inline-block;
  padding: 3px 5px;
  text-decoration: none;
  background: #668ad8;/*ボタン色*/
  color: #FFF;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
  width: 80px;
}
.btn-square:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px);/*下に動く*/
  border-bottom: none;/*線を消す*/
}

</style>