<template>
  <div>
    <el-form :model="user" ref="form" label-position="right" label-width="80px" :rules="rules">
      <el-form-item prop="email"  label="邮箱">
        <el-input v-model="user.email" type="text" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="pwd" label="密码">
        <el-input  v-model="user.pwd" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Input, Button, Form, FormItem, Message } from 'element-ui';
import api from '../api/';

window.api = api;
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
      user: {
        email: '',
        pwd: ''
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false
    };
  },
  computed: {
    encryptedPwd() {
      return btoa(this.user.pwd);
    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate().then(isValidate => {
        if (!isValidate) return;
        this.loading = true;
        api
          .post('/user/login', {
            email: this.user.email,
            pwd: this.encryptedPwd
          })
          .then(res => {
            console.log(res.data);
            this.loading = false;
          })
          .catch(err => {
            console.log(err.response);
            this.loading = false;
            const data = err.response.data;
            Message({
              message: `${data.code || ''} ${data.msg || data.message}`,
              type: 'error'
            });
          });
      });
    }
  }
};
</script>

