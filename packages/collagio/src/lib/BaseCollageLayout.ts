/**
 * Represents the base layout for collages.
 */
export class BaseCollageLayout {
  /**
   * The container element where the collage will be rendered.
   */
  public container: HTMLElement;

  /**
   * The list of elements (e.g., images, divs) to be arranged in the collage layout.
   */
  public elements: HTMLElement[];

  /**
   * Additional options for configuring the collage layout.
   */
  public options?: Record<string, any>;

  /**
   * Creates an instance of BaseCollageLayout.
   *
   * @param {HTMLElement} container - The container element where the collage will be rendered.
   * @param {HTMLElement[]} elements - The list of elements to be arranged in the collage layout.
   * @param {Record<string, any>} [options] - Additional options for configuring the collage layout.
   */
  constructor(
    container: HTMLElement,
    elements: HTMLElement[],
    options?: Record<string, any>
  ) {
    this.container = container;
    this.elements = elements;
    this.options = options;
  }

  /**
   * Renders the collage layout by appending each element to the container.
   *
   * @returns {void}
   */
  public render(): void {
    console.log('Rendering with BaseCollageLayout');
    this.elements.forEach((element) => this.container.appendChild(element));
  }

  /**
   * Adds a new element to the collage and appends it to the container.
   *
   * @param {HTMLElement} element - The element to be added to the collage.
   * @returns {void}
   */
  public addElement(element: HTMLElement): void {
    this.container.appendChild(element);
  }
}
