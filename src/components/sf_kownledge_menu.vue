<template>
  <div>
    <Menu mode="horizontal" :theme="theme1" active-name="softManage"  @on-select="gotoAddress"  id="knowledgeMenu">
        <MenuItem name="softManage" >
            开发软件管理
        </MenuItem>
        <MenuItem name="developStandard">
            上海开发规范
        </MenuItem>
        <MenuItem name="publicComponent">
            界面公共组件
        </MenuItem>
        <MenuItem name="bookManage">
            书籍管理
        </MenuItem>
        <MenuItem name="solveWays">
            解决方法累计
        </MenuItem>
    </Menu>
  </div>
</template>

<script>
  export default{
    mounted(){
      	this.$router.push(this.urlMapper['softManage'])
    },
    data(){
      return{
        urlMapper:{
           'softManage':'/knowledgeIndex/soft',
           'developStandard':'/knowledgeIndex/develop',
           'bookManage':'/knowledgeIndex/bookManage',
           'solveWays':'/knowledgeIndex/solveWays'
        }
      }
    },
    methods:{
      gotoAddress(name){
        	this.$router.push(this.urlMapper[name])
      }
    }
  }
</script>

<style>
#knowledgeMenu{
  height: 55px;
    line-height: 55px;
  background: #f3f3f3;
}
#knowledgeMenu .ivu-menu-item{
  font-size: 14px;
  color: #0f3362;
  letter-spacing: 0px;
}
#knowledgeMenu .ivu-menu-item:hover{
  color: #3d99f7;
  /* border: none; */
}
#knowledgeMenu .ivu-menu-item-active{
  color: #3d99f7;
}
</style>
