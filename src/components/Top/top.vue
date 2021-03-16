<template>
  <div class="top">
    <input
      class="search"
      type="text"
      v-model="inputValue"
      @keydown.enter="toSearch"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  display: flex;
  background-color: #696969;
  height: 40px;
}
.search {
  height: 16px;
  position: absolute;
  top: 8px;
  left: 200px;
}
</style>