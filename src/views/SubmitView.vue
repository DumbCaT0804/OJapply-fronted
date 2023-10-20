<template>
  <div class="wrapper"></div>
  <nav>
    <RouterLink id="bian" to="/modify">Modify</RouterLink>
    <RouterLink id="bian1" type="primary" to="/show">ShowForm</RouterLink>
  </nav>

  <div>
    <el-radio-group v-model="size" label="size control">
      <el-radio-button label="large">large</el-radio-button>
      <el-radio-button label="default">default</el-radio-button>
      <el-radio-button label="small">small</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="labelPosition" label="position control">
      <el-radio-button label="left">Left</el-radio-button>
      <el-radio-button label="right">Right</el-radio-button>
      <el-radio-button label="top">Top</el-radio-button>
    </el-radio-group>
  </div>
  <br />
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
      <el-form-item label="Student ID">
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
      <el-form-item label="Special Skills">
        <el-input v-model="sizeForm.special_skills" />
      </el-form-item>
      <el-form-item label="Self Introduction">
        <el-input v-model="sizeForm.self_introduction" />
      </el-form-item>
      <el-form-item label="Job Expectation">
        <el-input v-model="sizeForm.job_expectation" />
      </el-form-item>
      <el-form-item label="Profile Photo">
        <el-input v-model="sizeForm.profile_photo" />
      </el-form-item>
      <el-form-item label="Phone Number">
        <el-input v-model="sizeForm.phone_number" />
      </el-form-item>
      <el-form-item label="Attachment">
        <el-input v-model="sizeForm.attachment" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script  setup>
import { ref, reactive } from 'vue'
import router from '../router'
import axios from 'axios'
import { user } from '../views/store'

const showData = reactive({
  id: ''
})
const size = ref('default')
const labelPosition = ref('right')

const userId = localStorage.getItem('userId');

const sizeForm = reactive({
  "user_id": user.id,
  "gender": null,
  "name": "wly",
  "student_id": "202258506666",
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
  axios.post('http://127.0.0.1:8848/form', sizeForm)
    .then(res => {
      // Handle the response

      console.log(res);
      console.log(res.data);
      console.log(sizeForm.gender);

      alert('Post Success!');
    })
    .catch(error => {
      // Handle the error
      console.log(sizeForm);
      alert('仔细看看，可能是哪里出了小问题呐QAQ')
    });
}
</script>

<style scoped>
.wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
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
  right: 100px;
  border: 2px solid whitesmoke;
  border-radius: 4px;
}

.gap {
  padding: 10px;
}

.el-radio-group {
  margin-right: 12px;
}
</style>