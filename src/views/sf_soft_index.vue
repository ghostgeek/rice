<template>
<div id="softManage">
  <nav>
    <Menu mode="horizontal" :theme="theme1" active-name="all" id="softCatagoryMenu">
      <MenuItem v-for="catagory in softCatagorys" :name="catagory.name">{{catagory.desc}}</MenuItem>
    </Menu>
  </nav>
  <section>
    <p class="soft-title">软件列表<i class="count-icon"><span>121个</span></i></p>
    <div class="soft-list">
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
      </Row>

      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
      </Row>
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
        <Col span="1">
        </col>
        <Col span="4">
        <div class="item">
          <p class="soft-title">IDEA V.121</p>
          <p style="margin-top: 2px;">软件大小：<span class="soft-size">16.8M</span></p>
          <p><a class="download">立即下载</a></p>
        </div>
        </Col>
      </Row>

    </div>
  </section>
  <page></page>
</div>
</template>

<script>
import page from '../components/sf_page.vue'
export default {
  data() {
    return {
      //类别，静态动态待定
      softCatagorys: [{
        name: 'all',
        desc: 'ALL'
      }, {
        name: 'ide',
        desc: '开发IDE'
      }, {
        name: 'txtTool',
        desc: '文本工具'
      }, {
        name: 'distanceTool',
        desc: '远程工具'
      }, {
        name: 'dbTool',
        desc: '数据库工具'
      }, {
        name: 'messageTool',
        desc: '通讯工具'
      }, {
        name: 'design',
        desc: '设计'
      }, {
        name: 'other',
        desc: '其他'
      }]
    }
  },
  components: {
    page
  }
}
</script>

<style>
#softManage {
  width: 100%;
  /* height: 100%; */
  background-color: #ffffff;
  border: solid 1px #e3e3e3;
  padding: 20px 25px 25px 25px;
}
/*菜单*/
#softCatagoryMenu {
  height: 40px;
  line-height: 40px;
  background-color: #efefef;
  border-radius: 5px;
}
#softCatagoryMenu .ivu-menu-horizontal, #softCatagoryMenu .ivu-menu-item{
  padding: 0 10px;
  margin: 0px 0px 0px 30px;
}

#softManage section>p.soft-title {
  padding: 0px 25px 25px 0px;
  margin: 25px 0px 25px 0px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #444444;
}

#softManage section>p.soft-title::before {
  position: relative;
  top: 3px;
  display: inline-block;
  content: "";
  width: 3px;
  height: 18px;
  margin-right: 15px;
  background-color: #3d99f7;
  border-radius: 1px;
}

#softManage section>p.soft-title .count-icon {
  position: relative;
  top: 1px;
  display: inline-block;
  width: 35px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  margin-left: 10px;
  background-color: #fe7f55;
  border-radius: 7px;
  font-style: normal;
}

#softManage section>p.soft-title .count-icon>span {
  font-size: 10px;
  color: #ffffff;
}

/*书籍样式*/

#softManage .item {
  width: 220px;
  height: 180px;
  margin: 0px 0px 40px 0px;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 1px #d9d9d9;
  font-size: 14px;
  color: #7c7c7c;
}

#softManage .item>p {
  display: block;
  text-align: center;
}

#softManage .item>.soft-title {
  margin-top: 38px;
}

#softManage .item .download {
  display: inline-block;
  width: 160px;
  height: 50px;
  line-height: 50px;
  background-color: #3d99f7;
  border-radius: 5px;
  color: white;
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
}
</style>
