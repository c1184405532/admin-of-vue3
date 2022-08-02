<template>
  <div class="login-main">
    <div class="center">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input admin' }]"
        >
          <a-input v-model:value="formState.username" placeholder="Please input admin" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input 123456!' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="Please input 123456" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">login</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  
  const formState = reactive<FormState>({
    username: "",
    password: "",
    remember: true,
  });

  onMounted(() => {
    const token = localStorage.getItem("USER_TOKEN");
    if (token) router.replace({ name: "home" });
  })

  const router = useRouter();
  const route = useRoute();

  const onFinish = ({ username, password }: FormState) => {
    const { query } = route
    if (username === "admin" && password === "123456") {
      localStorage.setItem("USER_TOKEN", "ADMIN");
      const routePayload: {path?: string, name?: string} = {};

      if (query.redirect) routePayload.path = <string>query.redirect;
      else routePayload.name = "home";
      
      router.replace(routePayload);
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

</script>

<style>
  .login-main{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .center{
    margin-top: 200px;
    width: 300px;
  }
</style>
