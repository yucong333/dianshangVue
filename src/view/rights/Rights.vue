<template>
  <div id="rights">
    <!-- 导航面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-table :data="rightsList" border>
        <el-table-column type="index" label="#" width="80px"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0' ">等级一</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success">等级二</el-tag>
            <el-tag v-else type="warning">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'Rights',
  data(){
    return{
      rightsList:[]
    }
  },
  created(){
    this.getRigthsList()
  },
  methods:{
   async getRigthsList(){
      const {data:res}  = await this.$http.get('rights/list')
      this.rightsList=res.data
    }
  }

}
</script>

<style scoped>
#rights{
  height: 100%;
}
</style>
