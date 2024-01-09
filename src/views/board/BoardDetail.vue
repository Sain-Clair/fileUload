<template>
    <div class="container">

      <div class="card mt-5">
        <div class="card-header">
          <h3>제목 : {{ title }}</h3>
        </div>
        
        <div class="card-header">
          <strong class="card-title">작성자 : {{ author }}</strong>
          <br>
          <span>{{ bdate }}</span>
        </div>
      
      <div class="card-body">
        <span class="card-text">{{ contents }}</span>
      </div>

    </div>
              
    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
          <button type="button" class="btn btn-warning" v-on:click="fnUpdate">수정</button>&nbsp;
          <button type="button" class="btn btn-danger" v-on:click="fnDelete">삭제</button>&nbsp;
          <button type="button" class="btn btn-info" v-on:click="fnList">목록</button>
        </div>  
    </div>
  </template>
  
  <script>
  // BoardDetail.vue
  export default {
    data() { //변수생성
      return {
        requestBody: this.$route.query,
        idx: this.$route.query.idx,
  
        title: '',
        author: '',
        contents: '',
        bdate: ''
      }
    },
    mounted() {
      this.fnGetView()
    },
    methods: {
      fnGetView() {
        this.$axios.get(this.$serverUrl + '/board/' + this.idx, {
          params: this.requestBody
        }).then((res) => {
          this.title = res.data.title
          this.author = res.data.author
          this.contents = res.data.contents
          this.bdate = res.data.bdate
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      },
      fnList() {
        delete this.requestBody.idx
        this.$router.push({
          path: './list',
          query: this.requestBody
        })
      },
      fnUpdate() {
        this.$router.push({
          path: './write',
          query: this.requestBody
        })
      },
      fnDelete() {
        if (!confirm("삭제하시겠습니까?")) return
  
        this.$axios.delete(this.$serverUrl + '/board/' + this.idx, {})
            .then(() => {
              alert('삭제되었습니다.')
              this.fnList();
            }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
  </script>
  <style scoped>
  
  
  </style>