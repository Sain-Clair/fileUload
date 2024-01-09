<template>
  <div>
    <!-- <img src="../../src/assets/KakaoTalk_20231206_185841882.png" /> -->
    <div class="container mt-3">
      <h1 class="display-1 text-center">사용자 목록</h1>
      <div class="btn-group">
        <router-link to="FileUpForm" class="btn btn-primary"
          >사용자 추가</router-link
        >
      </div>
      <table class="table table-hover mt-3">
        <thead class="table-dark">
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>가입날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr class="cursor-pointer" v-for="row in list" :key="row.idx" @click="$event => href(row.idx)">
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.udate }}</td>
          </tr>
        </tbody>
        <!-- <tfoot>
          <tr>
            <td colspan="3">{{ list }}</td>
          </tr>
        </tfoot> -->
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "userList",
  data() {
    return {
      // 배열을 선언
      list: [],
    };
  },
  // window.onload
  created(){
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list = [
        // axios를 사용해서 읽어온 데이터를 this.list에 저장하기만 해도 데이터가 바인딩되어서 출력이된다.
        // { num: 1, name: "테스형", email: "t@naver.com", udate: '2024-01-02'},
        // { num: 2, name: "춘식형", email: "chunsik@naver.com", udate: '2024-01-02'},
      ];
      axios
        .get("http://192.168.0.30/spring0102/userList")
        .then((resp) => {
          console.log(resp);
          this.list = resp.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    href(num){
      // 쿼리 형식으로 전달 - 이것은 get방식
      // this.$router.push({name:"DetailView", query:row})

      // params형식의 라우팅
      // :num/:name/:email
      // this.$router.push({name:'DetailView', params:row})

      // 스프링 부트를 이용한 통신
      this.$router.push({ name: 'DetailView', params: { num } });
    }
  },
};
</script>
