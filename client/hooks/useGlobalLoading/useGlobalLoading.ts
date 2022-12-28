import { useContext } from "react";
import { GlobalLoadingCtx, GlobalLoadingCtx_Props } from "../../context";

export function useGlobalLoading() {
    const { globalLoading, setGlobalLoading } = useContext(GlobalLoadingCtx) as GlobalLoadingCtx_Props;

    function startLoading() {
        setGlobalLoading((prev) => ({
            ...prev,
            isLoading: true
        }));

        return globalLoading.isLoading;
    }

    function stopLoading() {
        setGlobalLoading((prev) => ({
            ...prev,
            isLoading: false
        }));

        return globalLoading.isLoading;
    }

    function toggleLoading(): boolean {
        if (globalLoading.isLoading === true) {
            stopLoading();
        } else {
            startLoading();
        }

        return globalLoading.isLoading;
    }

    return {
        globalLoading,
        startLoading,
        stopLoading,
        toggleLoading
    }
}