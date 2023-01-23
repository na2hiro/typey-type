import React from "react";
import {
  shouldShowStroke,
  splitBriefsIntoStrokes,
} from "../../../utils/typey-type";

import getStenoDiagram from "../utilities/getStenoDiagram";
import getMapBriefsFn from "../utilities/getMapBriefsFn";
import StrokeTipHidden from "./StrokeTipHidden";

export default function StrokeTip({
  changeShowStrokesInLesson,
  currentStroke,
  showStrokesInLesson,
  targetStrokeCount,
  userSettings,
  repetitionsRemaining,
}) {
  const isMultiline = userSettings.upcomingWordsLayout === "multiline";
  const showStroke = shouldShowStroke(
    showStrokesInLesson,
    userSettings.showStrokes,
    repetitionsRemaining,
    userSettings.hideStrokesOnLastRepetition
  );

  const StenoLayoutDiagram = getStenoDiagram(userSettings.stenoLayout);
  const mapBriefsFunction = getMapBriefsFn(userSettings.stenoLayout);

  const layoutTypeStyle =
    userSettings.stenoLayout === "stenoLayoutKoreanModernCSteno"
      ? " heavy-type-face--korean"
      : userSettings.stenoLayout === "stenoLayoutJapaneseSteno"
      ? " type-face--japanese"
      : "";

  const diagramWidth = (userSettings.diagramSize || 1) * 140;

  return (
    <div className="mb6">
      {showStroke && currentStroke ? (
        <div
          className={`stroke-tip${isMultiline ? " flex justify-center" : ""}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className="visually-hidden"
            aria-hidden={userSettings.showStrokesAsDiagrams ? "true" : "false"}
          >
            Hint:{" "}
          </span>
          {userSettings.showStrokesAsDiagrams ? (
            <div className={`flex flex-wrap mr05${isMultiline ? " ml1" : ""}`}>
              {splitBriefsIntoStrokes(currentStroke).map(
                (strokeToDraw, index) => (
                  <React.Fragment key={index}>
                    {Object.values(mapBriefsFunction(strokeToDraw)).some(
                      (item) => item
                    ) && (
                      <div
                        className={`mt1 mr3${
                          isMultiline ? " flex flex-grow justify-center" : ""
                        }`}
                      >
                        <StenoLayoutDiagram
                          classes="steno-diagram-svg"
                          id={"diagramID-" + index + "-" + strokeToDraw}
                          {...mapBriefsFunction(strokeToDraw)}
                          brief={strokeToDraw}
                          diagramWidth={diagramWidth}
                        />
                      </div>
                    )}
                    {Object.values(mapBriefsFunction(strokeToDraw)).every(
                      (item) => !item
                    ) && (
                      <div
                        className={`mt1 mr3 relative unknown-steno-diagram${
                          isMultiline ? " flex flex-grow justify-center" : ""
                        }`}
                        aria-hidden={true}
                      >
                        <StenoLayoutDiagram
                          classes="steno-diagram-svg"
                          id={"diagramID-" + index + "-" + strokeToDraw}
                          {...mapBriefsFunction("")}
                          brief=""
                          diagramWidth={diagramWidth}
                        />
                      </div>
                    )}
                  </React.Fragment>
                )
              )}
            </div>
          ) : (
            <div className={"db" + layoutTypeStyle}>
              <pre
                className={`overflow-auto mw-408 text-small${
                  isMultiline ? " flex" : ""
                }`}
              >
                <span
                  className="steno-stroke pa05 text-small"
                  aria-label={[...currentStroke].join(" ").replace("-", "dash")}
                >
                  {[...currentStroke].map((item, i) => (
                    <React.Fragment key={i}>{item}</React.Fragment>
                  ))}
                </span>
              </pre>
            </div>
          )}
        </div>
      ) : (
        <StrokeTipHidden
          isMultiline={isMultiline}
          showStrokesInLesson={showStrokesInLesson}
          changeShowStrokesInLesson={changeShowStrokesInLesson}
          targetStrokeCount={targetStrokeCount}
        />
      )}
    </div>
  );
}