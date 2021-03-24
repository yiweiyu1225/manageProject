<template>
  <div>
    <el-form ref="judgeform" :model="judgeform" :rules="judgeformrule">
      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="userName">
            <el-row>
              <el-col :span="6" class="must">用户名</el-col>
              <el-col :span="18"><el-input v-model="judgeform.userName" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col>
              推荐使用身份证或护照号
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="blackenfont">
        <el-col class="el_two">个人信息</el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="name">
            <el-row>
              <el-col :span="6" class="must">姓名</el-col>
              <el-col :span="18"><el-input v-model="judgeform.name" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="sex">
            <el-col :span="6" class="must">性别</el-col>
            <el-col :span="18">
              <el-radio-group v-model="judgeform.sex">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="professionalTitle">
            <el-row>
              <el-col :span="6" class="must">职称</el-col>
              <el-col :span="18">
                <el-select v-model="judgeform.professionalTitle" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in professionaloptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class="el_three">

          <el-row>
            <el-form-item>
              <el-col :span="4" class="must">出生日期</el-col>
              <el-col :span="4">
                <el-form-item prop="birthdayYear">
                  <el-select v-model="judgeform.birthdayYear" placeholder="">
                    <el-option
                      v-for="(item, index) in yearoptions"
                      :key="index+'key'"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1">年</el-col>
              <el-col :span="4">
                <el-form-item prop="birthdayMonth">
                  <el-select v-model="judgeform.birthdayMonth" placeholder="">
                    <el-option
                      v-for="(item,index) in monthoptions"
                      :key="index+'key'"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1">月</el-col>
              <el-col :span="4">
                <el-form-item prop="birthdayDate">
                  <el-select v-model="judgeform.birthdayDate" placeholder="">
                    <el-option
                      v-for="(item,index) in dateoption"
                      :key="index+'key'"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1">日</el-col>

            </el-form-item>
          </el-row>

        </el-col>
      </el-row>

      <!-- 身份证 -->
      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="identifyKibd">
            <el-row>
              <el-col :span="6">
                <el-select v-model="judgeform.identifyKind">
                  <el-option label="身份证" value="身份证" />
                  <el-option label="护照号" value="护照号" />
                </el-select>
              </el-col>
              <el-col :span="16" class="el_one"><el-input v-model="judgeform.id" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="researchField">
            <el-row>
              <el-col :span="6" class="must">研究领域</el-col>
              <el-col :span="18"><el-input v-model="judgeform.researchField" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="personalEmail">
            <el-row>
              <el-col :span="6" class="must">电子邮箱</el-col>
              <el-col :span="18"><el-input v-model="judgeform.personalEmail" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col>
              个人邮箱
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6" class="el_three">
          <el-form-item prop="personalPhone">
            <el-row>
              <el-col :span="6" class="must">手机</el-col>
              <el-col :span="18"><el-input v-model="judgeform.personalPhone" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-row class="tipfont">
            <el-col :span="3.5">
              <el-button class="identifyButton" @click="getcode(judgeform.personalPhone)">获取验证消息</el-button>
            </el-col>
            <el-col :span="16">
              例如：13600000000，登录时接收手机验证码
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="verificationCode">
            <el-row>
              <el-col :span="6" class="must">手机验证码</el-col>
              <el-col :span="18"><el-input v-model="judgeform.verificationCode" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="blackenfont">
        <el-col class="el_two">所在单位信息</el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="unitname">
            <el-row>
              <el-col :span="6" class="must">单位名称</el-col>
              <el-col :span="18"><el-input v-model="judgeform.unitname" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item prop="address">
          <el-col :span="3" class="el_three must">单位地址 </el-col>
          <el-col :span="16" class="el-two">
            <place
              :fprovince="judgeform.province"
              :fcity="judgeform.city"
              :fdistrict="judgeform.district"
              :fdetaile="judgeform.detaileAddress"
            />
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="postCode">
            <el-row>
              <el-col :span="6" class="must">邮政编码</el-col>
              <el-col :span="18"><el-input v-model="judgeform.postCode" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="unitphone">
            <el-row>
              <el-col :span="6" class="must">单位电话</el-col>
              <el-col :span="18"><el-input v-model="judgeform.unitphone" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col>
              例如：0731-12345678-888
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item>
            <el-row>
              <el-col :span="6">单位传真</el-col>
              <el-col :span="18"><el-input v-model="judgeform.fax" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col>
              例如：0731-12345678-888
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-form-item type="flex" justify="center">
        <el-row type="flex" justify="center">
          <button class="reiButton" @click="submitForm('judgeform')">注册</button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { set } from 'nprogress'
