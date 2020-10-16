<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#303542"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened>
      <el-submenu :index="item.id +''" v-for="item in menus"
      :key="item.id">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="'/' + childitem.path"
           v-for="childitem in item.children"
          :key="childitem.id">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{childitem.authName}}</span>
            </template>
          </el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name:'HomeMenu',
  props:{
    menus:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.el-menu{
  border-right:0;
}

</style>
