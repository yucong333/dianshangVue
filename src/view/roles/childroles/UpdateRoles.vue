<template>
  <div id="update-roles">
      <el-dialog
      title="修改角色"
      :visible.sync="ccupdateRolesDialog"
      width="50%"
      :close-on-click-modal="false"
      >
      <!-- 添加角色区域 -->
        <el-form :model="cupdateRolesForm" :rules="updateRolesFormRules"
         ref="updateRolesFormRef" label-width="100px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="cupdateRolesForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="cupdateRolesForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <!-- 添加角色2个按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="ccupdateRolesDialog=false">取 消</el-button>
          <el-button type="primary" @click="updateClick">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name:'UpdateRoles',
  data(){
    return{
      //界面隐藏data和props联通
      ccupdateRolesDialog:this.cupdateRolesDialog,
      //表单验证
      updateRolesFormRules:{
        roleName:[
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        roleDesc:[
          {required: true, message: '请输入角色描述', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ]
      }
    }
  },
  props:{
    //界面是否显示props对象
    cupdateRolesDialog:{
      type:Boolean,
      default(){
        return false
      }
    },
    //该行的数据显示props对象
    cupdateRolesForm:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  watch:{
    //监听props和data的数据一致
    cupdateRolesDialog(val){
      this.ccupdateRolesDialog=val
    },
    //传给父组件点击事件和val数据值
    ccupdateRolesDialog(val){
      this.$emit("onchange",val)
    }
  },
  methods:{
    updateClick(){
      this.$refs.updateRolesFormRef.validate(async valid =>{
        if(!valid) return
         const {data:res} = await this.$http.put('roles/'+this.cupdateRolesForm.roleId,
         {roleName:this.cupdateRolesForm.roleName,roleDesc:this.cupdateRolesForm.roleDesc})
         console.log(res)
         if(res.meta.status !== 200){
           return this.$message.error("修改角色失败！")
         }
         this.$message.success("修改角色成功！")
         this.ccupdateRolesDialog=false
      })
    }
  }
}
</script>

<style>

</style>
