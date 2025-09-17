import path from "path";
import { v4 as uuidv4 } from "uuid";
import supabase from "../config/supabaseClient.js";

export const getPathFromStorageUrl = (url, bucketName) => {
  if (!url || !bucketName) {
    return null;
  }
  try {
    const urlObject = new URL(url);
    const pathSegments = urlObject.pathname.split("/");
    const bucketIndex = pathSegments.findIndex(
      (segment) => segment === bucketName
    );

    if (bucketIndex === -1 || bucketIndex + 1 >= pathSegments.length) {
      return null;
    }
    const filePathInBucket = pathSegments.slice(bucketIndex + 1).join("/");
    return filePathInBucket;
  } catch (error) {
    return null;
  }
};

export async function uploadFileToSupabase(file, bucketName, eventIdForPath) {
  if (!file) return null;

  const fileExtension = path.extname(file.originalname);
  const fileName = `${eventIdForPath}/${uuidv4()}${fileExtension}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    console.error(
      `Supabase Storage upload error to bucket ${bucketName} for event path ${eventIdForPath}:`,
      error
    );
    throw new Error(
      `Failed to upload ${file.fieldname} to ${bucketName}: ${error.message}`
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  if (!publicUrl) {
    console.error(
      `Failed to get public URL for ${fileName} in bucket ${bucketName} after successful upload.`
    );
    await supabase.storage.from(bucketName).remove([fileName]);
    throw new Error(
      `Failed to get public URL for ${file.fieldname} after upload.`
    );
  }
  return { publicUrl, path: fileName };
}
