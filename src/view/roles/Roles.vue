<template>
<!-- --------------------------------vue视图代码区域------------------------------------- -->
  <div id="roles">
     <!-- 导航面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="change">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表table表单区域 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item1,index1) in scope.row.children"
            :key="item1.id"
            :class="['bdbottom',index1===0 ? 'bdtop' : '','tagcenter']">
            <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="deleteRolesExpand(scope.row,item1.id)"
                >{{item1.authName}}
                </el-tag>
              </el-col>
            <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row v-for="(item2,index2) in item1.children"
                :key="item2.id"
                :class="['bdbottom',index2===0 ? 'bdtop' : '','tagcenter']">
                  <el-col :span="6">
                    <el-tag closable type="warning"
                    @close="deleteRolesExpand(scope.row,item2.id)">
                    {{item2.authName}}
                    </el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type=success v-for="(item3,index3) in item2.children"
                    :key="item3.id"
                    :class="['bdbottom',index3===0 ? 'bdtop' : '']"
                    closable
                    @close="deleteRolesExpand(scope.row,item3.id)">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="80px"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="350px">
          <template slot-scope="scope">
            <el-button type="primary"
             @click="updateChange(scope.row.id)"
             icon="el-icon-edit">
             编辑
             </el-button>
            <el-button type="warning" @click="deleteRoles(scope.row.id)" icon="el-icon-delete">删除</el-button>
            <el-button type="success" @click="alterPowerChange(scope.row)" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色界面 -->
      <add-roles :caddRolseDialog="addRolesDialog"
       @onchange="onroleschange">
       </add-roles>
       <!-- 修改角色界面 -->
       <update-roles :cupdateRolesDialog="updateRolesDialog"
       @onchange="onUpdateChange"
       :cupdateRolesForm="updateRolesForm"
       >
       </update-roles>
       <!-- 分配角色权限界面 -->
       <alter-power :calterPowerDialog="alterPowerDialog"
       @onAlterPowerChange="onAlterPower"
       :crightsList="rightsList"
       :ctreeProps="treeProps"
       :cdefKeys="defKeys"
       :croleId="roleId"
       >
       </alter-power>
    </el-card>
  </div>
</template>

<script>
// --------------------------------JS代码区域-------------------------------------
import AddRoles from './childroles/AddRoles'
import UpdateRoles from './childroles/UpdateRoles'
import AlterPower from './childroles/AlterPower'
export default {
  name:'Roles',
  components:{
    AddRoles,
    UpdateRoles,
    AlterPower
  },
  data(){
    return{
      //角色列表数据对象
      rolesList:[],
      //添加角色界面是否显示对象
      addRolesDialog:false,
      //修改角色界面是否显示对象
      updateRolesDialog:false,
      // 角色表单数据对象
      updateRolesForm:{},
      // 分配权限界面显示对象
      alterPowerDialog:false,
      //获取权限的数据对象
      rightsList:[],
      // 分配权限数据绑定的对象
      treeProps:{
        label:'authName',
        children:'children'
      },
      // 默认打开的权限对象
      defKeys:[],
      //点击分配权限该角色权限的id
      roleId:0
    }
  },
  created(){
    this.getRolesList()
  },
  methods:{
    //添加角色界面点击事件
    change(){
      this.addRolesDialog=true
    },
    onroleschange(val){
      this.addRolesDialog=val
      if(this.addRolesDialog==false){
        return this.getRolesList()
      }
    },
    // 分配角色权限界面点击事件
    async alterPowerChange(role){
      const {data:res} = await this.$http.get("rights/tree")
      if(res.meta.status !== 200){
        return this.$message.error("获取角色权限失败！")
      }
      this.rightsList=res.data
      this.roleId=role.id
      this.getLeafKeys(role,this.defKeys)

      this.alterPowerDialog=true
    },
    //分配角色权限父组件和子组件对象值联通
    onAlterPower(val){
      this.alterPowerDialog=val
      console.log(this.alterPowerDialog)
      if(this.alterPowerDialog===false){
        this.defKeys=[]
        this.getRolesList()
      }
    },
    //修改角色界面点击事件
    async updateChange(id){
      this.updateRolesDialog=true
      const {data:res} = await this.$http.get('roles/'+id)
      this.updateRolesForm=res.data
    },
    onUpdateChange(val){
      this.updateRolesDialog=val
      if(this.updateRolesDialog ===false){
        this.getRolesList()
      }
    },
    //获取api角色列表
    async getRolesList(){
      const {data:res} = await this.$http.get('roles')
      this.rolesList=res.data
    },
    //根据id删除角色信息
    async deleteRoles(id){
      const deleteres = await this.$confirm('是否删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>{
          return err
        })
        if(deleteres !== 'confirm'){
          return this.$message.info("已取消删除角色")
        }
        const {data:res} = await this.$http.delete('roles/'+id)
        console.log(res)
        if(res.meta.status !== 200){
          return this.$message.error("删除角色失败！")
        }
        this.$message.success("删除角色成功！")
        this.getRolesList()
    },
    //根据id删除权限
    async deleteRolesExpand(role,rightId){
      const confirmres= await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        if(confirmres !== 'confirm'){
          return this.$message.info("您已取消删除权限")
        }
        const {data:res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if(res.meta.status !== 200){
          this.$message.error("删除权限失败！")
        }
        this.$message.success("删除权限成功！")
        role.children=res.data
    },
      //通过递归函数获取3级childern节点的id，保存在defKeys数组中
      getLeafKeys(node,arr){
        if(!node.children){
          return arr.push(node.id)
        }
        node.children.forEach(item =>
        this.getLeafKeys(item,arr))
      }
  }

}
</script>


<style scoped>
/* -------------------------------------CSS样式区域-------------------------------*/
.bdtop{
 border-top: solid 1px #eee;
}
.bdbottom{
border-bottom: solid 1px #eee;
}
.el-tag{
  margin: 7px;
}
.tagcenter{
  display: flex;
  align-items: center;
}
</style>
