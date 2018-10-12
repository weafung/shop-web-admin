<template>
    <div class="setting">
        <el-form :model="form" ref="settingForm" label-position="right" label-width="200px">
            <el-form-item label="明细配置">
                <el-radio-group v-model="form.showTeamDetail">
                    <el-radio :label="1" border>展示</el-radio>
                    <el-radio :label="0" border>不展示</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: "Config",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      input: "test",
      form: {
        showTeamDeatil: 0
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
  