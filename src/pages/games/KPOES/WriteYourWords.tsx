import React, { useEffect, useState } from "react";
import PseudoContentButton from "../../../components/PseudoContentButton";
import YourWordsHighlighted from "./YourWordsHighlighted";
import Legend from "./Legend";
import WordCount from "./WordCount";

import type { UserSettings } from "../../../types";
import { useUpdateMultipleMetWords } from "./updateMultipleMetWords";

type Props = {
  userSettings: UserSettings;
};

const wordsStorageKey = "typey-KPOES-words";
const timeStorageKey = "typey-KPOES-time";
const fourHours = 1000 * 60 * 60 * 4;

const YourWords = ({
  userSettings,
}: Props) => {
  const updateMultipleMetWords = useUpdateMultipleMetWords();
  const [wordCount, setWordCount] = useState(0);
  const [yourWords, setYourWords] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage) {
        let yourKPOESwords = window.localStorage.getItem(wordsStorageKey);
        let yourKPOEStime = window.localStorage.getItem(timeStorageKey);
        if (
          yourKPOESwords &&
          yourKPOEStime &&
          Date.now() - (+yourKPOEStime || 0) < fourHours
        ) {
          setYourWords(yourKPOESwords);
        }
      }
    } catch (error) {
      console.error("Unable to read local storage. ", error);
    }
  }, []);

  const changeYourWordsHandler: React.ChangeEventHandler<HTMLTextAreaElement> =
    (event) => {
      setWordCount(
        event.target.value.trim().split(/\s/).filter(Boolean).length
      );

      const slicedYourWords = event.target.value.slice(0, 10000);
      setYourWords(slicedYourWords);

      try {
        window.localStorage.setItem(wordsStorageKey, slicedYourWords);
        window.localStorage.setItem(timeStorageKey, `${Date.now()}`);
      } catch (error) {
        console.error("Unable to write to local storage. ", error);
      }
    };

  const doneHandler: React.MouseEventHandler = () => {
    setDone(true);

    updateMultipleMetWords(yourWords.split(/\s/));

    const copyButton = document.querySelector(
      ".js-clipboard-button"
    ) as HTMLButtonElement;

    if (copyButton) {
      copyButton.focus();
    }
  };

  return (
    <div>
      {done ? (
        <>
          <p className="mb0">
            You wrote <WordCount wordCount={wordCount} />:
          </p>
          <div
            id="your-words"
            className="db lh1-5 py05 px1 bg-info dark:text-coolgrey-900 bw-1 b--solid b--brand-primary-tint br-4 w-100 mw100"
          >
            <YourWordsHighlighted
              yourWords={yourWords}
              userSettings={userSettings}
            />
          </div>
          <PseudoContentButton
            className="js-clipboard-button button button--secondary table-cell mt3 mr2 copy-to-clipboard"
            style={{ lineHeight: 2 }}
            dataClipboardTarget="#your-words"
          >
            Copy your words to clipboard
          </PseudoContentButton>
          <Legend />
        </>
      ) : (
        <>
          <p className="mb1">
            <label htmlFor="write-your-words">Write your words</label>
          </p>
          <textarea
            id="write-your-words"
            className="input-textarea bg-info dark:text-coolgrey-900 bw-1 b--solid br-4 db w-100 mw100"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={changeYourWordsHandler}
            rows={6}
            value={yourWords}
          />
          <p className="mt1">
            <WordCount wordCount={wordCount} />
          </p>
          <button className="button mr2" onClick={doneHandler}>
            Done
          </button>
        </>
      )}
    </div>
  );
};

export default YourWords;
