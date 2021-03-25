<template>
  <div class="bottom">
    <div class="bottom-left">
      <div>
        <img src="../../assets/bottom/pre.png" />
      </div>
      <div>
        <img src="../../assets/bottom/play.png" class="img-run" />
      </div>
      <div>
        <img src="../../assets/bottom/next.png" />
      </div>
    </div>
    <div class="botton-mid"></div>
    <div class="bottom-right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.bottom {
  background-color: #212124;
  height: 45px;
  width: 100%;
  position: fixed;
  bottom: 0;
}

.bottom-left {
  display: flex;
  float: left;
  width: 15%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}

.bottom-left div {
  cursor: pointer;
}

.bottom-left img {
  width: 40px;
  height: 40px;
}

/* .img-run {
  width: 30px;
} */
</style>