import create from "zustand";

const init = {
	contentStage: "Overview",
	currentStep: "register",
};

const useAppState = create((set) => ({
	contentStage: "Overview",
	currentStep: "Register",
	setStep: (step) => set(() => ({ currentStep: step })),
	setContentStage: (stage) => set((state) => ({ contentStage: stage })),

	resetStage: () => set(...init),
}));

export default useAppState;
