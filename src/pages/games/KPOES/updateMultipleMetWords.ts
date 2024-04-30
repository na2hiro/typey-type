import { useAtom, useAtomValue } from "jotai";
import { metWordsState } from "../../../states/metWordsState";
import { userSettingsState } from "../../../states/userSettingsState";

export function useUpdateMultipleMetWords() {
  const { spacePlacement } = useAtomValue(userSettingsState);
  const [metWords, setMetWords] = useAtom(metWordsState);

  return (newMetWords: string[]) => {
    const newMetWordsState = Object.assign({}, metWords);

    for (const newMetWord of newMetWords) {
      const phraseText =
        // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation.
        spacePlacement === "spaceBeforeOutput"
          ? " " + newMetWord
          : // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation.
          spacePlacement === "spaceAfterOutput"
            ? newMetWord + " "
            : newMetWord;
      const meetingsCount = newMetWordsState[phraseText] || 0;
      newMetWordsState[phraseText] = meetingsCount + 1;
    }

    setMetWords(newMetWordsState);
  };
}
