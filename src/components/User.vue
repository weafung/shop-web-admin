<template>
  <div class="manager">
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="accountId" label="用户ID"  width="400">
          </el-table-column>
          <el-table-column prop="avatar" label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" width="64" height="64"/>
            </template>
          </el-table-column>
          <el-table-column prop="nickname" label="昵称">
          </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <el-tag :type="sexTag[scope.row.sex]" disable-transitions>{{sexLabel[scope.row.sex]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <el-tag :type="stateTag[scope.row.state]" disable-transitions>{{stateLabel[scope.row.state]}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Config',
  data () {
    return {
      stateTag: { '0': 'success', '1': 'danger' },
      stateLabel: { '0': '正常', '1': '禁用' },

      sexTag: { '0': 'waring', '1': 'success', '2': 'danger' },
      sexLabel: { '0': '未知', '1': '男', '2': '女' },

      tag: { '2': 'waring', '1': 'danger', '0': 'info', '3': 'success' },
      tableData: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get(process.env.API_ROOT + '/api/admin/user').then(Response => {
        this.tableData = Response.data.data
      })
    },
    timestampToDateTime (timestamp) {
      if (timestamp === undefined) {
        return ''
      }
      var date = new Date(timestamp)
      var Y = date.getFullYear()
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' scoped>
.manager {
  margin-top: 20px;

  .box-card {
    padding: 5px 20px;

    .search-content {
      width: 400px;

      .search-type {
        width: 110px;
      }
    }

    .label {
      margin: 0 10px;
    }
  }

  .cell-content {
    text-align: center;
    position: relative;
    width: 100%;

    > span {
      text-align: left;
      display: inline-block;
    }
  }

  .pagination {
    text-align: right;
    padding: 20px;
  }
}
.f-toe-2 {
  max-height: 3em;
}
</style>
