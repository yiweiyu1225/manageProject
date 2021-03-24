<template>
  <div class="functionContain">
    <projectDetail :is-edit="false" />
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
