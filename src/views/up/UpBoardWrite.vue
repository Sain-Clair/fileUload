<template>
    <div class="container">
      <h1>글작성</h1>  
      <!-- <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
        <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
      </div> -->

      <div class="mb-3 row" v-if="idx !== undefined">
        <label for="title"  class="col-sm-2 col-form-label">번호</label>
        <div class="col-sm-10">
        <input type="text" v-model="idx" id="idx" class="form-control-plaintext" v-if="idx !== undefined" readonly>
        </div>
      </div>

      <div class="mb-3 row">
        <label for="title"  class="col-sm-2 col-form-label">제목</label>
        <div class="col-sm-10">
        <input type="text" v-model="title" id="title" class="form-control-plaintext" placeholder="제목을 입력해주세요.">
        </div>
      </div>

      <div class="mb-3 row">
        <label for="author"  class="col-sm-2 col-form-label">작성자</label>
        <div class="col-sm-10">
          <!--v-if="idx === undefined" -->
        <input type="text" v-model="author" id="author" class="form-control-plaintext"  placeholder="작성자를 입력해주세요." >
        </div>    
      </div>

      <!-- FileUpForm.vue에서 이미지 부분만 복사 붙여넣기 -->
      <div class="information">
        <p>이미지를 업로드하세요.</p>
        <input type="file" @change="selectFile" multiple accept="image/*" ref="fileRef" />
      </div>
      <div class="images" v-if="files.length > 0">
        {{ files }}
        <div v-for="file in files" :key="file.name" class="image">
          <img :src="file.preview" alt="이미지" > {{ file.preview }} / {{ file.name }}
        </div>
      </div>


      <div class="form-group">
        <textarea id="contents" cols="30" rows="10" v-model="contents" class="form-control" style="resize: none;">
        </textarea>
      </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
          <!-- <button type="button" class="btn btn-primary me-md-2" v-on:click="fnSave">저장</button>&nbsp;--> 
            <button type="button" class="btn btn-primary me-md-2" v-on:click="sendData">저장</button>&nbsp;
            <button type="button"  class="btn btn-primary" v-on:click="fnList">목록</button>
        </div>
     
    </div>
  </template>
  
  <script>
import axios from 'axios'
  export default {
    data() { //변수생성
      return {
        requestBody: this.$route.query,
        idx: this.$route.query.idx,
  
        title: '',
        author: '',
        contents: '',
        created_at: '',

        // 파일업로드 관련 추가하기
        files: [],
        formData: new FormData(), // Initialize formData in the data

      }
    },
    mounted() {
      this.fnGetView()
    },
    methods: {
      //미리보기 추가하기
      selectFile(event) {
        // 파일 선택시 초기화 해줘야 선택한 파일만 files 에 들어 가기 때문이다.
        this.files = [];
        //const formData = new FormData();
        const selectedFiles = event.target.files;
        
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
  
          // 미리보기 URL 생성
          const preview = URL.createObjectURL(file);
  
          // 파일 정보와 미리보기 URL을 files 배열에 추가
          this.files.push({
            name: file.name,
            preview: preview,
          });
  
          // 업로드할 파일은 FormData에 추가
          this.formData.append('files', file);
        }
        alert(`${this.files}`)

      },
      fnGetView() {
        if (this.idx !== undefined) {
         
          this.$axios.get(this.$serverUrl + '/upboard/' + this.idx, {
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
      //미리보기 할때 업로드할 파일은 FormData에 추가했기 때문에
      // fnSave()에서는 입력처리는 하지 않고, 수정에만 사용하기로 했다.
      // 그래서 기존의 파일을 복사해와서 붙여 놓고 수정한다.
      async sendData(){
   
        let apiUrl = this.$serverUrl + '/upload'

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const contents = document.getElementById('contents').value;
        // Add additional data to formData
         this.formData.append('title', title);
         this.formData.append('author', author);
         this.formData.append('contents', contents);
        try {
        // this.idx가 있다면 else의 수정으로 가라.
        if (this.idx === undefined) {
        const response = await axios.post(
          apiUrl,
          this.formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
         ).then((res) => {
            alert('글이 저장되었습니다.')
            //this.fnView(res.data.idx)
            this.fnList()
          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
          })
        }else{
          // 수정일때 수정으로 이동처리 
          this.formData.append('idx',this.idx);
          const response = await axios.patch(
          apiUrl,
          this.formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
         ).then((res) => {
            alert('글이 저장되었습니다.')
            //this.fnView(res.data.idx)
            this.fnList()
          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
          })

        }

        // Handle the response as needed
        console.log(response.data);

        // Optionally, you can fetch files after a successful upload
        // this.fetchFiles();
        } catch (error) {
            console.error('Error uploading files:', error.message);
        }
      
    },
      fnSave() {
        let apiUrl = this.$serverUrl + '/upboard'
        
        this.form = {
          "idx": this.idx,
          "title": this.title,
          "contents": this.contents,
          "author": this.author,
          "imgn":"image1.jpg",
        }
  
        if (this.idx === undefined) {
          //INSERT
          console.log(apiUrl)
          this.$axios.post(apiUrl, this.form)
          .then((res) => {
            alert('글이 저장되었습니다.')
            this.fnView(res.data.idx)
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
  
.images img { width: 80px;}
  </style>