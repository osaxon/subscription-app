import create from "zustand";

const init = {
	contentStage: "Overview",
};

const useAppState = create((set) => ({
	contentStage: "Overview",
	setContentStage: (stage) => set((state) => ({ contentStage: stage })),

	resetStage: () => set(...init),
}));

export default useAppState;
