<template>
  <div class="index">
    <!-- 导航区域 -->
    <div class="nav">
      <ul>
        <!-- router-link标签：声明式导航，设置to属性，可以实现点击切换 -->
        <li><router-link to="/discovery">发现音乐</router-link></li>
        <li><router-link to="/playlists">推荐音乐</router-link></li>
        <li><router-link to="/songs">最新音乐</router-link></li>
        <li><router-link to="/mvs">全部MV</router-link></li>
      </ul>

      <!-- 当前播放音乐显示 -->
      <div class="play-cur">
        <img :src="imgUrl" class="img-cur" />
        <span>
          <span>{{ name }}</span>
          <span>{{ artist }}</span>
        </span>
      </div>
    </div>

    <!-- 主体区域 -->
    <div class="main">
      <!-- 设置路由出口 ,希望匹配到的组件显示在哪里，就在哪里设置一个router-view标签-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Bus from "../bus.js";
export default {
  name: "middle",
  data() {
    return {
      imgUrl: "",
      name: "",
      artist: "",
    };
  },

  // 接收当前播放歌曲的封面、名称、歌手
  mounted() {
    Bus.$on("picUrl", (data) => {
      this.imgUrl = data;
    });
    Bus.$on("name", (data) => {
      this.name = data;
    });
    Bus.$on("artist", (data) => {
      this.artist = data;
    });
  },
};
</script>

<style>
.index {
  display: flex;
  height: 100%;
  min-height: 850px;
  width: 100%;
  margin-top: 49px;
  margin-bottom: 44px;
}
.index .nav {
  width: 15%;
  height: 100%;
  position: fixed;
  min-height: 830px;
  background-color: #333333;
}
/* 后代选择器，中间加空格 */
.index .nav ul {
  color: #666666;
  text-align: center;
  margin: 10px;
}

.play-cur {
  position: absolute;
  bottom: 85px;
  /* padding-bottom: 0; */
}

.img-cur {
  width: 50px;
}

.index .main {
  background-color: orange;
  /* 使用剩余的尺寸 */
  margin-left: 15%;
  flex: 1;
}

a.router-link-active {
  color: white;
  /* background-color: orange; */
}
</style>