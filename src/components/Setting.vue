<template>
  <div class="setting">
    <el-row>
      <el-col :span="24">
        <el-form :model="config" ref="settingForm" label-position="right" label-width="100px">
          <el-form-item label="客服电话">
            <el-input :placeholder="`请输入内容`" v-model="config.service_phone" class="search-content" maxlength="100"> </el-input>
            <el-button type="primary" @click="handleSave('service_phone')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Config",
  data () {
    return {
      config: {}
    };
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let params = []
      params.push('service_phone')
      this.$http.post(process.env.API_ROOT + '/api/config/list', params).then(Response => {
        this.config = Response.data.data
        console.log(this.config)
      })
    },
    handleSave (key) {
      let params = {}
      params['key'] = key
      params['value'] = this.config[key]
      this.$http.put(process.env.API_ROOT + '/api/config/', params).then(Response => {
        if (Response.data.code === 200) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        } else {
          this.$message.error('保存出错,请重新尝试')
        }
      }).catch(Error => {
        console.log(Error)
        this.$message.error('网络出错,请重新尝试')
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
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
}
.setting {
  margin-top: 2em;
}
.search-content {
  width: 400px;
}
</style>
  