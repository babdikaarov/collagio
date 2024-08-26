import { BaseCollage } from "/src/renderers/BaseCollage.js";

/**
 * Represents a grid collage layout.
 * @class
 * @extends BaseCollage
 */
export class GridCollage extends BaseCollage {
   /**
    * Renders the grid collage.
    *
    * @param {HTMLElement} container - The container element where the collage will be rendered.
    * @param {Array<Object>} images - The array of image objects containing image data.
    * @param {CollageUtils} utils - An object containing utility functions for processing images and generating placeholders.
    * @param {string|false} placeholderEffect - The type of filter to use for placeholders, or `false` to disable placeholders.
    * @param {number} [maxColumns=3] - The maximum number of grid columns (default is 3).
    * @returns {Promise<void>} - A promise that resolves when the rendering is complete.
    */
   async render(container, images, utils, placeholderEffect) {
      utils.loadStylesheet("/src/renderers/Grid/gridCollageStyle.css"); // absolute path
      container.innerHTML = "";
      container.classList.add("grid_collage_container");

      // Create an array of promises for processing images
      const imagePromises = images.map(async (image) => {
         const imageContainer = document.createElement("div");
         imageContainer.classList.add("grid-collage-item");

         if (placeholderEffect) {
            // Generate the filtered placeholder image
            const placeholderDataImage = await utils.generateFilteredImage(image.src, 24, placeholderEffect);

            // Create and configure the original image element
            const originalImgElement = new Image();
            const placeholder = new Image();
            placeholder.src = placeholderDataImage;
            originalImgElement.src = image.src;
            originalImgElement.srcset = image.srcset || "";
            placeholder.classList.add("grid-collage-placeholder");
            originalImgElement.classList.add("grid-collage-image-loaded");
            originalImgElement.onload = () => {
               placeholder.style.opacity = "0";
               originalImgElement.style.opacity = "1";
            };

            imageContainer.appendChild(placeholder);
            imageContainer.appendChild(originalImgElement);
         } else {
            // Create and configure the image element
            const imgElement = new Image();
            imgElement.src = image.src;
            imgElement.srcset = image.srcset || "";
            imgElement.classList.add("grid-collage-image");
            imageContainer.appendChild(imgElement);
         }

         return imageContainer; // Return the image container for use in Promise.all
      });

      // Wait for all image processing to complete
      const imageContainers = await Promise.all(imagePromises);

      // Append all image containers to the main container
      imageContainers.forEach((imageContainer) => container.appendChild(imageContainer));
   }
}
