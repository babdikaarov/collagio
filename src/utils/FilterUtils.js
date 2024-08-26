import { FilterTypes } from "./FilterTypes.js";

/**
 * Applies a filter to an image and returns the filtered image element.
 * @param {string} url - The URL of the image.
 * @param {number} [size=24] - The size of the reduced image (e.g., 24x24 pixels).
 * @param {string} filter - The filter to apply.
 * @returns {Promise<string>} -  A promise that resolves to a data URL of the filtered image.
 */
export async function generateFilteredImage(url, size = 24, filter = FilterTypes.BLUR) {
   // Cache for filtered images
   const cache = generateFilteredImage.cache || (generateFilteredImage.cache = new Map());

   // Check cache for existing image
   const cacheKey = `${url}`;
   if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
   }

   return new Promise((resolve, reject) => {
      const tempImage = new Image();
      tempImage.crossOrigin = "Anonymous";
      tempImage.src = url;

      tempImage.onload = () => {
         const canvas = document.createElement("canvas");
         const ctx = canvas.getContext("2d");

         if (ctx) {
            canvas.width = size;
            canvas.height = size;

            ctx.filter = FilterTypes[filter];
            ctx.drawImage(tempImage, 0, 0, size, size);

            const dataUrl = canvas.toDataURL("image/png");

            // Cache the result
            cache.set(cacheKey, dataUrl);

            // Resolve with the data URL
            resolve(dataUrl);
         } else {
            reject(new Error("Failed to get canvas context"));
         }
      };

      tempImage.onerror = () => {
         reject(new Error("Failed to load image"));
      };
   });
}
