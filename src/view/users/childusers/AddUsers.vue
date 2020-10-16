<template>
  <el-dialog
  title="添加用户"
  :visible.sync="ccaddUsersShow"
  width="50%"
  @close="addUsersClose"
  :close-on-click-modal="false"
  >
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="ccaddUsersShow=false">取 消</el-button>
      <el-button type="primary" @click="cchange">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name:'AddUsers',
  data(){
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
      //data赋值props属性
      ccaddUsersShow:this.caddUsersShow,
      //添加表单的数据
      addForm:{
        username:'',
        password:'',
        mobile:'',
        email:''
      },
      //添加表单的数据验证
      addFormRules:{
        username:
        [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:
        [
          {required: true, message: '请输入密码', trigger: 'blur'},
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
    //创建props布尔值
    caddUsersShow:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  watch:{
    //watch监听props数据改变
    caddUsersShow(val){
      this.ccaddUsersShow=val
    },
    //向父组件传data的数据
    ccaddUsersShow(val){
      this.$emit("onchange",val)
    }
  },
  methods:{
    //点击事件data的数据改变
    cchange(){
      this.$refs.addFormRef.validate(async valid=>{
        if(!valid) return
        const {data:res} = await this.$http.post('users',this.addForm)
        if(res.meta.status != 201){
          this.$message.error('添加用户失败')
        }
        this.$message.success('添加用户成功')
        this.ccaddUsersShow=false
      })
    },
    addUsersClose(){
      this.$refs.addFormRef.resetFields()
    }
  }
}
</script>

<style>

</style>
