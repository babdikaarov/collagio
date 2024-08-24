// GridCollage.js
import { BaseCollage } from "./BaseCollage.js";

export class GridCollage extends BaseCollage {
   render(container, images, utilities) {
      console.log("Rendering grid layout");

      // Create a grid container div
      const gridContainer = document.createElement("div");

      // Apply typical grid collage styles through JavaScript
      gridContainer.style.display = "grid";
      gridContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(100px, 1fr))";
      gridContainer.style.gap = "10px"; // Spacing between grid items

      // Append images to the grid container
      images.forEach(async (image) => {
         const imgElement = document.createElement("img");
         imgElement.src = image.src;
         imgElement.srcset = image.srcset || "";
         imgElement.alt = image.alt || "";
         imgElement.style.width = "100%"; // Ensure images fit into the grid cells
         imgElement.style.height = "auto"; // Maintain aspect ratio
         gridContainer.appendChild(imgElement);

         console.log(await utilities.getImageData(imgElement));
         // console.log(utilities.getSrcSet(imgElement));
      });

      // Append the grid container to the main container
      container.appendChild(gridContainer);

      // console.log(utilities.getTotalImages(images));
   }
}
