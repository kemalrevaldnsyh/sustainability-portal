import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SustainabilityPortal from "./SustainabilityPortal";

describe("SustainabilityPortal", () => {
  it("shows overview as default page", () => {
    render(<SustainabilityPortal />);
    expect(screen.getByText("SLMS Sustainability Portal")).toBeInTheDocument();
  });

  it("filters document list from search input", () => {
    render(<SustainabilityPortal />);

    fireEvent.click(screen.getByText("Sustainability"));
    fireEvent.click(screen.getByText("Policy"));

    const search = screen.getByLabelText("Search documents");
    fireEvent.change(search, { target: { value: "Palm Oil" } });
    expect(screen.getByText("Showing 1 item")).toBeInTheDocument();

    fireEvent.change(search, { target: { value: "not-found-keyword" } });
    expect(screen.getByText("Showing 0 items")).toBeInTheDocument();
  });

  it("switches between list and grid document views", () => {
    render(<SustainabilityPortal />);

    fireEvent.click(screen.getByText("Sustainability"));
    fireEvent.click(screen.getByText("Policy"));

    expect(screen.getByRole("table")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Switch to grid view" }));
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("Code of Conduct")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Switch to list view" }));
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("resets search term when navigating away and back", () => {
    render(<SustainabilityPortal />);

    fireEvent.click(screen.getByText("Sustainability"));
    fireEvent.click(screen.getByText("Policy"));
    fireEvent.change(screen.getByLabelText("Search documents"), { target: { value: "Palm Oil" } });
    expect(screen.getByText("Showing 1 item")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Go back" }));
    fireEvent.click(screen.getByText("Policy"));

    expect(screen.getByDisplayValue("")).toBeInTheDocument();
    expect(screen.getByText("Showing 2 items")).toBeInTheDocument();
  });
});
