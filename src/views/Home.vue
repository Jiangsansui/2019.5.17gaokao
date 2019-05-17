<template>
  <el-container id="app">
     <el-header id="navheader">
      <div id="logo">启航志愿</div> 
      <NavMenu />
    </el-header> 
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