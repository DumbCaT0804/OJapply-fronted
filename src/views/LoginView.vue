<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="用户登录界面" />

      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav>
    </div>
  </header>

  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">

    <el-form-item label="帐号" prop="account">
      <el-input v-model="ruleForm.account" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm()">Submit</el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
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
import { user } from './store.js'

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
    callback(new Error('请输入你的帐号'))
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入你的密码'))
  }
}

const ruleForm = reactive({
  account: '',
  pass: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  account: [{ validator: validatePass, trigger: 'blur' }],
  pass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = () => {
  axios.post('http://127.0.0.1:8848/login',
    {
      "name": ruleForm.account,
      "password": ruleForm.pass
    })
    .then(res => {
      // Handle the response

      if (res.data.success === true) {
        alert('Login success!');
        console.log(res);

        user.id = res.data.data.id;
        // localStorage.setItem('userId', res.data.data.id);
        console.log('LoginView ' + user.id);
        router.push('/submit');

      }
      else {
        console.log(ruleForm.account);
        console.log(ruleForm.pass)
        alert('请输入正确的帐号和密码')
        console.log(res);

      }
    })
    .catch(error => {
      // Handle the error
      console.log("xxx")
      console.log(ruleForm)
      console.log("xxx")
      alert('Login failed!');
      console.log(error);
    });
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
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