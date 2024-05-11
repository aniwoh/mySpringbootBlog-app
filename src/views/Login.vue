<script setup>
import { ref } from 'vue'

const isRegister = ref(false)
const registerData = ref({
    username: '',
    password: '',
    repassword: ''
})
</script>
<template>
<el-form :model="form" label-width="auto" style="max-width: 600px" class="container">
    <el-form-title v-if="isRegister">Register</el-form-title>
    <el-form-item>
      <el-input type="text" v-model="registerData.username" placeholder="Username"></el-input>
      <el-input type="password" v-model="registerData.password" placeholder="Password"></el-input>
        <el-input v-if="isRegister" type="password" v-model="registerData.repassword" placeholder="Re-enter Password"></el-input>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
    <div class="msg">
        <span v-if="isRegister">Already have an account? <a @click="isRegister = false">Login</a></span>
        <span v-else>Don't have an account? <a @click="isRegister = true">Register</a></span>
    </div>
</el-form>
</template>
<style scoped>
    /* * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container {
        height: 100%;
        background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
    }

    .login-wrapper {
        background-color: #fff;
        width: 358px;
        height: auto;
        border-radius: 15px;
        padding: 0 50px;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .header {
        font-size: 38px;
        font-weight: bold;
        text-align: center;
        padding: 10%;
    }

    input {
        display: block;
        width: 100%;
        margin-bottom: 20px;
        border: 0;
        padding: 10px;
        border-bottom: 1px solid rgb(128, 125, 125);
        font-size: 15px;
        outline: none;
    }

    input::placeholder {
        text-transform: uppercase;
    }

    .btn {
        text-align: center;
        padding: 10px;
        width: 100%;
        margin-top: 40px;
        background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
        color: #fff;
    }

    .msg {
        text-align: center;
        line-height: 44px;
    }

    a {
        text-decoration-line: none;
        color: #abc1ee;
    }

    .errorlist {
        color: red;
    } */
</style>
