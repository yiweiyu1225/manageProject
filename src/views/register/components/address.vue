<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-select v-model="province" placeholder="省">
          <el-option
            v-for="(item,index) in places"
            :key="index"
            :label="item.name"
            :value="item.address_id"
          />
        </el-select>
      </el-col>
      <el-col :span="1"> 省</el-col>
      <el-col :span="4">
        <el-select v-model="city" placeholder="市">
          <el-option
            v-for="(item,index) in place_city"
            :key="index"
            :label="item.name"
            :value="item.address_id"
          />
        </el-select>
      </el-col>
      <el-col :span="1">市</el-col>
      <el-col :span="4">
        <el-select v-model="district" placeholder="区">
          <el-option
            v-for="(item,index) in place_district"
            :key="index"
            :label="item.name"
            :value="item.address_id"
          />
        </el-select>
      </el-col>
      <el-col :span="1">区</el-col>
      <el-col :span="6">
        <el-input v-model="detaile" />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { address } from '@/api/address'
export default {
    prop: {
      fprovince: {
        default: '湖南省'
      },
      fcity: {
        default: '长沙市'
      },
      fdistrict: {
        default: ''
      },
      fdetaile: {
        default: ''
      }
    },
    data() {
        return {
          province: this.fprovince,
          city: this.fcity,
          district: this.fdistrict,
          detaile: this.fdetaile,
          places: [],
          place_city: [],
          place_district: []
        }
    },
    watch: {
      province: function(newval, oldval) {
        for (var i = 0; i < this.places.length; i++) {
          if (this.places[i].address_id === newval) {
            if (this.places[i].children == null) { // 如果这个省没有城市
                this.place_city = []
                this.place_district = []
                this.city = ''
                this.district = ''
            } else { // 如果这个省有城市，就取第一城市和第一个地区
              this.place_city = this.places[i].children
              this.city = this.place_city[0].address_id // 取第一个城市
              if (this.place_city[0].children) {
                this.place_district = this.place_city[0].children
                if (this.place_district[0]) {
                  this.district = this.place_district[0].address_id
                }
              } else {
                this.place_district = []
                this.district = ''
              }
            }
            this.province = this.places[i].name
            this.$emit('changeprovince', this.province)
            break
          }
        }
      },
      city: function(newval, oldval) {
        if (newval) {
         for (var i = 0; i < this.place_city.length; i++) {
            if (this.place_city[i].address_id === newval) {
              if (this.place_city[i].children == null) {
                this.place_district = []
                this.distric = ''
              } else {
                this.place_district = this.place_city[i].children
                this.distric = this.place_district[0].address_id
              }
              this.city = this.place_city[i].name
            }
          }
        } else {
          this.city = ''
          this.place_district = []
          this.distric = ''
        }
        this.$emit('changecity', this.city)
      },
      district: function(newval, oldval) {
        if (newval) {
          for (var i = 0; i < this.place_district.length; i++) {
            if (this.place_district[i].address_id === newval) {
              this.distric = this.place_district[i].name
            }
          }
        } else {
          this.district = ''
        }
        this.$emit('changedistrict', this.district)
      },
      detaile: function(oldval) {
        this.$emit('changedetaile', this.detaile)
      }
    },
    methods: {
      getPlaces: function() {
        address().then(res => {
          console.log(res)
          this.places = res
        })
      }
    }
}
</script>
