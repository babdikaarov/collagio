import { GridCollageLayout } from '../layouts-grid';

// Helper function to create mock elements
function createMockElements(count: number) {
  const elements = [];
  for (let i = 0; i < count; i++) {
    const element = document.createElement('div');
    element.textContent = `Item ${i + 1}`;
    elements.push(element);
  }
  return elements;
}

describe('GridCollageLayout', () => {
  let container: HTMLElement;
  let elements: HTMLElement[];
  let gridCollageLayout: typeof GridCollageLayout.prototype;

  beforeEach(() => {
    // Set up the DOM
    document.body.innerHTML = '<div id="grid-container"></div>';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    container = document.getElementById('grid-container')!;

    // Create mock elements
    elements = createMockElements(5);

    // Initialize the GridCollageLayout
    gridCollageLayout = new GridCollageLayout(container, elements);
  });

  test('should apply the grid-collage-container class to the container', () => {
    gridCollageLayout.render();
    expect(container.classList.contains('grid-collage-container')).toBe(true);
  });

  test('should create grid items with the grid-collage-item class', () => {
    gridCollageLayout.render();
    const gridItems = container.querySelectorAll('.grid-collage-item');
    expect(gridItems.length).toBe(elements.length);
  });

  test('should append all elements to the container', () => {
    gridCollageLayout.render();
    expect(container.children.length).toBe(elements.length);
  });

  test('should ensure each grid item has the correct class for styling', () => {
    gridCollageLayout.render();
    const gridItems = container.querySelectorAll('.grid-collage-item');
    gridItems.forEach((item) => {
      expect(item.classList.contains('grid-collage-item')).toBe(true);
    });
  });
});
