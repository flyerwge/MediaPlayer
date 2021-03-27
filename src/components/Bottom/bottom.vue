<template>
  <div class="bottom">
    <div class="bottom-left">
      <div>
        <img src="../../assets/bottom/pre.png" />
      </div>
      <div @click="toggle()">
        <img
          src="../../assets/bottom/play.png"
          class="img-run"
          v-show="isPlay"
        />
        <img
          src="../../assets/bottom/play2.png"
          class="img-run"
          v-show="!isPlay"
        />
      </div>
      <div>
        <img src="../../assets/bottom/next.png" />
      </div>
    </div>
    <div class="botton-mid">
      <audio
        :src="musicUrl"
        controls
        autoplay
        class="bottom-mid-progress"
      ></audio>
    </div>
    <div class="bottom-right"></div>
  </div>
</template>

<script>
import Bus from "../bus.js";

export default {
  name: "Bottom",
  data() {
    return {
      isPlay: true,
      musicUrl: "",
    };
  },

  mounted() {
    Bus.$on("val", (data) => {
      this.musicUrl = data;
    });
  },

  methods: {
    toggle() {
      this.isPlay = !this.isPlay;
      // if (this.isPlay && this.$refs.audio.readyState == 4)
      //   this.$refs.audio.play();
      // else {
      //   this.$refs.audio.pause();
      // }
    },
  },
};
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

.bottom-mid {
  width: 85%;
  background-color: black;
}

.bottom-mid-progress {
  width: 70%;
  background-color: black;
}
/* .img-run {
  width: 30px;
} */
</style>