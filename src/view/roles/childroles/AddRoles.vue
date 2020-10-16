<template>
  <div id="add-roles">
      <el-dialog
      title="添加角色"
      :visible.sync="ccaddRolesDialog"
      width="50%"
      @close="addRolesClose"
      :close-on-click-modal="false"
      >
      <!-- 添加角色区域 -->
        <el-form :model="addRolesForm" :rules="addRolesFormRules"
         ref="addRolesFormRef" label-width="100px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addRolesForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addRolesForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <!-- 添加角色2个按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="ccaddRolesDialog=false">取 消</el-button>
          <el-button type="primary" @click="addclick">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name:"AddRoles",
  data(){
    return{
      ccaddRolesDialog:this.caddRolseDialog,
      addRolesForm:{
        roleName:'',
        roleDesc:''
      },
      addRolesFormRules:{
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
    caddRolseDialog:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  watch:{
    caddRolseDialog(val){
      this.ccaddRolesDialog=val
    },
    ccaddRolesDialog(val){
      this.$emit('onchange',val)
    }
  },
  methods:{
    addclick(){
      this.$refs.addRolesFormRef.validate(async valid =>{
        if(!valid) return
        const {data:res} = await this.$http.post('roles',this.addRolesForm)
        console.log(res)
        if(this.addRolesForm.roleName === res.data.roleName){
          this.$message.error("添加角色失败，请重新添加！")
        }
        this.$message.success("添加角色成功！")
        this.ccaddRolesDialog=false
      })
    },
    addRolesClose(){
      this.$refs.addRolesFormRef.resetFields()
    }
  }
}
</script>

<style>

</style>
