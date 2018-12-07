<template>
  <div class="goods">
    <el-row fixed="right">
      <el-button type="primary" @click="handleAddGoods" style="float: left;"> 添加商品 </el-button>
    </el-row>
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
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="goodsId" label="商品ID" width="180">
          </el-table-column>
          <el-table-column prop="title" label="商品名">
          </el-table-column>
          <el-table-column prop="category" label="分类">
            <template slot-scope="scope">
              {{(scope.row.firstCategory ? scope.row.firstCategory: '')
              + (scope.row.secondCategory ? '-' + scope.row.secondCategory : '' )
              + (scope.row.thirdCategory ? '-' + scope.row.thirdCategory : '')}}
            </template>
          </el-table-column>
          <el-table-column prop="introduce" label="商品介绍" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEditGoods(scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleManageImage(scope.row.goodsId)">图片管理</el-button>
              <el-button size="mini" @click="handleManageSku(scope.row.goodsId)">SKU管理</el-button>
              <el-button size="mini" type="danger" @click="handleDeleteGoods(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="SKU管理" :visible.sync="skuManageDialogVisible">
      <el-row fixed="right">
        <el-button type="primary" @click="handleAddSku" style="float: left;"> 添加SKU </el-button>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="skuTableData" style="width: 100%">
            <el-table-column prop="skuId" label="SKU ID">
            </el-table-column>
            <el-table-column prop="skuId" label="规格">
              <template slot-scope="scope">
                {{ formatterForAttributes(scope.row.attributes) }}
              </template>
            </el-table-column>
            <el-table-column prop="salePrice" label="销售价格">
              <template slot-scope="scope">
                ￥ {{scope.row.salePrice / 100}}
              </template>
            </el-table-column>
            <el-table-column prop="marketPrice" label="市场价格">
              <template slot-scope="scope">
                ￥ {{scope.row.marketPrice / 100}}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEditSku(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDeleteSkuOfGoods(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog :title="isNewGoods? '添加商品': '编辑商品'" :visible.sync="editGoodsDialogFormVisible">
      <el-form :model="editGoodsForm.data">
        <el-form-item :label-width="'100px'" label="商品名称">
          <el-input v-model="editGoodsForm.data.title"></el-input>
        </el-form-item>
        <el-form-item :label-width="'100px'" label="商品分类">
          <el-cascader :options="categoriesData" :props="goodsCascaderProps" v-model="editGoodsForm.categories"></el-cascader>
        </el-form-item>
        <el-form-item :label-width="'100px'" label="商品介绍">
          <el-input type="textarea" :rows="10" v-model="editGoodsForm.data.introduce"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSubmitOrEditGoods" type="primary">保存</el-button>
        <el-button @click="editGoodsDialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="isNewSku? '添加SKU': '编辑SKU'" :visible.sync="editSkuDialogFormVisible">
      <el-form :model="editSkuForm.data">
        <el-form-item :label-width="'100px'" label="SKU ID" v-if="!isNewSku">
          <el-input v-model="editSkuForm.data.skuId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label-width="'100px'" label="销售价格">
          <el-input v-model="editSkuForm.salePrice"></el-input>
        </el-form-item>
        <el-form-item :label-width="'100px'" label="市场价格">
          <el-input v-model="editSkuForm.marketPrice"></el-input>
        </el-form-item>
        <!-- <el-form-item label="SKU图片" :label-width="'200px'">
          <el-upload class="avatar-uploader" :action="uploadImageUrl" :show-file-list="false" :on-success="handleSkuImageUploadSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="editSkuForm.image" :src="editSkuForm.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
        <el-form-item :label-width="'100px'" label="SKU规格">
          <div>
            <el-button @click="handleAddSpecOfSku" type="primary" size="small">添加</el-button>
          </div>
          <div v-for="(item, index) in attributeDoms" :key="index">
            <el-cascader :options="skuSpecData" :props="skuSpecCascaderProps" v-model="attributes[index]"></el-cascader>
            <el-button @click="() => {attributeDoms.splice(index, 1), attributes.splice(index, 1)}" type="danger" size="small">删除</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSubmitSaveOrEditSkuOfGoods" type="primary">保存</el-button>
        <el-button @click="editSkuDialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="图片管理" :visible.sync="imageDialogFormVisible">
      <el-form>
        <el-form-item label="商品图片">
        </el-form-item>
        <el-upload :action="uploadImageUrl" list-type="picture-card" :before-upload="handleBeforeImageUpload" :on-success="handleImageUploadSuccess" :on-error="handleImageUploadError" :on-remove="handleImageRemove" :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSubmitImageOfGoods" type="primary">保存</el-button>
        <el-button @click="() => {this.imageDialogFormVisible = false, this.fileList = []}">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data () {
    return {
      attributeDoms: [],
      ele: 0,
      attributes: [],

      fileList: [],

      editGoodsForm: {
        data: {
          'title': '',
          'introduce': ''
        },
        categories: []
      },

      skuTableData: [],
      goodsId: 0,

      editSkuForm: {
        data: {},
        salePrice: 0,
        marketPrice: 0,
        image: ''
      },

      tableData: [],
      categoriesData: {},
      skuSpecData: [],
      goodsCascaderProps: {
        value: 'categoryId',
        label: 'title',
        children: 'children'
      },
      skuSpecCascaderProps: {
        value: 'id',
        label: 'label',
        children: 'children'
      },
      editGoodsDialogFormVisible: false,
      skuManageDialogVisible: false,
      editSkuDialogFormVisible: false,
      imageDialogFormVisible: false,

      isNewGoods: false,
      isNewSku: false,

      uploadImageUrl: process.env.UPLOAD_IMAGE_URL
    }
  },
  mounted () {
    this.fetchTableData()
    this.fetchCategoryData()
    this.fetchSkuSpecData()
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
    fetchSkuSpecData () {
      this.$http.get(process.env.API_ROOT + '/api/admin/sku').then(Response => {
        this.skuSpecData = Response.data.data
      })
    },
    formatterForAttributes (attributes) {
      let str = ''
      let separator = ' / '
      for (let attribute of attributes) {
        str += separator + attribute.attributeValue
      }
      return str.substring(separator.length)
    },
    // ===============================================================
    handleAddGoods () {
      this.isNewGoods = true
      this.editGoodsDialogFormVisible = true
    },
    handleEditGoods (row) {
      this.isNewGoods = false
      this.editGoodsForm = {
        'data': row,
        'categories': [row.firstCategoryId, row.secondCategoryId, row.thirdCategoryId]
      }
      this.editGoodsDialogFormVisible = true
    },
    handleSubmitOrEditGoods () {
      if (this.isNewGoods) {
        this.handleSubmitSaveGoods()
      } else {
        this.handleSubmitEditGoods()
      }
    },
    handleSubmitSaveGoods () {
      let params = {}
      let form = this.editGoodsForm
      params['title'] = form.data.title
      params['introduce'] = form.data.introduce
      if (form.categories[0]) {
        params['firstCategoryId'] = form.categories[0]
      }
      if (form.categories[1]) {
        params['secondCategoryId'] = form.categories[1]
      }
      if (form.categories[2]) {
        params['thirdCategoryId'] = form.categories[2]
      }
      console.log(params)
      this.$http.post(process.env.API_ROOT + '/api/admin/goods', params).then(Response => {
        if (Response.data.code === 200) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.fetchTableData()
          this.editGoodsDialogFormVisible = false
        } else {
          this.$message.error('保存失败, 请重新尝试')
          console.log(Response.data)
        }
      }).catch(Error => {
        this.$message.error('网络出错, 请重新尝试')
        console.log(Error)
      })
    },
    handleSubmitEditGoods () {
      let params = {}
      let form = this.editGoodsForm
      params['goodsId'] = form.data.goodsId
      params['title'] = form.data.title
      params['introduce'] = form.data.introduce
      if (form.categories[0]) {
        params['firstCategoryId'] = form.categories[0]
      }
      if (form.categories[1]) {
        params['secondCategoryId'] = form.categories[1]
      }
      if (form.categories[2]) {
        params['thirdCategoryId'] = form.categories[2]
      }
      console.log(params)
      this.$http.put(process.env.API_ROOT + '/api/admin/goods', params).then(Response => {
        if (Response.data.code === 200) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.fetchTableData()
        } else {
          this.$message.error('保存失败, 请重新尝试')
          console.log(Response.data)
        }
      }).catch(Error => {
        this.$message.error('网络出错, 请重新尝试')
        console.log(Error)
      })
    },
    // ===============================================================
    handleManageImage (goodsId) {
      this.imageDialogFormVisible = true
      this.goodsId = goodsId
      let params = {}
      params['goodsId'] = goodsId
      this.$http.get(process.env.API_ROOT + '/api/admin/goods/images', { params: params }).then(Response => {
        this.fileList = []
        for (let url of Response.data.data) {
          this.fileList.push({ 'url': url })
        }
      })
    },
    handleSubmitImageOfGoods () {
      let params = {}
      params['goodsId'] = this.goodsId
      params['imageUrls'] = []
      for (let file of this.fileList) {
        params['imageUrls'].push(file.url)
      }
      this.$http.put(process.env.API_ROOT + '/api/admin/goods/images', params).then(Response => {
        if (Response.data.code === 200) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.handleManageImage(this.goodsId)
        } else {
          this.$message.error('保存失败, 请重新尝试')
          console.log(Response.data)
        }
      }).catch(Error => {
        this.$message.error('网络出错, 请重新尝试')
        console.log(Error)
      })
    },
    handleBeforeImageUpload (file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB')
      }
      return isImage && isLt2M
    },
    handleImageUploadError (err, file, fileList) {
      this.$message.error('网络出错, 请重新尝试')
      console.log(err)
    },
    handleImageUploadSuccess (res, file) {
      this.fileList.push({ 'name': file.name, 'url': res.data })
      console.log(res)
      console.log(file)
    },
    handleImageRemove (file, fileList) {
      this.fileList = fileList
    },
    // ===============================================================
    handleManageSku (goodsId) {
      this.skuManageDialogVisible = true
      this.goodsId = goodsId
      let params = {}
      params['goodsId'] = goodsId
      this.$http.get(process.env.API_ROOT + '/api/admin/goods/sku', { params: params }).then(Response => {
        this.skuTableData = Response.data.data
      })
    },
    handleAddSku () {
      this.isNewSku = true
      this.editSkuForm = {
        'data': {},
        'salePrice': 0,
        'marketPrice': 0,
        'image': ''
      }
      this.editSkuDialogFormVisible = true
      this.attributeDoms = []
      this.ele = 0
      this.attributes = []
    },
    handleEditSku (row) {
      this.isNewSku = false
      this.editSkuForm = {
        'data': row,
        'salePrice': row.salePrice / 100,
        'marketPrice': row.marketPrice / 100,
        'image': ''
      }
      this.editSkuDialogFormVisible = true
      this.attributeDoms = []
      this.ele = 0
      this.attributes = []
      for (let attribute of row.attributes) {
        this.attributeDoms.push(this.ele++)
        this.attributes.push([attribute.attributeNameId, attribute.attributeValueId])
      }
    },
    handleAddSpecOfSku () {
      this.attributeDoms.push(this.ele++)
    },
    handleSubmitSaveOrEditSkuOfGoods () {
      console.log(this.ele)
      console.log(this.attributeDoms)
      console.log(this.attributes)
      console.log(this.editSkuForm)
    },
    handleSkuImageUploadSuccess (res, file) {
      this.editSkuForm['image'] = URL.createObjectURL(file.raw)
    },
    // ===============================================================
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
    // ===============================================================
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px dashed;
}
</style>
