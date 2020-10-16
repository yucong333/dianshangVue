<template>
  <div id="users">
    <!-- 导航面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片内容区域 -->
    <el-card class="box-card">
      <!-- 卡片顶部查询和添加用户 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容"
           class="input-with-select"
           v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="change" >添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 卡片用户表单区域 -->
      <el-table :data="usersList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChage(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="username" width="200px">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="修改用户" placement="top" :enterable="false">
                <el-button type="primary" @click="updateChange(scope.row.id)" icon="el-icon-edit" size="mini"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false">
                <el-button type="danger" @click="deleteUsers(scope.row.id)" icon="el-icon-delete" size="mini"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" @click="assignRolesClick(scope.row)" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
            </template>
        </el-table-column>
      </el-table>
      <!-- 用户总数翻页页数区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户界面区域 -->
    <add-users :caddUsersShow="addUsersShow"  @onchange="onchangeshow"></add-users>
    <!-- 修改用户界面区域 -->
    <update-users :cupdateUsers=updateUsers
    @onupdatechange="onupdatechanges"
    :cupdateForm=updateForm
    ></update-users>
    <!-- 分配角色界面区域 -->
    <assign-roles :cassignRolesDialog=assignRolesDialog
    @onassignRoles="onassignRolesChange"
    :cuserInfo="userInfo"
    :crolesList="rolesList"
    >
    </assign-roles>
    </el-card>
  </div>
</template>

<script>
import AddUsers from './childusers/AddUsers'
import updateUsers from './childusers/UpdateUsers'
import AssignRoles from './childusers/AssignRoles'
export default {
  name:'Users',
  components:{
    AddUsers,
    updateUsers,
    AssignRoles
  },
  data(){
    return{
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:10
      },
      //用户列表对象
      usersList:[],
      //总用户数量
      total:0,
      //添加用户界面是否显示
      addUsersShow:false,
      //修改用户界面是否显示
      updateUsers:false,
      //修改用户界面表单数据
      updateForm:{},
      // 分配角色界面是否显示
      assignRolesDialog:false,
      // 分配角色
      userInfo:{},
      // 角色名称数据
      rolesList:[],
    }
  },
  created(){
    this.getUsersList()
  },
  methods:{
    //点击添加用户按钮，父组件布尔值改变
    change(){
      this.addUsersShow=true
    },
    //点击修改用户按钮，通过id获取该行用户信息
    async updateChange(id){
      this.updateUsers=true
      const {data:res} = await this.$http.get('users/'+id)
      if(res.meta.status!=200){
        this.$message.error('获取用户信息失败！')
      }
      this.updateForm=res.data
      // console.log(this.updateForm)
    },
    //添加用户子组件事件和父组件事件val值联通
    onchangeshow(val){
      this.addUsersShow=val
      if(this.addUsersShow === false){
        this.getUsersList()
      }
    },
    //修改用户子组件事件和父组件事件val值联通
    onupdatechanges(val){
      this.updateUsers=val
      if(this.updateUsers === false){
        this.getUsersList()
      }
    },
    // 分配角色按钮父子组件val值联通
    onassignRolesChange(val){
      this.assignRolesDialog=val
      if(this.assignRolesDialog === false){
        this.getUsersList()
      }
    },
    async assignRolesClick(userInfo){
      this.userInfo=userInfo
      console.log(userInfo)
      const {data:res} = await this.$http.get('roles')
      this.rolesList=res.data
      this.assignRolesDialog=true
    },
    //api获取用户列表的信息
    async getUsersList(){
     const {data:res} = await this.$http.get('users',{params:this.queryInfo})
     if(res.meta.status !==200){
        return this.$message.error("获取用户数据失败")
     }
    this.usersList=res.data.users
    this.total=res.data.total
    },
    //页码和页数
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getUsersList()
    },
    //通过api修改用户的状态
    async userStateChage(userInfo){
      const {data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if(res.meta.status !== 200){
        userInfo.mg_state !=userInfo.mg_state
        return this.$message.error("修改用户状态失败！")
      }
      this.$message.success("修改用户状态成功！")
    },
    //删除用户
    async deleteUsers(id){
      const deleteres = await this.$confirm('是否删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>{
          return err
        })
        if(deleteres !== 'confirm'){
          return this.$message.info("已取消删除用户")
        }
        const {data:res} =await this.$http.delete('users/'+id)
        if(res.meta.status !== 200){
          return this.$message.error("删除用户失败！")
        }
        this.$message.success("删除用户成功！")
        this.getUsersList()
    }
  }
}
</script>

<style>

</style>
