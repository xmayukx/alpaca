import AWS from "aws-sdk";
import fs from "fs";

export async function downloadFromS3(fileKey: string) {
  try {
    if (
      !process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID ||
      !process.env.NEXT_PUBLIC_S3_SECRET_KEY
    ) {
      throw new Error("S3 access key or secret key not defined.");
    }
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      },
      region: "ap-south-1",
    });
    if (!s3.config.credentials) {
      throw new Error("s3 is not defined");
    }
    // console.log(fileKey);
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: fileKey,
    };
    const obj = await s3.getObject(params).promise();
    if (!obj) {
      throw new Error("object not found");
    }
    // console.log(obj.Body);
    const tempDirectory = "temp";
    var fileName = ``;
    try {
      if (!fs.existsSync(tempDirectory)) {
        fs.mkdirSync(tempDirectory);
      }

      fileName = `${tempDirectory}/alpaca-${Date.now().toString()}.pdf`;
      fs.writeFileSync(fileName, obj.Body as Buffer);
      console.log("successfully downloaded from s3 to file system");
    } catch (e) {
      console.log(e);
    }

    return fileName;
  } catch (error: any) {
    console.error("Error in downloadFromS3:", error);
    return null;
  }
}
