<template>
  <div id="sku-attribute">
    <div class="action">
      <el-input v-model="search" size="large" placeholder="输入关键字搜索">
        <template slot="prepend">关键字</template>
      </el-input>
    </div>
    <el-table :data="tableData.filter(data  => !search || data.attributeValueId.toString().toLowerCase().includes(search.toLowerCase()) || data.attributeValue.toLowerCase().includes(search.toLowerCase()) ||data.attributeName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column prop="attributeValueId" label="规格值ID">
      </el-table-column>
      <el-table-column prop="attributeName" label="规格名">
      </el-table-column>
      <el-table-column prop="attributeValue" label="规格值">
      </el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      tableData: [],
      search: ''
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get(process.env.API_ROOT + '/api/admin/sku/attributeValue').then(Response => {
        this.tableData = Response.data.data
      })
    },
    handleEdit (row) {
      this.$prompt('请输入规格名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,}/,
        inputValue: row.attributeValue,
        inputErrorMessage: '请输入文字'
      }).then(({ value }) => {
        this.$http.put(process.env.API_ROOT + '/api/admin/sku/attributeValue?attributeValueId=' + row.attributeValueId + '&attributeValue=' + value).then(Response => {
          if (Response.data.code === 200) {
            this.$message({
              type: 'success',
              message: '编辑成功: ' + value
            })
            this.fetchData()
          } else {
            this.$message({
              type: 'error',
              message: '编辑失败, 请重新尝试'
            })
            console.log(Response.data)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // })
      })
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(process.env.API_ROOT + '/api/admin/sku/attributeValue?attributeValueId=' + row.attributeValueId).then(Response => {
          if (Response.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败, 请重新尝试'
            })
            console.log(Response.data)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    }
  }
}
</script>

<style scoped>
.action {
  margin: 1em;
  width: 300px;
}
</style>
