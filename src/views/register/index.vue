<template>
  <div class="containtor">
    <div class="header">
      <div class="headerLeft">
        <div class="nav">
          <ul>
            <li :class="[tag === 'app' ? 'active':'']" @click="tagto('app')">项目申报单位</li>
            <li>|</li>
            <li :class="[tag === 'recommen' ? 'active':'']" @click="tagto('recommen')">推荐单位</li>
            <li>|</li>
            <li :class="[tag === 'judge' ? 'active':'']" @click="tagto('judge')">评审专家</li>
            <li>|</li>
            <li :class="[tag === 'people' ? 'active':'']" @click="tagto('people')">项目申报人</li>
          </ul>
        </div>
      </div>
      <div class="headerRight">
        <a>已注册，立即登陆</a>
      </div>
    </div>
    <div class="regBody">
      <company-appiy v-if="tag === 'app'" />
      <people v-if="tag === 'people'" />
      <recommend v-if="tag === 'recommen'" />
      <judge v-if="tag === 'judge'" />
    </div>
  </div>
</template>

<script>

import companyAppiy from '@/views/register/appCompany/index'
import people from '@/views/register/people/index'
import recommend from './recommendCompany/index'
import judge from './judge/index'
export default {
  components: {
    companyAppiy,
    people,
    recommend,
    judge
  },
  data() {
    return {
       tag: 'app'
    }
  },
  methods: {
    tagto: function(index) {
      this.tag = index
    }
  }
}
</script>

<style lang='less' scoped>
@import './../../styles/element-my';
*{
  margin: 0;
  padding: 0;
}
.regBody,.containtor{
  overflow: hidden
}
li{
  list-style:none
}
input{
  width: 200px;
}
.containtor{
  width: 100%;
  background: #1C6FAE;
}

.headerLeft,.nav>ul>li{
  float: left;
}
.headerRight,.headerLeft{
  padding-top:15px;
  padding-bottom: 15px;
}
.headerLeft{
  margin-left: 50px;
  color: rgba(255, 255, 255, 0.5);
}
.headerRight{
  float: right;
}
.headerRight{
  margin-right: 50px;
  color: white;
}
.nav>ul>li{
  padding-left: 10px;
  cursor: pointer;
}
.nav>ul>li.active{
  color: white;
}
.header{
  font-size: 14px;
}
.header:after{
  width: 0;
  height: 0;
  content: '';
  display: block;
  clear: both;
}
.el-row {
  margin-top: 20px;
}
.el-form-item:last-child{
  margin-bottom: 20px;
}
// body
.regBody{
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
  background: white;
  padding-top: 30px;
}
.active:after{
  content: '';
  display: block;
  position: absolute;
  width: 0px;
  height: 0px;
  *width: 10px;
  *height: 10px;
  font-size: 0;
  line-height: 0;
  overflow: hidden;
  border-width: 22px;
  border-style: dashed dashed solid dashed;
  border-color:   #1C6FAE transparent transparent transparent;
}

</style>

// 全局
<style>
.el_one{
  margin-left:5%
}
.el_three{
  margin-left: 12.5%
}
.el_two{
  margin-left:8.5%
}
/* 字体 */
.tipfont{
  font: small;
  color: #ccc;
  height: 40px;
  line-height: 40px;
}
.blackenfont{
  font:bolder;
  color: black;
  font-size: 16px;
  font-weight:bold;
}
.must:after{
  content: '* ';
  color: red;
}
/* 按钮 */
.reiButton{
  width: 150px;
  height: 40px;
  border-radius: 10px;
}
.identifyButton{
  width: 100px;
  height: 30px;
  border-radius: 8px;
}
.reiButton,.identifyButton{
  color: white;
  background: #1C6FAE;
  border: none;
}
.reiButton:focus,.identifyButton:focus{
  outline: none;
}
.reiButton:hover,identifyButton:hover{
  cursor: pointer;
}
</style>
