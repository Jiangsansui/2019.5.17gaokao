<template id="qlediter">
    <div class="codebox">
        <div class="codehead" id="toolid" ref="qlheader">
                <!-- <span>{{title}}</span> -->
                <button class="ql-blockquote"></button>
                <button class="ql-code-block"></button>
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
                <button class="ql-strike"></button>

                <button class="ql-header" value="1"></button>
                <button class="ql-header" value="2"></button>
                <button class="ql-list" value="ordered"></button>
                <button class="ql-list" value="bullet"></button>
                
                <select class="ql-color"></select>
                <select class="ql-background"></select>
                <select class="ql-align"></select>
                <button class="ql-clean"></button>
                <!-- But you can also add your own -->
                <button ref="save" @click="save" class="qlsave">
                    <svg  viewBox="0 0 24 24">
                        <path fill="#67c23a" d="M10,17L6.5,13.5L7.91,12.08L10,14.17L15.18,9L16.59,10.41M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />
                    </svg>
                </button>
        </div>
        <div ref="qleditor">
                <blockquote>Edit Some Notes Here</blockquote>
        </div>
    </div>
</template>
<script>
import Quill from 'Quill'
export default {
        name:'QLEdit',
        props:['title','toolid'],
        data: function () {
            return {
                count: 0
            }
        },
        mounted(){
            console.log("quill",this.$refs.qleditor)

            this.editer=new Quill(this.$refs.qleditor, {
                modules: {
                    toolbar: {
                        container:this.$refs.qlheader,//this.toolbarOptions,  // Selector for toolbar container
                        handlers: {
                            'save': (v)=>{console.log('save',v)}
                        }
                    }
                },
                theme: 'snow'
            });
            window.quill=this.editer;
        },
        computed:{

        },
        methods:{
            save(v){
                var json=this.editer.getContents()
                this.$emit('notesave',json)
            },
            value(v){
                return this.editer.setContents(v)
            }
        }
    }
</script>
<style>
.ql-toolbar{
    background: #fff;
    border:none!important;
    border-bottom: 1px solid #e8e8e8!important;

}
.ql-container{
    background: #f9f9f9; border:none!important;
    overflow: auto;
}
.ql-snow .ql-editor .ql-code-block-container{
    background: #404040;
}
.qlsave{
    float: right!important;

}.qlsave:hover{
    fill: #67c23a;
}
</style>

