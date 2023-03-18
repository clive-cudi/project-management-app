import { useComponentRepoStore, useCountStore, useDemoStore, useProjectStore, useTaskStore } from ".";

export function MountStoreDevTools() {
    if (process.env.NODE_ENV === "development") {
        // mountStoreDevtool("useComponentRepoStore", useComponentRepoStore);

        // mountStoreDevtool("useCountStore", useCountStore);

        // mountStoreDevtool("useDemoStore", useDemoStore);

        // mountStoreDevtool("useTaskStore", useTaskStore);
    }
}