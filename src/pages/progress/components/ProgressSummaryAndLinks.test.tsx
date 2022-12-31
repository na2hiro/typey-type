import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProgressSummaryAndLinks from "./ProgressSummaryAndLinks";
import metWordsNovice from "../../../fixtures/metWordsNovice.json";

describe("progress summary and links", () => {
  it("renders", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <ProgressSummaryAndLinks
            metWords={metWordsNovice}
            restartConfetti={() => undefined}
            yourMemorisedWordCount={1}
            yourSeenWordCount={1}
            yourWordCount={2}
          />
        </Route>
      </Router>
    );
    const textElement = screen.getByText(/successfully typed/i);
    expect(textElement).toBeInTheDocument();
  });

  it("celebrates finishing Typey Type", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <ProgressSummaryAndLinks
            metWords={metWordsNovice}
            restartConfetti={() => undefined}
            yourMemorisedWordCount={10000}
            yourSeenWordCount={10000}
            yourWordCount={20000}
          />
        </Route>
      </Router>
    );
    const textElement = screen.getByText(/You rock!/i);
    expect(textElement).toBeInTheDocument();
  });

  it("hides Discover link when Typey Type is finished", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <div data-testid="test-wrapper">
            <ProgressSummaryAndLinks
              metWords={metWordsNovice}
              restartConfetti={() => undefined}
              yourMemorisedWordCount={10000}
              yourSeenWordCount={10000}
              yourWordCount={20000}
            />
          </div>
        </Route>
      </Router>
    );

    expect(screen.getByText(/Practice/i)).toBeInTheDocument();
    expect(screen.getByTestId("test-wrapper")).not.toHaveTextContent(
      "Discover"
    );
  });

  it("hides Drill link when there are no memorised words yet", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <div data-testid="test-wrapper">
            <ProgressSummaryAndLinks
              metWords={metWordsNovice}
              restartConfetti={() => undefined}
              yourMemorisedWordCount={0}
              yourSeenWordCount={10}
              yourWordCount={10}
            />
          </div>
        </Route>
      </Router>
    );

    expect(screen.getByText(/Revise/i)).toBeInTheDocument();
    expect(screen.getByTestId("test-wrapper")).not.toHaveTextContent("Drill");
  });
});
