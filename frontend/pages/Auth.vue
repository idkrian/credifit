<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submitLogin">
      <div>
        <label for="name">Name</label>
        <input
          class="mx-2 border border-black"
          type="text"
          id="name"
          v-model="formData.name"
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input
          class="mx-2 border border-black"
          type="text"
          id="email"
          v-model="formData.email"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          class="mx-2 border border-black"
          type="password"
          id="password"
          v-model="formData.password"
        />
      </div>
      <div>
        <label for="cpf">CPF</label>
        <input
          class="mx-2 border border-black"
          type="text"
          id="cpf"
          v-model="formData.cpf"
        />
      </div>
      <div>
        <label for="salary">Salary</label>
        <input
          class="mx-2 border border-black"
          type="text"
          id="salary"
          v-model="formData.salary"
        />
      </div>
      <button type="submit">Login</button>
    </form>
    <Tabs default-value="account" class="w-[1000px]">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="loginEmployee"> Login Funcionário </TabsTrigger>
        <TabsTrigger value="loginCompany"> Login Empresa </TabsTrigger>
        <TabsTrigger value="registerCompany"> Registrar Empresa </TabsTrigger>
      </TabsList>
      <TabsContent value="loginEmployee">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="name">Name</Label>
              <Input id="name" default-value="Pedro Duarte" />
            </div>
            <div class="space-y-1">
              <Label for="username">Username</Label>
              <Input id="username" default-value="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="loginCompany">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div class="space-y-1">
              <Label for="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const formData = ref({
  name: "",
  cpf: "",
  email: "",
  password: "",
  salary: 0,
});

const router = useRouter();

const submitLogin = async () => {
  try {
    let dataToSend = {
      name: formData.value.name,
      cpf: formData.value.cpf,
      email: formData.value.email,
      password: formData.value.password,
      salary: Number(formData.value.salary),
    };
    const employee = await $fetch("http://localhost:3001/employee", {
      method: "POST",
      body: dataToSend,
    });
    const employeeCookie = useCookie("counter");
    employeeCookie.value = JSON.stringify(employee);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
