<template>
  <div class="share">
    <div class="head">
      <el-input class="search" placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="search">
      </el-input>
      <el-button type="primary" class="editBtn" circle icon="el-icon-plus"></el-button>
    </div>
    <div class="showShareData">
      <ul>
        <!-- <li v-for="item in showShareData" :key="item.index" :item="item"></li> -->
        <!-- <li v-for="item in showShareData" :key="item.index" :item="item"> -->
        <li class="clearfix">
          <!-- <p v-html="item.shareTitle"></p> -->
          <div class="left">
            <h2 class="title">电脑固态</h2>
            <p class="desc">新买的固态硬盘,250GB,598元,超值!</p>

          </div>
          <div class="right">
            <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=847840743,1344629886&fm=58" width="100px" height="75px">

          </div>
          <!-- <img :src="item.shareImg" width="100" height="100"> -->
          <div class="bottom">
            <span class="shareTime">2018-4-20 14:20:53</span>
            <span class="shareUser">詹源伟
              <i class="el-icon-edit-outline" @click="showComment = true"></i>
            </span>

          </div>
        </li>
        <li class="clearfix">
          <!-- <p v-html="item.shareTitle"></p> -->
          <div class="left">
            <h2 class="title">急救！电脑崩了</h2>
            <p class="desc"></p>

          </div>
          <div class="right">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524816564&di=1dbcbe492b8df782b17be5a4d2cc2448&imgtype=jpg&er=1&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F3b292df5e0fe99253cc34b8336a85edf8cb17111.jpg" width="100px" height="75px">

          </div>
          <!-- <img :src="item.shareImg" width="100" height="100"> -->
          <div class="bottom">
            <span class="shareTime">2018-4-20 14:20:53</span>
            <span class="shareUser">詹源伟
              <i class="el-icon-edit-outline" @click="showComment = true"></i>
            </span>

          </div>
        </li>
      </ul>
    </div>

    <div class="comment" v-show="showComment">
      <el-input placeholder="请输入评论" v-model="input4">
        <el-button slot="append" icon="el-icon-check"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
    name: "share",
    data() {
        return {
            search: "",
            showShareData: [],
            showComment: false
        };
    }
};
</script>

<style scoped>
.head {
    width: 100%;
    height: 50px;
    background-color: white;
    box-sizing: border-box;
    padding: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #eee;
}
.search {
    width: 80%;
    height: 40px;
}
.editBtn {
    /* width: 40px; */
    height: 40px;
    border-radius: 5px;
}
.showShareData ul li {
    width: 100%;
    /* height: 170px; */
    background-color: white;
    padding: 10px;
    box-sizing: border-box;
}
.showShareData ul li + li {
    border-top: 1px solid #eee;
}

.left {
    float: left;
    width: 70%;
    /* background-color: pink; */
}
.left h2 {
    font-size: 20px;
    font-weight: bold;
}
.right {
    float: right;
    width: 30%;
    box-sizing: border-box;
    padding: 4px;
}
.right img {
    border-radius: 4px;
}
.title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 28px;
}
.desc {
    text-indent: 1em;
    font-size: 18px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}
.bottom {
    width: 100%;
    height: 20px;
    font-size: 16px;
    color: #aaa;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.shareUser {
    display: inline-block;
}
.commentInput {
    width: 100%;
}
</style>
