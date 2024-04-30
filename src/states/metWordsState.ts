import { atomWithStorage } from "jotai/utils";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import calculateSeenWordCount from "../utils/calculateSeenWordCount";
import calculateMemorisedWordCount from "../utils/calculateMemorisedWordCount";
import { userSettingsState } from "./userSettingsState";
import { MetWords } from "../types";

export const metWordsState = atomWithStorage("metWords", {} as MetWords);

export const useUpdateMetWords = () => {
  const [metWords, setMetWords] = useAtom(metWordsState);
  const { spacePlacement } = useAtomValue(userSettingsState);

  return (newMetWord: string) => {

    const newMetWordsState = Object.assign({}, metWords);
    const phraseText =
      spacePlacement === "spaceBeforeOutput"
        ? " " + newMetWord
        : spacePlacement === "spaceAfterOutput"
          ? newMetWord + " "
          : newMetWord;
    const meetingsCount = newMetWordsState[phraseText] || 0;
    newMetWordsState[phraseText] = meetingsCount + 1;
    setMetWords(newMetWordsState);
  };
};

export const useLoadMetWordsFromText = () => {
  const setMetWords = useSetAtom(metWordsState);

  return (source: string) => {
    if (source && source !== "") {
      try {
        let parsedSource = JSON.parse(source);
        if (parsedSource && typeof parsedSource === "object") {
          setMetWords(parsedSource);
        }
      } catch (error) {
      }
    }
  }
}

export const yourSeenWordCountState = atom((get) => calculateSeenWordCount(get(metWordsState)));
export const yourMemorisedWordCountState = atom((get) => calculateMemorisedWordCount(get(metWordsState)));
