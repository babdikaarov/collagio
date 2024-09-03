/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseCollageLayout } from '@collagio/core';
import './layouts-grid.css';
/**
 * Represents a grid-based collage layout that extends the BaseCollageLayout.
 */
export class GridCollageLayout extends BaseCollageLayout {
  /**
   * Initializes a new instance of the GridCollageLayout class.
   *
   * @param {HTMLElement} container - The container element where the collage will be rendered.
   * @param {HTMLElement[]} elements - The elements to be arranged in the collage.
   * @param {Record<string, any>} options - Additional options for the layout.
   */
  constructor(
    container: HTMLElement,
    elements: HTMLElement[],
    options?: Record<string, any>
  ) {
    super(container, elements, options);
  }

  /**
   * Renders the grid collage layout by applying appropriate classes to the container
   * and each element, and appending them to the container.
   *
   * @returns {void}
   */
  public override render(): void {
    console.log('Rendering with GridCollageLayout');

    // Apply the grid container class
    this.container.className = 'grid-collage-container';

    // Create and append elements with the grid item class
    this.elements.forEach((element) => {
      element.classList.add('grid-collage-item');
      this.container.appendChild(element);
    });
  }

  /**
   * Adds a new element to the grid collage layout by applying the grid item class
   * and appending it to the container.
   *
   * @param {HTMLElement} element - The element to be added to the grid collage.
   * @returns {void}
   */
  public override addElement(element: HTMLElement): void {
    // Apply the grid item class and append the element
    element.classList.add('grid-collage-item');
    this.container.appendChild(element);
  }
}
