<template>
  <div class="containtor">
    <el-card>
      <!-- 功能条 -->
      <div class="optionBar">
        <div class="optionson"><button class="departButn" @click="opendialog('dialogdepart')">新建部门（下方）</button></div>
        <div class="optionson"><button class="departButn" @click="opendialog('dialogsondepart')">新建子部门</button></div>
      </div>

      <div class="clear" />
      <!-- 表格 树形表格控件 -->
      <a-table
        bordered
        :pagination="false"
        :data-source="data"
        :row-selection="{ selectedRowKeys: selectedRowKeys,onSelectAll: onSelectAll, onSelect: onSelect}"
      >
        <a-table-column key="name" title="部门名" data-index="name">
          <template slot-scope="text, record">
            <a-input
              v-if="record.editable"
              style="margin: 5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, 'name',record)"
            />
            <span v-else>{{ text }}</span>
          </template>
        </a-table-column>

        <a-table-column key="describe" title="描述" data-index="describe">
          <template slot-scope="text ,record">
            <a-input
              v-if="record.editable"
              style="margin: 20px 0 5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, 'describe',record)"
            />
            <span v-else>{{ text }}</span>
          </template>
        </a-table-column>

        <a-table-column key="time" title="创建时间" data-index="time">
          <template slot-scope="text, record">
            <a-input
              v-if="record.editable"
              style="margin: 20px 0 5px 0"
              :value="text | parseTime('{y}-{m}-{d} {h}:{i}')"
              @change="e => handleChange(e.target.value, record.key, 'time',record)"
            />
            <span v-else>
              {{ text |parseTime('{y}-{m}-{d} {h}:{i}') }}
            </span>
          </template>
        </a-table-column>

        <a-table-column key="action" title="Action">
          <template slot-scope="text, record">
            <span v-if="record.editable">
              <a @click="save(record.key, record)">保存</a>
              <a-popconfirm
                title="是否取消?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="() => cancel(record.key, record)"
              >
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editdepartment(record.key,record)" />
              <el-button type="primary" size="mini" icon="el-icon-delete" @click="e => {delectdepartment(record.key,record)}" />
              <el-button type="primary" size="mini" @click="updepartment(record.key,record)">上移<i class="el-icon-arrow-up el-icon--right" /></el-button>
              <el-button type="primary" size="mini" @click="downdepartment(record.key,record)">下移<i class="el-icon-arrow-down el-icon--right" /></el-button>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </el-card>

    <!-- 添加部门（下面）对话框 -->
    <el-dialog
      title="添加部门（下面）"
      :visible.sync="dialogdepart"
      width="60%"
    >
      <div>
        <el-form ref="departform" :model="departform" :rules="departformrules" label-width="80px">
          <el-form-item label="部门名字" prop="name">
            <el-input v-model="departform.name" />
          </el-form-item>
          <el-form-item label="部门描述" prop="detail">
            <el-input v-model="departform.detail" />
          </el-form-item>
          <el-form-item label="活动时间" prop="time">
            <el-col :span="10">
              <el-date-picker v-model="departform.date" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-col>
            <el-col class="line" :span="1">--</el-col>
            <el-col :span="10">
              <el-time-picker v-model="departform.time" placeholder="选择时间" style="width: 100%;" />
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogdepart = false">取 消</el-button>
        <el-button type="primary" @click="check('departform','dialogdepart')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加子部门 -->
    <el-dialog
      title="添加子部门"
      :visible.sync="dialogsondepart"
      width="60%"
    >
      <div>
        <el-form ref="sondepartform" :model="sondepartform" :rules="sondepartformrules" label-width="80px">
          <el-form-item label="所属部门" prop="fathername">
            <el-cascader
              v-model="sondepartform.fathername"
              :options="data"
              placeholder="请选择"
              :props="{ value: 'key', label: 'name'}"
              :show-all-levels="false"
            />
          </el-form-item>
          <el-form-item label="部门名字" prop="name">
            <el-input v-model="sondepartform.name" />
          </el-form-item>
          <el-form-item label="部门描述" prop="detail">
            <el-input v-model="sondepartform.detail" />
          </el-form-item>
          <el-form-item label="活动时间" prop="time">
            <el-col :span="10">
              <el-date-picker v-model="sondepartform.date" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-col>
            <el-col class="line" :span="1">--</el-col>
            <el-col :span="10">
              <el-time-picker v-model="sondepartform.time" placeholder="选择时间" style="width: 100%;" />
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogsondepart = false">取 消</el-button>
        <el-button type="primary" @click="check('sondepartform','dialogsondepart')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
    filters: {
      parseTime
    },
    data() {
        return {
        data: [
          {
            key: 1,
            describe: 'John Brown sr.',
            time: new Date(),
            name: '123',
            children: [
              {
                key: 11,
                describe: 'John Brown',
                time: new Date(),
                name: 'New York No. 2 Lake Park'
              },
              {
                key: 12,
                describe: 'John Brown jr.',
                time: new Date(),
                name: 'New York No. 3 Lake Park',
                children: [
                  {
                    key: 121,
                    describe: 'Jimmy Brown',
                    time: new Date(),
                    name: 'New York No. 3 Lake Park'
                  }
                ]
              },
              {
                key: 13,
                describe: 'Jim Green sr.',
                time: new Date(),
                name: 'London No. 1 Lake Park',
                children: [
                  {
                    key: 131,
                    describe: 'Jim Green',
                    time: new Date(),
                    name: 'London No. 2 Lake Park',
                    children: [
                      {
                        key: 1311,
                        describe: 'Jim Green jr.',
                        time: new Date(),
                        name: 'London No. 3 Lake Park'
                      },
                      {
                        key: 1312,
                        describe: 'Jimmy Green sr.',
                        time: new Date(),
                        name: 'London No. 4 Lake Park'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            key: 2,
            describe: 'Joe Black',
            time: new Date(),
            name: 'Sidney No. 1 Lake Park'
          }
        ],
        departform: {
          name: '',
          detail: '',
          date: '',
          time: ''
        },
        departformrules: {
          name: [{ required: true, message: '请输入部门名', trigger: 'blur' }],
          detail: [{ required: true, message: '请输入部门描述', trigger: 'blur' }],
          time: [{ validator: this.checkvalidatetime('departform'), trigger: 'blur' }]
        },
        sondepartform: {
          fathername: '',
          name: '',
          detail: '',
          date: '',
          time: ''
        },
        sondepartformrules: {
          fathername: [{ required: true, message: '请选择所属的部门', trigger: 'blur' }],
          name: [{ required: true, message: '请输入部门名', trigger: 'blur' }],
          detail: [{ required: true, message: '请输入部门描述', trigger: 'blur' }],
          time: [{ validator: this.checkvalidatetime('sondepartform'), trigger: 'blur' }]
        },
        selectedRowKeys: [],
        fatnode: [],
        dialogdepart: false,
        dialogsondepart: false
      }
    },
    computed: {
      chToFa: function() {
        const chtofamap = new Map()
        const that = this
        function findfather(arr) {
          arr.forEach(function(item, index) {
            if ('children' in item) {
              // 记录父亲节点
              that.fatnode.push(item.key)
              item.children.forEach(function(jtem) {
                chtofamap.set(jtem.key, item)
                return findfather(item.children, chtofamap)
              })
            }
          })
        }

        findfather(this.data)
        return chtofamap
      }
    },
    methods: {
      onChange: function(selectedRowKeys, selectedRows) {
        console.log(selectedRows)
      },
      onSelect: function(record, selected, selectedRows) {
        const arr = this.getrecord(record)
        const that = this
        if (!selected) {
          arr.forEach(function(item) {
            that.selectedRowKeys.splice(that.selectedRowKeys.indexOf(item), 1)
          })
          that.selectFather(arr[0], selected)
          that.selectedRowKeys.forEach(function(item) {
            that.selectFather(item, !selected)
          })
        } else {
          arr.forEach(function(item) {
            if (that.selectedRowKeys.indexOf(item) === -1) {
              that.selectedRowKeys.push(item)
            }
            that.selectFather(item, selected)
          })
        }
      },
      onSelectAll: function(selected, selectedRows, changeRows) {
        this.getSelectedRowkey(selectedRows)
      },
      getSelectedRowkey: function(selectedRows) {
        this.selectedRowKeys = []
        const that = this
        selectedRows.forEach(function(item) {
          if (that.selectedRowKeys.indexOf(item.key) === -1) {
            that.selectedRowKeys.push(item.key)
          }
        })
        that.selectFather(this.selectedRowKeys[0])
      },
      selectFather: function(key, selected) {
        const arr = []
        const that = this
        function getfather(key) {
         if (that.chToFa.has(key)) {
            const father = that.chToFa.get(key)
            arr.push(father.key)
            getfather(father.key)
          }
        }
        getfather(key)
        if (selected) {
          arr.forEach(function(item) {
            if (that.selectedRowKeys.indexOf(item) === -1) {
              that.selectedRowKeys.push(item)
            }
          })
        } else {
          arr.forEach(function(item) {
            that.selectedRowKeys.splice(that.selectedRowKeys.indexOf(item), 1)
          })
        }
        return arr
      },
      getrecord: function(record) {
        const arr = []
        arr.push(record.key)
        function getchild(record) {
          if (record) {
            if (record.children) {
              record.children.forEach(function(item) {
                arr.push(item.key)
                if (item.children) {
                  getchild(item)
                }
              })
            }
          }
        }
        getchild(record)
        console.log(arr)
        return arr
      },
      check: function(formname, dialog) {
        this.$refs[formname].validate((valid) => {
          // eslint-disable-next-line no-empty
          if (valid) {
            this[dialog] = false
            alert('添加成功！')
          } else {
            console.log('请填写必要消息')
            return false
          }
        })
      },
      opendialog: function(dialog) {
        console.log(dialog)
        this[dialog] = true
      },
      checkvalidatetime(formname) {
        var validateTime = (rule, value, callback) => {
          if (this[formname].date && this[formname].time) {
            callback()
          } else {
            callback(new Error('请选择日期和时间'))
          }
        }
        return validateTime
      },
      delectdepartment: function(key, record) {
        const that = this
        let pos = null
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].key === key) {
            pos = i
            break
          }
        }
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.data.splice(pos, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editdepartment: function(key, record) {
        const newData = [...this.data]
        const target = record
        this.editingKey = key
        if (target) {
          target.editable = true
          this.data = newData
        }
      },
      cancel: function(key, record) {
        const newData = [...this.data]
        const target = record
        this.editingKey = ''
        if (target) {
          delete target.editable
          this.data = newData
        }
      },
      save: function(key, record) {
        const newData = [...this.data]
        const target = record
        if (target) {
          delete target.editable
          this.data = newData
        }
        this.editingKey = ''
      },
      // input操作
      handleChange: function(value, key, column, seft) {
        console.log(value, key, column)
        const newData = [...this.data]
        const target = seft
        if (target) {
          target[column] = value
          this.data = newData
        }
      },
      // 上移
      updepartment: function(key, record) {
        console.log('上移')
        const that = this
        const newarr = [...this.data]
        let fatherarr = newarr
        let pos = null
        if (this.chToFa.has(key)) {
          fatherarr = this.chToFa.get(key).children
        }
        for (let i = 0; i < fatherarr.length; i++) {
          if (fatherarr[i].key === key) {
            pos = i
            break
          }
        }
        if (pos === 0) {
          that.$message({
            showClose: true,
            message: '已经是同级最上面了，不能上移了',
            type: 'warning'
          })
        } else {
          fatherarr.splice(pos, 1)
          fatherarr.splice((pos - 1), 0, record)
          that.$message({
            showClose: true,
            message: '上移成功',
            type: 'success'
          })
        }
        this.data = newarr
      },
      // 下移
      downdepartment: function(key, record) {
        const that = this
        const newarr = [...this.data]
        let fatherarr = newarr
        let pos = null
        if (this.chToFa.has(key)) {
          fatherarr = this.chToFa.get(key).children
        }
        for (let i = 0; i < fatherarr.length; i++) {
          if (fatherarr[i].key === key) {
            pos = i
            break
          }
        }
        if (pos === (fatherarr.length - 1)) {
          that.$message({
            showClose: true,
            message: '已经是同级最下面了，不能下移了',
            type: 'warning'
          })
        } else {
          console.log(pos)
          fatherarr.splice((pos + 2), 0, record)
          fatherarr.splice(pos, 1)
          that.$message({
            showClose: true,
            message: '下移成功',
            type: 'success'
          })
        }
        this.data = newarr
      },
      // 展开行
      expandedRowsChange: function(expandedRows) {
        expandedRows
      }
    }
}
</script>

<style lang='less' scoped>
@import '/src/styles/global';
.containtor{
  overflow: hidden;
}
.departButn{
  padding: 5px 10px;
  background: #D8F6FF;
  color: #7EB8D1;
  border: 0;
  cursor: pointer;
}
.departButn:focus{
  outline: none;
  background: #D8F6FF;
}
.optionBar,.optionson{
  float: left;
}
.optionBar{
  margin: 10px auto;
}
.optionson{
  margin-right: 10px;
  margin-bottom: 10px;
}
.clear{
  clear: both;
}

</style>
