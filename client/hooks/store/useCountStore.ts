import { createStore } from "../../store";


export const useCountStore: () => {count: number, inc: ()=> void, dec: ()=> void} = createStore((get, set) => ({
    count: 0,
    inc: () => set(store => ({...store, count: store.count + 1})),
    dec: () => set(store => ({...store, count: store.count - 1}))
}));