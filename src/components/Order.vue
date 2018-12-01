<template>
  <div class="manager">
    <el-row>
      <el-col :span="24">
        <div class="box-card">
          <el-form :inline="true">
            <el-form-item label="状态">
              <el-select
                v-model="search.status"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="单项查询"
              prop="searchContent"
            >
              <el-input
                :placeholder="`请输入${search.searchType.label}`"
                v-model="search.searchContent"
                class="search-content"
                maxlength="100"
              >
                <el-select
                  v-model="search.searchType"
                  slot="prepend"
                  class="search-type"
                  @change="handleSearchTypeChange"
                >
                  <el-option
                    v-for="item in searchTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <div>
              <el-form-item label="下单时间">
                <el-date-picker
                  v-model="search.orderTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="付款时间">
                <el-date-picker
                  v-model="search.payTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="发货时间">
                <el-date-picker
                  v-model="search.packageTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="收货时间">
                <el-date-picker
                  v-model="search.confirmTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleSearch"
              >查询</el-button>
              <el-button
                type="primary"
                @click="handleReset"
              >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="gorderId"
            label="订单号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="收货人"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="收货地址"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="订单状态"
            width="80"
          >
            <template slot-scope="scope">
              <el-tag
                :type="tag[scope.row.status]"
                disable-transitions
              >{{statusOptions[scope.row.status + 1]['label']}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="packageCode"
            label="快递运单号"
          >
          </el-table-column>
          <el-table-column
            prop="orderTime"
            label="下单时间"
          >
            <template slot-scope="scope">
              {{timestampToDateTime(scope.row.orderTime)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="payTime"
            label="付款时间"
          >
            <template slot-scope="scope">
              {{timestampToDateTime(scope.row.payTime)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="packageTime"
            label="发货时间"
          >
            <template slot-scope="scope">
              {{timestampToDateTime(scope.row.packageTime)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="confirmTime"
            label="收货时间"
          >
            <template slot-scope="scope">
              {{timestampToDateTime(scope.row.confirmTime)}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status == 1"
                size="mini"
                @click="handlePackage(scope.row)"
              >发货</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
              >删除</el-button>
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
    let statusOptions = [
      {
        label: '全部',
        value: ''
      },
      {
        label: '待支付',
        value: 0
      },
      {
        label: '待发货',
        value: 1
      },
      {
        label: '待收货',
        value: 2
      },
      {
        label: '已完成',
        value: 3
      }
    ]
    let searchTypeOptions = [
      {
        label: '订单号',
        value: 'gorderId'
      },
      {
        label: '收货人',
        value: 'name'
      },
      {
        label: '手机号',
        value: 'phone'
      }
    ]
    return {
      tag: { '2': 'waring', '1': 'danger', '0': 'info', '3': 'success' },
      loading: false,
      listParams: {
        pageSize: 20,
        pageIndex: 1
      },
      totalSize: this.total,
      ajaxList: '',
      statusOptions,
      searchTypeOptions,
      search: {
        status: '',
        searchType: searchTypeOptions[0],
        searchContent: '',
        orderTime: '',
        payTime: '',
        confirmTime: '',
        packageTime: ''
      },
      rules: {
        searchContent: [
          { max: 100, message: '最大长度为100个字符', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get(process.env.API_ROOT + '/api/admin/order').then(Response => {
        this.tableData = Response.data.data
      })
    },
    handleSearch () {
      console.log(this.search)
      let params = {}
      if (this.search.status !== '') {
        params['status'] = this.search.status
      }
      if (this.search.orderTime !== '') {
        params['orderTimeStart'] = this.search.orderTime[0].valueOf()
        params['orderTimeEnd'] = this.search.orderTime[1].valueOf()
      }
      if (this.search.payTime !== '') {
        params['payTimeStart'] = this.search.payTime[0].valueOf()
        params['payTimeEnd'] = this.search.payTime[1].valueOf()
      }
      if (this.search.confirmTime !== '') {
        params['confirmTimeStart'] = this.search.confirmTime[0].valueOf()
        params['confirmTimeEnd'] = this.search.confirmTime[1].valueOf()
      }
      if (this.search.packageTime !== '') {
        params['packageTimeStart'] = this.search.packageTime[0].valueOf()
        params['packageTimeEnd'] = this.search.packageTime[1].valueOf()
      }
      if (this.search.searchContent !== '') {
        params[this.search.searchType['value']] = this.search.searchContent
      }
      console.log(params)
      this.$http.get(process.env.API_ROOT + '/api/admin/order', { params: params }).then(Response => {
        this.tableData = Response.data.data
      })
    },
    handleReset () {
      this.search = {
        status: '',
        searchType: this.searchTypeOptions[0],
        searchContent: '',
        orderTime: '',
        payTime: '',
        confirmTime: '',
        packageTime: ''
      }
    },
    handleSearchTypeChange () {
      this.search.searchContent = ''
    },
    handlePackage (row) {
      this.$prompt('请输入快递单号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,}/,
        inputErrorMessage: '请输入快递单号'
      }).then(({ value }) => {
        let params = new URLSearchParams()
        params.append('gorderId', row.gorderId)
        params.append('packageCode', value)
        this.$http.post(process.env.API_ROOT + '/api/admin/order/package', params).then(Response => {
          if (Response.data.code === 200) {
            this.$message({
              type: 'success',
              message: '发货成功: ' + value
            })
            this.fetchData()
          } else {
            this.$message({
              type: 'error',
              message: '发货失败, 请重新尝试'
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
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params['gorderId'] = row.gorderId
        this.$http.delete(process.env.API_ROOT + '/api/admin/order', {params: params}).then(Response => {
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
    },
    formatter (row, column) {
      return this.statusOptions[row.status + 1].label
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
