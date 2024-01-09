<!-- DetailView.vue -->
<template>
  <div lass="container mt-3">
    <h1 class="display-1 text-center">{{ msg }}</h1>
    <form>
      <input type="hidden" name="num" :value="result.num" readonly />
      <div class="mb-3 mt-3">
        <label for="name" class="form-label">이름:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          readonly
          :value="result.name"
        />
      </div>
      <div class="mb-3 mt-3">
        <label for="name" class="form-label">email:</label>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          readonly
          v-bind:value="result.email"
        />
      </div>
      <div class="mb-3 mt-3">
        <label for="images" class="form-label">Images:</label>
        <div v-if="result.images">
          <div
            v-for="(image, index) in result.images.split(',').slice(1)"
            :key="index"
          >
            <img :src="'http://192.168.0.30/spring0102/images/' + image" alt="Image" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      msg: "사용자 정보",
      result: {},
    };
  },
  created() {
    axios
      .get(
        "http://192.168.0.30/spring0102/detail?num=" + this.$route.params.num
      )
      .then((resp) => {
        console.log(resp);
        this.result = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    fetchData() {},
  },
};
</script>
