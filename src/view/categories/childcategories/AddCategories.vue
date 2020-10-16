<template>
  <div id="add-categories">
    <el-dialog
      title="添加分类"
      :visible.sync="ccaddCategoriesDiglog"
      width="50%"
      >
      <!-- 添加角色区域 -->
        <el-form ref="addCategoriesFormRef" label-width="100px">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <!-- 添加角色2个按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="ccaddCategories=false">取 消</el-button>
          <el-button type="primary" @click="ccaddCategories=false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name:'AddCategories',
  data(){
    return{
      ccaddCategoriesDiglog:this.caddCategoriesDiglog
    }
  },
  props:{
    caddCategoriesDiglog:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  watch:{
    caddCategoriesDiglog(val){
      this.ccaddCategoriesDiglog=val
    },
    ccaddCategoriesDiglog(val){
      this.$emit('onchange',val)
    }
  }
}
</script>

<style>

</style>
