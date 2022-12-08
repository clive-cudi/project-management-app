import { AWS_PMT_RESOURCES_CONFIG } from "./aws.config";

export const generateUserBucketPath = (userId: string) => {
    return `users/${userId}`;
}

export const generateUserBucketConfig = (userId: string) => {
    return {
        ...AWS_PMT_RESOURCES_CONFIG,
        dirName: generateUserBucketPath(userId)
    }
}