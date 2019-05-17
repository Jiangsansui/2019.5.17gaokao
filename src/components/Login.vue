<template>
    <el-dialog title="登陆" :visible.sync="showlogin" >
      <el-form :model="form">
        <el-form-item label="用户" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dologin">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Login',
  data(){
    return {
      formLabelWidth: '50px',
      form: {
          name: '',
          pass:''
        },
    }
  },
  computed: {
    showlogin () {
        console.log(!this.$store.state.Login);
      return !this.$store.state.Login
    }
  },
  methods:{
    dologin(){
      console.log('Login',this.form.name,this.form.pass)
      this.$store.dispatch('doLogin',{
        name:this.form.name,
        pass:this.form.pass
      })
    }
  }
}
</script>
<style>
  .el-dialog__wrapper{
    display: flex;
    align-items: center;
  }.el-dialog{
    max-width: 500px;
  }
</style>

