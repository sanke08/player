
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Fake auth function

export const ourFileRouter = {
    // @ts-ignore
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1} }).onUploadComplete(async ({ metadata }) => {

        console.log(metadata)
        return { uploadedBy: "metadata" };
    }),
// @ts-ignore
    audioUploader: f({ audio: { maxFileSize: "8MB", maxFileCount: 1 } }).onUploadComplete(async ({ metadata }) => {
        console.log(metadata)
        return { uploadedBy: "metadata" };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;