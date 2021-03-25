<template>
  <!-- 发现歌单 -->
  <div class="discovery-music">
    <!-- 顶部标签 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 个性推荐 -->
      <el-tab-pane label="个性推荐" name="first">
        <div>
          <el-carousel :interval="4000" type="card" height="200px">
            <!-- 循环生成标签，轮播图 -->
            <el-carousel-item v-for="(item, index) in banners" :key="index">
              <img :src="item.imageUrl" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-tab-pane>

      <!-- 歌单 -->
      <el-tab-pane label="歌单" name="second">
        <div>
          <div class="items">
            <div class="item" v-for="(item, index) in list" :key="index">
              <div class="img-wrap">
                <img :src="item.coverImgUrl" alt="" class="img-recommand" />
              </div>
              <p class="name">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 排行榜 -->
      <el-tab-pane label="排行榜" name="third">
        <div>
          <div class="rank-item" v-for="(item, index) in rank" :key="index">
            <div>
              <img :src="item.coverImgUrl" class="rank-img" />
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 最新音乐 -->
      <el-tab-pane label="最新音乐" name="fourth">
        <div class="newsongs">
          <div class="new-song-items">
            <div
              class="new-song-item"
              v-for="(item, index) in songs"
              :key="index"
            >
              <div class="new-song-img">
                <img :src="item.picUrl" class="img-item" />
                <span>{{ item.name }}</span>
                <span>{{ item.song.artists[0].name }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "discovery",

  data() {
    return {
      activeName: "first",
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // 排行榜
      rank: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },

  created() {
    // console.log("created");
    // let api = "http://localhost:3000/banner";
    axios({
      // url: "http://autumnfish.cn/banner",
      url: "http://localhost:3000/banner",
      method: "get",
    }).then((response) => {
      // console.log(response.data);
      this.banners = response.data.banners;
    });

    axios({
      // url: "https://autumnfish.cn/personalized",
      url: "http://localhost:3000/top/playlist",
      method: "get",
      params: {
        limit: 20,
      },
    }).then((response) => {
      // console.log(response);
      this.list = response.data.playlists;
      // this.list = response.data.result;
    });

    axios({
      url: "http://localhost:3000/personalized/newsong",
      method: "get",
    }).then((response) => {
      // console.log(response);
      this.songs = response.data.result;
    });

    axios({
      url: "http://localhost:3000/toplist",
      method: "get",
    }).then((response) => {
      console.log(response);
      this.rank = response.data.list;
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

.discovery-music {
  z-index: 0;
  position: relative;
}

.items {
  margin: 30px 50px;
}

.item {
  float: left;
  width: 200px;
  height: 230px;
  margin: 15px;
  margin-top: 50px;
}

.img-wrap {
  width: 200px;
  height: 200px;
}

.img-recommand {
  width: 200px;
  height: 200px;
}

.item .name {
  table-layout: fixed;
  word-wrap: break-all;
  word-break: normal;
  overflow: hidden;
}

.new-song-image {
  width: 75px;
}

.img-item {
  width: 75px;
}

.rank-img {
  width: 300px;
  height: 100px;
  float: left;
}
/* .new-song-img {
  vertical-align: middle;
} */
</style>