<template>
  <a-spin :spinning="loading">
    <div id="value-app">
      <a-layout>
        <a-layout class="layout">
          <a-layout-header
            class="layout-header"
            :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
          >
            <h1 class="logo">VALUE</h1>
          </a-layout-header>
          <a-layout>
            <a-layout-sider class="layout-sider" :width="0"> </a-layout-sider>
            <a-layout-content class="layout-content">
              <slot />
            </a-layout-content>
          </a-layout>
        </a-layout>
      </a-layout>
    </div>
  </a-spin>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>
<style>
.logo {
  font-family: 'Poppins';
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #3699ff;
  line-height: 72px;
}

#value-app {
  font-family: 'Poppins';
}

#value-app .ant-layout {
  background: #fbf6f0;
}

#value-app .layout-sider {
  background: #fff;
  z-index: 1;
}

#value-app .layout {
  min-height: 100vh;
}

#value-app .layout-header {
  background: #fff;
  box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
  height: 72px;
  padding: 0;
  padding-left: 32px;
  top: 0;
}

#value-app .layout-content {
  margin: 0 16px;
  padding-left: 12px;
  padding-right: 12px;
  min-height: 280px;
  margin-top: 72px;
}
</style>
