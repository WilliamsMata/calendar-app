import { render, screen } from "@testing-library/react";
import { CheckingAuthSpinner } from "../../src/components/CheckingAuthSpinner";

describe("Test in <CheckingAuthSpinner />", () => {
  test("should show the component correctly", () => {
    const { container } = render(<CheckingAuthSpinner />);

    expect(container).toMatchSnapshot();
  });
});
