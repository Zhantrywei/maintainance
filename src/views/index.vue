<template>
  <div class="index">
    <header>
      <div class="user">
        <router-link :to="{name: 'me'}" tag="div">
          <icon name="user"></icon>
        </router-link>
      </div>
      <div class="location">
        <icon name="location-arrow"></icon>
        <span>获取当前位置</span>
      </div>
      <div class="commenting">
         <router-link :to="{name: 'commenting'}" tag="div">
        <icon name="commenting"></icon>
         </router-link>
      </div>
    </header>
    <main>
      <!-- <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler"></baidu-map> -->
      <router-view></router-view>
    </main>
    <nav>
      <li>
        <router-link :to="{name: 'apply'}" tag="div">
          <icon name="pencil"></icon>
          <span>报修</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'repair'}" tag="div">
          <icon name="wrench"></icon>
          <span>维修</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'share'}" tag="div">
          <icon name="support"></icon>
          <span>圈子</span>
        </router-link>
      </li>
    </nav>
  </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            center: { lng: 0, lat: 0 },
            zoom: 3,
            location: ""
        };
    },
    methods: {
        getLocation() {
            var that = this;
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
                console.log("that: ", that);
            });
        },
        handler({ BMap, map }) {
            this.getLocation();
            // console.log('location: ', this.location)
            // console.log(BMap, map)
            this.center.lng = 116.404;
            this.center.lat = 39.915;
            this.zoom = 15;
        }
    },
    mounted() {
        // console.log('test: ', this.getLocation())
    }
};
</script>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    /* width: 100%; */
    height: 50px;
    align-items: center;
    justify-content: space-between;
    margin: 0 10px;
}
.fa-icon {
    width: auto;
    height: 1em;
}
.bm-view {
    width: 100%;
    height: 300px;
}

nav {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
}
nav li {
    width: 33.33%;
    height: 50px;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
}
nav li:first-child,
nav li:last-child {
    border-left: 0px;
    border-right: 0px;
}

main {
    width: 100%;
    position: absolute;
    background-color: lightgreen;
    top: 50px;
    bottom: 50px;
}
</style>
