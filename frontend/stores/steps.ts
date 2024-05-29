export const useStepStore = defineStore("stepStore", {
  state: () => ({
    currentStep: 0,
  }),
  actions: {
    incrementStep() {
      if (this.currentStep < 3) {
        this.currentStep++;
      } else {
        this.currentStep = 0;
      }
    },
    decrementStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      } else {
        return;
      }
    },
  },
});
