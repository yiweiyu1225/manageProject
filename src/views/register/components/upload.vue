<template>
  <div>
    <!-- <el-tooltip class="item" effect="light" content="只能上传jpg/png文件，且不超过500kb" placement="bottom-end" :hide-after="1000"> -->
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-change="getpicture"
      :auto-upload="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <img v-else src="../../../assets/images/baseimg.png" class="avatar">
    </el-upload>
    <!-- </el-tooltip> -->
  </div>
</template>

<script>
  export default {
    prop: {
      value: {
          default: ''
      }
    },
    data() {
      return {
        imageUrl: this.value
      }
    },
    watch: {
        imageUrl: function(val) {
            this.$emit('input', val)
        }
    },
    methods: {
      getpicture: function(file) {
        var readIcon = new FileReader()
        readIcon.readAsDataURL(file.raw)
        console.log(this)
        console.log(this.imageUrl)
        const that = this
        readIcon.onload = function(e) {
           that.imageUrl = e.target.result
        }
        readIcon.onerror = function(e) {
           alert('图片上传失败，请检查。')
        }
      }
    }
  }
</script>

<style lang='less' scoped>
@import './../../../styles/upload';
</style>
