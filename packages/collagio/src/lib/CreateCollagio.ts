import { Collagio } from './Collagio';
import { BaseCollageLayout } from './BaseCollageLayout';

/**
 * A builder class for creating and  configuring a Collagio instance.
 */
export class CreateCollagio {
  /**
   * The CSS selector for the container element where the collage will be rendered.
   */
  private selector: string | null;

  /**
   * Options for configuring the collage instance.
   */
  private options: Record<string, any>;

  /**
   * A map of available collage layouts.
   */
  private collages: Record<string, typeof BaseCollageLayout>;

  /**
   * Initializes a new instance of the CreateCollagio class.
   */
  constructor() {
    this.selector = null;
    this.options = {};
    this.collages = { default: BaseCollageLayout };
  }

  /**
   * Sets the CSS selector for the collage container.
   *
   * @param {string} selector - The CSS selector for the container element.
   * @returns {this} - Returns the instance for method chaining.
   * @throws {TypeError} - If the selector is not a string or does not start with "#".
   */
  public setSelector(selector: string): this {
    if (typeof selector !== 'string' || !selector.startsWith('#')) {
      throw new TypeError('Selector must be a string starting with "#"');
    }
    this.selector = selector;
    return this;
  }

  /**
   * Sets the options for configuring the collage instance.
   *
   * @param {Record<string, any>} options - The configuration options.
   * @returns {this} - Returns the instance for method chaining.
   * @throws {TypeError} - If the options are not an object.
   */
  public setOptions(options: Record<string, any>): this {
    if (typeof options !== 'object' || options === null) {
      throw new TypeError('Options must be an object');
    }
    this.options = options;
    return this;
  }

  /**
   * Adds a new collage layout to the collection of available layouts.
   *
   * @param {string} name - The name of the new collage layout.
   * @param {typeof BaseCollageLayout} layoutClass - The class constructor for the collage layout.
   * @returns {this} - Returns the instance for method chaining.
   * @throws {TypeError} - If the provided class is not a constructor of BaseCollageLayout.
   */
  public addCollageLayout(
    name: string,
    layoutClass: typeof BaseCollageLayout
  ): this {
    if (!(layoutClass.prototype instanceof BaseCollageLayout)) {
      throw new TypeError(
        `Value for layout "${name}" is not a constructor of BaseCollageLayout.`
      );
    }
    this.collages[name] = layoutClass;
    return this;
  }

  /**
   * Builds and returns a new instance of the Collagio class based on the provided configurations.
   *
   * @returns {Collagio} - A new Collagio instance.
   * @throws {Error} - If the selector is not set.
   */
  public build(): Collagio {
    if (!this.selector) {
      throw new Error('Selector must be set');
    }
    return new Collagio(this.selector, this.collages, this.options);
  }
}
