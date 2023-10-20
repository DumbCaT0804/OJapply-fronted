<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import router from '../router'
import { user } from './store.js'
//problem: 不能刷新 一刷新user值会掉

const formDatas = ref([]);

axios.get(`http://127.0.0.1:8848/form/${user.id}`)
  .then(response => {
    // 将返回的表单数据赋值给formDatas数组
    formDatas.value = response.data.data.form_data;
    console.log(response.data.data.form_data[0])
    console.log(formDatas);
    console.log(formDatas._rawValue[0][0]);
  })
  .catch(error => {
    console.error(error);
  });

const ModifyForm = (formData) => {
  user.formid = formData[0];
  console.log(formData[0]);
  router.push('dataModify')
}
const deleteData = (formData) => {
  user.formid = formData[0];
  axios.delete(`http://127.0.0.1:8848/form/${user.formid}`)
    .then(res => {
      if (res.data.success === true)
        alert("删除成功QAQ！")
      //problem：判断是否存在
    })
    .catch(error => {
      alert('删除失败qwq')
    })

}
console.log('ShowView ' + user.id)
</script>

<template>
  <nav>
    <RouterLink id="bian" type="primary" to="/modify" class="modify-link">Modify</RouterLink>
    <RouterLink id="bian1" type="primary" to="/show">ShowForm</RouterLink>
  </nav>
  <div>
    <h1>表单数据：</h1>
    <div v-for="(formData, index) in formDatas" :key="index">
      <h2>表单{{ index + 1 }}</h2>
      <div v-for="(value, i) in formData" :key="i">
        <label>{{ i }}</label>
        <input v-model="formData[i]" />
      </div>
      <el-button type="danger" @click="deleteData(formData)">删除表单</el-button>
      <el-button type="primary" @click="ModifyForm(formData)">修改表单</el-button>
    </div>
  </div>
</template>

<style>
#bian {
  background-color: white;
  color: red;
  padding: 5px;
  position: fixed;
  top: 20px;
  right: 20px;
  border: 2px solid whitesmoke;
  border-radius: 4px;
}

#bian1 {
  background-color: white;
  padding: 5px;
  position: fixed;
  top: 20px;
  right: 97px;
  border: 2px solid whitesmoke;
  border-radius: 4px;
}

#bian2 {
  background-color: white;
  padding: 5px;
  position: fixed;
  top: 20px;
  right: 200px;
  border: 2px solid whitesmoke;
  border-radius: 4px;
}
</style>