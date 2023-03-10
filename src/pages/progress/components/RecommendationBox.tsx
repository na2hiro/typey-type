import React, { Component } from "react";
import GoogleAnalytics from "react-ga";
import OutboundLink from "../../../components/OutboundLink";
import RecommendationDescription from "./RecommendationDescription";
import { IconExternal } from "../../../components/Icon";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";

import type { FullRecommendationsStudyType } from "../../../types";

/**
 * Examples:
 * "https://play.typeracer.com/?universe=steno"
 * "/lessons/stories/proverbs/proverbs-starting-with-p/?recommended=true&study=practice&showStrokes=0&hideStrokesOnLastRepetition=1&newWords=1&seenWords=1&retainedWords=1&repetitions=1&limitNumberOfWords=0&sortOrder=sortOff"
 */
type RecommendationLink = string;

type RecommendedNextLesson = {
  /** Example: 15 */
  limitNumberOfWords: number | null;
  /** Example: 3 */
  repetitions: number | null;
  studyType: FullRecommendationsStudyType;
  /** Example: "One-syllable words with simple keys" */
  lessonTitle?: string; // FIXME: may not exist?
  link: RecommendationLink;
  /** Examples: "Proverbs starting with P" | "Play Type Racer" */
  linkTitle: string;
  /** Examples: "Practice Proverbs starting with P" | "Discover" */
  linkText?: string; // FIXME: may not be used?
};

type RecommendationHistory = {
  currentStep: FullRecommendationsStudyType;
};

type Props = {
  recommendedNextLesson: RecommendedNextLesson;
  startRecommendedStep: () => void;
  loadingLessonIndex: boolean;
  setAnnouncementMessage: () => void;
  recommendationHistory: RecommendationHistory;
  updateRecommendationHistory: (
    previousRecommendationHistory: RecommendationHistory
  ) => void;
};

class RecommendationBox extends Component<Props> {
  recommendAnotherLesson = () => {
    GoogleAnalytics.event({
      category: "Recommendations",
      action: "Skip recommended",
      label: this.props.recommendedNextLesson?.link || "BAD_INPUT",
    });

    const element = document.getElementById("js-skip-button");
    if (element) {
      element.focus();
    }

    this.props.updateRecommendationHistory(this.props.recommendationHistory);
  };

