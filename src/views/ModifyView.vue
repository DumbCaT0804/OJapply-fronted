<template>
    <el-form-item label="修改用户" prop="reID">
        <el-input v-model="reData.ID" type="text" />
    </el-form-item>
    <br>
    <el-form-item label="修改帐号" prop="reaccount">
        <el-input v-model="reData.name" type="text" />
    </el-form-item>
    <br>
    <el-form-item label="修改密码" prop="repass">
        <el-input v-model="reData.pass" type="password" />
    </el-form-item>
    <br>
    <el-form-item label="修改邮箱" prop="reemail">
        <el-input v-model="reData.email" type="email" />
    </el-form-item>
    <br>
    <el-form-item>
        <el-button type="primary" @click="submitreForm()">Submit</el-button>
    </el-form-item>
    <br>
    <el-form-item label="删除用户" prop="ID">
        <el-input v-model="ID" type="text" />
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="deleteUser()">delete</el-button>
    </el-form-item>

</template>
  
<script setup>
import { reactive, ref } from 'vue'
import router from '../router'
import axios from 'axios'

const reData = reactive({
    ID: '',
    name: '',
    pass: '',
    email: ''
})
const ID = ref('');
const submitreForm = () => {
    console.log(reData.ID)
    axios.put(`http://127.0.0.1:8848/users/${reData.ID}`, {
        "name": reData.name,
        "email": reData.email,
        "password": reData.pass,
    })
        .then(res => {
            console.log(res.data);

            console.log(res.data.account);
        })
        .catch(error => {
            // Handle the error
            console.log('xxx')
        });
}
const deleteUser = () => {
    axios.delete(`http://127.0.0.1:8848/users/${ID.value}`)
        .then(res => {
            if (res.data.success === true)
            alert("删除成功QAQ！")
            //problem：判断是否存在
        })
        .catch(error =>{
            
        })
}
const showUser = ()=> {
    axios.get("http://127.0.0.1:8848/users")
}
</script>

<!-- houduan
Get (127.0.0.1/user)
{
    进入数据
    sql(*)
    retrun res;
}
Put (127.0.0.1/user/update/{id})
{
    进入数据
    sql(update where id= {id})
    retrun res;
}

:80/user axios -> 127.0.0.1/user -> res:{data,s} -->