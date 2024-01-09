<template>
  <div class="home">
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(item, idx) in state.items" :key="idx">
            <Card :item="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import { onMounted, watch, inject } from 'vue';
import {reactive, inject} from "vue";
import Card from "@/components/Card";

export default {
  name: "Home",
  components: {Card},
  setup() {
    
   
    const $serverUrl = inject('$serverUrl');
    
    const state = reactive({
      items: []
    })

    axios.get( $serverUrl+"/api/items").then(({data}) => {
      console.log(data)
      state.items = data;
    });

    return {state}
  }
}
</script>

<style scoped>

</style>
