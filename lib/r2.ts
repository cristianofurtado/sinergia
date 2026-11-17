import "server-only";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getRequiredEnv } from "./env";

let cachedClient: S3Client | null = null;

function getR2Client(): S3Client {
  if (cachedClient) return cachedClient;
  const accountId = getRequiredEnv("R2_ACCOUNT_ID");
  const accessKeyId = getRequiredEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = getRequiredEnv("R2_SECRET_ACCESS_KEY");

  cachedClient = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return cachedClient;
}

export async function createPresignedUploadUrl(params: {
  key: string;
  contentType: string;
  contentLength: number;
  expiresInSeconds?: number;
}): Promise<string> {
  const bucket = getRequiredEnv("R2_BUCKET");
  const cmd = new PutObjectCommand({
    Bucket: bucket,
    Key: params.key,
    ContentType: params.contentType,
    ContentLength: params.contentLength,
  });
  return getSignedUrl(getR2Client(), cmd, {
    expiresIn: params.expiresInSeconds ?? 300,
  });
}

export async function createPresignedDownloadUrl(params: {
  key: string;
  fileName: string;
  forceAttachment: boolean;
  expiresInSeconds?: number;
}): Promise<string> {
  const bucket = getRequiredEnv("R2_BUCKET");
  const disposition = params.forceAttachment
    ? `attachment; filename="${params.fileName}"`
    : `inline; filename="${params.fileName}"`;
  const cmd = new GetObjectCommand({
    Bucket: bucket,
    Key: params.key,
    ResponseContentDisposition: disposition,
  });
  return getSignedUrl(getR2Client(), cmd, {
    expiresIn: params.expiresInSeconds ?? 120,
  });
}

export async function headR2Object(key: string) {
  const bucket = getRequiredEnv("R2_BUCKET");
  return getR2Client().send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
}

export async function deleteR2Object(key: string) {
  const bucket = getRequiredEnv("R2_BUCKET");
  return getR2Client().send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
