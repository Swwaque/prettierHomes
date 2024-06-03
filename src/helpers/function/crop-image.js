/**
 * This function takes an image source and a pixel crop object, and returns a cropped image file.
 * @param {string} baseImage - The source URL of the base image.
 * @param {object} croppedPixels - The pixel coordinates for cropping the image.
 * @param {number} pixelCrop.x - The x-coordinate of the top-left corner of the crop area.
 * @param {number} pixelCrop.y - The y-coordinate of the top-left corner of the crop area.
 * @param {number} pixelCrop.width - The width of the crop area.
 * @param {number} pixelCrop.height - The height of the crop area.
 */
export const cropImage = async (baseImage, croppedPixels) => {
  // Create a new image object and set the source
  const image = new Image();
  image.src = baseImage;
  // Wait for the image to be decoded
  await image.decode();
  
  // Create a canvas element and get the 2D context
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // Set the canvas dimensions to match the crop area
  canvas.width = croppedPixels.width;
  canvas.height = croppedPixels.height;
  // Draw the cropped image on the canvas
  ctx.drawImage(
    image,
    croppedPixels.x,
    croppedPixels.y,
    croppedPixels.width,
    croppedPixels.height,
    0,
    0,
    croppedPixels.width,
    croppedPixels.height
  );
  // Convert the canvas to a blob and create a file from the blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        resolve(file);
      } else {
        reject(console.log("Error occurred: Creating blob failed when cropping image"));
      }
    }, 'image/jpeg');
  });
};