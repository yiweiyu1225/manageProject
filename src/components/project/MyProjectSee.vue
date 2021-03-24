<template>
  <div>
    <button class="buttonText" @click="handlesee()">
      预览并提交
    </button>
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
import { getProject } from '@/api/myProRecordKeep'
export default {
    name: 'MyProjectDelete',
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            operateId: this.id,
            seeForm: {},
            seeDialogVisible: false
        }
    },
    methods: {
        handlesee() {
            this.seeDialogVisible = true
            this.listLoading = true
            const that = this
            getProject(this.operateId).then(res => {
                console.log(res)
                that.seeForm = res.data
                this.listLoading = false
            }).catch(() => { this.listLoading = false })
        }
    }
}
</script>

<style scoped>
@import '/src/styles/global';
</style>
