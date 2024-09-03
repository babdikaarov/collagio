/**
 * Represents the core Collagio class for managing and rendering collages.
 */
export class Collagio {
  /**
   * An instance of the currently active collage layout.
   */
  private collageInstance: any;

  /**
   * The CSS selector for the container element where the collage will be rendered.
   */
  private selector: string;

  /**
   * A map of available collage layouts.
   */
  private collages: Record<string, any>;

  /**
   * Additional options for configuring the collage instance.
   */
  private options: {
    elements?: HTMLElement[];
    layout?: string;
    [key: string]: any;
  };

  /**
   * The container element selected by the provided selector.
   */
  private container: HTMLElement | null;

  /**
   * The list of elements to be used in the collage.
   */
  private elements: HTMLElement[];

  /**
   * The name of the layout currently in use.
   */
  private layout: string;
  plugins: any;

  /**
   * Creates an instance of Collagio.
   *
   * @param {string} selector - The CSS selector for the container element.
   * @param {Record<string, any>} collages - A map of available collage layouts.
   * @param {Record<string, any>} options - Additional options for configuring the collage instance.
   */
  constructor(
    selector: string,
    collages: Record<string, any>,
    options: Record<string, any>
  ) {
    this.selector = selector;
    this.collages = collages;
    this.options = options;
    this.container = document.querySelector(selector);
    this.elements = options['elements'] || [];
    this.layout = this.options.layout || 'default';
    this.init();
  }

  /**
   * Initializes the collage by triggering the render method.
   *
   * @returns {void}
   */
  private init(): void {
    this.render();
  }

  /**
   * Renders the selected collage layout.
   *
   * @returns {Promise<void>}
   */
  private async render(): Promise<void> {
    try {
      if (this.container) {
        this.container.innerHTML = '';

        // Ensure the layout exists
        const LayoutClass = this.collages[this.layout];
        if (!LayoutClass) {
          throw new Error(`Layout "${this.layout}" not found.`);
        }

        // Render the selected layout
        this.collageInstance = new LayoutClass(
          this.container,
          this.elements,
          this.options
        );
        await this.collageInstance.render();
      }
    } catch (error) {
      console.error(error);

      // Fallback to default layout if available
      if (this.collages['default']) {
        console.warn('Falling back to default layout.');
        const DefaultLayoutClass = this.collages['default'];
        this.collageInstance = new DefaultLayoutClass(
          this.container,
          this.elements,
          this.options
        );
        await this.collageInstance.render();
      }
    }
  }

  /**
   * Updates the layout to a new layout and re-renders the collage.
   *
   * @param {string} layoutName - The name of the new layout to be applied.
   * @returns {this} - Returns the instance for method chaining.
   */
  public updateLayout(layoutName: string): this {
    // Validate layout name
    if (this.collages[layoutName]) {
      this.layout = layoutName;
      this.render(); // Re-render with the new layout
      return this;
    } else {
      console.error(
        `Layout "${layoutName}" not found. Available layouts: ${Object.keys(
          this.collages
        ).join(', ')}`
      );
      return this; // Ensure method chaining
    }
  }

  /**
   * Sets the elements to be used in the collage.
   *
   * @param {HTMLElement[]} elements - The list of elements to be used in the collage.
   * @returns {void}
   */
  public setElements(elements: HTMLElement[]): void {
    this.elements = elements;
  }

  /**
   * Adds a new element to the collage and renders it.
   *
   * @param {HTMLElement} element - The element to be added to the collage.
   * @returns {void}
   */
  public addElement(element: HTMLElement): void {
    this.elements.push(element);
    if (this.collageInstance) {
      this.collageInstance.addElement(element);
    }
  }

  /**
   * Uses a plugin by name or applies a plugin directly.
   *
   * @param {string | Function} nameOrPlugin - The name of the plugin or the plugin function itself.
   * @returns {any} - Returns the plugin if a name is provided, otherwise returns void.
   */
  public use(nameOrPlugin: string): any {
    if (typeof nameOrPlugin === 'string') {
      // Use plugin by name
      const plugin = this.plugins[nameOrPlugin];
      if (plugin) {
        return plugin; // Return the plugin to allow method chaining
      } else {
        throw new Error(`Plugin "${nameOrPlugin}" not found`);
      }
    }
  }
}
