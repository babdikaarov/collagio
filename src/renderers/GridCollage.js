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
    * @param {string|false} imagePlaceholder - The type of filter to use for placeholders, or `false` to disable placeholders.
    * @returns {Promise<void>} - A promise that resolves when the rendering is complete.
    */
   async render(container, images, utils, imagePlaceholder) {
      container.innerHTML = "";

      // Apply grid styles to the container
      container.style.display = "grid";
      container.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))"; // Responsive grid columns
      container.style.gap = "16px"; // Gap between grid items
      container.style.padding = "10px"; // Optional padding for container
      container.style.margin = "0 auto"; // Center container horizontally

      for (const image of images) {
         const imageContainer = document.createElement("div");
         imageContainer.style.position = "relative";
         imageContainer.style.width = "100%";
         imageContainer.style.paddingBottom = "100%"; // Maintain aspect ratio (square)
         imageContainer.style.overflow = "hidden"; // Ensure images fit within the container

         if (imagePlaceholder) {
            // Generate and display the filtered placeholder image
            const placeholderImgElement = await utils.generateFilteredImage(image.src, 24, imagePlaceholder);
            placeholderImgElement.style.position = "absolute";
            placeholderImgElement.style.top = "0";
            placeholderImgElement.style.left = "0";
            placeholderImgElement.style.width = "100%";
            placeholderImgElement.style.height = "100%";
            placeholderImgElement.style.objectFit = "cover"; // Cover the container
            placeholderImgElement.style.transition = "opacity 1s ease";

            // Create and append the original image element
            const originalImgElement = new Image();
            originalImgElement.src = image.src;
            originalImgElement.srcset = image.srcset || "";
            originalImgElement.style.position = "absolute";
            originalImgElement.style.top = "0";
            originalImgElement.style.left = "0";
            originalImgElement.style.width = "100%";
            originalImgElement.style.height = "100%";
            originalImgElement.style.objectFit = "cover"; // Maintain aspect ratio and cover the container
            originalImgElement.style.opacity = "0";
            originalImgElement.style.transition = "opacity 1s ease";
            imageContainer.appendChild(placeholderImgElement);
            imageContainer.appendChild(originalImgElement);

            // Replace placeholder with the original image once it loads
            originalImgElement.onload = () => {
               placeholderImgElement.style.opacity = "0";
               originalImgElement.style.opacity = "1";
            };
            // try {
            //    console.log(await utils.getImageData(originalImgElement));
            // } catch (error) {
            //    console.error(error);
            // }
         } else {
            // Use the original image directly
            const imgElement = new Image();
            imgElement.src = image.src;
            imgElement.srcset = image.srcset || "";
            imgElement.style.position = "absolute";
            imgElement.style.top = "0";
            imgElement.style.left = "0";
            imgElement.style.width = "100%";
            imgElement.style.height = "100%";
            imgElement.style.objectFit = "cover"; // Maintain aspect ratio and cover the container
            imageContainer.appendChild(imgElement);
         }

         container.appendChild(imageContainer);
      }
   }
}
