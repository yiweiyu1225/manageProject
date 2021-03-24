<template>
  <div class="functionContain">
    <projectDetail :is-edit="true" />
  </div>
</template>

<script>
import projectDetail from '@/views/personal/myProRecordKeep/components/projectDetail'
export default {
  components: { projectDetail },
  data() {
    return {
    }
  }
}
</script>

<style lang='less' scoped>

</style>
