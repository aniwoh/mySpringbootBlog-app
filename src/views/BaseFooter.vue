<template>
  <el-footer class="me-area">
    <div class="me-footer">
      <p>Designed by
        <strong>
          <router-link to="/" class="me-login-design-color">ForFun</router-link>
        </strong>
      </p>
    </div>
  </el-footer>

</template>

<script>
</script>

<style>

.el-footer {
  min-width: 100%;
  z-index: 1024;
  position: absolute;
  bottom: 0;
}

.me-footer {
  text-align: center;
  line-height: 60px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;

}

.me-login-design-color {
  color: #5FB878 !important;
}

</style>
