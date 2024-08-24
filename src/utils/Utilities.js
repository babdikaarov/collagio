export class CollageUtils {
   static getImageData(image) {
      if (image instanceof HTMLImageElement) {
         // Ensure the image is loaded
         return new Promise((resolve, reject) => {
            if (image.complete) {
               // Image is already loaded
               resolve(this.processImage(image));
            } else {
               // Set up onload and onerror handlers
               image.onload = () => resolve(this.processImage(image));
               image.onerror = () => reject(new Error("Image failed to load."));
            }
         });
      } else {
         return Promise.reject(new Error("Provided element is not an HTMLImageElement."));
      }
   }

   static processImage(image) {
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
         ...this.getSrcSet(image),
      };
   }

   static getSrcSet(image) {
      if (image instanceof HTMLImageElement) {
         const srcset = image.srcset;
         const sizes = [];

         if (srcset) {
            // Split srcset by commas to get individual entries
            const entries = srcset.split(",");

            // Parse each entry to extract the size
            entries.forEach((entry) => {
               // Each entry is typically in the form "url size"
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
      } else {
         return {
            src: image.src,
            hasSrcSet: false,
            srcSetSizes: [],
         };
      }
   }

   static getTotalImages(images) {
      return images.length;
   }
}
