function MakeTree(APIS){
    var Folders={ID:'/api',Path:'/api',children:[]}
    //var Tree={ID:"tree",Path:'tree',children:[]}
    var Children=[]
    APIS.forEach((api)=>{
        var path=api.Path.substring(1)
        var index=path.indexOf('/:')
        if(index>0){
            path=path.substr(0,index)  
        }
        index=path.lastIndexOf('/')
        
        if(index>0){
            path=path.substr(0,index)
        }
        
        var level=path.split('/')
        var Folder=Folders
        var children=Children
        //console.log(api.Path,level)
        level.forEach((folder)=>{
            if(!Folder[folder]){

            
                Folder[folder]={
                    Path:folder,
                    ID:Folder.ID+'/'+folder,
                    children:[],
                    Type:"DIR"
                }
                children.push({
                    Path:Folder[folder].Path,
                    ID:Folder[folder].ID,
                    children:Folder[folder].children
                })
            }
            children=Folder[folder].children
            Folder=Folder[folder]
            
        })  
        children.push({
            Path:api.Path,
            ID:api.Path+'/',
            Type:api.Type
        })
    })
    return Children
}
async function Fetch(url,type='GET',body){
    type=type.toUpperCase()
    var config={
        method:type,   //请求方法
        credentials: 'include',
　　　　 headers: {
   　　　　 'Accept': 'application/json',
   　　　　 'Content-Type': 'application/json',
 　　　　 }
    }
    
    if(type!='GET'&&type!='HEAD') config.body=(typeof body=='string')?body:JSON.stringify(body)
    //console.log('Fetch',url,config)
    return fetch(url,config)
        .then(res=>{
            if(res.status==401){
                if(API.Relogin) API.Relogin()
            }
            return res.json()
        })
        .catch(err=>{console.log(err.message);return {
            status:400,
            message:err.message
        }})
}
const field= [
    "subject.院校代码",
    "subject.院校名称",
    "subject.专业代码",
    "subject.专业名称",
    "subject.学制",
    "subject.本专科",
    "subject.计划数",
    "subject.剩余计划数",
    "subject.选考科目要求",
    "subject.收费标准",
    "subject.备注",
    "subject.院校ID",
    "subject.学科",
    "subject.大类",
    "subject.段次",
    "subject.参考分数",
    "subject.参考名次",
    "school.省",
    "school.城市",
    "school.重点类型",
    "school.办学性质",
    "school.重点科目"
]
const Base64 = {
    encode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    },
    decode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
};
window.Base64=Base64
const API={
    encode:Base64.encode,
    decode:Base64.decode,
    Relogin:false,
    Fetch,
    async GET(url){
        return Fetch(url,"GET");
    },
    async POST(url,body){
        return Fetch(url,"POST",body);
    },
    async GetDaLei(){
        return Fetch('/api/words/course',"GET");
    },
    async IsLogin(){
        return Fetch('/api/login',"GET");
    },
    async DoLogin(pid,user_pass){
        return Fetch('/api/login',"POST",{pid,user_pass});
    },
    async GetAPiS(){
        var apis=await Fetch('/api/list',"GET");
        return MakeTree(apis)
    },
    async GetHistory(body){
        return Fetch('/api/history',"POST",body);
    },
    async Search(params){
        params.field=field
        return Fetch('/api/subject/search','POST',params)
    },
    async SaveNotes(type,path,notes){
        if(!type||!path||!notes){
            return -1
        }
        var body={
            name:type+":"+path,
            notes:JSON.stringify(notes)
        }
        return Fetch('/api/notes','POST',body)
    }
}

export default API