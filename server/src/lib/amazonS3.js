import { v4 as uuidV4 } from "uuid";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import config from "../config/index.js";

/** Amazon s3 client instance */
const s3Client = new S3Client({
    credentials: {
        accessKeyId: config.cloudStore.accessKey,
        secretAccessKey: config.cloudStore.secretKey,
    },
    region: config.cloudStore.region,
});

/** 
 * Gets a signed url for a file in the amazon s3 bucket 
 * @param {string} fileId Id of the file to get the signed url for
 * @param {number} duration Number of seconds to make the url valid
 * @returns the signed url as a string
 */
const getSignedURLById = async (fileId, duration) => {
    const params = {
        Bucket: config.cloudStore.bucketName,
        Key: fileId,
    };

    const getFileCommand = new GetObjectCommand(params);
    return getSignedUrl(s3Client, getFileCommand, {
        expiresIn: duration,
    });
};

/**
 * Uploads a file into Amazon S3 and returns its generated ID
 * @param {{buffer: Buffer, mimetype: string}} file File to upload. It at least needs buffer and the mimetype.
 * @returns The generated uuid in the store for the file.
 */
const saveFilesInS3 = async (file) => {
    const randomFileId = uuidV4();
    const params = {
        Bucket: config.cloudStore.bucketName,
        Key: randomFileId,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const uploadFileCommand = new PutObjectCommand(params);
    await s3Client.send(uploadFileCommand);
    return randomFileId;
};

export { saveFilesInS3, getSignedURLById, s3Client };
