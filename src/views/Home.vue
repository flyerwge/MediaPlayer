<template>
  <div>
    <!-- 头部组件 -->
    <top></top>
    <!-- 主体组件 -->
    <middle></middle>
    <!-- 底部组件 -->
    <bottom></bottom>
  </div>
</template>

<script>
// @ is an alias to /src
import Top from "../components/Top/top.vue";
import Middle from "../components/Middle/middle.vue";
import Bottom from "../components/Bottom/bottom.vue";

export default {
  name: "Home",
  components: {
    Top,
    Middle,
    Bottom,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
