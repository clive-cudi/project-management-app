import { AWS_PMT_RESOURCES_CONFIG } from "./aws.config";
import { S3Config } from "react-s3";

export const generateUserBucketPath = (userId: string, filename: string) => {
    return `users/${userId}/profile/${filename.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '_')}`;
}

export const generateUserBucketConfig = (userId: string, filename: string, object: any) => {
    return {
        Bucket: AWS_PMT_RESOURCES_CONFIG.bucketName,
        Key: generateUserBucketPath(userId, filename),
        Body: object
    }
}

export const generateS3ObjectURL = (userId: string, filename: string) => {
    return new URL(`https://${AWS_PMT_RESOURCES_CONFIG.bucketName}.s3.amazonaws.com/${generateUserBucketPath(userId, filename)}`);
}