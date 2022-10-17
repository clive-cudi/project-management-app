import { useState, useEffect } from "react";

const createEmitter = () => {
    const subscriptions = new Map();

    return {
        emit: (v: any) => subscriptions.forEach(fn => fn(v)),
        subscribe: (fn: any) => {
            const key = Symbol();
            subscriptions.set(key, fn);
            return () => subscriptions.delete(key);
        }
    }
}

type operation_ = (store: any) => void
type get_ = () => any;
type set_ = (operation: operation_ ) => any;
type init_ = (get: get_, set: set_) => void

export const createStore = (init: init_) => {
    let store: any = null;
    const emitter = createEmitter();

    const get: get_ = () => store;
    const set: set_ = (operation) => {
        store = operation(store);
        emitter.emit(store);
    }

    store = init(get, set);

    const useStore = () => {
        const [localStore, setLocalStore] = useState(get());

        useEffect(()=> {emitter.subscribe(setLocalStore)}, []);

        return localStore;
    }

    return useStore;
}