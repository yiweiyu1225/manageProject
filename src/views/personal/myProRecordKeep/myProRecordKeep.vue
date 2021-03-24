<template>
  <div class="functionContain">

    <el-card>
      <!-- 搜索栏 -->
      <div>
        <el-row type="flex" justify="space-between" class="findQuiry">
          <!-- 申报时间 -->
          <el-col :span="7">
            <el-row :gutter="0">
              <el-col :span="6">申报时间:</el-col>
              <el-col :span="16">
                <el-select v-model="queryInfo.type" :placeholder="today_year">
                  <el-option
                    v-for="item in year_select"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <!-- 项目名字 -->
          <el-col :span="7">
            <el-row :gutter="0">
              <el-col :span="6">项目名字:</el-col>
              <el-col :span="16">
                <el-input v-model="queryInfo.name" placeholder="请输入内容" clearable @clear="getTable" />
              </el-col>
            </el-row>
          </el-col>

          <!-- 状态 -->
          <el-col :span="7">
            <el-row :gutter="0">
              <el-col :span="4">状态:</el-col>
              <el-col :span="16">
                <el-select v-model="queryInfo.state" placeholder="请选择">
                  <el-option label="未提交" value="未提交" />
                  <el-option label="认可" value="认可" />
                  <el-option label="退回" value="退回" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <button class="buttonQuery" @click="getTable">查询</button>
          </el-col>
        </el-row>

      </div>

      <!-- 操作选项 -->
      <div class="oprate_tab">
        <router-link to="createProject">
          <span class="buttonTag">
            添加备案
          </span>
        </router-link>
      </div>

      <!--表格信息  -->
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          header-align="center"
          :header-cell-style="{background:'#E7FAFF',color:'#5BACD1'}"
          :cell-class-name="changeCellStyle"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center"
          />
          <el-table-column
            prop="name"
            label="项目名称"
            align="center"
            width="300"
          />
          <el-table-column
            prop="leading"
            label="备案申报人"
            align="center"
            width="100"
          />
          <el-table-column
            prop="time"
            label="申请时间"
            align="center"
          />
          <el-table-column
            prop="state"
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              <span :class="scope.row.state | stateFilter">{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作"
            align="center"
            width="400"
          >
            <template slot-scope="scope">
              <button
                class="buttonText"
                @click="handleEdit( scope.row.id)"
              >编辑</button>
              <MyProjectDelete
                v-if="scope.row.state!=='认可'"
                :id="scope.row.id"
              />
              <button
                v-if="scope.row.state!=='认可'"
                class="buttonText"
                @click="handlesee(scope.row.id)"
              >
                预览并提交
              </button>
              <button
                class="buttonText"
                @click="handlereport(scope.row.id)"
              >项目申报</button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="paging_block">
        <el-pagination
          prev-text="上一页"
          next-text="下一页"
          :current-page="queryInfo.pagenum"
          :page-sizes="[10,20,30,40]"
          :page-size="queryInfo.pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-count="queryInfo.pagecount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 预览弹框 -->
    <el-dialog
      title="预览并提交"
      :visible.sync="seeDialogVisible"
      width="60%"
    >
      <div>
        <el-form :model="seeForm">
          <el-form-item label="项目名称">
            <el-input v-model="seeForm.name" type="text" />
          </el-form-item>
          <el-form-item label="备案申报人">
            <el-input v-model="seeForm.leading" type="text" />
          </el-form-item>
          <el-form-item label="项目内容:" />
          <div class="proIntruduce" v-html="seeForm.intruduce" />
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="seeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorSumit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTable, createTable, sumitProInitExamine, applyProManage, getProject } from '@/api/myProRecordKeep'
import MyProjectDelete from '@/components/project/MyProjectDelete'

export default {
  components: { MyProjectDelete },
  filters: {
    stateFilter(state) {
      const stateMap = {
        '退回': 'gray',
        '认可': 'green',
        '未提交': 'normal'
      }
      return stateMap[state]
    }
  },
  data() {
    return {
      today_year: '',
      year_select: [],
      tableData: [],
      queryInfo: {
        name: '',
        state: '',
        year: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      totalPage: 0,
      addForm: {
        name: '',
        leading: ''
      },
      addrules: {
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        leading: [{ required: true, message: '请输入备案申报人', trigger: 'blur' }]
      },
      seeForm: {},
      seeDialogVisible: false
    }
  },
  created() {
    this.getTimeSelect()
    this.getTable()
  },
  methods: {
    getTimeSelect: function() {
      var today_data = new Date()
      this.today_year = today_data.getFullYear()
      var year_all = this.today_year - 2017
      for (let i = 0; i <= year_all; i++) {
        const x = {}
        x.value = 2017 + i
        x.label = x.value
        this.year_select.push(x)
      }
      this.today_year = String(this.today_year)
    },
    getTable() {
      const that = this
      this.listLoading = true
      getTable(this.queryInfo).then(response => {
        that.tableData = response.data.items
        that.total = response.data.total
        that.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    changeCellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return 'table_fron_color'
      }
      return ''
    },
    handleEdit(id) {
      this.$router.push('editorProject/' + id)
    },
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getTable()
    },
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getTable()
    },
    addProject() {
      this.$refs.addRef.validate(valid => {
        console.log(valid)
        const that = this
        if (!valid) return
        else {
          this.listLoading = true
          createTable(this.addForm).then(response => {
            that.$message.success('项目上传成功！')
            that.addProjectVisible = false
            that.getTable()
            that.listLoading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    editorSumit() {
      this.seeDialogVisible = false
      this.listLoading = true
      sumitProInitExamine(this.operateId).then(res => {
        this.$message.success('提交成功！')
        this.listLoading = false
      }).catch(() => {
        this.$message.error('操作错误！')
        this.listLoading = false
      })
    },
    handlereport(id) {
      this.listLoading = true
      applyProManage(id).then(res => {
        this.$message.success('提交成功！')
        this.listLoading = false
      }).catch(() => {
        this.$message.error('操作错误！')
        this.listLoading = false
      })
    },
    handlesee(id) {
        this.seeDialogVisible = true
        this.listLoading = true
        const that = this
        getProject(id).then(res => {
            console.log(res)
            that.seeForm = res.data
            this.listLoading = false
        }).catch(() => { this.listLoading = false })
    }
  }
}
</script>

 <style lang="less">
 @import '/src/styles/global';
.el-table .table_fron_color{
  color: #5BACD1;
}
.gray{
  color: black;
  text-decoration: underline;
}
.green{
  color: #26D272;
  text-decoration: underline;
}
.normal{
  color: #5BACD1;
  text-decoration: underline;
}
</style>
