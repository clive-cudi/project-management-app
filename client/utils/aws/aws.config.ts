import { S3Config } from "react-s3";
import { S3Client, S3ClientConfig, S3 } from "@aws-sdk/client-s3";


export const AWS_PMT_RESOURCES_CONFIG: S3Config = {
    bucketName: "pmt-resources",
    dirName: 'users',
    region: 'us-east-1',
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
}

export const clientS3 = new S3({credentials: {accessKeyId: AWS_PMT_RESOURCES_CONFIG.accessKeyId, secretAccessKey: AWS_PMT_RESOURCES_CONFIG.secretAccessKey}, region: AWS_PMT_RESOURCES_CONFIG.region});