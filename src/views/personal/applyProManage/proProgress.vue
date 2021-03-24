<template>
  <div>
    <el-card class="containtorHeight">
      <!-- 标题 -->
      <div class="progressTitle">《{{ name }}》</div>
      <div class="myicon" />

      <el-steps class="modify">
        <el-step title="申报项目备案" icon="el-icon-edit" />
        <el-step title="专业科室初审" icon="el-icon-upload" />
        <el-step title="综合评审" icon="el-icon-document" />
        <el-step title="项目立案" icon="el-icon-s-flag" />
        <el-step title="填写合同" icon="el-icon-edit" />
        <el-step title="审核" icon="el-icon-zoom-in" />
        <el-step title="结束" icon="el-icon-check" />
      </el-steps>

      <div class="timeLine">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getProgressList } from '@/api/applyProManage'
export default {
    data() {
        return {
            name: '123',
            activities: []
        }
    },
    created() {
      this.getProgressList()
    },
    methods: {
      getProgressList() {
        this.listLoading = true
        const that = this
        getProgressList(this.id).then(
          res => {
            that.activities = res.data.items
            this.listLoading = false
          }
        ).catch(() => {
          this.listLoading = false
        })
      }
    }
}
</script>

<style lang="less" scoped>
 @import '/src/styles/global';
 @import '/src/styles/proProgress';

@backcolor: #F5F7FA;
@textcolor: #409EFF;
.el-card.containtorHeight{
    min-height: 100vh;
}
.progressTitle{
    text-align: center;
}
.myicon{
    width: 100%;
    border-bottom: solid 3px #C0C4CC;
    border-radius: 2px;
    margin: 20px auto;
}
.el-steps.modify{
  background: @backcolor;
  padding: 13px 8%;
}
.timeLine{
  margin:0 auto;
  margin-top: 50px;
  padding: 50px 8%;
  width: 75%;
  min-height: 300px;
  border: dashed 2px #7F7F7F;

}
</style>
