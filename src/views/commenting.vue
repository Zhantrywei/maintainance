<template>
  <div class="commenting">
      <!-- 进入消息提示，发送stuId查询status为0和1的单，返回，报修单，如果报修单status为0可以取消报修；如果为1显示完成按钮 -->
      <el-table v-if="showApply" :data="list" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" :index="getIndex" align="center"></el-table-column>
        <el-table-column
          label="商品名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="desc">
        </el-table-column>
      </el-table>
      <el-table v-else :data="list" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" :index="getIndex" align="center"></el-table-column>
        <el-table-column
          label="报修主题"
          prop="name">
        </el-table-column>
        <el-table-column
          label="报修时间"
          prop="desc">
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="desc">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import common from "../assets/js/common"
export default {
  name: 'commenting',
  data(){
    return {
      list:[],
      showApply: common.getCookie("roleId") == 2
    }
  },
  methods: {
    getMsg(){
      var that = this;
      var roleId = common.getCookie("roleId");
      var stuId = common.getCookie("stuId");
      if(roleId==2){
        //如果为报修用户，发送学号，查询报修单
        this.$http.post('/api/record/getlist',{
          applyStuId: stuId
        }).then(function(res){
          console.log("获取信息列表： ",res.data.result);
          
        }).catch(function(err){
          console.log(err)
        })
      }else if(roleId==1){
        //如果为维修用户，发送学号，查询报修单
      }
    },
    getIndex(index){
      return index+1;
    }
  },
  beforeMount(){
    this.getMsg();
  }
}
</script>

<style scoped>
</style>
