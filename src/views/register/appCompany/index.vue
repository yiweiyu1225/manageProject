<template>
  <!-- 表单区域 -->
  <div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="userName">
            <el-row>
              <el-col :span="6" class="must">用户名</el-col>
              <el-col :span="18"><el-input v-model="form.userName" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col>
              推荐使用组织机构代码为登陆账号，或统一社会信用代码的9-17位
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="blackenfont">
        <el-col class="el_two">单位基本信息</el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="unitName">
            <el-row>
              <el-col :span="6" class="must">单位名称</el-col>
              <el-col :span="18"><el-input v-model="form.unitName" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2" class="el_two">
          <el-form-item prop="legalPersonName">
            <el-row>
              <el-col :span="6" class="must">企业法人</el-col>
              <el-col :span="18"><el-input v-model="form.legalPersonName" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="legalPhone">
            <el-row>
              <el-col :span="6" class="must">法人手机</el-col>
              <el-col :span="18"><el-input v-model="form.legalPhone" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="legalEmail">
            <el-row>
              <el-col :span="6" class="must">法人邮箱</el-col>
              <el-col :span="18"><el-input v-model="form.legalEmail" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="legalQQ">
            <el-row>
              <el-col :span="6" class="must">法人QQ</el-col>
              <el-col :span="18"><el-input v-model="form.legalQQ" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="reiKind">
            <el-row>
              <el-col :span="6" class="must">注册类型</el-col>
              <el-col :span="18">
                <el-select v-model="form.reiKind" placeholder="--请选择--">
                  <el-option
                    v-for="(item,index) in unitKind"
                    :key="index"
                    :value="item"
                    :label="item"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="orgCode">
            <el-row>
              <el-col :span="11">
                <el-select v-model="form.orgCode">
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
        <el-col :span="8" class="el_two">
          <el-form-item prop="unitPhone">
            <el-row>
              <el-col :span="6" class="must">单位电话</el-col>
              <el-col :span="18"><el-input v-model="form.unitPhone" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="postcode">
            <el-row>
              <el-col :span="6" class="must">邮政编码</el-col>
              <el-col :span="18"><el-input v-model="form.postcode" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="unitfax">
            <el-row>
              <el-col :span="6">单位传真</el-col>
              <el-col :span="18"><el-input v-model="form.unitfax" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item class="el_three">
          <el-row>
            <el-col :span="2" class="must">单位地址</el-col>
            <el-col :span="19">
              <el-select v-model="form.address.province" placeholder="省">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.name"
                  :value="item.address_id"
                />
              </el-select> 省
              <el-select v-model="form.address.city" placeholder="市">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.name"
                  :value="item.address_id"
                />
              </el-select> 市
              <el-select v-model="form.address.district" placeholder="区">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.name"
                  :value="item.address_id"
                />
              </el-select>区
            </el-col>
          </el-row>
        </el-form-item>
      </el-row>

      <el-row class="el_three">
        <el-form-item prop="unitwebsite">
          <el-row>
            <el-col :span="2">单位网址</el-col>
            <el-col :span="22"><el-input v-model="form.unitwebsite" /></el-col>
          </el-row>
        </el-form-item>
      </el-row>

      <el-row class="blackenfont">
        <el-col class="el_two">单位详细信息</el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="unitCharacteristic">
            <el-row>
              <el-col :span="6">单位性质</el-col>
              <el-col :span="18">
                <el-select v-model="form.unitCharacteristic" placeholder="--请选择--">
                  <el-option
                    v-for="(item,index) in companyType"
                    :key="index"
                    :value="item"
                    :label="item"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="highNewTechnology">
            <el-row>
              <el-col :span="10" class="must">是否是高新技术企业</el-col>
              <el-col :span="11">
                <el-select v-model="form.highNewTechnology" placeholder="--请选择--">
                  <el-option :value="true" label="是" />
                  <el-option :value="false" label="否" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="registerTime">
            <el-row>
              <el-col :span="6" class="must">注册时间</el-col>
              <el-col :span="18"><el-input v-model="form.registerTime" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="5" class="el_two">
          <el-form-item prop="registeredCapitalMoney">
            <el-row>
              <el-col :span="8" class="must">注册资本</el-col>
              <el-col :span="14">
                <el-col :span="20">
                  <el-input v-model="form.registeredCapitalMoney" />
                </el-col>
                <el-col :span="2">万</el-col>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-row>
            <el-col>
              <el-select v-model="form.registeredCapitalUnit">
                <el-option
                  v-for="(item,index) in moneyUnit"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="allAsset">
            <el-row>
              <el-col :span="8">资产总额（万元）</el-col>
              <el-col :span="16"><el-input v-model="form.allAsset" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="tradeKind">
            <el-row>
              <el-col :span="6" class="must">所属行业</el-col>
              <el-col :span="18"><el-input v-model="form.tradeKind" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="stuffNum">
            <el-row>
              <el-col :span="6" class="must">职工总数</el-col>
              <el-col :span="18"><el-input v-model="form.stuffNum" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="midsManageNum">
            <el-row>
              <el-col :span="10">中层以上管理人员人数</el-col>
              <el-col :span="14"><el-input v-model="form.midsManageNum" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="researchNum">
            <el-row>
              <el-col :span="6" class="must">研发人员数</el-col>
              <el-col :span="18"><el-input v-model="form.researchNum" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="technicianNum">
            <el-row>
              <el-col :span="8" class="must">专业技术人员数</el-col>
              <el-col :span="16"><el-input v-model="form.technicianNum" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="degreeOrAboveNum">
            <el-row>
              <el-col :span="10">其中大学以上人员总数</el-col>
              <el-col :span="14"><el-input v-model="form.degreeOrAboveNum" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="juniorOrAboveNum">
            <el-row>
              <el-col :span="8">大专以上总人数</el-col>
              <el-col :span="16"><el-input v-model="form.juniorOrAboveNum" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="livePatentNum">
            <el-row>
              <el-col :span="6" class="must">有效专利数</el-col>
              <el-col :span="18"><el-input v-model="form.livePatentNum" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="patentsGrantedOfThisyear">
            <el-row>
              <el-col :span="9" class="must">本年度专利授权数</el-col>
              <el-col :span="15"><el-input v-model="form.patentsGrantedOfThisyear" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="applicationsOfThisYear">
            <el-row>
              <el-col :span="8" class="must">本年度申请数</el-col>
              <el-col :span="16"><el-input v-model="form.applicationsOfThisYear" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="mainBusiness">
            <el-row>
              <el-col :span="6" class="must">主营业务</el-col>
              <el-col :span="18"><el-input v-model="form.mainBusiness" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="主导产品（分项填写产品名称、年占销售收入及其技术来源）（300字以内）" class="el_three" label-position="top" prop="leadingProducts">
        <el-input
          type="textarea"
          :rows="3"
        />
      </el-form-item>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="authorizedPatents">
            <el-row>
              <el-col :span="10">近三年授权专利（项）</el-col>
              <el-col :span="14"><el-input v-model="form.authorizedPatents" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="softwareCopyright">
            <el-row>
              <el-col :span="12">近三年软件著作权（项）</el-col>
              <el-col :span="12"><el-input v-model="form.softwareCopyright" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="el_three">
        <span>上年度主要指标</span>
        <span class="red">(高校、科研院所（事业单位）不要求填写以下内容）</span>
      </div>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="salesRevenue">
            <el-row>
              <el-col :span="8" class="must">销售收入</el-col>
              <el-col :span="14"><el-input v-model="form.salesRevenue" /></el-col>
              <el-col :span="2">万元</el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="totalInvestment">
            <el-row>
              <el-col :span="8" class="must">研发总投入</el-col>
              <el-col :span="14"><el-input v-model="form.totalInvestment" /></el-col>
              <el-col :span="2">万元</el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10" class="el_three">
          <el-form-item prop="fundsToSalesProportion">
            <el-row>
              <el-col :span="8" class="must">研发经费占销售经费比例</el-col>
              <el-col :span="14"><el-input v-model="form.fundsToSalesProportion" /></el-col>
              <el-col :span="2">%</el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="el_three">
        <span>本年度主要指标</span>
        <span class="red">(高校、科研院所（事业单位）不要求填写以下内容）</span>
      </div>

      <el-row>
        <el-col :span="10" class="el_three">
          <el-form-item prop="estimatedSalesRevenue">
            <el-row>
              <el-col :span="6" class="must">预计销售收入</el-col>
              <el-col :span="16"><el-input v-model="form.estimatedSalesRevenue" /></el-col>
              <el-col :span="2">万元</el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10" class="el_three">
          <el-form-item prop="fundsToSalesProportionOfThisYear">
            <el-row>
              <el-col :span="11" class="must">本年度研发投入占销售收入比例</el-col>
              <el-col :span="11"><el-input v-model="form.fundsToSalesProportionOfThisYear" /></el-col>
              <el-col :span="2">%</el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="el_three" :span="18">
          <el-form-item label="研发项目（分项填写项目名称、本年度研发经费）" label-position="top">
            <el-input
              v-model="form.researchProject"
              type="textarea"
              :rows="3"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el_two blackenfont">
        联系人信息
      </el-row>
      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="companyContacts">
            <el-row>
              <el-col :span="6" class="must">单位联系人</el-col>
              <el-col :span="18"><el-input v-model="form.companyContacts" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="contactsPhone">
            <el-row>
              <el-col :span="8" class="must">联系人电话号码</el-col>
              <el-col :span="16"><el-input v-model="form.contactsPhone" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- contactsMobilePhone -->
      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="contactsMobilePhone">
            <el-row>
              <el-col :span="6" class="must">联系人手机</el-col>
              <el-col :span="18"><el-input v-model="form.contactsMobilePhone" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-row class="tipfont">
            <el-col :span="5">
              <el-button class="identifyButton" @click="getcode(form.contactsMobilePhone)">获取验证消息</el-button>
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
              <el-col :span="18"><el-input v-model="form.verificationCode" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="contactsEmail">
            <el-row>
              <el-col :span="6" class="must">联系人邮箱</el-col>
              <el-col :span="18"><el-input v-model="form.contactsEmail" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="scienceChargePeople">
            <el-row>
              <el-col :span="8" class="must">科技管理负责人</el-col>
              <el-col :span="16"><el-input v-model="form.scienceChargePeople" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="chargePeoplePhone">
            <el-row>
              <el-col :span="6" class="must">负责人手机</el-col>
              <el-col :span="18"><el-input v-model="form.chargePeoplePhone" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" class="el_three">
          <el-form-item prop="chargePeopleEmail">
            <el-row>
              <el-col :span="6" class="must">负责人邮箱</el-col>
              <el-col :span="18"><el-input v-model="form.chargePeopleEmail" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el_two">
          <el-form-item prop="chargePeopleQQ">
            <el-row>
              <el-col :span="6" class="must">负责人QQ</el-col>
              <el-col :span="18"><el-input v-model="form.chargePeopleQQ" /></el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item type="flex" justify="center">
        <el-row type="flex" justify="center">
          <button class="reiButton" @click="submitForm('form')">注册</button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if (!reg.test(value)) {
          return callback(new Error('邮箱格式不正确！'))
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
    var validateEmailCode = (rule, value, callback) => {
      var myreg = /^[0-9]{6}$/
      if (!myreg.test(value)) {
          return callback(new Error('邮政编码格式不正确！'))
      } else {
          callback()
      }
    }
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
    var validatekind = (rule, value, callback) => {
      function numbertest() {
        var myreg = /^-?\d+.?\d*$/
        if (!myreg.test(value)) {
            return callback(new Error('必须输入数字类型！'))
        } else {
            callback()
        }
      }
      if (value) {
        numbertest()
      } else {
       if (this.form.reiKind === '高校' || this.form.reiKind === '事业单位' || this.form.reiKind === '科研院所') {
         callback()
        } else {
          return callback(new Error('请输入相关信息！'))
        }
      }
    }
    return {
      tag: 'app',
      province: '',
      city: '',
      district: '',
      provinceName: '',
      cityName: '',
      districtName: '',
      options: [],
      places: [],
      place_city: [],
      place_district: [],
      moneyUnit: ['人民币', '美元', '日元', '韩元'],
      unitKind: ['高校',
                  '有限企业',
                  '股份企业',
                  '科研院所'
      ],
      companyType: [
        '企业',
        '事业单位',
        '国家行政机关',
        '政府',
        '高校'
      ],
      form: {
        userName: '',
        unitName: '',
        legalPersonName: '',
        legalPhone: '',
        legalEmail: '',
        legalQQ: '',
        reiKind: '',
        orgCode: '组织机构代码',
        unitPhone: '',
        postcode: '',
        unitfax: '',
        address: {
          province: '',
          city: '',
          district: ''
        },
        unitwebsite: '',
        unitCharacteristic: '',
        highNewTechnology: '',
        registerTime: '',
        registeredCapitalMoney: '',
        registeredCapitalUnit: '人民币',
        allAsset: '',
        tradeKind: '',
        stuffNum: '',
        midsManageNum: '',
        researchNum: '',
        technicianNum: '',
        degreeOrAboveNum: '',
        juniorOrAboveNum: '',
        livePatentNum: '',
        patentsGrantedOfThisyear: '',
        applicationsOfThisYear: '',
        mainBusiness: '',
        leadingProducts: '',
        authorizedPatents: '',
        softwareCopyright: '',
        salesRevenue: '',
        totalInvestment: '',
        fundsToSalesProportion: '',
        estimatedSalesRevenue: '',
        fundsToSalesProportionOfThisYear: '',
        researchProject: '',
        // 单位联系人
        companyContacts: '',
        contactsPhone: '',
        contactsMobilePhone: '',
        verificationCode: '',
        contactsEmail: '',
        scienceChargePeople: '',
        chargePeoplePhone: '',
        chargePeopleEmail: '',
        chargePeopleQQ: ''
      },
       rules: {
         userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
         unitName: { required: true, message: '请输入单位名称', trigger: 'blur' },
         legalPersonName: { required: true, message: '请输入企业法人', trigger: 'blur' },
         legalPhone: [{ required: true, message: '请输入法人手机', trigger: 'blur' },
                      { validator: validateTelexphone, trigger: 'blur' }],
         legalEmail: [{ required: true, message: '请输入法人邮箱', trigger: 'blur' },
                  { validator: validateEmail, message: '法人邮箱格式不对', trigger: 'blur' }],
         legalQQ: [{ required: true, message: '请输入法人QQ', trigger: 'blur' },
                   { validator: validatenumber, message: 'QQ号必须为数字', trigger: 'blur' }],
         reiKind: { required: true, message: '请选择注册类型', trigger: 'blur' },
         orgCode: { required: true, message: '请选择组织机构代码', trigger: 'blur' },
         unitPhone: [{ required: true, message: '请输入单位电话', trigger: 'blur' },
                  { validator: validatenumber, message: '单位号码必须为数字', trigger: 'blur' }],
         postcode: [{ required: true, message: '请输入邮政编码', trigger: 'blur' },
                    { validator: validateEmailCode, trigger: 'blur' }
                  ],
        //  unitfax: { required: true, message: '请输入单位传真', trigger: 'blur' },
        //  unitwebsite: { required: true, message: '请输入单位网址', trigger: 'blur' },
        //  unitCharacteristic: { required: true, message: '请选择单位性质', trigger: 'blur' },
         highNewTechnology: { required: true, message: '请选择是否是高薪技术', trigger: 'blur' },
         registerTime: { required: true, message: '请输入注册时间', trigger: 'blur' },
         registeredCapitalMoney: [{ required: true, message: '请输入注册资本', trigger: 'blur' },
                      { validator: validatenumber, trigger: 'blur' }],
         allAsset: [{ validator: validatenumber, trigger: 'blur' }],
         tradeKind: { required: true, message: '请输入所属行业', trigger: 'blur' },
         stuffNum: [{ required: true, message: '请输入职工总数', trigger: 'blur' },
                  { validator: validatenumber, message: '职工总数必须为数字', trigger: 'blur' }],
         midsManageNum: [{ validator: validatenumber, message: '中层以上管理层必须为输数字', trigger: 'blur' }],
         researchNum: [{ required: true, message: '请输入研发人员数', trigger: 'blur' },
                  { validator: validatenumber, message: '研发人员数必须为数字', trigger: 'blur' }],
         technicianNum: [{ required: true, message: '请输入研发人员数', trigger: 'blur' },
                        { validator: validatenumber, message: '研发人员数必须为数字', trigger: 'blur' }],
         degreeOrAboveNum: { validator: validatenumber, message: '请输数字', trigger: 'blur' },
         juniorOrAboveNum: { validator: validatenumber, message: '请输数字', trigger: 'blur' },
         livePatentNum: [{ required: true, message: '请输入有效专利数', trigger: 'blur' },
                        { validator: validatenumber, message: '有效专利数必须为数字', trigger: 'blur' }],
         patentsGrantedOfThisyear: [{ required: true, message: '请输入本年度专利授权数', trigger: 'blur' },
                        { validator: validatenumber, message: '本年度专利授权数必须为数字', trigger: 'blur' }],
         applicationsOfThisYear: [{ required: true, message: '请输入本年度申请数', trigger: 'blur' },
                        { validator: validatenumber, message: '本年度申请数为数字', trigger: 'blur' }],
         mainBusiness: { required: true, message: '请输入主营业务', trigger: 'blur' },
         authorizedPatents: [{ validator: validatenumber, message: '近三年专利数必须为数字', trigger: 'blur' }],
         softwareCopyright: [{ validator: validatenumber, message: '近三年软件著作权（项）填写项必须为数字', trigger: 'blur' }],
        // 刚刚
         leadingProducts: { required: true, message: '请输入主导产品', trigger: 'blur' },
         salesRevenue: [
                    { validator: validatekind, trigger: 'blur' }],
         totalInvestment: [
                    { validator: validatekind, trigger: 'blur' }],
         fundsToSalesProportion: [
                  { validator: validatekind, trigger: 'blur' }],
         estimatedSalesRevenue: [
                  { validator: validatekind, trigger: 'blur' }],
         fundsToSalesProportionOfThisYear: [
                    { validator: validatekind, trigger: 'blur' }],
        //  单位联系人
         companyContacts: { required: true, message: '请输入单位联系人', trigger: 'blur' },
         contactsPhone: [{ required: true, message: '请输入联系人电话', trigger: 'blur' },
                        { validator: validatenumber, trigger: 'blur' }],
         contactsMobilePhone: [{ required: true, message: '请输入联系人手机', trigger: 'blur' },
          { validator: validateTelexphone, trigger: 'blur' }
         ],
        //  验证码
         verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
         contactsEmail: [{ required: true, message: '请输入联系人邮箱', trigger: 'blur' },
                      { validator: validateEmail, trigger: 'blur' }],
         scienceChargePeople: [{ required: true, message: '请输入科技负责人', trigger: 'blur' }],
         chargePeoplePhone: [{ required: true, message: '请输入负责人电话', trigger: 'blur' },
                            { validator: validateTelexphone, trigger: 'blur' }],
         chargePeopleEmail: [{ required: true, message: '请输入负责人E-mail', trigger: 'blur' },
                     { validator: validateEmail, trigger: 'blur' }],
         chargePeopleQQ: [{ required: true, message: '请输入负责人QQ', trigger: 'blur' },
                            { validator: validatenumber, trigger: 'blur' }]
       }
    }
  },
  computed: {
    orgnum: function() {
      if (this.form.orgCode === '组织机构代码') {
        return '66881786-2'
      }
      return ''
    }
  },
  watch: {
    form: {
      address: {
        province(newval, oldval) {
          this.form.address.city = ''
          for (var i = 0; i < this.places.length; i++) {
            if (this.places[i].address_id === newval) {
              if (this.places[i].children == null) {
                  this.place_city = []
                  this.place_district = []
              } else {
                this.place_city = this.places[i].children
              }
              this.form.address.province = this.places[i].name
            }
          }
        },
        city(newval, oldval) {
          this.form.address.district = ''
          for (var i = 0; i < this.place_city.length; i++) {
            if (this.place_city[i].address_id === newval) {
              if (this.place_city[i].children == null) {
                this.place_district = []
              } else {
                this.place_district = this.place_city[i].children
              }
              this.form.address.city = this.place_city[i].name
            }
          }
        },
        district(newval, oldval) {
          for (var i = 0; i < this.place_district.length; i++) {
            if (this.place_district[i].address_id === newval) {
              this.form.address.distric = this.place_district[i].name
            }
          }
        }
      }
    }
  },
  methods: {
    tagto: function(index) {
      this.tag = index
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
    },
    getcode: function(phonenum) {
      if (phonenum) {
        alert(phonenum)
      } else {
        console.log('false')
        return false
      }
    }
  }
}
</script>

<style scoped>
.red{
  color: red;
}
</style>

