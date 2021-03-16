<template>
  <div>搜索的音乐</div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.query.searchRes);
  },
};
</script>

<style>
</style>