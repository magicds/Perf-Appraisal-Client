<template>
<el-table :data="tableData">
  <el-table-column label="名称" prop="name" align="left">
    <template slot-scope="scope">
      <el-input v-model="scope.row.name"></el-input>
    </template>
  </el-table-column>
  <el-table-column label="说明" prop="description" align="left"></el-table-column>
  <el-table-column label="分值" prop="maxScore" align="left"></el-table-column>
  <el-table-column label="得分" prop="score" align="center">
    <template slot-scope="scope">
      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
    </template>

  </el-table-column>
  <template slot="append">
    <el-button @click="handleAdd(true,props.$index)">新增评分点</el-button>
  </template>
</el-table>


</template>

<script>
import { Table, TableColumn, Input, InputNumber, Switch, Button } from 'element-ui';
export default {
  name: 'ScoreCfg',
  components: {
    ElInput: Input,
    ElButton: Button,
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElInputNumber: InputNumber,
    ElSwitch: Switch
  },
  data() {
    return {
      defaultExpandAll: true,
      tableData: [
        {
          name: '',
          subData: []
        }
      ]
    };
  },
  methods: {
    handleAdd(isSub, parentIdx) {
      if (!isSub) {
        // this.$set(this, 'tableData', {
        //   name: '',
        //   subData: []
        // });
        this.tableData.push({
          name: '',
          subData: []
        });
        return;
      }
      console.log(parentIdx);
      this.tableData[parentIdx].subData.push({
        name: '',
        description: '',
        maxScore: 0
      });
    }
  }
};
</script>

