<template>
  <div>
    <el-form ref="userform" :model="userform" :rules="userrules">
      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="userName">
            <el-row>
              <el-col :span="6" class="must">用户名</el-col>
              <el-col :span="18"><el-input v-model="userform.userName" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col>
              推荐使用身份证或护照证件号为用户名
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="el_two blackenfont">
        个人基本信息
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="name">
            <el-row>
              <el-col :span="6" class="must">姓名</el-col>
              <el-col :span="18"><el-input v-model="userform.name" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="sex">
            <el-row>
              <el-col :span="6" class="must">性别</el-col>
              <el-col :span="18"><el-input v-model="userform.sex" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-row>
            <el-col :span="11">
              <el-select v-model="userform.idkind">
                <el-option label="身份证" value="身份证" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-col>
            <el-form-item prop="idnum">
              <el-col :span="10" class="el_two">
                <el-input v-model="userform.idnum" />
              </el-col>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="name">
            <el-row>
              <el-col :span="8" class="must">身份证正面照</el-col>
              <el-col :span="16">
                <upload v-model="userform.idfront" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="sex">
            <el-row>
              <el-col :span="8" class="must">身份证反面照</el-col>
              <el-col v-model="userform.idback" :span="16">
                <upload />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <!-- 联选(还没用) -->
        <el-col :span="8" class="el_three">
          <el-form-item prop="professionalTitle ">
            <el-row>
              <el-col :span="6" class="must">职称</el-col>
              <el-col :span="18"><el-input v-model="userform.professionalTitle" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="degree">
            <el-row>
              <el-col :span="6" class="must">学位</el-col>
              <el-col :span="18">
                <el-select v-model="userform.degree" placeholder="--请选择--">
                  <el-option v-for="(item,index) in degreeList" :key="index" :value="item" :label="item" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="diploma">
            <el-row>
              <el-col :span="6" class="must">学历</el-col>
              <el-col :span="18">
                <el-select v-model="userform.diploma" placeholder="--请选择--">
                  <el-option v-for="(item,index) in diplomaList" :key="index" :value="item" :label="item" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="finishSchool">
            <el-row>
              <el-col :span="6" class="must">毕业院校</el-col>
              <el-col :span="18"><el-input v-model="userform.finishSchool" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="phone">
            <el-row>
              <el-col :span="6" class="must">手机</el-col>
              <el-col :span="18"><el-input v-model="userform.phone" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col :span="5">
              <el-button class="identifyButton" @click="getcode(userform.contactsMobilePhone)">获取验证消息</el-button>
            </el-col>
            <el-col :span="10">
              登录时接收手机验证码
            </el-col>
          </el-row>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="verificationCode">
            <el-row>
              <el-col :span="6" class="must">手机验证码</el-col>
              <el-col :span="18"><el-input v-model="userform.verificationCode" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="email">
            <el-row>
              <el-col :span="6" class="must">邮箱</el-col>
              <el-col :span="18"><el-input v-model="userform.email" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item prop="address">
          <el-col :span="3" class="el_three must">常用居住地址 </el-col>
          <el-col :span="16" class="el-two">
            <place
              :fprovince="userform.province"
              :fcity="userform.city"
              :fdistrict="userform.district"
              :fdetaile="userform.detaileAddress"
            />
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="postcode">
            <el-row>
              <el-col :span="6" class="must">邮政编码</el-col>
              <el-col :span="18"><el-input v-model="userform.postcode" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class="el_three">
          <el-form-item>
            <el-row>
              <el-col :span="4">个人网址</el-col>
              <el-col :span="18"><el-input v-model="userform.website" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="el_two blackenfont">
        个人详细信息
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="patemtNumber">
            <el-row>
              <el-col :span="10" class="must">所获有效专利数</el-col>
              <el-col :span="14"><el-input v-model="userform.patemtNumber" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="authorizePatent">
            <el-row>
              <el-col :span="10" class="must">本年度专利授权数</el-col>
              <el-col :span="14"><el-input v-model="userform.authorizePatent" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="applyPatent">
            <el-row>
              <el-col :span="10" class="must">本年度专业申请数</el-col>
              <el-col :span="14"><el-input v-model="userform.applyPatent" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="主导产品（分项填写产品名称、年占销售收入及其技术来源）（300字以内）" class="el_three" label-position="top" prop="leadingProducts">
        <el-input
          v-model="userform.leadingProducts"
          type="textarea"
          :rows="3"
        />
      </el-form-item>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="threeYearPatent">
            <el-row>
              <el-col :span="11">近三年授权专利（项）</el-col>
              <el-col :span="13"><el-input v-model="userform.threeYearPatent" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="threeYearsoftware">
            <el-row>
              <el-col :span="11">近三年软件著作权（项）</el-col>
              <el-col :span="13"><el-input v-model="userform.threeYearsoftware" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="研发项目（分项填写项目名称、本年度研发经费）" class="el_three" label-position="top" prop="RandDSubject">
        <el-input
          v-model="userform.leadingProducts"
          type="textarea"
          :rows="3"
        />
      </el-form-item>

      <el-form-item type="flex" justify="center">
        <el-row type="flex" justify="center">
          <button class="reiButton" @click="submitForm('userform')">注册</button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import upload from '@/views/register/components/upload'
