<template>
  <ClientOnly>
    <div class="h-screen flex items-center justify-center px-5 py-5">
      <div
        class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style="max-width: 1200px"
      >
        <div class="md:flex w-full">
          <div
            class="hidden md:block w-1/2 bg-[#057D88] py-10 px-10 justify-center"
          >
            <img
              src="../assets/img-radio.svg"
              alt=""
              class="flex justify-center items-center my-auto"
            />
          </div>
          <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div class="text-center mb-10">
              <h1 class="font-bold text-3xl text-gray-900">
                Registro de Funcionário
              </h1>
              <p>Registre um novo funcionário em sua empresa</p>
            </div>

            <form @submit.prevent="submitForm">
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1"
                    >Nome Completo</label
                  >
                  <div class="flex">
                    <input
                      type="text"
                      class="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#057D88]"
                      placeholder="Seguros Seguratora"
                      v-model="formData.name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-1/2 px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1">CPF</label>
                  <div class="flex">
                    <input
                      type="text"
                      class="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#057D88]"
                      placeholder="92874628199"
                      v-model="formData.cpf"
                      required
                    />
                  </div>
                </div>
                <div class="w-1/2 px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1"
                    >Salário</label
                  >
                  <div class="flex">
                    <input
                      type="text"
                      class="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#057D88]"
                      placeholder="847361282748274"
                      v-model="formData.salary"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1">Email</label>
                  <div class="flex">
                    <input
                      type="email"
                      class="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#057D88]"
                      placeholder="johnsmith@example.com"
                      v-model="formData.email"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-12">
                  <label for="" class="text-xs font-semibold px-1">Senha</label>
                  <div class="flex">
                    <input
                      type="password"
                      class="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#057D88]"
                      placeholder="************"
                      v-model="formData.password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <button
                    class="block w-full max-w-xs mx-auto bg-[#057D88] hover:bg-[#045e66] text-white rounded-lg px-3 py-3 font-semibold"
                    type="submit"
                  >
                    REGISTRAR
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const formData = ref({
  name: "",
  cpf: "",
  salary: "",
  email: "",
  password: "",
});
const router = useRouter();

const submitForm = async () => {
  try {
    const company = await $fetch("http://localhost:3001/company", {
      method: "POST",
      body: formData.value,
    });
    const employeeCookie = useCookie("employeeData");
    employeeCookie.value = JSON.stringify(company);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
definePageMeta({
  layout: false,
});
</script>
