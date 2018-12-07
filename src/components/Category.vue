<template>
  <div id="sku-attribute">
    <div class="block">
      <el-tree :data="data" node-key="categoryId" :default-expanded-keys="[0]" highlight-current>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <!-- <img :src="data.image" v-if="data.image != ''"/> -->
          <span>{{ data.title }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              添加子类
            </el-button>
            <el-button type="text" size="mini" @click="() => edit(node, data)" v-if="data.categoryId !== 0">
              编辑
            </el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)" v-if="data.categoryId !== 0">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
      <el-dialog title="添加子类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="类目名称 *" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类目排序 *" :label-width="formLabelWidth">
            <el-input v-model="form.rank" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类目图标" :label-width="formLabelWidth">
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        parentId: 0,
        imageUrl: '',
        name: '',
        rank: 0,
        categoryId: 0
      },
      formLabelWidth: '120px',
      isNewItem: false
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get(process.env.API_ROOT + '/api/admin/category').then(Response => {
        this.data = [Response.data.data]
      })
    },
    append (data) {
      this.isNewItem = true
      this.dialogFormVisible = true
      this.form.parentId = data.categoryId
    },
    appendSubmit () {
      let body = {}
      body['parentId'] = this.form.parentId
      body['rank'] = this.form.rank
      body['title'] = this.form.name
      body['image'] = this.form.imageUrl
      this.$http.post(process.env.API_ROOT + '/api/admin/category', body).then(Response => {
        if (Response.data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.dialogFormVisible = false
          this.fetchData()
          this.form['name'] = ''
          this.form['rank'] = 0
          this.form['parentId'] = 0
          this.form['imageUrl'] = ''
        }
      })
    },
    edit (node, data) {
      this.isNewItem = false
      this.dialogFormVisible = true
      this.form['name'] = data.title
      this.form['rank'] = data.rank
      this.form['imageUrl'] = data.image
      this.form['categoryId'] = data.categoryId
    },
    editSubmit () {
      let body = {}
      body['categoryId'] = this.form.categoryId
      body['rank'] = this.form.rank
      body['title'] = this.form.name
      body['image'] = this.form.imageUrl
      this.$http.put(process.env.API_ROOT + '/api/admin/category', body).then(Response => {
        if (Response.data.code === 200) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.dialogFormVisible = false
          this.fetchData()
          this.form['name'] = ''
          this.form['rank'] = 0
          this.form['categoryId'] = 0
          this.form['imageUrl'] = ''
        }
      }).catch(Error => {
        console.log(Error)
        this.$message({
          type: 'error',
          message: '编辑失败, 请重新尝试'
        })
      })
    },
    submit () {
      if (this.isNewItem) {
        this.appendSubmit()
      } else {
        this.editSubmit()
      }
    },
    remove (node, data) {
      this.$confirm('此操作将永久删除该类目【' + data.title + '】和其所有子类目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(process.env.API_ROOT + '/api/admin/category?categoryId=' + data.categoryId).then(Response => {
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
          }
        }).catch(Error => {
          console.log(Error)
          this.$message({
            type: 'error',
            message: '删除失败, 请重新尝试'
          })
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
#sku-attribute {
  padding-top: 1em;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
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
