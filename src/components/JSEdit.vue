<template>
    <div class="codebox">
        <div class="codehead">{{title}}</div>
        <textarea ref="editor">...</textarea>
    </div>
</template> 
<script>
import CodeMirror from 'CodeMirror'
export default {
        props:['title'],
        data: function () {
            return {
                count: 0
            }
        },
        mounted(){
            console.log("editor",this.$refs.editor)
            this.editor=CodeMirror.fromTextArea(this.$refs.editor, { 
                lineNumbers: true,//是否显示行号
                mode: "javascript",　//默认脚本编码
                lineWrapping:true, //是否强制换行
                matchBrackets:true,//括号匹配
                indentUnit : 2, 
                smartIndent : true,  // 是否智能缩进
                tabSize:2,
                //foldGutter:scope.foldGutter,
                foldGutter: true,
                ///foldgutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
                //    theme:"material"
            });
        },
        computed:{

        },
        methods:{
            value(v){
                if(v||v=='') return this.editor.setValue(v)
                return this.editor.getValue()   
            }
        }
    }
</script>
<style>
.CodeMirror.cm-s-default.CodeMirror-wrap{
    flex: 1;
    /* background: #f9f9f9; */
    font-family: Consolas;
    font-size: 14px;
    background: #404040;
    color:#fefefe;
    border-bottom-left-radius:2px;
    border-bottom-right-radius:2px;
}
.CodeMirror-cursor {
    border-left: 1px solid #fefefe;
}
.cm-property{
    color: rgb(156,220,254)!important;
}
.CodeMirror-gutters{
    border-right: none;
    background: #404040;
}
.CodeMirror-selected {
    background: rgba(46, 125, 247, 0.3);
}
.CodeMirror-focused .CodeMirror-selected { 
    background: rgba(46, 125, 247, 0.3);
}
.cm-s-default .cm-string{
    color: rgb(206,145,120);
}
.cm-number{
    color: rgb(176, 214, 147)!important;
}
.cm-atom {
    color: #32b3f1!important;
}
.CodeMirror-vscrollbar {

    outline: none;
}
.CodeMirror-foldmarker {
    color: #f9be11;
    text-shadow: #3d3d3e 1px 1px 2px;
    /* font-family: arial; */
    line-height: 1;
    cursor: pointer;
}
</style>
