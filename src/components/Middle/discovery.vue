<template>
  <!-- 发现歌单 -->
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <!-- 循环生成标签 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "discovery",

  data() {
    return {
      banners: [],
    };
  },

  created() {
    // console.log("created");
    let api = "http://localhost:3000/banner";
    axios.get(api).then((response) => {
      // console.log(response.data);
      this.banners = response.data.banners;
    });
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>