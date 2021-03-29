<template>
  <div class="top">
    <div class="logo">
      <img src="../../assets/top/flyer.png" alt class="logo-pic" />
      <div class="logo-title">Gw</div>
      <div class="logo-back">
        <img src="../../assets/top/back.svg" alt />
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="search">
      <input
        class="search-input"
        type="text"
        v-model="inputValue"
        @keydown.enter="toSearch"
      />
      <div class="search-icon">
        <img src="../../assets/top/search.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // 输入内容
      inputValue: "",
    };
  },
  methods: {
    toSearch() {
      if (this.inputValue == "") {
        // alert("请输入内容");
        this.$message({
          message: "请输入内容",
          type: "warning",
        });
      } else {
        // 编程式导航，通过：this.$router.push(地址);可以通过代码实现切换
        this.$router.push("/result");
        //携带数据
        this.$router.push(`/result?searchRes=${this.inputValue}`);
      }
    },
  },
};
</script>

<style>
.top {
  background-color: #202023;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
}

.logo {
  cursor: pointer;
  height: 100%;
  width: 15%;
  line-height: 100%;
  display: flex;
  float: left;
  align-items: center;
  position: relative;
  left: 20px;
}

.logo-pic {
  width: 30px;
  height: 30px;
  /* 将方形logo改为圆角 */
  border-radius: 50%;
}

.logo-title {
  position: relative;
  left: 10px;
}

.logo-back {
  display: inline-block;
  height: 25px;
  position: relative;
  left: 40px;
  opacity: 0.6;
}

.logo-back img {
  height: 100%;
}

.search {
  height: 100%;
  line-height: 100%;
  position: absolute;
  display: inline-block;
  top: 8px;
  left: 25%;
  text-align: center;
}

.search-input {
  position: absolute;
  border-radius: 10px;
  height: 50%;
  width: 200px;
  padding: 0 10px;
  line-height: 16px;
}

.search-icon {
  cursor: pointer;
  position: absolute;
  left: 190px;
  top: -2px;
}
</style>