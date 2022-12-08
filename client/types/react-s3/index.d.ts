declare module "react-s3" {
    export interface S3Config {
        bucketName: string;
        dirName: string;
        region: string;
        accessKeyId: string;
        secretAccessKey: string;
    }
    
    export interface S3File {
        name: string;
        size: number;
        type: string;
    }
    
    export interface S3UploadResponse {
        signedRequest: string;
        url: string;
    }

    export function uploadFile(file: S3File, config: S3Config, onProgress?: (progress: number) => void, onError?: (error: Error) => void, onFinish?: () => void, onAbort?: () => void): Promise<S3UploadResponse>;
}