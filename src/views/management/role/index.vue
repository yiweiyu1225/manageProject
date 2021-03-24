<template>
  <div class="functionContain">
    <el-card>
      <!-- 搜索栏 -->
      <div>
        <el-row type="flex" justify="space-between" class="findQuiry">

          <!-- 名字 -->
          <el-col :span="7">
            <el-row :gutter="0">
              <el-col :span="6">名字:</el-col>
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
          @click="multipleRoles"
        >
          批量分配角色
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
            prop="name"
            label="姓名"
            align="center"
            width="150"
          />

          <el-table-column
            prop="department"
            label="所属部门"
            align="center"
            width="150"
          />

          <el-table-column
            prop="email"
            label="邮箱（账号）"
            align="center"
          />

          <el-table-column
            prop="role"
            label="角色"
            align="center"
            width="200"
          />

          <el-table-column
            prop="operate"
            label="操作"
            align="center"
            width="300"
          >
            <template slot-scope="{row}">
              <button
                class="buttonText"
                @click="handlerole(row)"
              >
                分配角色
              </button>
            </template>

          </el-table-column>

        </el-table>
      </div>
    </el-card>

    <!-- 单行分配角色  -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogrole"
      width="50%"
      @close="handleClose"
    >
      <el-form ref="roleform" :model="roleform" :rules="rolerule" label-width="150px">
        <el-form-item label="角色" prop="role">
          <el-select v-model="roleform.role" :placeholder="selectedrow.role||'请选择角色' ">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogrole = false">取 消</el-button>
        <el-button type="primary" @click="surerole('roleform')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { gettable } from '@/api/management/role'
    export default {
        data() {
            return {
                queryInfo: {
                    name: '',
                    department: '',
                    pagenum: 1,
                    pagesize: 5
                },
                roleform: {
                    id: [],
                    role: ''
                },
                rolerule: {
                    role: [{ required: true, message: '请选择角色', trigger: 'change' }]
                },
                options: ['admin', 'editor'],
                tableData: [],
                multipleSelection: [],
                selectedrow: '',
                dialogrole: false
            }
        },
        created() {
            this.gettable()
        },
        methods: {
            gettable() {
                this.listLoading = true
                gettable(this.queryInfo).then(response => {
                    console.log(response)
                    this.tableData = response.data.list
                    this.listLoading = false
                }).catch(() => {
                    this.listLoading = false
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // 多行分配角色
            multipleRoles() {
                console.log(this.multipleSelection)
                console.log(this.multipleSelection !== [])
                if (this.multipleSelection && this.multipleSelection.length !== 0) {
                    const role = []
                    this.multipleSelection.forEach(function(item) {
                        role.push(item.id)
                    })
                    this.roleform.id = role
                    this.dialogrole = true
                } else {
                    this.$message({
                        showClose: true,
                        message: '还未选择人员',
                        type: 'warning'
                    })
                    return
                }
            },
            // 单行分配角色
            handlerole(row) {
                this.selectedrow = row
                this.roleform.id.push(row.id)
                this.dialogrole = true
            },
            // 关闭对话框
            handleClose(formname) {
                this.selectedrow = ''
            },
            // 修改角色
            surerole(formname) {
                console.log(this.$refs[formname])
                this.$refs[formname].validate(valid => {
                    if (!valid) return
                    else {
                        this.$confirm('是否修改该角色？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            const rolemap = new Map()
                            this.tableData.forEach((item, index) => {
                                rolemap.set(item.id, index)
                            })
                            this.roleform.id.forEach(item => {
                                this.tableData[rolemap.get(item.id)].role = this.roleform.role
                            })
                            this.dialogrole = false
                            this.$message({
                                message: '已成共修改该人员角色',
                                showClose: true,
                                type: 'success'
                            })
                        }).catch((e) => {
                            console.log(e)
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
@import '/src/styles/global';
</style>

