import React, { Component } from 'react';
import LessonCanvasFooter from '../pages/lessons/LessonCanvasFooter';
import FinishedZeroAndEmptyStateMessage from '../pages/lessons/FinishedZeroAndEmptyState';
import UserSettings from './UserSettings';
import { stitchTogetherLessonData, transformLessonDataToChartData } from '../utils/transformingFinishedData';
import FinishedActionButtons from '../pages/lessons/FinishedActionButtons';
import FinishedDataViz from '../pages/lessons/FinishedDataViz';
import FinishedMisstrokesSummary from '../pages/lessons/FinishedMisstrokesSummary';
import FinishedSummaryHeadings from '../pages/lessons/FinishedSummaryHeadings';
import 'react-tippy/dist/tippy.css';

// fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690="
const googleFormParam = "&entry.1202724812&entry.936119214";

const calculateScores = (duration, wordCount) =>
  duration > 0
    ? Math.round(Math.max(wordCount - 1, 0) / (duration / 60 / 1000))
    : 0;

class Finished extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTopSpeedPersonalBest: false,
      newTopSpeedToday: false,
      chartData: null,
      confettiConfig: null
    }
  }

  componentDidMount() {
    const wpm = calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);

    const lessonData = stitchTogetherLessonData(this.props.currentLessonStrokes, this.props.startTime, wpm);
    this.setState({chartData: transformLessonDataToChartData(lessonData)})

    const fasterSpeedToday = wpm > this.props.topSpeedToday;
    const fasterPersonalBest = wpm > this.props.topSpeedPersonalBest;
    const minimumStrokes = this.props.currentLessonStrokes.length > 3;
    const minimumSpeed = wpm > 3;
    const thirtyStrokesOrNotRevision = (!this.props.revisionMode || this.props.currentLessonStrokes.length >= 30);

    if (fasterSpeedToday && minimumStrokes && minimumSpeed && thirtyStrokesOrNotRevision && fasterPersonalBest) {
      this.setState({confettiConfig: {sparsity: 17, colors: 5}});
      this.props.updateTopSpeedToday(wpm);
      this.props.updateTopSpeedPersonalBest(wpm);
      this.setState({
        newTopSpeedPersonalBest: true,
        newTopSpeedToday: true
      });
    }
    else if (fasterSpeedToday && minimumStrokes && minimumSpeed && thirtyStrokesOrNotRevision) {
      this.setState({confettiConfig: {sparsity: 170, colors: 2}});
      this.props.updateTopSpeedToday(wpm);
      this.setState({
        newTopSpeedPersonalBest: false,
        newTopSpeedToday: true
      });
    }
    else {
      this.setState({
        newTopSpeedPersonalBest: false,
        newTopSpeedToday: false
      });
    }
  }

  render() {
    let numericAccuracy = 0;
    let accuracy = '';
    if (this.props.totalNumberOfMistypedWords === 0 && this.props.totalNumberOfHintedWords === 0) {
      accuracy = '100% accurate!';
      numericAccuracy = 100;
    }
    else if (this.props.totalNumberOfMistypedWords > 0) {
      // console.log("this.props.totalNumberOfNewWordsMet" + this.props.totalNumberOfNewWordsMet);
      // console.log("this.props.totalNumberOfLowExposuresSeen" + this.props.totalNumberOfLowExposuresSeen);
      // console.log("this.props.totalNumberOfRetainedWords" + this.props.totalNumberOfRetainedWords);
      // console.log("this.props.totalNumberOfHintedWords" + this.props.totalNumberOfHintedWords);
      // console.log("this.props.totalNumberOfMistypedWords" + this.props.totalNumberOfMistypedWords);
      //
      // Test for stopping the lesson before the end
      let accuracyPercent;
      if (this.props.currentLessonStrokes && this.props.currentLessonStrokes.length > 0) { // avoid division by zero
        accuracyPercent = (1 - ((this.props.totalNumberOfMistypedWords) / this.props.currentLessonStrokes.length)) * 100;
      } else { // this should never happen because first `if` code path handles zero state
        accuracyPercent = 100.0;
      }
      // console.log("Accuracy percent: " + accuracyPercent);
      let accuracyPercentRoundedToTwoDecimalPlaces = (Math.floor(accuracyPercent * 100) / 100);
      // console.log("Accuracy percent rounded: " + accuracyPercentRoundedToTwoDecimalPlaces);
      accuracy = '' + accuracyPercentRoundedToTwoDecimalPlaces + '% accuracy';
      numericAccuracy = accuracyPercentRoundedToTwoDecimalPlaces;
    }
    else if (this.props.totalNumberOfHintedWords >= 1) {
      accuracy = accuracy + '100% accurate! ';
      numericAccuracy = 100;
    }
    else {
      accuracy = ' Keep it up!';
      numericAccuracy = 0;
    }

    // When you have stroked nothing right, except hinted or misstroked words, show nothing instead of 0%
    if (accuracy === '0% accuracy!') {
      accuracy = '';
      numericAccuracy = 0;
    }
    const wpm = calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);
    if (wpm === 0) {
      accuracy = 'Keep trying!';
      numericAccuracy = 0;
    }

    return (
      <div>
        <div id="lesson-page" className="flex-wrap-md flex mx-auto mw-1920">
          <div id="main-lesson-area" className="flex-grow mx-auto mw-1440 min-w-0">
            <div className="mx-auto mw-1920">
              {this.props.settings?.customMessage && <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>}
            </div>
            <div className="mx-auto mw-1920 p3">
              <div className="lesson-canvas lesson-canvas--finished panel p3 mb3">
                {(this.props.lessonLength === 0) ?
                  <FinishedZeroAndEmptyStateMessage startFromWordSetting={this.props.userSettings.startFromWord} startFromWordOneClickHandler={this.props.startFromWordOne} suggestedNextUrl={this.props.suggestedNext} />
                  :
                  <div className="w-100">
                    <div className="finished-lesson mx-auto mw-1440">
                      <div className="finished-summary mb3 text-center">
                        <FinishedSummaryHeadings
                          confettiConfig={this.state.confettiConfig}
                          lessonTitle={this.props.lessonTitle}
                          newTopSpeedPersonalBest={this.state.newTopSpeedPersonalBest}
                          newTopSpeedToday={this.state.newTopSpeedToday}
                          wpm={wpm}
                        />
                        <FinishedDataViz
                          wpm={wpm}
                          numericAccuracy={numericAccuracy}
                          chartData={this.state.chartData}
                          totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
                          totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
                          totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
                          totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
                          totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
                          wordsTyped={this.props.currentLessonStrokes?.length || 0}
                          setAnnouncementMessage={this.props.setAnnouncementMessage}
                        />
                        <FinishedActionButtons
                          restartPath={process.env.PUBLIC_URL + this.props.path}
                          restartLesson={this.props.restartLesson}
                          suggestedNextUrl={this.props.suggestedNext}
                        />
                      </div>
                      <FinishedMisstrokesSummary
                        currentLessonStrokes={this.props.currentLessonStrokes}
                        globalUserSettings={this.props.globalUserSettings}
                        metWords={this.props.metWords}
                        path={this.props.path}
                        reviseLesson={this.props.reviseLesson}
                        showMisstrokesSummary={this.props.currentLessonStrokes.length > 0}
                        updateRevisionMaterial={this.props.updateRevisionMaterial}
                        userSettings={this.props.userSettings}
                      />
                    </div>
                  </div>
                }
              </div>
              <LessonCanvasFooter
                chooseStudy={this.props.chooseStudy}
                disableUserSettings={this.props.disableUserSettings}
                hideOtherSettings={this.props.hideOtherSettings}
                path={this.props.path}
                setAnnouncementMessage={this.props.setAnnouncementMessage}
                toggleHideOtherSettings={this.props.toggleHideOtherSettings}
                totalWordCount={this.props.totalWordCount}
                userSettings={this.props.userSettings}
              />
            </div>
            <p className="text-center"><a href={googleFormURL + encodeURIComponent(this.props.location?.pathname || '') + googleFormParam} className="text-small mt0" target="_blank" rel="noopener noreferrer" id="ga--lesson--give-feedback">Give feedback on this lesson (form opens in a new tab)</a></p>
          </div>
          <div>
            <UserSettings
              changeUserSetting={this.props.changeUserSetting}
              changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
              changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
              changeShowStrokesAs={this.props.changeShowStrokesAs}
              changeShowStrokesOnMisstroke={this.props.changeShowStrokesOnMisstroke}
              changeStenoLayout={this.props.changeStenoLayout}
              chooseStudy={this.props.chooseStudy}
              disableUserSettings={this.props.disableUserSettings}
              handleBeatsPerMinute={this.props.handleBeatsPerMinute}
              handleLimitWordsChange={this.props.handleLimitWordsChange}
              handleStartFromWordChange={this.props.handleStartFromWordChange}
              handleRepetitionsChange={this.props.handleRepetitionsChange}
              handleUpcomingWordsLayout={this.props.handleUpcomingWordsLayout}
              hideOtherSettings={this.props.hideOtherSettings}
              maxStartFromWord={this.props.lessonLength}
              path={this.props.path}
              revisionMode={this.props.revisionMode}
              setAnnouncementMessage={this.props.setAnnouncementMessage}
              toggleHideOtherSettings={this.props.toggleHideOtherSettings}
              totalWordCount={this.props.totalWordCount}
              userSettings={this.props.userSettings}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default Finished;
