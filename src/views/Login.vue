<template>
  <div id="login" v-title data-title="登录页面">
    <div class="me-login-box me-login-box-radius">
      <h1>登录</h1>
      <el-form ref="userFormRef" :model="userForm" :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="用户名" v-model="userForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click="submitForm(userFormRef)">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="me-login-design">
        <p>Don't have an account? Register</p>
<!--        <p>Don't have an account? <router-link to="/register" class="me-login-design-color">Register</router-link></p>-->
        <p>Or Back to <router-link to="/" class="me-login-design-color">Index</router-link></p>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref,reactive} from "vue";
import {login} from "@/api/login.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import Cookies from 'js-cookie';

const router=useRouter()
const userFormRef = ref(null)
const userForm= reactive({
  username: '',
  password: '',
})
const rules= ref({
  username: [
      {required: true, message: '请输入用户名', trigger: 'blur'},
      {max: 10, message: '不能大于10个字符', trigger: 'blur'}
  ],
  password: [
      {required: true, message: '请输入密码', trigger: 'blur'},
      {max: 10, message: '不能大于10个字符', trigger: 'blur'}
]
})
const submitForm = async (formName) => {
  if (!formName) return
  console.log(userForm.username)
  await formName.validate((valid)=>{
    if (valid){
      login(userForm.username,userForm.password)
          .then(response=>{
            const res=response.data
            console.log(res)
            if (res.code===0){
              ElMessage({
                message: '登陆成功',
                type: 'success'
              })
              router.push('/')
            }else {
              ElMessage({
                message: res.data,
                type: 'error'
              })
            }
          })
    } else {
      ElMessage({
        message: '输入有误',
        type: 'error'
      })
    }
  })
}
</script>

<style scoped>
#login {
  min-width: 100%;
  min-height: 100%;
}

.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: absolute;
  left: 0;
  z-index: 0;
  top: 0;
}

.me-login-box {
  position: absolute;
  width: 300px;
  height: 260px;
  background-color: white;
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0 0 1px 1px rgba(161, 159, 159, 0.1);
}

.me-login-box h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  vertical-align: middle;
}

.me-login-design {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
}

.me-login-design-color {
  color: #5FB878 !important;
}

.me-login-button {
  text-align: center;
}

.me-login-button button {
  width: 100%;
}

</style>