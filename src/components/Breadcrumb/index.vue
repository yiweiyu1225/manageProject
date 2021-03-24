<template>
  <div class="app-breadcrumb">
    <!-- <transition-group name="breadcrumb"> -->
    <div class="div-breadcrumb">
      <span class="no-redirect">{{ lastList.meta.title }}</span>
    </div>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null,
      lastList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      const long = this.levelList.length
      this.lastList = this.levelList[long - 1]
      console.log(this.lastList.meta.title)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.div-breadcrumb {
  display: inline-block;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  margin-left:8px;
  background: #ffffff;

  .no-redirect {
    color: black;
    border-top: #83B4D3 solid 3px;
    // border-left:1px solid #F4F4F4;
    // border-right: 1px solid #F4F4F4;
    background-color: #fff;
    padding: 10px ;
    cursor: text;
  }
}
</style>
