import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { store } from "../../../src/store";

describe("Test in <FabDelete />", () => {
  test("Should display the component correctly", () => {
    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );
    screen.debug();
  });
});
