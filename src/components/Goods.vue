<template>
  <div class="goods">
    <el-row>
      <el-col :span="24">
        <!-- <div class="box-card">
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
        </div> -->
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="goodsId"
            label="商品ID"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品名"
          >
          </el-table-column>
          <el-table-column
            prop="category"
            label="分类"
          >
            <template slot-scope="scope">
              {{(scope.row.firstCategory ? scope.row.firstCategory: '')
              + (scope.row.secondCategory ? '-' + scope.row.secondCategory : '' )
              + (scope.row.thirdCategory ? '-' + scope.row.thirdCategory : '')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="introduce"
            label="商品介绍"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEditGoods(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                @click="handleManageImage(scope.row)"
              >图片管理</el-button>
              <el-button
                size="mini"
                @click="handleManageSku(scope.row.goodsId)"
              >SKU管理</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteGoods(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div>
      <el-dialog
        title="SKU管理"
        :visible.sync="skuManageDialogVisible"
      >
        <el-row>
          <el-col :span="24">
            <el-table
              :data="skuTableData"
              style="width: 100%"
            >
              <el-table-column
                prop="skuId"
                label="SKU ID"
              >
              </el-table-column>
              <el-table-column
                prop="skuId"
                label="规格"
              >
                <template slot-scope="scope">
                  {{showAttributes(scope.row.attributes)}}
                </template>
              </el-table-column>
              <el-table-column
                prop="salePrice"
                label="销售价格"
              >
                <template slot-scope="scope">
                  ￥ {{scope.row.salePrice / 100}}
                </template>
              </el-table-column>
              <el-table-column
                prop="marketPrice"
                label="市场价格"
              >
                <template slot-scope="scope">
                  ￥ {{scope.row.marketPrice / 100}}
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEditSku(scope.row)"
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDeleteSkuOfGoods(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="编辑商品"
        :visible.sync="editDialogFormVisible"
      >
        <el-form :model="editForm.data">
          <el-form-item
            :label-width="'200px'"
            label="商品名称"
          >
            <el-input
              v-model="editForm.data.title"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label-width="'200px'"
            label="商品分类"
          >
            <el-cascader
              :options="categoriesData"
              :props="props"
              v-model="editForm.categories"
              @before-filter="filter"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            :label-width="'200px'"
            label="商品介绍"
          >
            <el-input
              type="textarea"
              :rows="10"
              v-model="editForm.data.introduce"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="submitEdit"
            type="primary"
          >保存</el-button>
          <el-button @click="editDialogFormVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="编辑SKU"
        :visible.sync="editSkuDialogFormVisible"
      >
        <el-form :model="editSkuForm.data">
          <el-form-item
            :label-width="'200px'"
            label="销售价格"
          >
            <el-input
              v-model="editSkuForm.salePrice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label-width="'200px'"
            label="市场价格"
          >
            <el-input
              v-model="editSkuForm.marketPrice"
              autocomplete="off"
            ></el-input>
            <!-- <el-cascader
              :options="categoriesData"
              :props="props"
              v-model="editSkuForm.categories"
              @before-filter="filter"
            ></el-cascader> -->
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="submitEdit"
            type="primary"
          >保存</el-button>
          <el-button @click="editSkuDialogFormVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data () {
    return {
      editForm: {
        data: {},
        categories: {}
      },

      skuTableData: [],
      goodsId: 0,

      editSkuForm: {
        data: {},
        salePrice: 0,
        marketPrice: 0
      },

      tableData: [],
      categoriesData: {},
      props: {
        value: 'categoryId',
        label: 'title',
        children: 'children'
      },
      editDialogFormVisible: false,
      skuManageDialogVisible: false,
      editSkuDialogFormVisible: false
    }
  },
  mounted () {
    this.fetchTableData()
    this.fetchCategoryData()
  },
  methods: {
    fetchTableData () {
      this.$http.get(process.env.API_ROOT + '/api/admin/goods').then(Response => {
        this.tableData = Response.data.data
      })
    },
    fetchCategoryData () {
      this.$http.get(process.env.API_ROOT + '/api/admin/category').then(Response => {
        let data = Response.data.data
        this.categoriesData = data['children']
      })
    },
    showAttributes (attributes) {
      let str = ''
      for (let attribute of attributes) {
        str += ' / ' + attribute.attributeValue
      }
      return str.substring(3)
    },
    handleEditGoods (row) {
      this.editForm = {
        'data': row,
        'categories': [row.firstCategoryId, row.secondCategoryId, row.thirdCategoryId]
      }
      this.editDialogFormVisible = true
    },
    handleEditSku (row) {
      this.editSkuForm = {
        'data': row,
        'salePrice': row.salePrice / 100,
        'marketPrice': row.marketPrice / 100
      }
      this.editSkuDialogFormVisible = true
    },
    submitEdit () {
      console.log(this.categories)
    },
    filter (value) {
      console.log(value)
    },
    handleManageImage (row) { },
    handleManageSku (goodsId) {
      this.goodsId = goodsId
      let params = {}
      params['goodsId'] = goodsId
      this.$http.get(process.env.API_ROOT + '/api/admin/goods/sku', { params: params }).then(Response => {
        this.skuTableData = Response.data.data
        this.skuManageDialogVisible = true
      })
    },
    handleDeleteGoods (row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params['goodsId'] = row.goodsId
        this.$http.delete(process.env.API_ROOT + '/api/admin/goods', { params: params }).then(Response => {
          if (Response.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchTableData()
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
    handleDeleteSkuOfGoods (row) {
      this.$confirm('此操作将永久删除该商品的SKU, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params['skuId'] = row.skuId
        this.$http.delete(process.env.API_ROOT + '/api/admin/goods/sku', { params: params }).then(Response => {
          if (Response.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleManageSku(this.goodsId)
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
    handleSearch () { },
    handleReset () { }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goods {
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
