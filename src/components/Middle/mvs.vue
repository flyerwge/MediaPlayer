<template>
  <div class="mv">
    <div v-for="(item, index) in mvs" :key="index">
      <div class="mv-item">
        <div>
          <img class="mv-cover" :src="item.cover" @click="mvPlay(item.id)" />
          <img class="mv-run" src="../../assets/playmusic/bofang.svg" />
        </div>
        <p class="mv-name">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MV",

  data() {
    return {
      mvs: [],
    };
  },

  created() {
    axios({
      url: "http://localhost:3000/mv/all",
      method: "get",
    }).then((response) => {
      // console.log(response);
      this.mvs = response.data.data;
    });
  },

  methods: {
    mvPlay(id) {
      // console.log(id);
      this.$router.push(`/mvplay?mvid=${id}`);

      // axios({
      //   url: "http://localhost:3000/mv/detail",
      //   method: "get",
      //   params: {
      //     mvid: id,
      //   },
      // }).then((response) => {
      //   console.log(response);
      // });
    },
  },
};
</script>

<style>
.mv-item {
  /* display: inline-block; */
  float: left;
  width: 200px;
  height: 170px;
  margin-left: 30px;
  margin-top: 50px;
  position: relative;
}
.mv-cover {
  width: 200px;
  height: 150px;
}

.mv-run {
  /* background-color: rgba(255, 255, 255, 0.2); */
  position: absolute;
  left: 70px;
  top: 50px;
  z-index: 1;
}

.mv-name {
  table-layout: fixed;
  word-wrap: break-all;
  word-break: normal;
  overflow: hidden;
}
</style>