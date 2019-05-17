<template>
  <el-form ref="form" class="SearchForm" :model="FORM" label-width="80px" width="225" :rules="RULES" label-position="top" size="small">
    <el-form-item label="【办学性质】">
      <el-checkbox-group v-model="FORM.办学性质">
        <el-checkbox-button label="公办学校" name="办学性质">公办</el-checkbox-button>
        <el-checkbox-button label="民办学校" name="办学性质">民办</el-checkbox-button>
        <el-checkbox-button label="独立学院" name="办学性质">独立</el-checkbox-button>
        <el-checkbox-button label="公办收费" name="办学性质">公收</el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="【本专科】" prop="本专科" >
      <!-- <el-switch v-model="FORM.本专科"
        active-color="#13ce66"
        active-text="本科"
        active-value="本科"
        inactive-color="#ff4949"
        inactive-text="高职(专科)"
        inactive-value="高职(专科)">
      </el-switch> -->
      <el-radio-group v-model="FORM.本专科" class="bzk-group">
        <el-radio-button border label="本科" name="本专科"></el-radio-button>
        <el-radio-button border label="高职(专科)" name="本专科"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="选考科目" prop="选考科目">
      <template slot="label">
          <label style="vertical-align: middle;">【选考科目】</label><el-switch v-model="FORM.科目匹配" 
            inactive-text="或" 
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="且"></el-switch>
      </template>
      <el-checkbox-group v-model="FORM.选考科目">
        <el-checkbox-button label="物理" name="选考科目"></el-checkbox-button>
        <el-checkbox-button label="化学" name="选考科目"></el-checkbox-button>
        <el-checkbox-button label="生物" name="选考科目"></el-checkbox-button>
        <el-checkbox-button label="不限" name="选考科目"></el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="【学制筛选】" prop="学制">
      <el-checkbox-group v-model="FORM.学制">
        <el-checkbox-button label="2年" name="学制"></el-checkbox-button>
        <el-checkbox-button label="3年" name="学制"></el-checkbox-button>
        <el-checkbox-button label="4年" name="学制"></el-checkbox-button>
        <el-checkbox-button label="5年" name="学制"></el-checkbox-button>
      </el-checkbox-group>
      <el-checkbox-group v-model="FORM.学制" style="margin-top:4px;">
        <el-checkbox-button label="6年" name="学制"></el-checkbox-button>
        <el-checkbox-button label="7年" name="学制"></el-checkbox-button>
        <el-checkbox-button label="8年" name="学制"></el-checkbox-button>
        <el-checkbox-button label="9年" name="学制"></el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>
    <!-- <hr> -->
    <el-form-item>
      <template slot="label">
          <el-switch v-model="ACTIVE.省" active-text="【省份筛选】"></el-switch>
      </template>
      <el-select v-model="FORM.省" multiple filterable placeholder="选择省份" :disabled="!ACTIVE.省" v-show="ACTIVE.省">
        <el-option
          v-for="item in 省份备选"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <template slot="label">
          <el-switch v-model="ACTIVE.城市" active-text="【城市筛选】"></el-switch>
      </template>
      <el-select v-model="FORM.城市" multiple filterable placeholder="选择城市" :disabled="!ACTIVE.城市" v-show="ACTIVE.城市">
        <el-option
          v-for="item in 城市备选"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <hr> -->
    <el-divider content-position="center">vip</el-divider>
    
    <el-form-item label="【学科筛选】">
      <template slot="label">
          <el-switch v-model="ACTIVE.学科筛选" active-text="【学科筛选】"></el-switch>
      </template>
      <el-select v-model="FORM.学科筛选" multiple filterable placeholder="选择学科" :disabled="!ACTIVE.学科筛选" v-show="ACTIVE.学科筛选">
        <el-option
          v-for="item in 学科备选"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="【院校名称】">
      <template slot="label">
          <el-switch v-model="ACTIVE.院校名称" active-text="【院校名称】"></el-switch>
      </template>
      <el-select v-model="FORM.院校名称" multiple filterable allow-create placeholder="输入名称" :disabled="!ACTIVE.院校名称" v-show="ACTIVE.院校名称"></el-select>
    </el-form-item>
    <el-form-item label="【专业名称】">
      <template slot="label">
          <el-switch v-model="ACTIVE.专业名称" active-text="【专业名称】"></el-switch>
      </template>
      <el-select v-model="FORM.专业名称" multiple filterable allow-create placeholder="输入名称" :disabled="!ACTIVE.专业名称" v-show="ACTIVE.专业名称"></el-select>
    </el-form-item>
    <el-form-item label="【位次筛选】" prop="参考名次">
      <template slot="label">
          <el-switch v-model="ACTIVE.参考名次" active-text="【位次筛选】"></el-switch>
      </template>
      <div v-show="ACTIVE.参考名次">
      <el-input-number v-model="FORM.参考名次[0]" controls-position="right" :min="0" :step="200" :max="500000" :disabled="!ACTIVE.参考名次" ></el-input-number>
      <el-divider direction="vertical"></el-divider>
      <el-input-number v-model="FORM.参考名次[1]" controls-position="right" :min="1" :step="200" :max="500000" :disabled="!ACTIVE.参考名次"></el-input-number>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="width:100%;">查询</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
