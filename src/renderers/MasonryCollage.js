// MasonryCollage.js
import { BaseCollage } from "./BaseCollage.js";

export class MasonryCollage extends BaseCollage {
   render(container, images) {
      console.log("Rendering masonry layout");
      container.innerHTML = '<div class="masonry-container"></div>'; // Example masonry container

      images.forEach((image) => {
         const imgElement = document.createElement("img");
         imgElement.src = image.src;
         imgElement.alt = image.alt || "";
         container.querySelector(".masonry-container").appendChild(imgElement);
      });

      console.log(this.getImageDetails());
   }
}
