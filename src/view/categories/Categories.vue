<template>
    <div id="categories">
      <!-- 导航面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片区域 -->
      <el-card class="box-card">
        <!-- 添加分类按钮区域 -->
        <el-button type="primary" @click="addClick">添加分类</el-button>
        <!-- 卡片-分类表格区域 -->
        <el-table :data="categoriesList" border row-key="cat_id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column label="#" width="80px"></el-table-column>
          <el-table-column label="分类名称" prop="cat_name"></el-table-column>
          <el-table-column label="是否有效" prop="path">
            <template slot-scope="scope">
              <i class="el-icon-success" v-if="scope.row.cat_deleted ===false"
               style="color:#90EE90"></i>
              <i class="el-icon-error" v-else></i>
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="level">
            <template slot-scope="scope">
              <el-tag type="primary" v-if="scope.row.cat_level === 0">一级</el-tag>
              <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
              <el-tag type="warning" v-else>三级</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="level" width="230px">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger"
              icon="el-icon-delete"
              @click="deleteCategories(scope.row.cat_id)"
              >
              删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 页码页数区域 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <add-categories :caddCategoriesDiglog="addCategoriesDiglog"
       @onchange="onCategoriesChange"></add-categories>
      </el-card>
    </div>
</template>

<script>
import AddCategories from './childcategories/AddCategories'
export default {
  name:'Categories',
  components:{
    AddCategories
  },
  data(){
    return{
      // 页码页数存储对象
      queryInfo:{
        type:3,
        pagenum:1,
        pagesize:3
      },
      // 商品分类数据储存对象
      categoriesList:[],
      // 总分类数目
      total:0,
      // 添加分类界面显示对象
      addCategoriesDiglog:false
    }
  },
  created(){
    this.getCategoriesList()
  },
  methods:{
    // 通过API获取商品分类数据
    async getCategoriesList(){
      const {data:res} = await this.$http.get('categories',{params:this.queryInfo})
      console.log(res)
      if(res.meta.status !== 200){
        this.$message.error('获取分类失败！')
      }
      this.categoriesList=res.data.result
      this.total=res.data.total
    },
    // 获取页码和页数
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getCategoriesList()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getCategoriesList()
    },
    // 通过id删除商品分类数据
    async deleteCategories(id){
      const deleteres = await this.$confirm('此操作将删除该商品分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        if(deleteres !== 'confirm'){
          return this.$message.info("已取消删除商品分类")
        }
      const {data:res} = await this.$http.delete('categories/' + id)
      if(res.meta.status !== 200){
        return this.$message.error("删除商品分类失败！")
      }
      this.$message.success("删除商品分类成功")
      this.getCategoriesList()
    },
    addClick(){
      this.addCategoriesDiglog=true
    },
    onCategoriesChange(val){
      this.addCategoriesDiglog=val
    }
  }
}
</script>

<style>

</style>
