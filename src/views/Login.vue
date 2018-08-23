<template>
  <div>
    <el-input v-model="email" type="text" placeholder="请输入邮箱"></el-input>
    <el-input v-model="pwd" type="password" placeholder="请输入密码"></el-input>
    <el-button @click="login" :loading="loading">登录</el-button>
  </div>
</template>

<script>
import { Input, Button, Form, FormItem } from 'element-ui';
import api from '../api/';
export default {
  name: 'login',
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button
  },
  data() {
    return {
      email: '',
      pwd: '',
      loading: false
    };
  },
  computed: {
    encryptedPwd() {
      return btoa(this.pwd);
    }
  },
  methods: {
    login() {
      if (!this.pwd || !this.email) {
        return;
      }
      this.loading = true;
      api
        .post('/user/login', {
          email: this.email,
          pwd: this.encryptedPwd
        })
        .then(res => {
          console.log(res.data);
          this.loading = false;
        });
    }
  }
};
</script>

