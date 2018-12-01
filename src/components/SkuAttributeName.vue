<template>
  <div id="sku-attribute">
    <el-row fixed="right">
      <el-input v-model="search" size="large" placeholder="输入关键字搜索" style="width: 300px; float:left;">
        <template slot="prepend">关键字</template>
      </el-input>
      <el-button type="primary" @click="add" style="float: right;"> 添加 </el-button>
    </el-row>
    <el-table :data="tableData.filter(data  => !search || data.attributeNameId.toString().toLowerCase().includes(search.toLowerCase()) || data.attributeName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column prop="attributeNameId" label="ID">
      </el-table-column>
      <el-table-column prop="attributeName" label="SKU名称">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAddValue(scope.row)">添加SKU值</el-button>
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
      this.$http.get(process.env.API_ROOT + '/api/admin/sku/attributeName').then(Response => {
        this.tableData = Response.data.data
      })
    },
    add () {
      this.$prompt('请输入SKU名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,}/,
        inputErrorMessage: '请输入文字'
      }).then(({ value }) => {
        this.$http.post(process.env.API_ROOT + '/api/admin/sku/attributeName?name=' + value).then(Response => {
          if (Response.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功: ' + value
            })
            this.fetchData()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败, 请重新尝试'
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
    handleAddValue (row) {
      this.$prompt('请输入SKU值', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,}/,
        inputErrorMessage: '请输入文字'
      }).then(({ value }) => {
        this.$http.post(process.env.API_ROOT + '/api/admin/sku/attributeValue?attributeNameId=' + row.attributeNameId + '&attributeValue=' + value).then(Response => {
          if (Response.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功: ' + value
            })
            this.fetchData()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败, 请重新尝试'
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
    handleEdit (row) {
      this.$prompt('请输入SKU名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\u4e00-\u9fa5]/,
        inputValue: row.attributeName,
        inputErrorMessage: '请输入文字'
      }).then(({ value }) => {
        this.$http.put(process.env.API_ROOT + '/api/admin/sku/attributeName?attributeNameId=' + row.attributeNameId + '&attributeName=' + value).then(Response => {
          if (Response.data.code === 200) {
            this.$message({
              type: 'success',
              message: '编辑成功: ' + value
            })
            this.fetchData()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败, 请重新尝试'
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
        this.$http.delete(process.env.API_ROOT + '/api/admin/sku/attributeName?attributeNameId=' + row.attributeNameId).then(Response => {
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
#sku-attribute {
  padding-top: 1em;
}
</style>
