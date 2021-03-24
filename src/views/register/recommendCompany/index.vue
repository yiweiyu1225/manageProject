<template>
  <div>
    <el-form ref="recommendform" :model="recommendform" :rules="recommendrule">
      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="userName">
            <el-row>
              <el-col :span="6" class="must">用户名</el-col>
              <el-col :span="18"><el-input v-model="recommendform.userName" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="blackenfont">
        <el-col class="el_two">单位信息</el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="unitName">
            <el-row>
              <el-col :span="6" class="must">单位名称</el-col>
              <el-col :span="18"><el-input v-model="recommendform.unitName" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="orgCode">
            <el-row>
              <el-col :span="11">
                <el-select v-model="recommendform.orgCode">
                  <el-option label="组织机构代码" value="组织机构代码" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-col>
              <el-col :span="10" class="el_two">
                <el-input v-model="orgnum" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col>
              组织机构代码证或统一信用代码证上的标识代码
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item prop="address">
          <el-col :span="3" class="el_three must">常用居住地址 </el-col>
          <el-col :span="16" class="el-two">
            <place
              :fprovince="recommendform.province"
              :fcity="recommendform.city"
              :fdistrict="recommendform.district"
              :fdetaile="recommendform.detaileAddress"
            />
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="unitphone">
            <el-row>
              <el-col :span="6" class="must">单位电话</el-col>
              <el-col :span="18"><el-input v-model="recommendform.unitphone" /></el-col>
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
              <el-col :span="18"><el-input v-model="recommendform.fax" /></el-col>
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

      <el-row class="blackenfont">
        <el-col class="el_two">联系人信息</el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="contactname">
            <el-row>
              <el-col :span="6" class="must">单位联系人</el-col>
              <el-col :span="18"><el-input v-model="recommendform.contactname" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col>
              单位联系人的姓名
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="contactEmail">
            <el-row>
              <el-col :span="6" class="must">联系人邮箱</el-col>
              <el-col :span="18"><el-input v-model="recommendform.contactEmail" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col>
              单位联系人的邮箱地址
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="contactphone">
            <el-row>
              <el-col :span="6" class="must">联系人电话</el-col>
              <el-col :span="18"><el-input v-model="recommendform.contactphone" /></el-col>
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
        <el-col :span="6" class="el_three">
          <el-form-item prop="contactMobilePhone">
            <el-row>
              <el-col :span="6" class="must">手机</el-col>
              <el-col :span="18"><el-input v-model="recommendform.contactMobilePhone" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-row class="tipfont">
            <el-col :span="4">
              <el-button class="identifyButton" @click="getcode(recommendform.contactMobilePhone)">获取验证消息</el-button>
            </el-col>
            <el-col :span="13">
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
              <el-col :span="18"><el-input v-model="recommendform.verificationCode" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item type="flex" justify="center">
        <el-row type="flex" justify="center">
          <button class="reiButton" @click="submitForm('recommendform')">注册</button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import place from '../components/address'
export default {
    components: {
        place
    },
    data() {
        var validateAddress = (rule, value, callback) => {
            if (!this.recommendform.province || this.recommendform.city) {
                return callback(new Error('请输入地点'))
            } else {
                callback()
            }
        }
        var validateTelexphone = (rule, value, callback) => {
            var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            if (!myreg.test(value)) {
                return callback(new Error('手机格式不正确！'))
            } else {
                callback()
            }
        }
        return {
            recommendform: {
                userName: '',
                unitName: '区级推荐单位名称',
                orgCode: '组织机构代码',
                orgnum: '',
                province: '',
                city: '',
                district: '',
                detaileAddress: '',
                unitphone: '',
                fax: '',
                contactname: '',
                contactEmail: '',
                contactphone: '',
                contactMobilePhone: '',
                verificationCode: ''
            },
            recommendrule: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                unitName: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
                address: [{ validator: validateAddress, trigger: 'blur' }],
                unitphone: [{ required: true, message: '请输入单位电话', trigger: 'blur' }],
                contactname: [{ required: true, message: '请输入单位联系人姓名', trigger: 'blur' }],
                contactEmail: [{ required: true, message: '请输入单位联系人的邮箱地址', trigger: 'blur' },
                                { type: 'email', message: '邮箱格式不对', trigger: 'blur' }],
                contactphone: [{ required: true, message: '请输入单位联系人电话', trigger: 'blur' }],
                contactMobilePhone: [{ required: true, message: '请输入单位联系人的手机', trigger: 'blur' },
                                     { validator: validateTelexphone, trigger: 'blur' }],
                verificationCode: [{ required: true, message: '请输入手机验证码', trigger: 'blur' }]
            }
        }
    },
    computed: {
        orgnum: function() {
            if (this.recommendform.orgCode === '组织机构代码') {
                return '66881786-2'
            }
            return ''
        }
    },
    watch: {
        orgnum: function(val) {
            this.recommendform.orgnum = val
        }
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
      submitForm: function(formname) {
        this.$refs[formname].validate((valid) => {
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
userform

