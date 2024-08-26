/**
 * @namespace FilterTypes
 * @description Provides a set of predefined filter types that can be used with image processing.
 * @property {string} BLUR_GRAYSCALE - Applies a blur and grayscale filter to the image.
 * @property {string} BLUR - Applies a blur filter to the image.
 * @property {string} BRIGHTNESS_CONTRAST - Adjusts the brightness and contrast of the image.
 * @property {string} SEPIA - Applies a sepia filter to the image.
 * @example
 * // Usage
 * const filterType = FilterTypes.BLUR;
 */
export const FilterTypes = Object.freeze({
   BLUR_GRAYSCALE: "blur(4px) grayscale(100%)",
   BLUR: "blur(1px) ",
   BRIGHTNESS_CONTRAST: "brightness(120%) contrast(80%)",
   SEPIA: "sepia(100%)",
   // Add more filter types here
});
