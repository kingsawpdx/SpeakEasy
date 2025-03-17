import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextToSpeech from "../Components/TextToSpeech"; // Adjust path if needed
import { vi } from "vitest";

describe("TextToSpeech Component", () => {
  beforeAll(() => {
    // Mock speechSynthesis and getVoices
    global.window.speechSynthesis = {
      getVoices: vi.fn(() => [
        { name: "Voice 1", lang: "en-US" },
        { name: "Voice 2", lang: "en-GB" },
      ]),
    };
  });

  test("renders when displaySettings is true", () => {
    render(<TextToSpeech displaySettings={true} />);
    expect(screen.getByText("Voice:")).toBeInTheDocument();
  });

  test("updates pitch slider value", () => {
    const setPitchMock = vi.fn();
    render(<TextToSpeech displaySettings={true} pitch={1} setPitch={setPitchMock} />);
    
    const pitchSlider = screen.getByLabelText("Pitch:");
    fireEvent.change(pitchSlider, { target: { value: "1.5" } });

    expect(setPitchMock).toHaveBeenCalledWith(1.5);
  });

  test("updates speed slider value", () => {
    const setRateMock = vi.fn();
    render(<TextToSpeech displaySettings={true} rate={1} setRate={setRateMock} />);
    
    const rateSlider = screen.getByLabelText("Speed:");
    fireEvent.change(rateSlider, { target: { value: "1.8" } });

    expect(setRateMock).toHaveBeenCalledWith(1.8);
  });
});
