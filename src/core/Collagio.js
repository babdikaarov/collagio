import { BaseCollage } from "/src/renderers/BaseCollage.js";
import { CollageUtils } from "/src/utils/Utilities.js";
import { FilterTypes } from "/src/utils/FilterTypes.js";

/**
 * Represents a collage layout manager.
 * @class
 */
export class Collagio {
   /**
    * Creates an instance of Collagio.
    * @param {string} selector - The CSS selector for the container element should be id.
    * @param {Object} [options={}] - Configuration options for the collage.
    * @param {Object} collages - Collage layout classes or a single class.
    * @throws {TypeError} Throws if the selector is not a string starting with "#" or options are invalid.
    */
   constructor(selector, options = {}, collages) {
      if (typeof selector !== "string" || !selector.startsWith("#")) {
         throw new TypeError('Selector must be a string starting with "#"');
      }
      if (typeof options !== "object") {
         throw new TypeError("Options must be an object");
      }
      if (options.images && !Array.isArray(options.images)) {
         throw new TypeError("Images must be an array");
      }
      if (options.layout && typeof options.layout !== "string") {
         throw new TypeError("Layout must be a string");
      }
      if (options.placeholderEffect && !Object.keys(FilterTypes).includes(options.placeholderEffect)) {
         throw new TypeError("Invalid placeholderEffect type");
      }

      if (collages instanceof BaseCollage) {
         this.collages = { default: collages.constructor };
         this.layout = options.layout || "default";
      } else if (typeof collages === "object" && Object.keys(collages).length > 0) {
         for (const [key, value] of Object.entries(collages)) {
            if (!(value.prototype instanceof BaseCollage)) {
               throw new TypeError(`Value for layout "${key}" is not a constructor of BaseCollage.`);
            }
         }
         this.collages = collages;
         if (Object.keys(collages).length === 1) {
            this.layout = Object.keys(collages)[0];
         } else {
            this.layout = options.layout || Object.keys(collages)[0];
            if (!this.collages[this.layout]) {
               throw new TypeError(
                  `Invalid layout "${this.layout}". Available layouts: ${Object.keys(collages).join(", ")}`,
               );
            }
         }
      } else {
         throw new TypeError("Collages must be an object with at least one class or a single class");
      }

      this.container = document.querySelector(selector);
      this.images = options.images || [];
      this.plugins = [];
      this.placeholderEffect = options.placeholderEffect || false; // Set default value

      if (options.containerClass) {
         this.container.classList.add(...options.containerClass.split(" "));
      }
      if (options.containerStyle) {
         Object.assign(this.container.style, options.containerStyle);
      }

      this.init();
   }

   /**
    * Initializes and renders the collage.
    */
   init() {
      this.render();
   }

   /**
    * Renders the collage based on the selected layout.
    * Handles asynchronous updates to ensure images are displayed as soon as they are ready.
    */
   async render() {
      this.container.innerHTML = "";
      const CollageClass = this.collages[this.layout] || this.collages.default;

      if (CollageClass) {
         const collageInstance = new CollageClass();
         await collageInstance.render(this.container, this.images, CollageUtils, this.placeholderEffect);
      } else {
         console.error("No layout class available.");
      }
   }

   /**
    * Update the layout
    */
   updateLayout() {
      if (Object.keys(this.collages).length === 1) {
         this.layout = Object.keys(this.collages)[0];
      } else {
         this.layout = this.options.layout || Object.keys(this.collages)[0];
         if (!this.collages[this.layout]) {
            throw new TypeError(
               `Invalid layout "${this.layout}". Available layouts: ${Object.keys(this.collages).join(", ")}`,
            );
         }
      }
      this.render(); // Re-render with the new layout
   }

   /**
    * Adds a plugin to the collage.
    * @param {Object} plugin - The plugin to add.
    * @param {Function} plugin.apply - The function to apply the plugin.
    * @returns {Collagio} The current instance for chaining.
    * @throws {TypeError} Throws if the plugin does not have an apply function.
    */
   use(plugin) {
      if (typeof plugin.apply !== "function") {
         throw new TypeError("Plugin must have an apply function");
      }
      this.plugins.push(plugin);
      return this;
   }
}
