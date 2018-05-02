<template>
  <div class="sharemanage">      
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'system' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>圈子管理</el-breadcrumb-item></el-breadcrumb>
      <!-- 圈子分享展示: 谁分享的,分享了什么,分享状态,时间 -->
      <el-table :data="sharesList" style="width: 100%;" :stripe="true">
        <el-table-column class="demo-table-expand" type="expand" fixed>
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户学号" width="100">
                <span>{{ props.row.shareStuId }}</span>
              </el-form-item>
              <el-form-item label="用户姓名" width="100">
                <span>{{ props.row.shareName }}</span>
              </el-form-item>
              <el-form-item label="分享主题" width="100">
                <span>{{ props.row. shareTitle}}</span>
              </el-form-item>
              <el-form-item label="分享时间" class="questionDes">
                <span>{{ props.row. shareTime}}</span>
              </el-form-item>
              <el-form-item label="分享描述" width="100" style="display: block">
                <span>{{ props.row. shareDesc}}</span>
              </el-form-item>
              <el-form-item label="分享图片" class="questionDes" style="display: block">
                 <img :src="props.row.shareImg" style="width: 200px;">
              </el-form-item>
              <el-form-item label="用户评论" v-if="props.row.comments.length !== 0">
                <ul>
                  <li v-for="item in props.row.comments" :key="item.index">
                    <span class="user">{{item.user}}</span>
                    <span>:</span>
                    <span class="content">{{item.content}}</span>
                    <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" :index="indexMethod" fixed align="center"></el-table-column>
        <el-table-column prop="shareStuId" label="用户学号" align="center">
        </el-table-column>
        <el-table-column prop="shareName" label="用户姓名" align="center">
        </el-table-column>
        <el-table-column prop="shareTitle" label="分享主题" align="center">
        </el-table-column>
        <el-table-column prop="shareTime" label="分享时间" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary">分单</el-button> -->
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: "sharemanage",
  data() {
    return {
      sharesList: [
        {
          shareStuId: "201441404409",
          shareName: "詹源伟",
          shareTitle: "电脑固态",
          shareDesc: "新买的固态硬盘,250GB,598元,超值!",
          shareImg:
            "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=847840743,1344629886&fm=58",
          shareTime: "2018-4-20 14:20:53",
          status: "已审核",
          comments: []
        },
        {
          shareStuId: "201441404409",
          shareName: "詹源伟",
          shareTitle: "急救！电脑崩了",
          shareDesc: "今天安装了一个新的驱动之后就进入不了系统",
          shareImg:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524816564&di=1dbcbe492b8df782b17be5a4d2cc2448&imgtype=jpg&er=1&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F3b292df5e0fe99253cc34b8336a85edf8cb17111.jpg",
          shareTime: "2018-4-20 14:20:53",
          status: "已审核",
          comments: [
            {
              user: "维修员A",
              content: "重启进入安全模式,卸载新装的驱动"
            },
            {
              user: "维修员B",
              content: "如果进不去安全模式,就只能重装系统了"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.user {
  color: #586C7F;
}
</style>
