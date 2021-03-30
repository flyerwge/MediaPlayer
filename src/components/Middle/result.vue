<template>
  <div>
    <h2>{{ this.$route.query.searchRes }}</h2>
    <span
      >搜索“{{ this.$route.query.searchRes }}”，共找到{{
        resultCount
      }}个结果</span
    >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 单曲 -->
      <el-tab-pane label="单曲" name="result-song">
        <thead>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in searchResult"
            :key="index"
            @dblclick="
              playMusic(item.id, item.al.picUrl, item.name, item.ar[0].name)
            "
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.ar[0].name }}</td>
            <td>{{ item.al.name }}</td>
            <td>{{ item.dt }}</td>
          </tr>
        </tbody>
      </el-tab-pane>

      <!-- 歌手 -->
      <el-tab-pane label="歌手" name="result-artist">
        <div>
          <div v-for="(item, index) in searchArtists" :key="index">
            <div class="artist">
              <img class="artist-img" :src="item.picUrl" />
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 专辑 -->
      <el-tab-pane label="专辑" name="result-periodical">
        <div>
          <div v-for="(item, index) in searchPeriodical" :key="index">
            <div class="periodical">
              <img class="periodical-img" :src="item.blurPicUrl" alt="" />
              <div>{{ item.name }}</div>
              <div>{{ item.artist.name }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 视频 -->
      <el-tab-pane label="视频" name="result-video">
        <div>
          <div v-for="(item, index) in searchVideo" :key="index">
            <div class="video">
              <img class="video-img" :src="item.coverUrl" alt="" />
              <img class="video-play" src="../../assets/playmusic/bofang.svg" />
              <div>{{ item.title }}</div>
              <div>{{ item.creator[0].userName }}</div>
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
  name: "result",
  data() {
    return {
      // tab切换时会改变的数据
      activeName: "result-song",
      //搜索总结果
      searchResult: [],
      // 搜索总数
      resultCount: "",
      // 歌手搜素
      searchArtists: [],
      // 专辑
      searchPeriodical: [],
      // 视频
      searchVideo: [],
    };
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

  // 生命周期钩子/回调函数
  created() {
    axios({
      url: "http://localhost:3000/cloudsearch",
      method: "get",
      params: {
        keywords: this.$route.query.searchRes,
        type: "1",
      },
    }).then((response) => {
      this.searchResult = response.data.result.songs;
      this.resultCount = response.data.result.songCount;
      for (let i = 0; i < this.searchResult.length; i++) {
        let duration = this.searchResult[i].dt;
        duration /= 1000;
        let min = Math.round(duration / 60); //分
        let sec = Math.round(duration % 60); //秒
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.searchResult[i].dt = min + ":" + sec;
      }
    });
  },

  // 侦听标签页的变化
  watch: {
    activeName() {
      // result-song:单曲
      // result-artist:歌手
      // result-periodical:专辑
      // result-video:视频
      let type = 1;
      switch (this.activeName) {
        case "result-song":
          type = 1;
          break;
        case "result-artist":
          type = 100;
          break;
        case "result-periodical":
          type = 10;
          break;
        case "result-video":
          type = 1014;
          break;
        default:
          break;
      }

      axios({
        url: "http://localhost:3000/cloudsearch",
        method: "get",
        params: {
          keywords: this.$route.query.searchRes,
          type,
        },
      }).then((response) => {
        // console.log(response);
        if (type == 1) {
          this.searchResult = response.data.result.songs;
          this.resultCount = response.data.result.songCount;

          for (let i = 0; i < this.searchResult.length; i++) {
            let duration = this.searchResult[i].dt;
            duration /= 1000;
            let min = Math.round(duration / 60); //分
            let sec = Math.round(duration % 60); //秒
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.searchResult[i].dt = min + ":" + sec;
          }
        } else if (type == 100) {
          this.searchArtists = response.data.result.artists;
        } else if (type == 10) {
          this.searchPeriodical = response.data.result.albums;
        } else if (type == 1014) {
          this.searchVideo = response.data.result.videos;
        }
      });
    },
  },
};
</script>

<style>
.artist {
  position: relative;
}
.artist-img {
  width: 70px;
  height: 70px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.artist div {
  display: inline-block; /*div文字在同一行出现*/
  width: 27%;
  height: 70px;
  /* height: 75px; */
  margin-left: 40px;
  position: relative;
  line-height: 70px;
  overflow: hidden;
}

.periodical {
  position: relative;
}

.periodical-img {
  width: 70px;
  height: 70px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.periodical div {
  display: inline-block; /*div文字在同一行出现*/
  width: 27%;
  height: 70px;
  /* height: 75px; */
  margin-left: 40px;
  position: relative;
  line-height: 70px;
  overflow: hidden;
}

.video {
  float: left;
  width: 200px;
  height: 170px;
  margin-left: 30px;
  margin-top: 50px;
  margin-bottom: 20px;
  position: relative;
}

.video-img {
  width: 200px;
  height: 150px;
}

.video-play {
  position: absolute;
  left: 70px;
  top: 50px;
  z-index: 1;
}

.video div {
  overflow: hidden;
}
</style>