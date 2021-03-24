<template>
  <div class="Pro-contain">

    <el-card>
      <el-alert
        title="添加项目备案"
        type="info"
        :closable="false"
        center
      />
      <el-form ref="addref" :model="addProject" :rules="addrules">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="addProject.name" placeholder="项目名称" />
        </el-form-item>
        <el-form-item label="备案申报人" prop="leading">
          <el-input v-model="addProject.leading" placeholder="备案申请人" />
        </el-form-item>
        <el-form-item prop="intruduce">
          <div><span class="text-fron">内容</span></div>
          <tinymce v-model="addProject.intruduce" :height="350" />
        </el-form-item>
        <el-form-item class="quill-editor">
          <el-button type="primary" @click="submitForm">上传备案</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { createTable, getProject } from '@/api/myProRecordKeep'
export default {
  name: 'ProDetail',
  components: { Tinymce },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var validaterule = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('项目名不能为空'))
      } else {
        callback()
      }
    }
    return {
      addProject: {
        id: '',
        name: '',
        leading: '',
        time: '',
        intruduce: ''
      },
      addrules: {
        name: [{ validator: validaterule, trigger: 'blur' }],
        leading: [{ validator: validaterule, trigger: 'blur' }],
        intruduce: [{ validator: validaterule }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$router.params && this.$router.params.id
      this.addProject.id = id
      this.fetchData(id)
    }
  },
  methods: {
    async fetchData(id) {
      const { data } = await getProject(id)
      console.log(data)
      this.addProject.intruduce = data.intruduce
    },
    submitForm() {
      if (this.isEdit) {
        this.$refs.addref.validate((valid) => {
          if (!valid) return
          this.listLoading = true
          console.log(this.addProject)
          createTable(this.addProject).then(response => {
            this.$message.success('修改成功')
            this.listLoading = false
          }).catch(() => { this.listLoading = false })
        })
      } else {
        this.addProject.time = new Date()
        this.$refs.addref.validate((valid) => {
          if (!valid) return
          this.listLoading = true
          console.log(this.addProject)
          createTable(this.addProject).then(response => {
            this.$message.success('已经成功添加')
            this.listLoading = false
          }).catch(() => { this.listLoading = false })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '/src/styles/global';
.text-fron{
color: #606266;
font-size:15px;
font-family:  Arial;
font-weight:  600;
}
.quill-editor{
  text-align: center;
}
</style>
