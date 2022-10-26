import create from "zustand";

const init = {
	contentStage: "welcome",
};

const useAppState = create((set) => ({
	contentStage: "welcome",
	setContentStage: (stage) => set((state) => ({ contentStage: stage })),

	resetStage: () => set(...init),
}));

export default useAppState;
