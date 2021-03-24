<template>
  <div class="containtor">
    <el-card>
      <div class="flexBox">
        <span>
          <label>项目名称：</label>
          <el-input v-model="queryInfo.name" class="modify" />
        </span>

        <span>
          <label>项目类别：</label>
          <el-select v-model="queryInfo.kind" placeholder="请选择" class="modify">
            <el-option label="市级计划项目" value="市级计划项目" />
          </el-select>
        </span>

        <span>
          <label>状态：</label>
          <el-select v-model="queryInfo.state" placeholder="请选择" class="modify">
            <el-option label="未提交" value="未提交" />
            <el-option label="待推荐" value="待推荐" />
            <el-option label="已推荐" value="已推荐" />
            <el-option label="推荐退回" value="推荐退回" />
            <el-option label="已受理" value="已受理" />
            <el-option label="受理退回" value="受理退回" />
            <el-option label="初审通过" value="初审通过" />
          </el-select>
        </span>
      </div>

      <div class="flexBox item">
        <span>
          <label>申报时间：</label>
          <el-select v-model="queryInfo.time" placeholder="请选择" class="modify">
            <el-option label="未提交" value="未提交" />
            <el-option label="认可" value="认可" />
            <el-option label="退回" value="退回" />
          </el-select>
        </span>
        <button class="buttonQuery">查询</button>
      </div>

      <!--表格信息  -->
      <div class="space">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          header-align="center"
          :header-cell-style="{background:'#E7FAFF',color:'#5BACD1'}"
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
            min-width="150"
          />
          <el-table-column
            prop="kind"
            label="项目类别"
            align="center"
            width="120"
          />
          <el-table-column
            prop="leading"
            label="申报人"
            align="center"
            width="100"
          />
          <el-table-column
            prop="time"
            label="申请时间"
            align="center"
            width="150"
          />
          <el-table-column
            prop="state"
            label="状态"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作"
            align="center"
            min-width="200"
          >
            <template slot-scope="scope">
              <button
                v-if="scope.row.state === '未提交' || scope.row.state === '推荐退回' || scope.row.state === '受理退回'"
                class="buttonText"
                @click="handeditor(scope.row.id)"
              >编辑
              </button>
              <MyProjectDelete
                v-if="scope.row.state === '未提交' || scope.row.state === '推荐退回' || scope.row.state === '受理退回'"
                :id="scope.row.id"
              />
              <button
                v-if="scope.row.state === '未提交' || scope.row.state === '推荐退回' || scope.row.state === '受理退回'"
                class="buttonText"
                @click="handlesee(scope.row.id)"
              >预览并提交
              </button>
              <button
                v-if="scope.row.state !== '未提交'"
                class="buttonText"
                @click="handleprogress(scope.row.id)"
              >进度跟踪
              </button>
            </template>
          </el-table-column>
        </el-table>

      </div>

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

    </el-card>
  </div>
</template>

<script>
import { getTable } from '@/api/applyProManage'
import { getProject, sumitProInitExamine } from '@/api/myProRecordKeep'
import MyProjectDelete from '@/components/project/MyProjectDelete'

export default {
  components: { MyProjectDelete },
  data() {
    return {
      queryInfo: {
        name: '',
        kind: '',
        state: '',
        time: '',
        pagenum: 1,
        pagesize: 10
      },
      tableData: [],
      seeForm: {},
      seeDialogVisible: false
    }
  },
  created() {
    this.getTable()
  },
  methods: {
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
    handeditor(id) {
      this.$router.push('editorProject/' + id)
    },
    // 预览并提交
    handlesee(id) {
      this.seeDialogVisible = true
      this.listLoading = true
      const that = this
      getProject(id).then(res => {
          console.log(res)
          that.seeForm = res.data
          this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    // 关闭弹框
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
    // 进度
    handleprogress(id) {
      console.log(id)
      this.$router.push('proProgress/' + id)
    }
  }
}
</script>

<style lang='less' scoped>
 @import '/src/styles/global';
.el-input.modify{
  width: 200px;
}
</style>
