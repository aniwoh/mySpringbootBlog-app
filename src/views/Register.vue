<template>
  <div id="register" v-title data-title="注册页面">
    <div class="me-login-box me-login-box-radius">
      <h1>加入我们</h1>
      <el-form ref="userFormRef" :model="userForm" :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="userForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="输入密码" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item prop="repassword">
          <el-input placeholder="再次输入密码" v-model="userForm.repassword"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click="submitForm(userFormRef)">注册</el-button>
        </el-form-item>
      </el-form>

      <div class="me-login-design">
        <p>Have an account? <router-link to="/login" class="me-login-design-color">Login</router-link></p>
        <p>Or Back to <router-link to="/" class="me-login-design-color">Index</router-link></p>
      </div>

    </div>
  </div>
</template>

<script setup>
import {register} from '@/api/login'
import {ref,reactive} from "vue";
import {ElMessage} from 'element-plus'
import { useRouter } from 'vue-router'
const router=useRouter()
const userFormRef = ref(null)
const userForm= reactive({
  username: '',
  password: '',
  repassword: ''
})
const reValidatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== userForm.password) {
    callback(new Error("两次密码不匹配"))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [
    {required: true, message: 'Please input the username', trigger: 'blur'},
    {max: 10, message: 'The length cannot exceed 10 characters', trigger: 'blur'}
  ],
  password: [
    {required: true, message: 'Please input the password', trigger: 'blur'},
    {max: 10, message: 'The length cannot exceed 10 characters', trigger: 'blur'}
  ],
  repassword: [
    {required: true, message: 'Please input the password again', trigger: 'blur'},
    {max: 10, message: 'The length cannot exceed 10 characters', trigger: 'blur'},
    {validator: reValidatePass, trigger: 'blur'}
  ]
})
const submitForm=async (formName)=> {
  if (!formName) return
  console.log(userForm.username)
  await formName.validate((valid)=>{
    if (valid){
      register(userForm.username,userForm.password)
          .then(response=>{
            const res=response.data
            console.log(res)
            if (res.code===0){
              ElMessage({
                message: '注册成功',
                type: 'success'
              })
              router.push('/login')
            }else {
              ElMessage({
                message: res.data,
                type: 'error'
              })
            }
          })
    } else {
      ElMessage({
        message: '请检查输入',
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
  height: 320px;
  background-color: white;
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
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
