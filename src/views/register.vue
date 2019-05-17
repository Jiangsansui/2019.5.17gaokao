<template>
import { constants } from 'fs';
import { setInterval } from 'timers';
  <el-container>
    <el-header><h1>启航志愿帮</h1></el-header>
    <el-main>
      <div class="left">
        <img src="../assets/logo1.png">
      </div>
      <div class="right">
  <div class="register">
      <h1>注册账号</h1>
      <span>去登录></span>
      <div class="phone">
          <span>手机号</span>
          <input type="" placeholder="请输入手机号">
      </div>
       <div class="phone">
          <span>密&nbsp;&nbsp; 码</span>
          <input type="" placeholder="请设定密码">
      </div>
           <div class="phone">
          <span>验证码</span>
          <input type="" placeholder="" style="width:30%;float: left;
margin-left: 10px;">
<div id="yzm" @click="getyzm()">获取验证码</div>
<button>注册账号</button>
      </div>
  </div>
   
      
   
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "register",
      data() {
        return {
        
        };
    
      },
      methods:{
          getyzm(){
              console.log("123132");
             var num = 60;
var inTime = setInterval(function () {


    if (num == 0) {
        clearInterval(inTime);
       
    }
    else {
        num--;
    }
    var second=document.getElementById("yzm");
   second.innerHTML=num
}, 1000);
          }
        
      }
    }
</script>

<style scoped>
#yzm{
    text-align: center;
    color:#fff;
    border-radius: 5px;
    background-color: #5fc1fa;
    line-height: 30px;
    height: 30px;
  float: left;
  width: 30%;
  margin-left: 20px;
}
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
.register{
  width: 60%;
  height: 60%;
  margin-top: 10%;
  background-color: #ffffff;
}
.register h1{
    font-size: 22px;
    float: left;
    margin-left: 5%;
}
.register>span{
    float: right;
    margin-right: 5%;
    margin-top: 5%;
    color: #5fc1fa;
}
.phone{
    width:90%;
    height:30px;
  float: left;
    margin-top:30px;
    margin-left: 5%;
    
}
.phone span {
    float: left; 
   line-height: 30px;
}
.phone input{
    padding: 2%;
    width: 80%;
    height: 15px;
    line-height: 15px;
    border-radius: 4px;
    border: 1px solid rgb(168, 168, 168);
    outline: none;

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
