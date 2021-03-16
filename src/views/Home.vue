<template>
  <div>
    <!-- 头部组件 -->
    <Top></Top>
    <!-- 主体组件 -->
    <middle></middle>
  </div>
</template>

<script>
// @ is an alias to /src
import Top from "../components/Top/top.vue";
import Middle from "../components/Middle/middle.vue";

export default {
  name: "Home",
  components: {
    Top,
    Middle,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
