<template>
  <el-container id="app">
    <keep-alive>
         <router-view ref="main"/>
    </keep-alive>

  </el-container>

</template>
<script>
import NavMenu from '@/components/NavMenu.vue'
import Login  from '@/components/Login.vue'
export default {
  name: 'app',
  components: {
    NavMenu,Login
  },
  mounted(){
    console.log('Login',this.$store.state.Login)
   // this.$store.dispatch('isLogin')
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
      width: 100vw;
    height: 100vh;
}
#navheader{
  padding: 0;
    display: flex;
    flex-direction: row;
    box-shadow: 2px 0 10px rgba(0,0,0,.1);
        z-index: 10;
}
.el-menu.el-menu--horizontal {
    border-bottom:none;
}
#logo{
    width: 250px;
    text-align: center;vertical-align: middle;
    line-height: 60px;
    font-size: 35px;
    color: #42b983;
    font-family: Impact;
    font-style: italic;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.el-tabs__item{
 font-size:16px !important;
 font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
 margin-left: 7%;
 padding: 0 10px;
}
.el-tabs__active-bar{
  margin-left: 8%;
 
}
</style>
