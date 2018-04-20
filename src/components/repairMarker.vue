<template>
  <bm-overlay
    ref="customOverlay"
    class="repairMarker"
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
      el.style.left = pixel.x -20 + 'px'
      el.style.top = pixel.y - 40 + 'px'
    }
  }
}
</script>

<style>
.repairMarker {
  width: 40px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  /* box-shadow: 0 0 5px #000; */
  color: #fff;
  text-align: center;
  position: absolute;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(../assets/img/settings.png);
  animation: rotate 3s infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg)
  }
  25% {
    transform: rotate(90deg)
  }
  50% {
    transform: rotate(180deg)
  }
  75% {
    transform: rotate(270deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>