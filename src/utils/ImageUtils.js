/**
 * Processes an HTMLImageElement to extract detailed image data.
 * This function should be used asynchronously, as it may involve image loading operations.
 *
 * @async
 * @param {HTMLImageElement} image - The image element to process.
 * @returns {Promise<Object>} - A promise that resolves to an object containing image data, including:
 *   @property {string} src - The source URL of the image.
 *   @property {number} naturalWidth - The natural (intrinsic) width of the image in pixels.
 *   @property {number} naturalHeight - The natural (intrinsic) height of the image in pixels.
 *   @property {number} aspectRatio - The aspect ratio of the image (width/height).
 *   @property {string} landscape - A descriptor of the image orientation, either "landscape", "portrait", or "square".
 *   @property {boolean} hasSrcSet - A boolean indicating if the image element has a `srcset` attribute.
 *   @property {Array<string>} srcSetSizes - An array of size descriptors extracted from the `srcset` attribute, if present.
 */
export function processImage(image) {
   const naturalWidth = image.naturalWidth;
   const naturalHeight = image.naturalHeight;
   const aspectRatio = naturalWidth / naturalHeight;
   const landscape = aspectRatio > 1 ? "landscape" : aspectRatio < 1 ? "portrait" : "square";

   return {
      src: image.src,
      naturalWidth,
      naturalHeight,
      aspectRatio,
      landscape,
      ...getSrcSet(image),
   };
}

/**
 * Extracts srcset information from an HTMLImageElement.
 * @param {HTMLImageElement} image - The image element to extract srcset from.
 * @returns {Object} - An object containing srcset data.
 */
export function getSrcSet(image) {
   if (!(image instanceof HTMLImageElement)) {
      return {
         src: image.src,
         hasSrcSet: false,
         srcSetSizes: [],
      };
   }

   const srcset = image.srcset;
   const sizes = [];

   if (srcset) {
      const entries = srcset.split(",");

      entries.forEach((entry) => {
         const parts = entry.trim().split(" ");
         if (parts.length === 2) {
            const size = parts[1];
            sizes.push(size);
         }
      });
   }

   return {
      src: image.src,
      hasSrcSet: !!srcset,
      srcSetSizes: sizes,
   };
}
