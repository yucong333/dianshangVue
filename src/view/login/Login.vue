<template>
    <div id="login">
      <div class="login-box">
        <div class="login-img">
          <img src="../../assets/logo.png" alt="">
        </div>
        <!-- 登录表单 -->
        <el-form ref="loginFormRef"
         :model="loginform"
         class="login-form"
         :rules="loginFormRules"
         >
         <!-- 用户名登录 -->
          <el-form-item prop="username">
            <el-input
            v-model="loginform.username"
            prefix-icon="el-icon-s-custom"
            >
            </el-input>
          </el-form-item>
          <!-- 密码登录 -->
          <el-form-item prop="password">
            <el-input v-model="loginform.password"
             prefix-icon="el-icon-s-cooperation"
             type="password">
             </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="loginFromReset(loginform)" type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name:'Login',
  data(){
    return{
      //用户名和密码的obj
      loginform:{
        username:'admin',
        password:'123456'
      },
      //表单的用户名和密码输入验证
      loginFormRules:{
        username:[
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 5, message: '用户名在 3 到 5 个字符', trigger: 'blur' }
          ],
        password:[
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 10, message: '密码在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    //登录表单的重置效果
    loginFromReset(loginform){
      this.$refs.loginFormRef.resetFields();
    },
    //登录表单登录获取的http数据
    login(){
        this.$refs.loginFormRef.validate(async valid=>{
          if(!valid) return
          const res = await this.$http.post("login",this.loginform)
          console.log(res)
          if(res.data.meta.status!=200){
            this.$message.error(res.data.meta.msg)
          }else{
            this.$message.success(res.data.meta.msg)
            window.sessionStorage.setItem("token",res.data.data.token)
            this.$router.push('./home')
          }
        })
    }
  }
}
</script>

<style scoped>
#login{
  background-color: #2b4b6b;
  height: 100%;
}
.login-box{
  background-color: #fff;
  width: 450px;
  height: 300px;
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.login-img{
  border: 1px solid #f6f6f6;
  background-color: #fff;
  border-radius: 50%;
  height: 130px;
  width: 130px;
  position:absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%,-50%);
}
.login-img img{
  height: 130px;
  width: 130px;
  border-radius: 50%
}
.login-form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
