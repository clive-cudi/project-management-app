import create from "zustand";

interface useDemoStoreTypes {
    num: number
    incNum: (by: number) => void
    decNum: (by: number) => void
}

export const useDemoStore = create<useDemoStoreTypes>()((set) => {
    return {
        num: 0,
        incNum: (by) => set((state) => ({num: state.num + by})),
        decNum: (by) => set((state) => ({num: state.num - by}))
    }
})