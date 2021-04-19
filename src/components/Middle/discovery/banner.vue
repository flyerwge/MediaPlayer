<template>
  <div class="banners">
    <el-carousel :interval="4000" type="card" height="200px">
      <!-- 循环生成标签，轮播图 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Banner",

  data() {
    return {
      banners: [],
    };
  },

  created() {
    axios({
      // url: "http://autumnfish.cn/banner",
      url: "http://localhost:3000/banner",
      method: "get",
    }).then((response) => {
      this.banners = response.data.banners;
    });
  },
};
</script>

<style>
</style>