<template>
  <ClientOnly>
    <p class="self-start text-[#057D88] font-bold text-xl">
      Resumo da simulação
    </p>
    <div class="flex bg-[#FFE5D5] p-4 rounded-xl">
      <div class="pr-4">
        <img src="../assets/betina.png" alt="betina" class="w-28" />
      </div>
      <p class="text-xl">
        Pronto! Agora você já pode solicitar o empréstimo e recebê-lo na sua
        Conta Credifit! Veja o resumo da simulação!
      </p>
    </div>
    <div class="w-full grid grid-cols-2 my-6 gap-6">
      <div>
        <p class="font-semibold text-lg">Valor a Creditar</p>
        <p>R$10.000,00</p>
      </div>
      <div>
        <p class="font-semibold text-lg">Valor a financiar</p>
        <p>R$10.000,00</p>
      </div>
      <div>
        <p class="font-semibold text-lg">Parcelamento</p>
        <p>2x R$ 5.000,00</p>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {};
</script>
