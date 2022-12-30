import { useContext, useState } from "react";
import { GlobalLoadingCtx, GlobalLoadingCtx_Props } from "../../context";

export function useGlobalLoading() {
    const { globalLoading, setGlobalLoading } = useContext(GlobalLoadingCtx) as GlobalLoadingCtx_Props;
    // to keep track of the number of times startLoading() is called and sync it with stopLoading()
    const [loadingInstances, setLoadingInstances] = useState<string[]>([]);

    function startLoading(instance_id?: string) {
        // create a loading id for this loading instance
        const loading_instance_id = instance_id ?? crypto.randomUUID();
        setLoadingInstances((prevInstanceIDs) => [...prevInstanceIDs, loading_instance_id]);
        setGlobalLoading((prev) => ({
            ...prev,
            isLoading: true
        }));

        return globalLoading.isLoading;
    }

    function stopLoading(instance_id?: string) {
        // remove the instance_id from list
        // if list of loading instances is empty, disable loading
        const updated_instances = [...loadingInstances].filter((instance) => instance === (instance_id ?? loadingInstances[0]));

        setLoadingInstances(updated_instances);

        setGlobalLoading((prev) => ({
            ...prev,
            isLoading: updated_instances.length > 0
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