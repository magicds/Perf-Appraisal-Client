<template>
<div>
  切换身份
  <el-switch v-model="isAdmin" @change="onRoleChange">
  </el-switch>
  <el-table :data="data" style="width: 100%" default-expand-all="true">

    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table :data="props.row.subsData">
          <el-table-column label="名称" prop="name" align="left"></el-table-column>
          <el-table-column label="说明" prop="description" align="left"></el-table-column>
          <el-table-column label="分值" prop="maxScore" align="left"></el-table-column>
          <el-table-column label="得分" prop="score" align="center">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
              <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
              <el-input-number v-if="isAdmin" v-model="scope.row.score" controls-position="right" @change="detailScoreChanged(props.$index, scope.$index)"
                :min="0" :max="scope.row.maxScore"></el-input-number>
              <span v-else>{{scope.row.score}}</span>
            </template>

          </el-table-column>
        </el-table>
      </template>
    </el-table-column>

    <el-table-column label="评分大项" prop="name" align="center">
    </el-table-column>
    <el-table-column label="分值" prop="maxScore" align="center">
    </el-table-column>
    <el-table-column label="得分" prop="score" align="center">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { Table, TableColumn, InputNumber, Switch } from 'element-ui';
export default {
  name:'Score',
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElInputNumber: InputNumber,
    ElSwitch: Switch
  },
  data() {
    return {
      data: (() => {
        let i = 0;
        const arr = [];
        let subsData;
        while (i++ < 5) {
          subsData = this.mockSubsData(i);
          arr.push({
            name: '评分大项-' + i,
            maxScore: 20,
            subsData: subsData,
            score: (() => {
              let count = 0;
              subsData.forEach(item => {
                count += item.score;
              });
              return count;
            })()
          });
        }
        return arr;
      })(),
      isAdmin: true
    };
  },
  methods: {
    detailScoreChanged(mainIdx, subIdx) {
      console.log(mainIdx, subIdx);
      let count = 0;
      this.data[mainIdx].subsData.forEach(item => {
        count += item.score;
      });
      this.data[mainIdx].score = count;
    },
    mockSubsData(rowkey) {
      let i = 0;
      const arr = [];
      while (i++ < 4) {
        arr.push({
          name: '评分子项-' + rowkey + '-' + i,
          description: '这是评分子项的说明',
          maxScore: 5,
          score: 0,
          extInfo: ''
        });
      }
      return arr;
    },
    onRoleChange(v) {
      this.isAdmin = v;
    }
  },
  watch: {
    'data.subsData.score': function(v1, v2) {
      console.log(v1, v2);
    }
  }
};
</script>

