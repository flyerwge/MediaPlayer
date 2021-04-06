<template>
  <div class="mv">
    <video :src="mvUrl" controls autoplay class="mv-video"></video>
    <div class="mv-related">
      <label>相关推荐</label>
      <div v-for="(item, index) in mvRelated" :key="index">
        <div>
          <img :src="item.coverUrl" alt="" class="mv-related-cover" />
          <div>{{ item.title }}</div>
          <div>by{{ item.creator[0].userName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mvplay",

  data() {
    return {
      // mv播放地址
      mvUrl: "",
      //   相关推荐
      mvRelated: [],
    };
  },

  created() {
    axios({
      url: "http://localhost:3000/mv/detail",
      method: "get",
      params: {
        mvid: this.$route.query.mvid,
      },
    }).then((response) => {
      //   console.log(response);
    });

    // 获取mv播放地址
    axios({
      url: "http://localhost:3000/mv/url",
      method: "get",
      params: {
        id: this.$route.query.mvid,
      },
    }).then((response) => {
      //   console.log(response);
      this.mvUrl = response.data.data.url;
    });

    // 相关推荐
    axios({
      url: "http://localhost:3000/related/allvideo",
      method: "get",
      params: {
        id: this.$route.query.mvid,
      },
    }).then((response) => {
      console.log(response);
      this.mvRelated = response.data.data;
    });
  },
};
</script>

<style>
.mv-video {
  width: 61%;
}

.mv-related-cover {
  width: 120px;
}
</style>