import place from '../components/address'
export default {
    components: {
        place
    },
    data() {
        var validateTelexphone = (rule, value, callback) => {
            var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            if (!myreg.test(value)) {
                return callback(new Error('手机格式不正确！'))
            } else {
                callback()
            }
        }
        var validateAddress = (rule, value, callback) => {
            if (!this.judgeform.province || this.judgeform.city) {
                return callback(new Error('请输入地点'))
            } else {
                callback()
            }
        }
        return {
            judgeform: {
                userName: '',
                name: '',
                sex: '',
                professionalTitle: '',
                birthdayYear: '',
                birthdayMonth: '',
                birthdayDate: '',
                identifyKind: '身份证',
                id: '',
                researchField: '',
                personalEmail: '',
                personalPhone: '',
                verificationCode: '',
                unitname: '',
                province: '',
                city: '',
                district: '',
                detaileAddress: '',
                postCode: '',
                unitphone: '',
                fax: ''
            },
            judgeformrule: {
                 userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                 name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                 sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
                 professionalTitle: [{ required: true, message: '请选择职称', trigger: 'blur' }],

                 researchField: [{ required: true, message: '请填写研究领域', trigger: 'blur' }],
                 personalEmail: [{ required: true, message: '请填写电子邮箱', trigger: 'blur' },
                                 { type: 'email', trigger: 'blur' }],
                 personalPhone: [{ required: true, message: '请填写手机号码', trigger: 'blur' },
                                 { validator: validateTelexphone, trigger: 'blur' }],
                 unitname: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
                 address: [{ validator: validateAddress, trigger: 'blur' }],
                 postCode: [{ required: true, message: '请输入邮政编码', trigger: 'blur' }],
                 unitphone: [{ required: true, message: '请输入单位电话', trigger: 'blur' }],
                 fax: [{ required: true, trigger: 'blur' }],
                 birthdayYear: [{ required: true, message: '请选择出生年份', trigger: 'blur' }],
                 birthdayMonth: [{ required: true, message: '请选择出生月份', trigger: 'blur' }],
                 birthdayDate: [{ required: true, message: '请选择出生日期', trigger: 'blur' }]
            },
            professionaloptions: ['正高级', '副高级', '中级', '助理级', '员级'],
            yearoptions: [],
            monthoptions: [],
            dateoption: []
        }
    },
    computed: {
      getbirthdayYear: function() {
        return this.judgeform.birthdayYear
      },
      getbirthdayMonth: function() {
        return this.judgeform.birthdayMonth
      }
    },
    watch: {
        getbirthdayYear: function(newval) {
          this.changemonth()
        },
        getbirthdayMonth: function(newval) {
          this.changedate()
        }
    },
    created() {
      this.changeyear()
      this.changemonth()
      this.changedate()
    },
    methods: {
      changeprovince: function(x) {
        this.recommendform.province = x
      },
      changecity: function(x) {
        this.recommendform.city = x
      },
      changedistrict: function(x) {
        this.recommendform.district = x
      },
      changedetaile: function(x) {
        this.recommendform.detaile = x
      },
      getcode: function(phonenum) {
        if (phonenum) {
            alert(phonenum)
        } else {
            console.log('false')
            return false
        }
      },
      changeyear: function() {
        this.yearoptions = []
        const yearlong = 130
        const data = new Date()
        const year = data.getFullYear()
        const beginyear = year - yearlong
        for (let i = beginyear; i <= year; i++) {
          this.yearoptions.unshift(i)
        }
      },
      changemonth: function() {
        this.monthoptions = []
        const data = new Date()
        const year = data.getFullYear()
        let lastmonth = 12
        console.log('ok')
        if (this.judgeform.birthdayYear === year) {
          lastmonth = data.getMonth() + 1
          console.log(lastmonth)
          console.log('why')
        }
        for (let i = 1; i <= lastmonth; i++) {
          this.monthoptions.push(i)
        }
      },
      changedate: function() {
        this.dateoption = []
        const data = new Date()
        const year = data.getFullYear()
        const month = data.getMonth() + 1
        const date = data.getDate()
        let lastdate = 31
        if (year === this.judgeform.birthdayYear && month === this.judgeform.birthdayMonth) {
          lastdate = date
        } else {
          const lastDate = new Date(this.judgeform.birthdayYear, this.judgeform.birthdayMonth, 0)
          lastdate = lastDate.getDate()
        }
        for (let i = 1; i <= lastdate; i++) {
          this.dateoption.push(i)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
}
</script>
