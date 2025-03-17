import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header"; 

describe("Header Component", () => {
  test("renders default text when no text is provided", () => {
    render(<Header />);
    expect(screen.getByText("Selected Words Will Appear Here")).toBeInTheDocument();
  });

  test("renders provided text", () => {
    render(<Header text="Hello, World!" />);
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });

  test("displays formatted category name", () => {
    render(<Header category="test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("calls clearHeader function when Clear button is clicked", () => {
    const clearHeaderMock = vi.fn();
    render(<Header clearHeader={clearHeaderMock} />);
    fireEvent.click(screen.getByText("Clear"));
    expect(clearHeaderMock).toHaveBeenCalled();
  });

  test("calls playHeader function when Play button is clicked", () => {
    const playHeaderMock = vi.fn();
    render(<Header playHeader={playHeaderMock} />);
    fireEvent.click(screen.getByText("Play"));
    expect(playHeaderMock).toHaveBeenCalled();
  });

  test("calls toggleTTS function when TTS Settings button is clicked", () => {
    const toggleTTSMock = vi.fn();
    render(<Header toggleTTS={toggleTTSMock} />);
    fireEvent.click(screen.getByText("TTS Settings"));
    expect(toggleTTSMock).toHaveBeenCalled();
  });

  test("Back button calls history.back", () => {
    global.history.back = vi.fn();
    render(<Header />);
    fireEvent.click(screen.getByText("Back"));
    expect(global.history.back).toHaveBeenCalled();
  });
});