import API from '../API'
export default {
  name: 'SearchForm',
  data(){
    
    return {
      READY:false,
      ACTIVE:{
        参考名次:false,
        学科筛选:false,
        专业名称:false,
        院校名称:false,
        城市:false,
        省:false
      },
      学科备选:["等待查询"],
      城市备选:["等待查询"],
      省份备选:["等待查询"],
      FORM:{
        办学性质:[],
        选考科目:[],
        参考名次:[0,5000],
        学科筛选:[],
        专业名称:[],
        院校名称:[],
        本专科:'本科',
        科目匹配:false,
        学制:[],
        城市:[],
        省:[]
      },
      RULES: {
        参考名次:[{
           validator:this.VALID, trigger: 'change'
        }],
        选考科目:[{
          validator:this.VALID, trigger: 'change'
        }]
        // 本专科:[{
        //   required: true, message: '必选一个', trigger: 'blur'
        // }]
      }
    }
  },
  mounted(){
    console.log('created',this.$route.query.query)
    if(this.$route.query.query){
        let query=Base64.decode(this.$route.query.query)
        console.log('query',query)
        let json=JSON.parse(query)
        console.table('JSON',json)
        for (const key in json) {
          if (json[key].length) {
            this.FORM[key]=json[key]
            if(this.ACTIVE[key]===false)
            this.ACTIVE[key]=true
          }
        }
        if(this.$store.state.Login===true)
        this.onSubmit()
        
    }
    if(this.$store.state.Login===true&&this.READY==false)
    this.START()
  },
  watch:{
    "ACTIVE.省":function (value,old){
      if(value==true){
        if(this.ACTIVE.城市==true) this.ACTIVE.城市=false
      }
    },
    "ACTIVE.城市":function (value,old){
      if(value==true){
        if(this.ACTIVE.省==true) this.ACTIVE.省=false
      }
    },
    '$store.state.Login':function (value,old){
        console.log('【FORM】【LOGIN】',value,this.READY)
        if(value==true&&this.READY==false){
          this.START()
        }
        
    }
  },
  methods:{
    START(){
      console.log('【FORM】【START】')
      API.GET('/api/words/course').then(res=>{
        if(res.status==200){
          this.学科备选=res.items
        }
      })
      API.GET('/api/words/city').then(res=>{
        if(res.status==200){
          this.城市备选=res.items
        }
      })
      API.GET('/api/words/province').then(res=>{
        if(res.status==200){
          this.省份备选=res.items
        }
      })
      this.READY=true
    },
    VALID(rule, value, callback){
      if(this.ACTIVE[rule.field]===false){
        callback()
        return 
      }
      switch (rule.field) {
        case '参考名次':
          if(value[0]>=value[1]) callback(new Error('【起始】<【截止】'))
          else callback()
          break;
        case '选考科目':
          if(this.FORM.科目匹配&&value.length>=2&&value.indexOf('不限')>=0) callback(new Error('【且】:【不限】不可与其他科目并列'))
          else callback()
          break;
        default:
          break;
      }
      console.log('【VALID】',rule, value)
      
    },
    onSubmit(){
      this.$refs['form'].validate((valid) => {
          if (valid) {
            window.FORM=this.FORM
            var PostText=JSON.stringify(this.FORM)
            //console.log('PostText',PostText)
           
            var PostValue=JSON.parse(PostText)
            for (const key in this.ACTIVE) {
              if(this.ACTIVE[key]===false){
                delete PostValue[key]
              }
            }
            this.$router.push({ path: '/search', query: { query:Base64.encode(JSON.stringify(PostValue))}})
            PostValue.学制=PostValue.学制.map(v=>{return parseInt(v)})
            console.log('科目匹配',typeof PostValue.科目匹配,PostValue.科目匹配,PostValue.科目匹配==='true'?true:false)
            //PostValue.科目匹配=PostValue.科目匹配==='true'?true:false
            //console.table(PostValue)
            this.$emit('FormSearch',PostValue)
            //alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    }
  }
}
</script>
<style>
.SearchForm{
  width: 225px;
}
.SearchForm .el-radio-button__inner,.SearchForm .el-checkbox-button__inner{
  min-width:56px;
}
.SearchForm .el-form-item__label{
  padding: 0;
}
.SearchForm .el-select{
  width: 100%;
}
.bzk-group{
  width: 100%;
}
.bzk-group>.el-radio-button{
  width: 50%;
}
.bzk-group .el-radio-button__inner{
  width: 100%;
}
.el-input-number--small {
    width: 104px;
}
.el-input-number.is-controls-right .el-input__inner {
    padding-right: 30px;
}
.el-input-number--small .el-input-number__decrease, .el-input-number--small .el-input-number__increase {
    width: 20px;
}
</style>

