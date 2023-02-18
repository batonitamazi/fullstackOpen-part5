import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm /> testing blogform component", () => {
  const createBlog = jest.fn();

  test("it received as props with the right details when a new blog is created", () => {
    const { container } = render(<BlogForm createBlog={createBlog} />);
    const input = container.querySelector("#title");
    const form = container.querySelector("form");

    fireEvent.change(input, {
      target: { value: "პირველი ბლოგია" },
    });
    fireEvent.submit(form);
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("პირველი ბლოგია");
  });
});
