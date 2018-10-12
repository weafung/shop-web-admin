<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-header class="header">
            <span class="header-title">后台管理系统</span>
            <ul class="header-operations">
                <!-- <li class="f-toe username" :title="username"><i class="iconfont icon-user"></i></li> -->
                <li @click="logout"><i class="iconfont icon-exit"></i>退出</li>
            </ul>
        </el-header>
        <el-container>
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-active="this.$route.path.substr(1 + ('admin/').length)" background-color="#ffffff" text-color="#444040" active-text-color="#1e73e6" :router="true">
                    <el-menu-item index="shopOwner">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 店主管理 </span>
                    </el-menu-item>
                    <el-menu-item index="setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 系统设置 </span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/sign/login' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item><a :href="`#${this.$route.path}`">{{this.$route.meta.title}}</a></el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      username: ""
    };
  },
  // mixins: [ajax],
  methods: {
    logout() {
      this.$router.push({ path: "/sign/login" });
    }
  }
};
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
      line-height: 80px;
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
</style>