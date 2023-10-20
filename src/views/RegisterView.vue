<template>
 
  <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      
      <div class="wrapper">
        <HelloWorld msg="用户注册界面" />
  
        <nav>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </nav>
      </div>
    </header>
    
  
  
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
    <el-form-item label="姓名  " prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="submitForm()"
          >Submit</el-button
        >
        <el-button @click="resetForm(ruleFormRef)" type="danger">Reset</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import router from '../router'
  import axios from 'axios'
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from '../components/HelloWorld.vue'
 
  
  const ruleFormRef = ref<FormInstance>()
  
  const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error('Please input digits'))
      } else {
        if (value < 18) {
          callback(new Error('Age must be greater than 18'))
        } else {
          callback()
        }
      }
    }, 1000)
  }
  
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password'))
    } else {
      if (ruleForm.checkPass !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass', () => null)
      }
      callback()
    }
  }
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
      callback(new Error("Two inputs don't match!"))
    } else {
      callback()
    }
  }
  
  const ruleForm = reactive({
    name:'',
    email:'',
    pass:'',
    checkPass:''
  });
  
  const rules = reactive<FormRules<typeof ruleForm>>({
    name:[{ required: true, message: 'Please input your name', trigger: 'blur' }],
    email:[{  type: 'email',required: true, message: 'Please input your right email', trigger: 'blur' }],
    pass: [{ required: true,validator: validatePass, trigger: 'blur' }],
    checkPass: [{ required: true,validator: validatePass2, trigger: 'blur' }],
    
  })
  
  const submitForm = () => {
    //problem: 重复相同注册
  axios.post('http://127.0.0.1:8848/users', {
    "name":ruleForm.name,
    "email":ruleForm.email,
    "password":ruleForm.pass
  })
      .then(res=> {
          // Handle the response
          console.log(ruleForm.email)
          alert('Register success!');
          router.push('/login');  
      })
      .catch(error => {
          // Handle the error
          alert('Login failed!');
          console.log(error);
      });
  }
    
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  console.log(ruleForm);
  </script>
  
  <style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
  }
  
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
  
  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }
  
  nav a.router-link-exact-active {
    color: var(--color-text);
  }
  
  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }
  
  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }
  
  nav a:first-of-type {
    border: 0;
  }
  
  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }
  
    .logo {
      margin: 0 2rem 0 0;
    }
  
    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  
    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;
  
      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
  </style>