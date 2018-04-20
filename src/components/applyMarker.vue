<template>
  <bm-overlay
    ref="customOverlay"
    class="applyMarker"
    pane="labelPane"
    @draw="draw">
  </bm-overlay>
</template>

<script>
export default {
  props: ['position'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x -25 + 'px'
      el.style.top = pixel.y - 40 + 'px'
    }
  }
}
</script>

<style>
.applyMarker {
  width: 50px;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  /* box-shadow: 0 0 5px #000; */
  color: #fff;
  text-align: center;
  position: absolute;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(../assets/img/computer.png);
  animation: jump 2s infinite;
}
@keyframes jump {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px)
  }
  100% {
    transform: translateY(0px)
  }
}
</style>