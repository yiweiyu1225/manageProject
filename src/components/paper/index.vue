/* eslint-disable vue/require-v-for-key */
/* eslint-disable vue/require-v-for-key */
<template>
  <div class="paper">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li>
          <span>
            共{{ total }}条数据
          </span>
        </li>
        <li>
          <span>
            共{{ alltotal }}页
          </span>
        </li>
        <li>
          <a href="#" @click="goto(1)">
            <span>首页</span>
          </a>
        </li>
        <li v-show="current != 1">
          <a ref="front" href="#" aria-label="Previous" @click="current--&&jumpcurrent-- && goto(current)">
            <span aria-hidden="true">上一页</span>
          </a>
        </li>
        <li v-if="index in pages" :key="index" :class="{'active':current === index}">
          <a href="#" @click="goto(index)">{{ index }}</a>
        </li>
        <li v-show="total != current && total != 0 ">
          <a ref="next" href="#" aria-label="Next" @click="current++ && jumpcurrent ++ && goto(current)" @mouseover="shownext">
            <span aria-hidden="true">下一页</span>
          </a>
        </li>
        <li>
          <input v-model="jumpcurrent" class="jumpPage" type="text">
        </li>
        <li class="blue">
          <a href="#" @click="goto(1)">
            <span>尾页</span>
          </a>
        </li>
        <li>
          <button style="margin-left:10px;background:#337AB7;color:#fff;border-color:#337AB7;" @click="goto(jumpcurrent)">跳转</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'Paper',
    props: {
        'total': {
            type: Number,
            default: 0
        },
        'alltotal': {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            jumpcurrent: 1, // 跳转页计数
            current: 1, // 显示页计数
            currentnum: 10// 导航总显示个数
        }
    },
    computed: {
      pages: function() {
        var pag = []
        if (this.current < this.currentnum) {
          let i = Math.min(this.currentnum, this.total)
          while (i) {
            pag.unshift(i--)
          }
        } else {
          let middle = this.current - Math.floor(this.currentnum / 2)
          let i = this.currentnum
          if (middle > (this.total - this.currentnum)) {
            middle = (this.total - this.currentnum) + 1
          }
          while (i--) {
            pag.push(middle++)
          }
        }
        return pag
      }
    },
    watch: {
      current: function(old, newVal) {
        console.log(newVal)
      }
    },
    methods: {
      goto: function(index) {
        console.log(index)
        if (this.jumpcurrent > this.total || this.jumpcurrent <= 0) {
          this.jumpcurrent = this.current
          this.$message({
            message: '页码超出范围',
            type: 'warning'
          })
          return
        } else {
          this.jumpcurrent = index
          this.current = index
        }
        this.$emit('change', index)
      }
    }
}
</script>

<style lang='less' scoped>
.paper{
  margin-top:20px;
  margin-bottom: 200px;
}
.pagination{
  border-top: solid 2px #AFB7CE;
  border-bottom: solid 2px #AFB7CE;
  float: right;
}
.pagination>li {
  list-style: none;
  line-height: 1.3em;
  height: 1.3em;
  height: 2em;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-right: solid 2px #AFB7CE;
  float: left;
  font-size: 13px;
  color: #337AB7;
}
</style>
