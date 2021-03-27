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
          <!-- 精品歌单 -->
          <div>
            <label>热门标签：</label>
            <span v-for="(item, index) in tag.slice(0, 10)" :key="index">
              <!-- 动态绑定类名 -->
              <span
                class="hot-tag"
                :class="{ active: clickTag == item.name }"
                @click="clickTag = item.name"
              >
                {{ item.name }}
              </span>
            </span>
          </div>

          <!-- 歌单 -->
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
        <div class="new-song-items">
          <div
            class="new-song-item"
            v-for="(item, index) in songs"
            :key="index"
          >
            <div class="new-song-img">
              <img
                :src="item.picUrl"
                class="img-item"
                @click="
                  playMusic(
                    item.id,
                    item.picUrl,
                    item.name,
                    item.song.artists[0].name
                  )
                "
              />
              <div>{{ item.name }}</div>
              <div>{{ item.song.artists[0].name }}</div>
              <div>{{ item.song.duration }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import Bus from "../bus.js";

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
      // 热门标签
      tag: [],
      // active高亮
      clickTag: 0,
    };
  },

  // 侦听器
  watch: {
    // 侦听点击目标clickTag变化
    clickTag() {
      console.log(this.clickTag);
      axios({
        url: "http://localhost:3000/top/playlist/highquality",
        method: "get",
        params: {
          // limit: 20,
          cat: this.clickTag,
        },
      }).then((response) => {
        // console.log(response);
        this.list = response.data.playlists;
      });
    },
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 点击播放音乐
    playMusic(id, picUrl, name, artist) {
      // console.log(id);
      axios({
        url: "http://localhost:3000/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((response) => {
        console.log(response);
        //需要将urlPlay传递给bottom播放组件
        let urlPlay = response.data.data[0].url;
        //将音乐url传递给公共bus
        Bus.$emit("val", urlPlay);
      });

      Bus.$emit("picUrl", picUrl);
      Bus.$emit("name", name);
      Bus.$emit("artist", artist);
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
      params: {
        limit: 30,
      },
    }).then((response) => {
      // console.log(response);
      this.songs = response.data.result;
      // 显示时间，毫秒转为分、秒显示
      for (let i = 0; i < this.songs.length; i++) {
        let duration = this.songs[i].song.duration;
        duration /= 1000;
        let min = Math.round(duration / 60); //分
        let sec = Math.round(duration % 60); //秒
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.songs[i].song.duration = min + ":" + sec;
      }
    });

    axios({
      url: "http://localhost:3000/toplist",
      method: "get",
    }).then((response) => {
      // console.log(response);
      this.rank = response.data.list;
    });

    axios({
      url: "http://localhost:3000/playlist/highquality/tags",
      method: "get",
      // params: {
      //   limit: 10,
      // },
    }).then((response) => {
      // console.log(response);
      this.tag = response.data.tags;
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

.hot-tag {
  cursor: pointer;
}

.active {
  color: #fff;
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

.new-song-items {
  padding-left: 50px;
}

.new-song-img div {
  display: inline-block; /*div文字在同一行出现*/
  width: 27%;
  /* height: 75px; */
  margin-left: 40px;
}

.img-item {
  width: 70px;
  padding-top: 2px;
  padding-bottom: 2px;
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