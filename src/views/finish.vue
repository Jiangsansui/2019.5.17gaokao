<template>
    <div class="container">
        <el-table :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column sortable="省" prop="省" label="省市" width="90px"></el-table-column>
        <el-table-column sortable="重点类型" prop="重点类型" label="重点类型" width="200px" min-width="140" show-overflow-tooltip> </el-table-column>
        <el-table-column sortable="院校代码" prop="院校代码" label="院校代码" width="100"></el-table-column>
         <el-table-column sortable="院校名称" prop="院校名称" label="院校名称"  min-width="160" show-overflow-tooltip:tableData="tableData['院校名称']" > </el-table-column>
        <el-table-column sortable="专业名称" prop="专业名称" label="专业名称"  min-width="160" show-overflow-tooltip> </el-table-column>
        <el-table-column sortable="本专科" prop="本专科"  label="本专科"> </el-table-column>
        <el-table-column sortable="选考科目要求" prop="选考科目要求" label="选考科目要求" width="150"></el-table-column>
        <el-table-column sortable="收费标准" prop="收费标准" label="收费标准"> </el-table-column>
        <el-table-column sortable="学制" prop="学制" label="学制"></el-table-column>
        <el-table-column sortable="计划数" prop="计划数" label="计划数"></el-table-column>
        <el-table-column sortable="段次" prop="段次" label="段次"></el-table-column>
        <el-table-column sortable="参考分数" prop="参考分数" label="参考分数"></el-table-column>
        <el-table-column sortable="段次" prop="段次" label="段次"></el-table-column>
        <el-table-column sortable="参考名次" prop="参考名次"  label="参考名次"> </el-table-column>
       
    </el-table>

    <el-button  size="mini"  v-bind:disabled="disabled" >
         <downloadExcel :data="multipleSelection">导出</downloadExcel>
    </el-button>
    </div>
</template>
<script>
export default {
  data() {
    return {
        disabled:true,
      tableData: [],
      multipleSelection:[],
    };
  },
  watch:{
      multipleSelection:function(){
          if(this.multipleSelection.length>0){
              this.disabled=false;
          }
          else{
              this.disabled=true;
          }
      }
  },
  methods: {
    setTableData: function() {
      this.tableData = this.$store.getters.getvolunteers;
      // this.tableData= this.$store.getters.getvolunteers();
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    excelOutput:function(){
        if(this.multipleSelection.length==0){
            this.$message.error("您还没有选择需要导出的数据");
        }
    }
  },
  mounted() {
    this.setTableData();
  }
};
</script>

<style>
.container {
  width: 100%;
 
}
</style>
