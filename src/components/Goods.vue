<template>
  <div class="manager">
    <el-row>
      <el-col :span="24">
        <div class="box-card">
          <el-form :inline="true">
            <el-form-item label="店主状态">
              <el-select v-model="search.accountStatus" placeholder="请选择">
                <el-option v-for="item in accountStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单项查询" prop="searchContent">
              <el-input :placeholder="`请输入${search.searchType.label}`" v-model="search.searchContent" class="search-content" maxlength="100">
                <el-select v-model="search.searchType" slot="prepend" class="search-type" @change="handleSearchTypeChange">
                  <el-option v-for="item in searchTypeOptions" :key="item.value" :label="item.label" :value="item"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button type="primary" @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 查询项 -->
        <!-- <el-table :data="list" style="width: 100%;" v-loading="loading" max-height="600" stripe  ref="table">
                    <el-table-column :fixed="item.fixed" :prop="item.key" :label="item.name" v-for="item in source.fieldsAlready" :key="item.key" header-align="center" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handlePromotion(scope.$index, scope.row)" v-if="item.key === 'opeartion'" type="success">晋升</el-button>
                            <span v-else-if="item.type === 'time'">{{format(scope.row[item.key])}}</span>
                            <span v-else-if="item.type === 'enum'">{{item.enum[scope.row[item.key]]}}</span>
                            <div v-else class="cell-content">
                                <span>
                                    <span class=" f-toe-2" :title="scope.row[item.key]">
                                        {{scope.row[item.key]}}
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listParams.pageIndex" :page-sizes="[5,10, 20, 50]" :page-size="listParams.pageSize" @prev-click="listParams.pageIndex > 1 ? listParams.pageIndex-- : 1"
                    background @next-click="listParams.pageIndex < (totalSize/listParams.pageSize) ? listParams.pageIndex++ : (totalSize/listParams.pageSize)" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" class="pagination">
                </el-pagination> -->
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
export default {
  name: "Config",
  data() {
    let accountStatusOptions = [
      {
        label: "全部",
        value: ""
      },
      {
        label: "正常",
        value: 0
      },
      {
        label: "冻结",
        value: 1
      },
      {
        label: "深度冻结",
        value: 2
      }
    ];
    let searchTypeOptions = [
      {
        label: "账号",
        value: "account"
      },
      {
        label: "姓名",
        value: "name"
      }
    ];
    return {
      loading: false,
      listParams: {
        pageSize: 20,
        pageIndex: 1,
        tab: 1 // 0:待晋升，1已晋升
        // status: 0, // 状态0 正常、1 冻结、2 深度冻结
      },
      totalSize: this.total,
      ajaxList: "",
      accountStatusOptions,
      searchTypeOptions,
      search: {
        accountStatus: "",
        searchType: searchTypeOptions[0],
        searchContent: ""
      },
      rules: {
        searchContent: [
          { max: 100, message: "最大长度为100个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSearch() {},
    handleReset() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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