<template>
  <div class="container mt-3">
    <h1 class="display-1 text-center">{{ msg }}</h1>
    <form>
      <div class="mb-3 mt-3">
        <label for="name" class="form-label">이름:</label>
        <input type="text" class="form-control" id="name" name="name" />
      </div>
      <div class="mb-3 mt-3">
        <label for="name" class="form-label">email:</label>
        <input type="email" class="form-control" id="email" name="email" />
      </div>

      <div class="information">
        <p>이미지를 업로드하세요.</p>
        <input
          type="file"
          @change="selectFile"
          multiple
          accept="image/*"
          ref="fileRef"
        />
      </div>
      <div class="images" v-if="files.length > 0">
        {{ files }}
        <div v-for="file in files" :key="file.name" class="image">
          <img :src="file.preview" alt="이미지" /> {{ file.preview }} /
          {{ file.name }}
        </div>
      </div>
      selectFiles
      <div class="btn-group">
        <!--<router-link to="/user/save" class="btn btn-primary">사용자 추가</router-link>-->
        <button @click="sendData">사용자 추가</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    // 파일 배열 초기화
    return {
      msg: "사용자추가",
      files: [],
      formData: new FormData(), // FormData 전역변수로 지정
    };
  },
  methods: {
    // change 이벤트를 통해서 호출될 selectFile 함수를 정의
    selectFile(event) {
      console.log("동작확인");

      this.files = [];
      const selectFiles = event.target.files;

      for (let i = 0; i < selectFiles.length; i++) {
        const file = selectFiles[i];

        // 미리보기 url 생성
        const preview = URL.createObjectURL(file);

        // 파일 정보와 미리보기 URL을 files 배열에 추가
        this.files.push({
          name: file.name,
          preview: preview,
        });

        // 업로드할 파일은 FormData에 추가
        this.formData.append("files", file);
      }
      console.log("===========>" + this.files);
    },

    sendData() {
      // formdata에 name, email을 추가한 후에 이미지도 미리보기에서 가져온다.
      this.formData.append("name", document.getElementById("name").value);
      this.formData.append("email", document.getElementById("email").value);

      // 업로드 처리하기
      axios
        .post("http://localhost/spring0102/upload", this.formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          // 업로드가 성공하면 추가한 파일 목록을 서버에서 가져올 수 있도록 fetchFiles 메서드 호출
          this.fetchFiles();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    async fetchFiles() {
      //파일업로드가 끝날때까지 대기 - async
      console.log("패치파일즈");
    },
  },
};
</script>
<style scoped>
.images img {
  width: 80px;
}
</style>
