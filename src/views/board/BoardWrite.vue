<template>
    <div class="container">
      <h1>글작성</h1>  
      <!-- <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
        <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
      </div> -->
      <div class="mb-3 row">
        <label for="title"  class="col-sm-2 col-form-label">제목</label>
        <div class="col-sm-10">
        <input type="text" v-model="title" id="title" class="form-control-plaintext" placeholder="제목을 입력해주세요.">
        </div>
      </div>

      <div class="mb-3 row">
        <label for="author"  class="col-sm-2 col-form-label">작성자</label>
        <div class="col-sm-10">
        <input type="text" v-model="author" id="author" class="form-control-plaintext"  placeholder="작성자를 입력해주세요." v-if="idx === undefined">
        </div>    
      </div>
      <div class="form-group">
        <textarea id="" cols="30" rows="10" v-model="contents" class="form-control" style="resize: none;">
        </textarea>
      </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
            <button type="button" class="btn btn-primary me-md-2" v-on:click="fnSave">저장</button>&nbsp;
            <button type="button"  class="btn btn-primary" v-on:click="fnList">목록</button>
        </div>
     
    </div>
  </template>
  
  <script>

  export default {
    data() { //변수생성
      return {
        requestBody: this.$route.query,
        idx: this.$route.query.idx,
  
        title: '',
        author: '',
        contents: '',
        created_at: ''
      }
    },
    mounted() {
      this.fnGetView()
    },
    methods: {
      fnGetView() {
        if (this.idx !== undefined) {
         
          this.$axios.get(this.$serverUrl + '/board/' + this.idx, {
            params: this.requestBody
          }).then((res) => {
            console.log("---------");
            console.log(res.data);
            this.title = res.data.title
            this.author = res.data.author
            this.contents = res.data.contents
            this.created_at = res.data.created_at
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      fnList() {
        delete this.requestBody.idx
        this.$router.push({
          path: './list',
          query: this.requestBody
        })
      },
      fnView(idx) {
        this.requestBody.idx = idx
        this.$router.push({
          path: './detail',
          query: this.requestBody
        })
      },
      fnSave() {
        let apiUrl = this.$serverUrl + '/board'
        
        this.form = {
          "idx": this.idx,
          "title": this.title,
          "contents": this.contents,
          "author": this.author
        }
  
        if (this.idx === undefined) {
          //INSERT
          console.log(apiUrl)
          this.$axios.post(apiUrl, this.form)
          .then((res) => {
            alert('글이 저장되었습니다.')
            //this.fnView(res.data.idx)
            this.fnList()
          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
          })
        } else {
          //UPDATE
          this.$axios.patch(apiUrl, this.form)
          .then((res) => {
            alert('글이 저장되었습니다.')
            this.fnView(res.data.idx)
          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
          })
        }
      }
    }
  }
  </script>
  <style scoped>
  .board-write{
    text-align: center;
  }
  </style>