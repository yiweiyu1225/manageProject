<template>
  <div class="functionContain">
    <el-card>
      <!-- 搜索栏 -->
      <div>
        <el-row type="flex" justify="space-between" class="findQuiry">

          <!-- 项目名字 -->
          <el-col :span="7">
            <el-row :gutter="0">
              <el-col :span="6">项目名字:</el-col>
              <el-col :span="16">
                <el-input v-model="queryInfo.name" placeholder="请输入内容" clearable @clear="gettable" />
              </el-col>
            </el-row>
          </el-col>

          <!-- 所属部门 -->
          <el-col :span="7">
            <el-row :gutter="0">
              <el-col :span="6">所属部门:</el-col>
              <el-col :span="16">
                <el-select v-model="queryInfo.department" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <button class="buttonQuery" @click="gettable">查询</button>
          </el-col>
        </el-row>
      </div>

      <!-- 操作栏 -->
      <div class="oprate_tab">
        <a
          class="buttonTag"
          @click="addpeople"
        >
          添加人员
        </a>

        <a
          class="buttonTag"
          @click="bandpeople"
        >
          禁用
        </a>

        <a
          class="buttonTag"
          @click="startpeople"
        >
          启用
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
          />
          <el-table-column
            label="姓名"
            align="center"
            width="150"
          >
            <template slot-scope="{row}">
              <span v-if="row.edit">
                <el-input v-model="row.name" size="small" />
              </span>
              <span v-else>{{ row.name }}</span>
            </template>

          </el-table-column>

          <el-table-column
            label="所属部门"
            align="center"
            width="150"
          >
            <template slot-scope="{row}">
              <span v-if="row.edit">
                <el-input v-model="row.department" size="small" />
              </span>
              <span v-else>{{ row.department }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="邮箱"
            align="center"
          >
            <template slot-scope="{row}">
              <span v-if="row.edit">
                <el-input v-model="row.email" size="small" />
              </span>
              <span v-else>{{ row.email }}</span>
            </template>

          </el-table-column>

          <el-table-column
            label="手机号码"
            align="center"
            width="200"
          >
            <template slot-scope="{row}">
              <span v-if="row.edit">
                <el-input v-model="row.phone" size="small" />
              </span>
              <span v-else>{{ row.phone }}</span>
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
                <a @click="saveEdit(row)">保存</a>
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
                  @click="handleEdit(row)"
                >编辑</button>
                <button
                  class="buttonText"
                  @click="handdelect(row)"
                >
                  删除
                </button>
                <button
                  class="buttonText"
                  @click="handlepassword(row)"
                >重置密码</button>
              </span>

            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-card>

    <!-- 重置密码对话框 -->
    <el-dialog
      title="重置密码"
      :visible.sync="dialogPassword"
      width="50%"
      @close="handleClose('passwordform')"
    >
      <el-form ref="passwordform" :model="passwordform" :rules="passwordrule" label-width="150px">
        <el-form-item label="新置密码" prop="newpassword">
          <el-input v-model="passwordform.newpassword" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPassword = false">取 消</el-button>
        <el-button type="primary" @click="surePassword">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加人员 -->
    <el-dialog
      title="添加人员"
      :visible.sync="dialogaddpeople"
      width="50%"
      @close="handleClose('addpeopleform')"
    >
      <el-form ref="addpeopleform" :model="addpeopleform" :rules="addpeoplerule" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addpeopleform.name" />
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-input v-model="addpeopleform.department" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addpeopleform.email" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addpeopleform.phone" />
        </el-form-item>
        <el-form-item label="启动" prop="state">
          <el-switch v-model="addpeopleform.state" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogaddpeople = false">取 消</el-button>
        <el-button type="primary" @click="sureaddpeople">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { gettable } from '@/api/management/people'
export default {
    data() {
      var phonevalid = (rule, value, callback) => {
        const phonestand = /^[1][3-9][0-9]{9}$/
        if (!phonestand.test(value)) {
          callback(new Error('手机号格式不对'))
        } else {
          callback()
        }
      }
      return {
          queryInfo: {
              name: '',
              department: '',
              pagenum: 1,
              pagesize: 5
          },
          multipleSelection: [],
          passwordform: {
            newpassword: '123456'
          },
          passwordrule: {
            newpassword: [{ required: true, message: '请输入重置密码', trigger: 'blur' }]
          },
          addpeopleform: {
            name: '',
            department: '',
            email: '',
            phone: '',
            state: true
          },
          addpeoplerule: {
            name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            department: [{ required: true, message: '请输入所属部门', trigger: 'blur' }],
            email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不对', trigger: 'blur' }],
            phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' },
                    { validator: phonevalid, trigger: 'blur' }],
            state: [{ required: true, message: '请选择状态', trigger: 'blur' }]
          },
          options: ['1', '2'],
          tableData: [],
          dialogPassword: false,
          dialogaddpeople: false
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
                this.tableData = response.peopleList.map(item => {
                  this.$set(item, 'edit', false)
                  item.oldname = item.name
                  item.olddepartment = item.department
                  item.oldemail = item.email
                  item.oldphone = item.phone
                  return item
                })
                console.log(that.tableData)
                this.listLoading = false
            }).catch(() => {
                this.loading = false
            })
        },
        handleEdit(row) {
          row.edit = true
        },
        saveEdit(row) {
          row.edit = false
        },
        // 还原
        confirmEdit(row) {
          row.name = row.oldname
          row.email = row.oldemail
          row.phone = row.oldphone
          row.department = row.olddepartment
          row.edit = false
        },
        // 无改变
        cancelEdit(row) {
          row.edit = true
        },
        // 删除
        handdelect(row) {
          this.$confirm('是否删除该人员？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.tableData.splice(this.tableData.indexOf(row), 1)
            this.$message({
              showClose: true,
              message: '已经成功删除',
              type: 'success'
            })
          }).catch(() => {
             this.$message({
              showClose: true,
              type: 'info',
              message: '已取消删除'
            })
          })
        },
        // 重置密码
        handlepassword(row) {
          console.log(row.id)
          this.dialogPassword = true
        },
        // 对话框关闭前清空
        handleClose(formName) {
          this.$refs[formName].resetFields()
        },
        // 是否重置
        surePassword() {
          this.$confirm('是否重置？', '重置密码', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.dialogPassword = false
          }).catch(() => {
            console.log('取消')
          })
        },
        // 多选
        handleSelectionChange(val) {
          this.multipleSelection = val
          console.log(this.multipleSelection)
        },
        // 增加人员
        addpeople() {
          console.log('添加')
          this.dialogaddpeople = true
        },
        // 对话框添加新用户
        sureaddpeople() {
          this.$refs.addpeopleform.validate((valid) => {
            if (valid) {
              this.$confirm('是否添加人员？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.dialogaddpeople = false
                this.$message({
                  type: 'success',
                  showClose: true,
                  message: '成功添加！'
                })
              })
            } else {
              return false
            }
          })
        },
        // 禁用人员
        bandpeople() {
          console.log('禁止')
          if (this.multipleSelection.length !== 0) {
            this.$confirm('是否禁用成员？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                showClose: true,
                message: '已禁用成员',
                type: 'success'
              })
            }).catch(() => {
              return
            })
          } else {
            this.$message({
                showClose: true,
                message: '请选择禁用人员列表',
                type: 'warning'
            })
          }
        },
        // 启动成员
        startpeople() {
          if (this.multipleSelection.length !== 0) {
            console.log('启用')
            this.$confirm('是否启用成员？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                showClose: true,
                message: '已启用成员',
                type: 'success'
              })
            }).catch(() => {
              return
            })
          } else {
            this.$message({
                showClose: true,
                message: '请选择启用人员列表',
                type: 'warning'
            })
          }
        }
      }
    }
</script>
<style scoped>
 @import '/src/styles/global';
</style>
