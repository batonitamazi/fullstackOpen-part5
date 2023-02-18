import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog component testing", () => {
  const blog = {
    title: "პირველი ბლოგია",
    author: "თამაზ მირიანაშვილი",
    likes: 0,
    url: "http://localhost:3000",
  };
  const mockUpdate = jest.fn()
  const mockDelete = jest.fn()

  test("render title and author but not url and likes", () => {
    const { container }= render(<Blog blog={blog} deleteBlog={mockDelete} updateBlog={mockUpdate} />)
    expect(container).toHaveTextContent(
      'პირველი ბლოგია', 'თამაზ მირიანაშვილი'
    )
  })
  test("likes and url show if show button is clicked", () => {
    const component = render(<Blog blog={blog} deleteBlog={mockDelete} updateBlog={mockUpdate} />)
    const button = component.getByText('Show')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
      'http://localhost:3000'
    )
    expect(component.container).toHaveTextContent(
      '0'
    )
  })
});