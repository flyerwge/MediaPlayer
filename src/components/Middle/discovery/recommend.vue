<template>
  <div class="recommend">
    <!-- <div class="recommend-banners"></div> -->
    <label class="recommend-label">推荐歌单</label>
    <div class="recommend-lists">
      <div
        class="recommend-list"
        v-for="(item, index) in list"
        :key="index"
        @click="getAll(item.id)"
      >
        <div>
          <img class="recommend-lists-img" :src="item.coverImgUrl" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Recommend",

  data() {
    return {
      //推荐歌单
      list: [],
    };
  },

  created() {
    axios({
      url: "http://localhost:3000/top/playlist",
      method: "get",
      params: {
        limit: 10,
      },
    }).then((response) => {
      console.log(response);
      this.list = response.data.playlists;
    });
  },

  methods: {
    getAll(id) {
      this.$router.push(`/playlist?listId=${id}`);
    },
  },
};
</script>

<style>
.recommend {
  margin-left: 30px;
}

.recommend-list {
  float: left;
  width: 200px;
  height: 250px;
  margin-right: 30px;
  margin-top: 30px;
}

.recommend-lists-img {
  width: 200px;
  height: 200px;
}
</style>