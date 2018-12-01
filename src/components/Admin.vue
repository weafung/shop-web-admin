<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header class="header">
      <span class="header-title">后台管理系统</span>
      <ul class="header-operations">
        <!-- <li class="f-toe username" :title="username"><i class="iconfont icon-user"></i></li> -->
        <li @click="logout">
          <i class="iconfont icon-exit"></i>退出</li>
      </ul>
    </el-header>
    <el-container>
      <el-aside
        width="230px"
        style="background-color: rgb(238, 241, 246)"
      >
        <el-menu
          :default-active="this.$route.path.substr()"
          :collapse="false"
          background-color="#ffffff"
          text-color="#444040"
          active-text-color="#1e73e6"
          :router="true"
        >
          <el-menu-item index="/admin/order">
            <i class="el-icon-setting"></i>
            <span slot="title"> 订单管理 </span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/admin/goods">
              <i class="el-icon-setting"></i>
              <span slot="title"> 商品管理 </span>
            </el-menu-item>
            <el-menu-item index="/admin/goods">
              <i class="el-icon-setting"></i>
              <span slot="title"> 库存管理 </span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>SKU管理</span>
            </template>
            <el-menu-item index="/admin/sku/attributeName">
              <i class="el-icon-setting"></i>
              <span slot="title"> SKU名管理 </span>
            </el-menu-item>
            <el-menu-item index="/admin/sku/attributeValue">
              <i class="el-icon-setting"></i>
              <span slot="title"> SKU值管理 </span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/admin/category">
            <i class="el-icon-setting"></i>
            <span slot="title"> 类目管理 </span>
          </el-menu-item>
          <el-menu-item index="/admin/shopOwner">
            <i class="el-icon-setting"></i>
            <span slot="title"> 店主管理 </span>
          </el-menu-item>
          <el-menu-item index="/admin/setting">
            <i class="el-icon-setting"></i>
            <span slot="title"> 系统设置 </span>
          </el-menu-item>
          <!-- <el-menu-item index="/admin/setting">
            <i class="el-icon-setting"></i>
            <span slot="title"> {{this.$route.path}} </span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/sign/login' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a :href="`#${this.$route.path}`">{{this.$route.meta.title}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>

        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>

  </el-container>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      username: ''
    }
  },
  // mixins: [ajax],
  methods: {
    logout () {
      this.$router.push({ path: '/sign/login' })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 80px !important;
  background-color: rgb(7, 25, 44);

  .header-title {
    line-height: 80px;
    color: #fff;
    font-size: 20px;
  }

  .iconfont {
    vertical-align: middle;
    font-size: 20px;
    margin-right: 5px;
  }

  .header-operations {
    float: right;
    padding-right: 30px;
    height: 100%;

    > li {
      color: #fff;
      display: inline-block;
      vertical-align: middle;
      padding: 0 10px;
      margin: 0 10px;
      line-height: 50px;
      cursor: pointer;
      font-size: 14px;
      max-width: 150px;

      &:hover {
        color: #1896da;
      }
    }
  }
}
.cell {
  padding-left: 15px !important;
  padding-right: 15px !important;
}
.el-footer {
  background-color: #f2f6fc;
  color: #333;
  text-align: center;
  line-height: 2em;
  bottom: 0px;
  height: 30px;
}
</style>