// test/CreateCollagio.spec.js
import { CreateCollagio } from "../CreateCollagio";
import { Collagio } from "../Collagio";
import { BaseCollageLayout } from "../BaseCollageLayout";

describe("CreateCollagio", () => {
   beforeAll(() => {
      document.body.innerHTML = '<div id="collage-container"></div>'; // Updated ID
   });
   test("should throw an error if selector is not a string starting with '#'", () => {
      expect(() => new CreateCollagio().setSelector("invalid").build()).toThrow(TypeError);
   });

   test("should throw an error if options are not an object", () => {
      expect(() => new CreateCollagio().setSelector("#collage-container").setOptions("invalid").build()).toThrow(
         TypeError,
      );
   });

   test("should add a collage layout and validate it", () => {
      class CustomCollageLayout extends BaseCollageLayout {}
      const creator = new CreateCollagio()
         .setSelector("#collage-container")
         .addCollageLayout("custom", CustomCollageLayout);

      expect(creator.collages.custom).toBe(CustomCollageLayout);
   });

   test("should build a Collagio instance with correct configurations", () => {
      class CustomCollageLayout extends BaseCollageLayout {}

      const collagio = new CreateCollagio()
         .setSelector("#collage-container")
         .setOptions({ elements: [document.createElement("div")] })
         .addCollageLayout("custom", CustomCollageLayout)
         .build();

      expect(collagio).toBeInstanceOf(Collagio);
      expect(collagio.selector).toBe("#collage-container");
      expect(collagio.collages.custom).toBe(CustomCollageLayout);
   });
});
