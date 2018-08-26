<template>
<div>
  切换身份
  <el-switch v-model="isAdmin" @change="onRoleChange">
  </el-switch>
  <el-table :data="data" style="width: 100%" :default-expand-all="defaultExpandAll">

    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table :data="props.row.items">
          <el-table-column label="名称" prop="name" align="left"></el-table-column>
          <el-table-column label="说明" prop="description" align="left"></el-table-column>
          <el-table-column label="分值" prop="scoreLimit" align="left"></el-table-column>
          <el-table-column label="得分" prop="score" align="center">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
              <el-input-number v-if="isAdmin" v-model="scope.row.score" controls-position="right" @change="detailScoreChanged(props.$index, scope.$index, scope.row)"
                :min="0" :max="scope.row.scoreLimit"></el-input-number>
              <span v-else>{{scope.row.score}}</span>
            </template>

          </el-table-column>
          <el-table-column label="备注" prop="note" align="left">
            <template slot-scope="scope">
              <el-input v-if="isAdmin" v-model="scope.row.note" controls-position="right" @change="detailNoteChanged(props.$index, scope.$index, scope.row)"></el-input>
              <span v-else>{{scope.row.note}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>

    <el-table-column label="评分大项" prop="name" align="center">
    </el-table-column>
    <!-- <el-table-column label="分值" prop="maxScore" align="center"></el-table-column> -->
    <el-table-column label="得分" prop="score" align="center">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {
  Table,
  TableColumn,
  InputNumber,
  Input,
  Switch,
  Button,
  Message
} from 'element-ui';
import api from '../api/index.js';
export default {
  name: 'Score',
  components: {
    ElButton: Button,
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElInputNumber: InputNumber,
    ElInput: Input,
    ElSwitch: Switch
  },
  data() {
    return {
      data: [],
      id: '',
      isAdmin: true,
      defaultExpandAll: true
    };
  },
  mounted() {
    // this.$route.
    this.getData();
  },
  methods: {
    getData() {
      api
        .post('/score/getScore', {
          userId: '5b8209751655821a6c2603e1',
          period: '2018-3'
        })
        .then(res => {
          if (res.data) {
            this.data = res.data.score;
            this.id = res.data.id;
          } else {
            Message({
              message: `${res.code || ''} ${res.msg}`,
              type: 'error'
            });
          }
        });
    },
    detailScoreChanged(mainIdx, subIdx, scoreItem) {
      console.log(arguments);
      let count = 0;
      this.data[mainIdx].items.forEach(item => {
        count += item.score;
      });
      this.data[mainIdx].score = count;
      api
        .post('/score/saveScore', {
          id: this.id,
          scoreId: scoreItem.id,
          score: scoreItem.score
        })
        .then(res => {
          console.log(res);
        });
    },
    detailNoteChanged(mainIdx, subIdx, scoreItem) {
      console.log(arguments);
      api
        .post('/score/saveNote', {
          id: this.id,
          scoreId: scoreItem.id,
          note: scoreItem.note
        })
        .then(res => {
          console.log(res);
        });
    },
    onRoleChange(v) {
      this.isAdmin = v;
    }
  },
  watch: {
    'data.items.score': function(v1, v2) {
      console.log(v1, v2);
    }
  }
};
</script>

