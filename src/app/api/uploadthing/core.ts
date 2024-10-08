import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

// const handleAuth = () => {
//   const { userId } = auth();
//   if (!userId) throw new Error("Unauthorized");
//   return { userId: userId };
// }; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"]).onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
