<template>
  <home></home>
</template>

<script>
import Home from "./views/Home.vue";
import Top from "./components/Top/top.vue";
import Middle from "./components/Middle/middle.vue";
export default {
  name: "APP",
  components: {
    Top,
    Middle,
    Home,
  },
};
</script>

<style>
</style>
