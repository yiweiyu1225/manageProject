<template>
  <div>
    <el-card>
      <!-- 搜索栏 -->
      <div>
        <el-row class="verticalclass">
          <el-col :span="2">
            角色名称
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryInfo.rolename" placeholder="请输入你要找的角色名称" />
          </el-col>
          <el-col :span="3" :offset="1">
            <button class="buttonQuery" @click="gettable">查询</button>
          </el-col>
        </el-row>
      </div>

      <!-- 操作栏 -->
      <div class="oprate_tab">
        <a
          class="buttonTag"
        >
          <i class="el-icon-plus" />
          添加角色
        </a>
      </div>

      <!--表格信息  -->
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          header-align="center"
          :header-cell-style="{background:'#E7FAFF',color:'#5BACD1'}"
        >
          <el-table-column
            label="编号"
            align="center"
            width="150"
          >
            <template slot-scope="{row}">
              <span v-if="row.edit">
                <el-input
                  size="medium"
                  :value="row.id"
                />
              </span>
              <span v-else>
                {{ row.id }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="名称"
            align="center"
            width="150"
          >
            <template slot-scope="{row}">
              <span v-if="row.edit">
                <el-input
                  size="medium"
                  :value="row.name"
                />
              </span>
              <span v-else>
                {{ row.name }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="描述"
            align="center"
          >
            <template slot-scope="{row}">
              <span v-if="row.edit">
                <el-input
                  size="medium"
                  :value="row.decribe"
                />
              </span>
              <span v-else>
                {{ row.decribe }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center"
            width="200"
          >
            <template slot-scope="{row}">
              <span v-if="row.edit">
                <el-input
                  v-model="row.time"
                  size="medium"
                />
              </span>
              <span v-else>
                {{ row.time|parseTime('{y}-{m}-{d} {h}:{i}') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="operate"
            label="操作"
            align="center"
            width="300"
          >
            <template slot-scope="{row}">
              <span v-if="row.edit">
                <a>保存</a>
                <a-popconfirm
                  title="确定取消？"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="confirmEdit(row)"
                  @cancel="cancelEdit(row)"
                >
                  <a href="#">取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <button
                  class="buttonText"
                >
                  设置权限
                </button>
                <button
                  class="buttonText"
                  @click="handleedit(row)"
                >
                  编辑
                </button>
                <button
                  class="buttonText"
                  @click="delectrole(row)"
                >
                  删除
                </button>
              </span>
            </template>

          </el-table-column>

        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { gettable } from '@/api/management/roleauthority'
export default {
    data() {
        return {
          queryInfo: {
            rolename: ''
          },
          tableData: []
        }
    },
    created() {
      this.gettable()
    },
    methods: {
      gettable() {
          const that = this
          this.listLoading = true
          gettable(this.queryInfo).then(response => {
              this.tableData = response.data.list.map(item => {
                this.$set(item, 'edit', false)
                return item
              })
              console.log(typeof (that.tableData))
              this.listLoading = false
          }).catch(() => {
              this.loading = false
          })
      },
      handleedit: function(row) {
        row.edit = true
      },
      delectrole: function(row) {
        console.log(row)
      }
    }
}
</script>

<style lang='less' scoped>
 @import '/src/styles/global';
.verticalclass{
  display: flex;
  align-items: center;
}
</style>
