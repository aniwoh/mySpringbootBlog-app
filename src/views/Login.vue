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
<el-main id ="loginMain">
    <div justify="center">
        <el-form>
            <el-input v-model="registerData.username" placeholder="username"></el-input>
            <el-input v-model="registerData.password" type="password" show-password placeholder="password"  ></el-input>
            <el-button type="primary" @click="register">Register</el-button>
        </el-form>
    </div>
</el-main>
</template>
<style scoped>
</style>
