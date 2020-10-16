<template>
    <div id="alter-power">
      <el-dialog
      title="分配权限"
      :visible.sync="ccalterPowerDialog"
      width="50%"
      :close-on-click-modal="false"
      >
      <!-- 分配权限树形控件区域 -->
       <el-tree :data="crightsList"
       :props="ctreeProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="cdefKeys"
        ref="treeRef">
        </el-tree>
        <!-- 分配权限2个按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="ccalterPowerDialog=false">取 消</el-button>
          <el-button type="primary" @click="alterPowerClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name:'AlterPower',
  data(){
    return{
      ccalterPowerDialog:this.calterPowerDialog,
    }
  },
  props:{
    // 分配权限界面是否显示props对象
    calterPowerDialog:{
      type:Boolean,
      default(){
        return false
      }
    },
    // 角色权限的所有数据props对象
    crightsList:{
      type:Array,
      default(){
        return []
      }
    },
    // 分配权限的权限名称和以下childer权限名称props对象
    ctreeProps:{
      type:Object,
      default(){
        return {}
      }
    },
    // 已默认打开的权限名称props对象
    cdefKeys:{
      type:Array,
      default(){
        return []
      }
    },
    croleId:{
      type:Number,
      default(){
        return []
      }
    }
  },
   watch:{
    //  监听data对象和props对象val值联通
      calterPowerDialog(val){
        this.ccalterPowerDialog=val
      },
      // 向父组件发送$emit事件和父子组件的val值联通
      ccalterPowerDialog(val){
        this.$emit('onAlterPowerChange',val)
      }
    },
  methods:{
    async alterPowerClick(){
      const keys=[
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      console.log(keys)
      const idStr = keys.join(',')
      const {data:res} = await this.$http.post(`roles/
      ${this.croleId}/rights`,{rids:idStr})
      if(res.meta.status !== 200){
        return this.$message.error("分配权限失败！")
      }
      this.$message.success("分配权限成功！")
      this.ccalterPowerDialog=false
    }
  }
}
</script>

<style>

</style>
