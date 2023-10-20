<template>
  <div class="wrapper"></div>
  <nav>
    <RouterLink id="bian" to="/modify">修改账户</RouterLink>
    <RouterLink id="bian1" type="primary" to="/show">展示表单</RouterLink>
  </nav>

  <div class="gap">
    <el-form ref="form" :model="sizeForm" label-width="auto" :label-position="labelPosition" :size="size">
      <el-form-item label="Gender" prop="gender">
        <el-radio-group v-model="sizeForm.gender">
          <el-radio :label="true">Boy</el-radio>
          <el-radio :label="false">Girl</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="Student_id">
        <el-input v-model="sizeForm.student_id" />
      </el-form-item>
      <el-form-item label="Birthdate">
        <el-input v-model="sizeForm.birthdate" />
      </el-form-item>
      <el-form-item label="Political Status">
        <el-input v-model="sizeForm.political_status" />
      </el-form-item>
      <el-form-item label="Ethnicity">
        <el-input v-model="sizeForm.ethnicity" />
      </el-form-item>
      <el-form-item label="Major Class">
        <el-input v-model="sizeForm.major_class" />
      </el-form-item>
      <el-form-item label="Previous Position">
        <el-input v-model="sizeForm.previous_position" />
      </el-form-item>
      <el-form-item label="special_skills">
        <el-input v-model="sizeForm.special_skills" />
      </el-form-item>
      <el-form-item label="self_introduction">
        <el-input v-model="sizeForm.self_introduction" />
      </el-form-item>
      <el-form-item label="job_expectation">
        <el-input v-model="sizeForm.job_expectation" />
      </el-form-item>
      <el-form-item label="profile_photo">
        <el-input v-model="sizeForm.profile_photo" />
      </el-form-item>
      <el-form-item label="phone_number">
        <el-input v-model="sizeForm.phone_number" />
      </el-form-item>
      <el-form-item label="attachment">
        <el-input v-model="sizeForm.attachment" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改表单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script  setup>
import { ref, reactive } from 'vue'
import router from '../router'
import axios from 'axios'
import { user } from '../views/store'

const sizeForm = reactive({
  "user_id": user.id,
  "gender": null,
  "name": "wly",
  "student_id": "2022585066661",
  "birthdate": "1987-11-28",
  "political_status": "exe",
  "ethnicity": "铜仁市",
  "major_class": "aute dolor",
  "previous_position": "aliqua",
  "special_skills": "Excepteur voluptate labore adipisicing cupidatat",
  "self_introduction": "culpa elit",
  "job_expectation": "amet irure",
  "profile_photo": "http://dummyimage.com/400x400",
  "phone_number": "46",
  "attachment": "culpa"
})

const onSubmit = () => {
  axios.put(`http://127.0.0.1:8848/form/${user.formid}`, sizeForm)
    .then(res => {
      console.log(res.data);
      console.log(user.formid);
      alert('修改成功喵QAQ')
    })
    .catch(err => {
      console.log(err);
      alert('出现错误了呐~.~');
    })
}

</script>
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

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
</style>