<template>
    <el-menu :router="true" mode="horizontal" :default-active="$route.path" text-color="#2c3e50" active-text-color="#3daa79">
        <template v-for="route in router">
            <el-menu-item v-if="!route.children || route.children.length == 1" :index="route.path" :key="route.path">
              {{ route.name }}
            </el-menu-item>
            <el-submenu v-else :index="route.path" :key="route.path">
              <template slot="title">
                <i class="el-icon-menu"></i>{{ route.name }}</template>
              <el-menu-item v-for="child in route.children" :index="route.path + '/' + child.path" :key="route.path + '/' + child.path">{{ child.name }}</el-menu-item>
            </el-submenu>
          </template>
    </el-menu>
</template>
<script>
export default {
  name: "NavMenu",
  data() {
    return {
        router:[],
    };
  }, 
  methods:{
      GetRouter:function(){
        for(var i of this.$router.options.routes){
            if(i.name=="内部核心"){//我将基本路由都配置在这个名字为内部核心的路由下面
                                    //别怪我，我比较菜，啦啦啦
                this.router=i.children;
            }
        }    
      }
  },
  mounted() {
    this.GetRouter();
  }
};
</script>
