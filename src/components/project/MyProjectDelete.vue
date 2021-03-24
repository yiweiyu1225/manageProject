<template>
  <button class="buttonText" @click="handleDelete()">
    删除
  </button>
</template>

<script>
import { deleteTable } from '@/api/myProRecordKeep'
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
            deleteId: this.id
        }
    },
    methods: {
        async handleDelete() {
        console.log(this.deleteId)
        const confirmResult = await this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err => err)
            console.log(confirmResult)
            if (confirmResult !== 'confirm') {
            return this.$message.info('已取消删除')
            }

            // 删除请求
            this.listLoading = true
            const { data } = await deleteTable(this.deleteId).catch(() => { this.loading = false })
            this.loading = false
            console.log(data)
            this.$message.success('删除用户成功！')
            this.getTable()
        }
    }
}
</script>

<style scoped>
@import '/src/styles/global';
</style>
