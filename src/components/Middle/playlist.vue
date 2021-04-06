<template>
  <div>
    <!-- 歌单详情 -->
    <div class="list-top">
      <div class="list-top-cover">
        <img :src="List.coverImgUrl" />
      </div>
      <div class="list-top-detail">
        <span>{{ List.name }}</span>
        <br />
        <!-- <span>{{ List.creator.nickname }}</span> -->
        <label v-for="(listTag, index) in List.tags" :key="index">
          <span>{{ listTag }} </span>
        </label>
        <br />
        <label>简介：</label><span>{{ List.description }}</span>
      </div>
    </div>

    <!-- <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="first"> </el-tab-pane>
        <el-tab-pane label="评论" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </div> -->

    <!-- 歌曲列表 -->
    <div class="list-bottom">
      <thead>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in List.tracks"
          :key="index"
          @dblclick="
            listPlay(item.id, item.al.picUrl, item.al.name, item.ar[0].name)
          "
        >
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.ar[0].name }}</td>
          <td>{{ item.al.name }}</td>
          <td>{{ item.dt }}</td>
        </tr>
      </tbody>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Bus from "../bus.js";
export default {
  name: "playlist",
  data() {
    return {
      // 歌单详情
      List: [],
      // 歌单评论
      Comment: [],
    };
  },

  created() {
    // 获取歌单详情
    axios({
      url: "http://localhost:3000/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.listId,
      },
    }).then((response) => {
      this.List = response.data.playlist;
      // 显示时间，毫秒转为分、秒显示
      for (let i = 0; i < this.List.tracks.length; i++) {
        let duration = this.List.tracks[i].dt;
        duration /= 1000;
        let min = Math.round(duration / 60); //分
        let sec = Math.round(duration % 60); //秒
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.List.tracks[i].dt = min + ":" + sec;
      }
    });

    // 获取歌单评论
    axios({
      url: "http://localhost:3000/comment/playlist",
      method: "get",
      params: {
        id: this.$route.query.listId,
      },
    }).then((response) => {
      console.log(response);
      this.Comment = response.data.comments;
    });
  },

  methods: {
    listPlay(id, picUrl, name, artist) {
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
};
</script>

<style>
.list-top {
  float: left;
  height: 33%;
  width: 100%;
  /* position: relative; */
}

.list-top-cover {
  float: left;
  width: 200px;
  position: relative;
  padding-top: 30px;
  padding-left: 30px;
}

.list-top-cover img {
  width: 100%;
}

.list-top-detail {
  float: left;
  width: 60%;
  padding-top: 30px;
  margin-left: 10px;
  overflow: hidden;
}

.list-bottom {
  position: relative;
  top: 50px;
}
</style>