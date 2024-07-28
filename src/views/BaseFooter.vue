<template>
  <el-footer class="me-area">
    <div class="me-footer">
      <p>Designed by
        <strong>
          <router-link to="/" class="me-login-design-color">aniwoh</router-link>
        </strong>
        | Powered by
        <strong>
          <a href="https://cn.vuejs.org/" class="me-login-design-color">Vue3</a>
        </strong>
        | <a href="https://beian.miit.gov.cn">苏ICP备2023010135号</a>
      </p>

    </div>
  </el-footer>

</template>

<script>
</script>

<style>
a {
  text-decoration: none; /* 去除下划线 */
  color: inherit; /* 继承父元素的颜色 */
}
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
