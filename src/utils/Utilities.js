import { generateFilteredImage } from "./FilterUtils.js";
import { processImage } from "./ImageUtils.js";


export class CollageUtils {
   /**
    * Asynchronously retrieves image data from an HTMLImageElement.
    * This method processes the image to extract its properties such as dimensions, aspect ratio, and srcset data.
    *
    * @async
    * @param {HTMLImageElement} image - The image element to process.
    * @returns {Promise<Object>} - A promise that resolves to an object containing the processed image data, including:
    *   @property {string} src - The source URL of the image.
    *   @property {number} naturalWidth - The natural (intrinsic) width of the image in pixels.
    *   @property {number} naturalHeight - The natural (intrinsic) height of the image in pixels.
    *   @property {number} aspectRatio - The aspect ratio of the image (width/height).
    *   @property {string} landscape - A descriptor of the image orientation, either "landscape", "portrait", or "square".
    *   @property {boolean} hasSrcSet - A boolean indicating if the image element has a `srcset` attribute.
    *   @property {Array<string>} srcSetSizes - An array of size descriptors extracted from the `srcset` attribute, if present.
    * @throws {Error} - Throws an error if the provided element is not an HTMLImageElement or if the image fails to load.
    */
   static async getImageData(image) {
      if (image instanceof HTMLImageElement) {
         return new Promise((resolve, reject) => {
            if (image.complete) {
               resolve(processImage(image));
            } else {
               image.onload = () => resolve(processImage(image));
               image.onerror = () => reject(new Error("Image failed to load."));
            }
         });
      } else {
         return Promise.reject(new Error("Provided element is not an HTMLImageElement."));
      }
   }

   /**
    * Returns the total number of images in an array.
    *
    * @param {Array} images - An array of image objects or elements.
    * @returns {number} - The total count of images in the array.
    */
   static getTotalImages(images) {
      return images.length;
   }

   /**
    * Asynchronously generates a filtered version of an image from a given URL.
    * This method applies a filter to the image and resizes it according to the specified dimensions.
    *
    * @async
    * @param {string} url - The URL of the image to filter.
    * @param {number} [size=24] - The size (width and height) in pixels for the filtered image. Defaults to 24x24 pixels.
    * @param {string} filter - The type of filter to apply to the image (e.g., "blur", "grayscale").
    * @returns {Promise<HTMLImageElement>} - A promise that resolves to an HTMLImageElement containing the filtered image.
    * @throws {Error} - Throws an error if the image fails to load or if the filter cannot be applied.
    */
   static async generateFilteredImage(url, size = 24, filter) {
      return generateFilteredImage(url, size, filter);
   }
}
