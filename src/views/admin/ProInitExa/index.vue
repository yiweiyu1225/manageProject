<template>
  <div id="bokk" class="containtor">
    <el-card>
      <div class="flexBox">
        <span>
          <label class="inline">项目名称：</label>
          <el-input v-model="queryInfo.name" class="modify inline" />
        </span>

        <span>
          <label class="inlinen">项目申报单位/人：</label>
          <el-input v-model="queryInfo.leading" class="modify inline" />
        </span>

        <span>
          <label class="labelModify inline">状态：</label>
          <el-select v-model="queryInfo.state" placeholder="请选择" class="modify">
            <el-option label="待审核" value="待审核" />
            <el-option label="认可" value="认可" />
            <el-option label="退回" value="退回" />
          </el-select>
        </span>

      </div>

      <div class="flexBox item">
        <span>
          <label>申报时间：</label>
          <el-select v-model="queryInfo.time" placeholder="请选择" class="modify">
            <el-option label="2017" value="2017" />
            <el-option label="2018" value="2018" />
            <el-option label="2019" value="2019" />
            <el-option label="2020" value="2020" />
          </el-select>
        </span>
        <button class="buttonQuery">查询</button>
      </div>

      <!-- 操作选项 -->
      <div class="oprate_tab">
        <router-link to="createProject">
          <span class="buttonTag">
            认可
          </span>
        </router-link>

        <router-link to="createProject">
          <span class="buttonTag">
            退回
          </span>
        </router-link>

        <span
          class="buttonTag"
          @click="handleDownResult"
        >
          导出备案结果汇总表
        </span>

        <router-link to="createProject">
          <span class="buttonTag">
            导出科技项目认证表
          </span>
        </router-link>
      </div>

      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          header-align="center"
          :header-cell-style="{background:'#E7FAFF',color:'#5BACD1'}"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
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
            min-width="100"
          >
            <template slot-scope="scope">
              <button
                class="buttonText"
                @click="downLoad(scope.row)"
              >导出word文档
              </button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 分页 -->
    <Paper :total="total" :all-page="allpage" @change="changePage" />
    <div id="word_id" hidden>
      <p><img id="hhk" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg" crossorigin="Anonymous">
      </p>
    </div>
  </div>
</template>

<script>
import Paper from '@/components/paper'
import { getTable } from '@/api/ProInitExa'
import { getProject } from '@/api/myProRecordKeep'
/* eslint-disable */
import $ from 'jquery'
import '@/vender/wordExport'

export default {
  components:{
    Paper
  },
    data() {
        return {
          queryInfo: {
            name: '',
            leading: '',
            time: '',
            pagenum: 1,
            pagesize: 10,
          },
          tableData: [],
          multipleSelection: [],
          total: 0,
          allpage: 0
        }
    },
    created() {
      this.getTable()
    },
    methods: {
      getTable() {
        this.listLoading = true
        const that = this
        getTable(this.queryInfo).then(res => {
          that.tableData = res.data.items
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(this.multipleSelection)
      },
      handleDownResult() {
        if (this.multipleSelection.length) {
          import('@/vender/Export2Excel').then(excel => {
            const tHeader = ['序号', '项目名称', '申报人', '申报时间', '状态']
            const filterVal = ['index', 'name', 'leading', 'time', 'state']
            const list = this.multipleSelection
            const data = this.formatJson(filterVal, list)
            for (let i = 0; i < data.length; i++) {
              data[i][0] = i + 1
            }
            console.log(data)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename
            })
            this.$refs.multipleTable.clearSelection()
          })
        } else {
          this.$message({
            message: 'Please select at least one item',
            type: 'warning'
          })
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      downLoad(row) {
        let context
        getProject(row.id).then(res => {
            console.log(res)
            context = res.data.intruduce
            this.listLoading = false
            // console.log(context)
            $('#word_id').html(context)
            $('#word_id').wordExport(row.name)           
        }).catch(() => { this.listLoading = false })
        // console.log(this.context)
        // $('#word_id').html(`<p><img src = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg'></img></p>`)
        // $('#bokk').wordExport(row.name)
      }
    }
}
</script>

<style lang="less" scoped>
@import '/src/styles/global';
@import '/src/styles/ProInitExa';
.el-input.modify{
  width: 200px;
}
.labelModify{
  width: 100px;
}
</style>
