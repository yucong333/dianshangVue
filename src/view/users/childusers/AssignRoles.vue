<template>
    <div id="assign-roles">
      <!-- 分配角色对话框区域 -->
        <el-dialog
        title="分配角色"
        :visible.sync="ccassignRolesDialog"
        width="50%"
        @close="assignRolesClose"
        :close-on-click-modal="false"
        >
        <!-- 内容区域 -->
          <span>
            <div>
              <p>当前用户：{{cuserInfo.username}}</p>
              <p>当前角色：{{cuserInfo.role_name}}</p>
              <p>
                分配新角色：
                  <el-select v-model="caddRolesId" placeholder="请选择">
                    <el-option
                      v-for="item in crolesList"
                      :key="item.id"
                      :label="item.roleName"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </p>
            </div>
          </span>
          <!-- 按钮区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="ccassignRolesDialog = false">取 消</el-button>
            <el-button type="primary" @click="assignRolesClick">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name:'AssignRoles',
  data(){
    return{
      // props对象赋值为data对象
      ccassignRolesDialog:this.cassignRolesDialog,
      // 角色名称存储对象
      caddRolesId:''
    }
  },
  props:{
    // 分配角色界面是否显示props对象
    cassignRolesDialog:{
      type:Boolean,
      default(){
        return false
      }
    },
    // 该用户的信息props对象
    cuserInfo:{
      type:Object,
      default(){
        return {}
      }
    },
    // 所有的角色权限数据props对象
    crolesList:{
      type:Array,
      default(){
        return []
      }
    },
  },
  watch:{
    // 监听界面data和props的val值联通一致
    cassignRolesDialog(val){
      this.ccassignRolesDialog=val
    },
    // 项目父组件发送点击事件并发送val值
    ccassignRolesDialog(val){
      this.$emit('onassignRoles',val)
    }
  },
  methods:{
    // 通过api给用户分配角色
    async assignRolesClick(){
      const {data:res} = await this.$http.put(`users/${this.cuserInfo.id}/role`,{rid:this.caddRolesId})
      console.log(res)
      if(res.meta.status !== 200){
        return this.$message.error("分配角色失败！")
      }
      this.$message.success("分配角色成功！")
      this.ccassignRolesDialog=false
    },
    // 页面关闭后界面清空
    assignRolesClose(){
      this.caddRolesId = ''
    }
  }
}
</script>

<style>

</style>