import place from '@/views/register/components/address'
// import func from 'vue-temp/vue-editor-bridge'
export default {
    components: {
        upload,
        place
    },
    data() {
        var validatenumber = (rule, value, callback) => {
            var myreg = /^-?\d+.?\d*$/
            if (value) {
                if (!myreg.test(value)) {
                    return callback(new Error('必须输入数字类型！'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }
        var validateAddress = (rule, value, callback) => {
            if (!this.userform.province || this.userform.city) {
              return callback(new Error('请输入地点'))
            } else {
              callback()
            }
        }
        return {
            professionalList: [],
            degreeList: ['博士学位', '硕士学位', '学士学位', '副学士学位', '暂无'],
            diplomaList: ['小学', '初中', '高中', '中等职业学校', '本科', ' 硕士', '博士', '博士后'],
            userform: {
                userName: '',
                name: '',
                sex: '',
                idkind: '身份证',
                idnum: '',
                IDfront: '',
                IDback: '',
                professionalTitle: '',
                degree: '',
                diploma: '',
                finishSchool: '',
                phone: '',
                verificationCode: '',
                email: '',
                province: '',
                city: '',
                district: '',
                detaileAddress: '',
                postcode: '',
                website: '',
                patemtNumber: '',
                authorizePatent: '',
                applyPatent: '',
                leadingProducts: '',
                threeYearPatent: '',
                threeYearsoftware: '',
                RandDSubject: ''
            },
            userrules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
                idnum: [{ required: true, message: '请输入证件号', trigger: 'blur' },
                        { max: 18, min: 18, message: '证件号错误', trigger: 'blur' },
                        { validator: validatenumber, trigger: 'blur' }],
                idfront: [{ required: true, message: '请上传身份证正面照', trigger: 'blur' }],
                idback: [{ required: true, message: '请输入身份证反面照', trigger: 'blur' }],
                professionalTitle: [{ required: true, message: '请选择职称', trigger: 'blur' }],
                degree: [{ required: true, message: '请选择学位', trigger: 'blur' }],
                diploma: [{ required: true, message: '请选择学历', trigger: 'blur' }],
                finishSchool: [{ required: true, message: '请输入毕业院校', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                verificationCode: [{ required: true, message: '请选输入验证码', trigger: 'blur' }],
                email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
                address: [{ validator: validateAddress, trigger: 'blur' }],
                postcode: [{ validator: validatenumber, trigger: 'blur' },
                           { max: 6, min: 6, message: '证件号错误', trigger: 'blur' },
                           { required: true, message: '请输入所获有效专利数', trigger: 'blur' }],
                patemtNumber: [{ validator: validatenumber, trigger: 'blur' },
                               { required: true, message: '请输入所获有效专利数', trigger: 'blur' }],
                authorizePatent: [{ validator: validatenumber, trigger: 'blur' },
                               { required: true, message: '本年度专利授权数', trigger: 'blur' }],
                applyPatent: [{ validator: validatenumber, trigger: 'blur' },
                               { required: true, message: '本年度专利申请数', trigger: 'blur' }],
                leadingProducts: [{ required: true, message: '请输入主导产品', trigger: 'blur' }],
                threeYearPatent: [{ validator: validatenumber, trigger: 'blur' }],
                threeYearsoftware: [{ validator: validatenumber, trigger: 'blur' }]
            }
        }
    },
    methods: {
      changeprovince: function(x) {
        this.userform.province = x
      },
      changecity: function(x) {
        this.userform.city = x
      },
      changedistrict: function(x) {
        this.userform.district = x
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

