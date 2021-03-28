<template>
  <div>
    <h2>{{ this.$route.query.searchRes }}</h2>
    <div>
      <div v-for="(item, index) in searchResult" :key="index">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "result",
  data() {
    return {
      searchResult: [],
    };
  },

  // 生命周期钩子/回调函数
  created() {
    console.log(this.$route.query.searchRes);

    axios({
      url: "http://localhost:3000/cloudsearch",
      method: "get",
      params: {
        keywords: this.$route.query.searchRes,
        type: "1",
      },
    }).then((response) => {
      console.log(response);
      this.searchResult = response.data.result.songs;
    });
  },
};
</script>

<style>
</style>