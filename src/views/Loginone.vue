<template>
  <el-container>
    <el-header><h1>启航志愿帮</h1></el-header>
    <el-main>
      <div class="left">
        <img src="../assets/logo1.png">
      </div>
      <div class="right">
    <div class="login">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="密码登录" name="first">
        <div class="inputone">
         <img src="../assets/num.png" >
         <input placeholder="请输入账号">
        </div>
        <div class="inputone">
          <img src="../assets/key.png" >
          <input placeholder="请输入密码">
        </div>
        <el-checkbox v-model="checked">下次自动登录</el-checkbox>
        <span @click="register()">去注册></span>
        <button @click="login()">登录</button>
        <div class="foot" style="display: flex;flex-direction: row">
          <span>快捷登录：</span>
          <img src="../assets/wechat.png">
        </div>
      </el-tab-pane>
      <el-tab-pane label="短信登录" name="second">
         <div class="inputtwo">
         <img src="../assets/num.png" >
         <input placeholder="请输入手机号">
        </div>
        <div class="inputone">
          <img src="../assets/key.png" >
          <input placeholder="请输入验证码">
        </div> 
        <el-checkbox v-model="checked">下次自动登录</el-checkbox>
        <span  @click="register()">去注册></span>
        <button @click="login()">登录</button>
        <div class="foot" style="display: flex;flex-direction: row">
          <span>快捷登录：</span>
          <img src="../assets/wechat.png">
        </div> 
      </el-tab-pane>
 

      </el-tabs>
</div>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "Login",
      data() {
        return {
          activeName: 'first',
          checked:true
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        login(){
          //this.$store.commit('setUser', "zt");
          this.$router.push({path:'Home'});
        },
        register(){
          this.$router.push({path:'register'});
        }
      },
      mounted() {
          console.log('loginone', this.$store.state.User);
         
    
         


      }
    }
</script>

<style scoped>
.left {
  width: 50%;

}
.left img{
  width: 50%;
  margin-top:10%;
}

.right{
  width: 50%;

}
.login{
  width: 60%;
  height: 70%;
  margin-top: 10%;
  background-color: #ffffff;
}
.login img{
  float:left;
  margin-top: 4%;
  margin-left: 3%
}
.login input{
  width:80%;
  height: 60%;
  margin-top: 1.6%;
  font-size: 18px;
  color: #aeaeae;
}
.inputone{
  border-radius: 5px;
  border: 1px solid #e9e9e9;
  margin-top: 4%;
  width: 90%;
  height: 50px;
  margin-left: 5%;
}
.foot span{
  margin-left: 5%;
}
.foot img{
  margin-left: -1%;
}

.inputone input{
  width: 88%;
  height:66%;
  border:none;
  outline: none;
}

.el-tab-pane span{
  float: right;
  margin-top: 5.5%;
  margin-right: 5%;
}
.login button{
  width: 90%;
  height: 50px;
  border: none;
  outline: none;
  background-color: #5fc1fa;
  color:white;
  margin-top: 2%;
  border-radius: 5px;
  font-size: 20px;
  
}
.inputtwo{
   border-radius: 5px;
  border: 1px solid #e9e9e9;
  margin-top: 4%;
  width: 90%;
  height: 50px;
  margin-left: 5%;
}
.inputtwo input{
 width: 88%;
  height:66%;
  border:none;
  outline: none;
}

.el-checkbox{
  float: left;
  margin-left: 5.5%;
  margin-top: 5%;
}
  .el-header, .el-footer {
    color: #333;
    text-align: left;
    height: 100px !important;
    line-height: 55px;
    font-weight: bolder;
  }
  .el-main {
    display: flex;
    flex-direction: row;
    background-color: #5fc1fa;
    color: #333;
    text-align: center;
   height: 730px;
  }

</style>
