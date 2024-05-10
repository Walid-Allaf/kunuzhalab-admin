import Resizer from "react-image-file-resizer";

// CONVERT IMAGE TO STRING
export const compressImg = async (image) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      image,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        const img = uri.substring(uri.indexOf(",") + 1);
        console.log(img);
        resolve(img);
      },
      "base64"
    );
  });
