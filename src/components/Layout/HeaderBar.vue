<template>
  <div class="header-bar-box">
    <div class="right-content">
      <a-dropdown>
        <div class="user-info">
          <img class="avator" src="@/assets/logo.png" alt="头像">
          <div class="name">admin</div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <TeamOutlined />
              个人中心
            </a-menu-item>
            <a-menu-item key="1">
              <QuestionOutlined />
              关于
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" @click="onLogout">退出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { QuestionOutlined, TeamOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onLogout = () => {
  localStorage.removeItem("USER_TOKEN");
  router.replace({ name: "login" });
}

</script>
  
<style lang="less">
  .header-bar-box{
    height: 100%;
    display: flex;
    justify-content: flex-end;
    .right-content{
      // width: 200px;
      padding-right: 24px;
      .user-info{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
        .avator{
          height: 32px;
          width: 32px;
          border-radius: 50%;
          margin-right: 6px;
        }
        .name{
          font-size: 14px;
          color: rgba(0,0,0,.65);
        }
      }
      
    }
  }
  
</style>
