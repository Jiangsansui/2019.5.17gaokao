<template>
  <el-tree :data="json" :props="defaultProps">
    <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="key">{{ node.label.key }}</span>:<span :class="node.label.type">{{ node.label.value }}</span>
    </span>
  </el-tree>
</template>

<script>
function JSONTREE(json){
    var data=[]
    for (const key in json) {
        var node={label:{key}}
        node.label.type=typeof json[key]
        if(json[key]===null){
            node.label.value='null'
        }
        else if(node.label.type=='object'){
            if(json[key].entries){
                node.label.type='array'
                node.label.value=`[${json[key].length}]`
            }else{
                node.label.value='{...}'//`{${Object.keys(json[key]).length}}`
            }
            node.children=JSONTREE(json[key])
        }else{
            if(node.label.type=='string')
                node.label.value=`"${json[key]}"`
            else
            node.label.value=json[key]
        }
        data.push(node)
    }
    return data
}
export default {
  name: 'JsonTree',
  props:['json'],
  data(){

  },
  methods:{
    JSONTREE(){
      return JSONTREE(this.json)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.key{
    color: #1E88DA;
}.string{
    color: #CE8349;
}.object,.array,.boolean{
    color: #4EC9B0;
}.number{
    color: #93CE9B;
}
</style>
