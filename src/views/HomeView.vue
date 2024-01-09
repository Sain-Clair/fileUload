<template>
  <div class="home">
    <HelloWorld :msg="message" />
    <button @click="getData">getData</button>
  </div>
</template>
<script>
//axios 설정
import axios from "axios";
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  data() {
    return {
      message: "",
    };
  },
  name: "HomeView",
  //사용자 정의함수
  methods: {
    getData() {
      //console.log("GetData 함수 호출!");
      axios
        .get("http://192.168.0.30/spring0102/hello")
        .then((resp) => {
          console.log(resp);
          this.message = resp.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }, //getData end
  }, //method end
  components: {
    HelloWorld,
  },
};
</script>
