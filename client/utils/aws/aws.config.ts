export const AWS_PMT_RESOURCES_CONFIG = {
    bucketName: "pmt-resources",
    dirName: 'users',
    region: 'us-east-1',
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
}