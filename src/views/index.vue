<template>
  <div class="index">
    <header></header>
    <main>
        <baidu-map class="bm-view"></baidu-map>
    </main>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>
.bm-view {
    width: 100%;
    height: 300px;
}
</style>
