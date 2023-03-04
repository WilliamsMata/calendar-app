import { render } from "@testing-library/react";
import { LoaderSpinnerIcon } from "../../../src/calendar/components/LoaderSpinnerIcon";

describe("Test in <LoaderSpinnerIcon />", () => {
  test("should show the component correctly", () => {
    const { container } = render(<LoaderSpinnerIcon />);

    expect(container).toMatchSnapshot();
  });
});
