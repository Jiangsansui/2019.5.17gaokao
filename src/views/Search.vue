<template>
  <el-container>
    <el-aside width="250px" style="padding: 12px;">
      <SearchForm @FormSearch="Search"></SearchForm>
    </el-aside>
    <el-main class="pagemain">
      <!-- <el-switch v-model="show"></el-switch> -->
      <el-table :data="values" height="100%" style="width: 100%" size="mini" v-loading="loading">
        <el-table-column type="index" width="40" align="right"></el-table-column>
        <el-table-column sortable prop="省" label="省" width="60"></el-table-column>
        <el-table-column sortable prop="城市" label="市" width="60"></el-table-column>
        <el-table-column sortable prop="院校代码" label="院校代码" width="95" v-if="FIELDSON['院校代码']"></el-table-column>
        <el-table-column sortable prop="办学性质" label="办学性质" width="95" v-if="FIELDSON['办学性质']"></el-table-column>
        <el-table-column sortable prop="院校名称" label="院校名称" min-width="120" :filters="filters['院校名称']" :filter-method="filterHandler">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" popper-class="hoverpanel">
              <p>【院校代码】: {{ scope.row.院校代码 }}</p>
              <p v-if="!FIELDSON['办学性质']">【办学性质】: {{ scope.row.办学性质 }}</p>
              <p v-if="scope.row.重点类型">【重点类型】: {{ scope.row.重点类型}}</p>
              <p v-if="scope.row.重点科目" style="font-weight:bold;">【重点科目】: {{ scope.row.重点科目}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.院校名称 }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column sortable prop="专业代码" label="专业代码" width="95" v-if="FIELDSON['专业代码']"></el-table-column>
        <el-table-column sortable prop="专业名称" label="专业名称" min-width="160" show-overflow-tooltip >
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.备注" placement="bottom" popper-class="hovernote" effect="light">
              <div slot="content" style="color:red;font-weight:bold;">{{ scope.row.备注 }}</div>
              <span style="font-weight: bold;">{{ scope.row.专业名称 }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.专业名称 }}</span>  
          </template>
        </el-table-column>
        <el-table-column sortable prop="学科" label="学科" min-width="75" max-width="150" v-if="FIELDSON['学科']" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="本专科" label="本专" width="75"></el-table-column>
        <el-table-column sortable prop="选考科目要求" label="选考科目" min-width="95" :filters="filters['选考科目要求']" :filter-method="filterHandler"></el-table-column>
        <el-table-column sortable prop="收费标准" label="收费" width="75"></el-table-column>
        <el-table-column sortable prop="学制" label="学制" width="75"></el-table-column>
        <el-table-column sortable prop="计划数" label="计划数" width="90" align="center"></el-table-column>
        <el-table-column sortable prop="段次" label="段次" width="75"></el-table-column>
        <el-table-column sortable prop="参考分数" label="分数" width="75"></el-table-column>
        <el-table-column sortable prop="参考名次" label="位次" width="75"></el-table-column>
      
        <el-table-column label="操作">
           <template slot="header" slot-scope="scope">
            <el-popover style="min-width:120px;" placement="bottom-start" width="80" min-width="100" trigger="click">
              <template  v-for="name in FIELDS">
                  <el-checkbox :label="name" :key="name" v-model="FIELDSON[name]"></el-checkbox>
              </template>
              
              <el-button type="text" slot="reference" icon="el-icon-menu" class="el-icon--right">列表</el-button>
            </el-popover>
          </template> 
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button  size="mini" @click="handleAdd(scope.row)">{{scope.row._bool_?"取消":"添加"}}</el-button>
          
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
//添加筛选功能1：:filters="filters[name]" :filter-method="filterHandler"
//2：data.filters[name]=[]
import API from "../API";
import SearchForm from "@/components/SearchForm.vue";
import { debuglog } from "util";

class colleges {
  constructor(院校代码, height, width) {
    this.院校代码 = 院校代码;
    this.height = height;
    this.width = width;
  }
}

export default {
  name: "search",
  components: { SearchForm },
  data() {
    return {
      test: "ttt",
      FIELDS: ["院校代码", "办学性质", "专业代码", "学科"],
      FIELDSON: {
        院校代码: false,
        办学性质: false,
        专业代码: false,
        学科: false
      },
      show: false,
      loading: false,
      ready: false,
      filters: {
        // "本专科":["本科","高职(专科)"],
        选考科目要求: [],
        院校名称: []
      },
      values: [],
      x: false
    };
  },
  watch: {
    // '$store.state.Login':function (value,old){
    //     if(value==true&&this.ready==false)
    //     //this.Search()
    // }
  },
  methods: {
    isObjectValueEqual(a, b) {
      var aProps = Object.keys(a);
      var bProps = Object.keys(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        var propA = a[propName];
        var propB = b[propName];
        if (propA !== propB) {
          if (typeof propA === "object") {
            if (this.isObjectValueEqual(propA, propB)) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      }
      return true;
    },
    isArrayHasObject(_item) {
      for (var i of this.$store.getters.getvolunteers) {
        if (this.isObjectValueEqual(i, _item)) {
          return true;
        }
      }
      return false;
    },
    ArrayHasObjectIndex(_item) {
      const volunteers = this.$store.getters.getvolunteers;
      for (var i in volunteers) {
        if (this.isObjectValueEqual(volunteers[i], _item)) {
          return i;
        }
      }
      return -1;
    },
    handledelete(index) {
      this.values[index];
    },
    handleAdd(row) {
      //false代表没有点
      //true 代表点了
      console.log(this.$store)
      if (!row._bool_) {
        this.$store.commit("addvolunteers", row);
      } else {
        const i = this.ArrayHasObjectIndex(row);
        this.$store.commit("deletevolunteers", i);
      }
       row._bool_ = ! row._bool_;
      console.log(this.$store.getters.getvolunteers);
    },
    handleEdit(index, row) {},
    handleDelete(index, row) {},
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    Search(value) {
      const that = this;
      this.loading = true;
      API.Search(value).then(list => {
        if (list.status == 401) {
          this.$message.error("重新登陆");
          return;
        } else if (list.status > 300) {
          this.$store.commit("logout"); //应该写到API理
          this.$message.error("请求异常");
          return;
        }

        this.$message({
          message: `查询成功，返回${list.items.length}个结果`,
          center: true,
          type: "success"
        });
        var FILTER = {};
        for (let key in this.filters) {
          this.filters[key] = [];
          if (!FILTER[key]) FILTER[key] = {};
        }
        list.items.forEach(item => {
          for (let key in this.filters) {
            if (!FILTER[key][item[key]]) {
              FILTER[key][item[key]] = 1;
              this.filters[key].push({
                text: item[key],
                value: item[key]
              });
            }
          }
          item["_bool_"] = that.isArrayHasObject(item);
        });
        //console.log(FILTER)
//object.freeze//请不要冻结，否则双向绑定 的_bool_没有用了
        this.values = list.items; //冻结

        this.loading = false;
        this.ready = true;
      });
    }
  },
  mounted() {
    console.log(this.values, typeof this.values);

    this.Search({});
    console.log(this.values);
  }
};
</script>
<style>
.hoverpanel {
  box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.3);
  max-width: 40%;
}
.hovernote {
  background: #e25118;
}
</style>

