<template>
    <el-container class="home-container">
      <el-header>
        <div class="home-logo">
          <img src="../../assets/logo.png" alt="">
          <span>电商后台管理系统</span>
        </div>
        <el-button class="end" type="info" @click="endlogin">退出</el-button>
      </el-header>
      <el-container>
          <el-aside width="200px">
            <home-menu :menus=menuList></home-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
</template>

<script>
import HomeMenu from './childhome/HomeMenu'
export default {
  name:'Home',
  components:{
    HomeMenu
  },
  data(){
    return{
      menuList:[]
    }
  },
  created(){
    this.getHomeMenu()
  },
  methods:{
    endlogin(){
      window.sessionStorage.clear();
      this.$router.push('/login')
    },
    async getHomeMenu(){
     const {data:res} = await this.$http.get('/menus')
     this.menuList=res.data
    }
  }
}
</script>

<style scoped>
.home-container{
  height: 100%;
}
.home-logo img{
  widows: 50px;
  height: 50px;
}
.home-logo{
  display: flex;
  align-items: center ;
  color: white;
}
.el-header{
  background-color: #343B3E;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #E6EAEE;
  /* position: relative */
}

.el-aside{
  background-color: #303542;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 60px;
}
.el-main{
  background-color: #E6EAEE;
  position: absolute;
  left: 200px;
  bottom: 0;
  top: 60px;
  right: 0;
}
</style>
