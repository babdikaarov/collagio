import { BaseCollageLayout } from '../BaseCollageLayout';

describe('BaseCollageLayout', () => {
  let container: HTMLElement;
  let elements: HTMLElement[];

  beforeEach(() => {
    container = document.createElement('div');
    elements = [document.createElement('div'), document.createElement('img')];
  });

  test('should render elements correctly', () => {
    const layout = new BaseCollageLayout(container, elements);
    layout.render();

    expect(container.children.length).toBe(2);
    expect(container.children[0].tagName).toBe('DIV');
    expect(container.children[1].tagName).toBe('IMG');
  });
});
