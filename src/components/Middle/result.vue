<template>
  <div>
    <h2>{{ this.$route.query.searchRes }}</h2>
    <span
      >搜索“{{ this.$route.query.searchRes }}”，共找到{{
        resultCount
      }}个结果</span
    >
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
            <td>1</td>
            <td>{{ item.name }}</td>
            <td>{{ item.ar[0].name }}</td>
            <td>{{ item.al.name }}</td>
            <td>{{ item.dt }}</td>
          </tr>
        </tbody>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="result-artist">配置管理</el-tab-pane>
      <el-tab-pane label="专辑" name="result-periodical">角色管理</el-tab-pane>
      <el-tab-pane label="视频" name="result-video">定时任务补偿</el-tab-pane>
      <el-tab-pane label="MV" name="result-MV">定时任务补偿</el-tab-pane>
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
      activeName: "result-song",
      //搜索总结果
      searchResult: [],
      // 搜索总数
      resultCount: "",
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
};
</script>

<style>
</style>