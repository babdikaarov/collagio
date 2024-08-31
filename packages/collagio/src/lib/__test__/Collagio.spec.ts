// test/Collagio.spec.js
import { CreateCollagio } from "../CreateCollagio";
import { BaseCollageLayout } from "../BaseCollageLayout";

// Mock the DOM
beforeAll(() => {
   document.body.innerHTML = '<div id="test-container"></div>';
});

describe("Collagio", () => {
   test("should initialize and render with BaseCollageLayout", async () => {
      const createCollagio = new CreateCollagio();
      const collagio = createCollagio.setSelector("#test-container").build();

      // Adding some elements to be used for rendering
      collagio.elements = [document.createElement("div")];

      await collagio.init(); // Ensure the Collagio class is initialized

      // Check if the container is not empty
      const container = document.querySelector("#test-container");
      expect(container.innerHTML).toContain("<div></div>"); // Assuming the layout appends elements
   });

   test("should throw an error if selector is not set", () => {
      expect(() => {
         const createCollagio = new CreateCollagio();
         createCollagio.build(); // Should throw an error as selector is not set
      }).toThrow("Selector must be set");
   });
});
