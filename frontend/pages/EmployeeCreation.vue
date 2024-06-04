<template>
  <ClientOnly>
    <div class="h-screen flex items-center justify-center px-5 py-5">
      <div
        v-if="!employeeData?.hasOwnProperty('companyName')"
        class="flex flex-col items-center justify-center gap-6"
      >
        <Icon name="mingcute:alert-fill" color="orange" class="size-24" />
        <p class="text-center text-md font-bold">
          Esta página está disponível apenas para Empresas
        </p>
        <p class="text-center text-md">
          Faça login ou registre como empresa para ter acesso a página.
        </p>
        <NuxtLink
          to="/CompanyAuth"
          class="bg-[#057D88] w-56 px-6 py-3 rounded-full text-white font-semibold text-center"
        >
          Autenticar Empresa
        </NuxtLink>
      </div>
      <div
        v-else
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
                      placeholder="João Pedro Oliveira"
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
                      placeholder="2500"
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
                      placeholder="joao@gmail.com"
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
const employeeCookie = useCookie("employeeData");
let employeeData: any;
if (employeeCookie.value !== undefined) {
  employeeData = JSON.parse(JSON.stringify(employeeCookie.value!));
}

const submitForm = async () => {
  try {
    const company = await $fetch("http://localhost:3001/employee", {
      method: "POST",
      body: {
        ...formData.value,
        salary: Number(formData.value.salary),
        companyId: employeeData.id,
      },
      onResponseError({ response }) {
        console.error(
          "Erro na resposta:",
          response._data.message || "Erro desconhecido"
        );
      },
    });
    navigateTo({ path: "/" });
  } catch (error) {
    console.log(error);
  }
};
</script>