  render() {
    let recommendedNextLesson;
    let recommendedNextLessonHeading;
    let recommendedLink;
    let recommendedLinkTitle;
    let metadataStats;
    let studyType;
    let recommendedNextLessonCallToActionButton;
    let recommendedNextLessonHeadingClassNames =
      "mt0 pb1 bb b--brand-primary-tint mb3";

    if (
      this.props.recommendedNextLesson !== undefined &&
      !this.props.loadingLessonIndex
    ) {
      metadataStats = (
        <React.Fragment>
          {this.props.recommendedNextLesson.limitNumberOfWords}{" "}
          {this.props.recommendedNextLesson.limitNumberOfWords === 1
            ? "word"
            : "words"}{" "}
          | {this.props.recommendedNextLesson.repetitions} repetitions
        </React.Fragment>
      );

      studyType = this.props.recommendedNextLesson.studyType;
      if (studyType === "error") {
        metadataStats = <React.Fragment>No recommendation.</React.Fragment>;
      } else if (studyType === "wildcard") {
        metadataStats = <React.Fragment>External link.</React.Fragment>;
      } else if (studyType === "game") {
        metadataStats = (
          <React.Fragment>
            Solve puzzles to exercise your steno knowledge
          </React.Fragment>
        );
      } else if (studyType === "compete") {
        metadataStats = (
          <React.Fragment>
            Increase your speed while racing against others
          </React.Fragment>
        );
      } else if (studyType === "break") {
        metadataStats = (
          <React.Fragment>
            Take 5&nbsp;minutes or come&nbsp;back in 4+&nbsp;hours.
          </React.Fragment>
        );
      } else if (this.props.recommendedNextLesson.repetitions === 1) {
        metadataStats = (
          <React.Fragment>
            {this.props.recommendedNextLesson.limitNumberOfWords}{" "}
            {this.props.recommendedNextLesson.limitNumberOfWords === 1
              ? "word"
              : "words"}{" "}
            | {this.props.recommendedNextLesson.repetitions} repetition
          </React.Fragment>
        );
      }

      if (
        this.props.recommendedNextLesson &&
        this.props.recommendedNextLesson.lessonTitle &&
        this.props.recommendedNextLesson.lessonTitle.length < 10
      ) {
        metadataStats = (
          <React.Fragment>
            {this.props.recommendedNextLesson.limitNumberOfWords}{" "}
            {this.props.recommendedNextLesson.limitNumberOfWords === 1
              ? "word"
              : "words"}{" "}
            <br /> {this.props.recommendedNextLesson.repetitions} repetitions
          </React.Fragment>
        );
        if (this.props.recommendedNextLesson.repetitions === 1) {
          metadataStats = (
            <React.Fragment>
              {this.props.recommendedNextLesson.limitNumberOfWords}{" "}
              {this.props.recommendedNextLesson.limitNumberOfWords === 1
                ? "word"
                : "words"}{" "}
              <br /> {this.props.recommendedNextLesson.repetitions} repetition
            </React.Fragment>
          );
        }
      }

      switch (this.props.recommendedNextLesson.studyType) {
        case "error":
          recommendedNextLessonCallToActionButton = "Practice";
          recommendedNextLessonHeading = (
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended: error
            </h3>
          );
          break;
        case "practice":
          recommendedNextLessonCallToActionButton = "Practice";
          recommendedNextLessonHeading = (
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended: practice
            </h3>
          );
          break;
        case "drill":
          recommendedNextLessonCallToActionButton = "Drill";
          recommendedNextLessonHeading = (
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended: drill
            </h3>
          );
          break;
        case "revise":
          recommendedNextLessonCallToActionButton = "Revise";
          recommendedNextLessonHeading = (
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended: revise
            </h3>
          );
          break;
        case "discover":
          recommendedNextLessonCallToActionButton = "Discover";
          recommendedNextLessonHeading = (
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended: discover
            </h3>
          );
          break;
        case "break":
          recommendedNextLessonCallToActionButton = "Take a break";
          recommendedNextLessonHeading = (
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended: break
            </h3>
          );
          break;
        case "game":
          recommendedNextLessonCallToActionButton = "Play";
          recommendedNextLessonHeading = (
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended: game
            </h3>
          );
          break;
        case "compete":
          recommendedNextLessonCallToActionButton = "Compete";
          recommendedNextLessonHeading = (
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended: compete
            </h3>
          );
          break;
        default:
          recommendedNextLessonCallToActionButton = "Start now";
          recommendedNextLessonHeading = (
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended: practice
            </h3>
          );
          break;
      }

      if (this.props.recommendedNextLesson.link.startsWith("http")) {
        recommendedLink = (
          <OutboundLink
            eventLabel={recommendedNextLessonCallToActionButton}
            aria-label={
              recommendedNextLessonCallToActionButton +
              " (external link opens in new tab)"
            }
            to={this.props.recommendedNextLesson.link}
            onClick={this.props.startRecommendedStep}
            className="mr2 link-button dib"
            style={{ lineHeight: 2 }}
          >
            {recommendedNextLessonCallToActionButton}
            {/* @ts-ignore */}
            <Tooltip
              title="(external link opens in new tab)"
              className=""
              animation="shift"
              arrow="true"
              duration="200"
              tabIndex="0"
              tag="span"
              theme="didoesdigital"
              trigger="mouseenter focus click"
              onShow={this.props.setAnnouncementMessage}
            >
              <IconExternal
                ariaHidden="true"
                role="presentation"
                iconWidth="24"
                iconHeight="24"
                className="ml1 svg-icon-wrapper svg-baseline"
                iconTitle=""
              />
            </Tooltip>
          </OutboundLink>
        );
      } else {
        recommendedLink = (
          <Link
            onClick={this.props.startRecommendedStep}
            to={this.props.recommendedNextLesson.link}
            className="mr2 link-button dib"
            style={{ lineHeight: 2 }}
          >
            {recommendedNextLessonCallToActionButton}
          </Link>
        );
      }

      if (studyType === "error") {
        recommendedLinkTitle = "Unable to load recommendation";
        recommendedLink = (
          <a href="." className="mr2 link-button dib" style={{ lineHeight: 2 }}>
            Refresh
          </a>
        );
      } else {
        recommendedLinkTitle = this.props.recommendedNextLesson.linkTitle;
      }

      recommendedNextLesson = (
        <React.Fragment>
          <div className="panel bg-white dark:bg-coolgrey-1000 min-h-424 p5 mb3">
            {recommendedNextLessonHeading}
            <p className="mb0 mt4">
              <strong>{recommendedLinkTitle}</strong>
            </p>
            <p className="de-emphasized">{metadataStats}</p>
            <RecommendationDescription
              studyType={this.props.recommendedNextLesson.studyType}
            />
            <div className="flex flex-wrap">
              <div>{recommendedLink}</div>
              <button
                onClick={this.recommendAnotherLesson}
                id="js-skip-button"
                className="button button--secondary pl3 pr3"
              >
                Skip
              </button>
            </div>
          </div>
          <div className="flex flex-wrap content-start-ns">
            <div className="flex flex-wrap"></div>
          </div>
        </React.Fragment>
      );
    } else {
      recommendedNextLesson = (
        <React.Fragment>
          <div className="panel bg-white dark:bg-coolgrey-1000 min-h-424 p5 mb3">
            <h3 className={recommendedNextLessonHeadingClassNames}>
              Recommended…
            </h3>
            <p className="mb0 mt4">
              <strong>Loading…</strong>
            </p>
            <p className="de-emphasized"></p>
            <div className="flex flex-wrap">
              <div>
                <button
                  disabled
                  className="mr2 link-button dib"
                  style={{ lineHeight: 2 }}
                >
                  Loading…
                </button>
              </div>
              <button
                onClick={this.recommendAnotherLesson}
                id="js-skip-button"
                className="button button--secondary pl3 pr3"
              >
                Skip
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return <React.Fragment>{recommendedNextLesson}</React.Fragment>;
  }
}

export default RecommendationBox;
