import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const getImageKitAuthParams = () => imagekit.getAuthenticationParameters();

export const deleteFromImageKit = async (fileId) => {
  if (!fileId) return null;
  return imagekit.deleteFile(fileId);
};

export default imagekit;