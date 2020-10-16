<template>
  <div id="update-users">
    <el-dialog
    title="修改用户"
    :visible.sync="ccupdateUsers"
    width="50%"
    @close="updateUsersClose"
    :close-on-click-modal="false"
    >
    <!-- 修改用户表单区域 -->
      <el-form :model="cupdateForm" :rules="cupdateFormRules" ref="cupdateFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="cupdateForm.username"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="cupdateForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="cupdateForm.email"></el-input>
        </el-form-item>
      </el-form>
      <!-- 修改用户按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="change">取 消</el-button>
        <el-button type="primary" @click="change">修 改</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name:'UpdateUsers',
  data(){
    //手机号和邮箱的正则验证规则
    let checkEmail=(rule, value, callback)=>{
      const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(regEmail.test(value)){
        return callback()
      }
      callback(new Error("请输入合法的邮箱"))
    }
    let checkMobile=(rule, value, callback)=>{
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if(regMobile.test(value)){
        return callback()
      }
      callback(new Error("请输入合法的手机号"))
    }
    return{
      //data对象与props对象联通
      ccupdateUsers:this.cupdateUsers,
      //修改用户的表单验证
      cupdateFormRules:{
        username:
        [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
         mobile:
        [
          {required: true, message: '请输入手机', trigger: 'blur'},
          {validator:checkMobile,trigger: 'blur'}
        ],
        email:
        [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator:checkEmail,trigger: 'blur'}
        ],
      }
    }
  },
  props:{
    //表单隐藏对象
    cupdateUsers:{
      type:Boolean,
      default(){
        return false
      }
    },
    //修改表单对象
    cupdateForm:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  watch:{
    //监听porps与data的数据值联通
    cupdateUsers(val){
      this.ccupdateUsers=val
    },
    //向父组件发送data的数据
    ccupdateUsers(val){
      this.$emit('onupdatechange',val)
    }
  },
  methods:{
    //隐藏修改界面点击事件
    change(){
      this.$refs.cupdateFormRef.validate( async valid =>{
        if(!valid){
          return valid
        }
       const {data:res} = await this.$http.put('users/'+this.cupdateForm.id,
       {email:this.cupdateForm.email,mobile:this.cupdateForm.mobile})
       console.log(res)
       if(res.meta.status !== 200){
        return this.$message.error("修改用户信息失败！")
       }
        this.$message.success("修改用户信息成功！")
        this.ccupdateUsers=false
      })
    },
    //监听表单重置事件
    updateUsersClose(){
      this.$refs.cupdateFormRef.resetFields()
    }
  }
}
</script>

<style>

</style>
