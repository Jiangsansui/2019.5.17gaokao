import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'
import API from './API'
Vue.use(Vuex)

const store= new Vuex.Store({
    state: {//数据集
        User:null,
        Login:1,
        Note: 'Store Ready',
        volunteers:[  {
            "院校代码": "0001",
            "院校名称": "浙江大学",
            "专业代码": "001",
            "专业名称": "人文科学试验班",
            "学制": 4,
            "本专科": "本科",
            "计划数": 105,
            "剩余计划数": 105,
            "选考科目要求": "不限",
            "收费标准": "5300",
            "备注": "含汉语言文学、古典文献学、编辑出版学、历史学、哲学、文物与博物馆学专业.",
            "院校ID": 256,
            "学科": "文学,实验班,历史学,哲学",
            "大类": "哲学类,实验班类,中国语言文学类,新闻传播学类,历史学类",
            "段次": "1",
            "参考分数": 659,
            "参考名次": 3976,
            "省": "浙江",
            "城市": "杭州",
            "重点类型": "985,211,一流大学A,一流学科",
            "办学性质": "公办学校",
            "重点科目": "化学、生物学、生态学、机械工程、光学工程、材料科学与工程、电气工程、控制科学与工程、计算机科学与技术、农业工程、环境科学与工程、软件工程、园艺学、植物保护、基础医学、药学、管理科学与工程、农林经济管理"
          }],
    },
    getters: {
        getvolunteers: function (state) {
            return state.volunteers;
        }
    },
    mutations: {
        //同步变更 $store.commit('setvolunteers', []);
        setvolunteers(state, param) {
            state.volunteers = param;
            console.log(state.volunteers);
        },
        //添加待选支援
        addvolunteers(state, param) { 
            state.volunteers.push(param);
        },
        deletevolunteers(state, _index) {
            state.volunteers.splice(_index, 1);

        },
        //同步变更 $store.commit('setUser', user);
        setUser(state,params){
            state.User=params
            state.Login=true
        },
        logout(state){
            state.User=null
            state.Login=false
        },

    },
    actions: {
        isLogin(ctx){
        
        API.IsLogin().then(json=>{
            
            if(json.status==200){
            console.log('【store】【actions】【isLogin】',json)
            ctx.commit('setUser', json.message||'admin')
            }else{
            ctx.commit('logout')
            }
        })
        },
        doLogin(ctx,{name,pass}){
        console.log('【store】【actions】【doLogin】',name,pass)
        API.DoLogin(name,pass).then(json=>{
            console.log('【store】【actions】【doLogin2】',json)
            if(json.status==200){
            ctx.commit('setUser', json.message||'admin')
            }
        })
        }
    }
})
API.Relogin=function(){
  store.commit('logout')
}
export default store
// store.dispatch('login', credentials).then(() => {
//   // 重定向到登录区域
// }).catch((error) => {
//   // 显示有关错误密码的消息
// });