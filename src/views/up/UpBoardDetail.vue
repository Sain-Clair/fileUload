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
        <span class="card-text">{{ contents }}</span><br>
        <hr>
        <span class="card-text">{{ imgn }}</span>
       <!-- <span class="img" :style="{backgroundImage: `url('img/${ imgn }')`}"/>-->
       <hr>
       <!--댓글 작성폼-->
       <div class="mt-3">
          <h5>댓글 작성</h5>
          <form @submit.prevent="fnWriteComment">
            <div class="mb-3">
              <label for="writer" class="form-label">작성자</label>
              <input type="text" v-model="commentWriter" class="form-control" id="writer" required />
            </div>
            <div class="mb-3">
              <label for="contents" class="form-label">내용</label>
              <textarea v-model="commentContents" class="form-control" id="contents" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">댓글 작성</button>
          </form>
        </div>
       <!-- 댓글 목록 출력 -->
         <div class="mt-3">
          <h5>댓글</h5>
          <ul>
            <li v-for="comment in comments" :key="comment.idx">
                {{ comment.idx }} => {{ comment.writer }}: {{ comment.contents }} : {{ comment.reip }} : {{ comment.bdate }}
            </li>
          </ul>
        </div>


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
        bdate: '',
        comments: [], // 댓글 목록 추가
        commentWriter: '',  //댓글 입력값 초기화 
        commentContents: '',
      }
    },
    mounted() {
      this.fnGetView();
      this.fnGetComments(); // 댓글 불러오기
    },
    methods: {
      fnGetView() {
        this.$axios.get(this.$serverUrl + '/upboard/' + this.idx, {
          params: this.requestBody
        }).then((res) => {
          this.title = res.data.title
          this.author = res.data.author
          this.imgn = res.data.imgn
          this.contents = res.data.contents
          this.bdate = res.data.bdate
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      },
      fnGetComments() {
      this.$axios
        .get(this.$serverUrl + '/upboardComm/' + this.idx)
        .then((res) => {
          this.comments = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.error('댓글 불러오기 에러:', err);
        });
      },
      fnWriteComment() {
      if (!this.commentWriter || !this.commentContents) {
        alert('작성자와 내용을 입력해주세요.');
        return;
      }

      const newComment = {
        writer: this.commentWriter,
        contents: this.commentContents,
        reip:'192.168.0.11',
      };
      //아직 빽단은 미구현했음 
      this.$axios
        .post(this.$serverUrl + '/upboardComm/' + this.idx, newComment)
        .then(() => {
          alert('댓글이 작성되었습니다.');
          this.fnGetComments();  // 댓글 작성 후 목록 다시 불러오기
          // 작성 후 폼 초기화
          this.commentWriter = '';
          this.commentContents = '';
        })
        .catch((err) => {
          console.error('댓글 작성 에러:', err);
        });
    },
      //------------------------------------
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
  
        this.$axios.delete(this.$serverUrl + '/upboard/' + this.idx, {})
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