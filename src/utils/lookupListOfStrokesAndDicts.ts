import { AffixList } from "../utils/affixList";
import rankOutlines from "../utils/transformingDictionaries/rankOutlines/rankOutlines";

import misstrokesJSON from "../json/misstrokes.json";
import getModifiedWordOrPhraseForLookup from "../utils/getModifiedWordOrPhraseForLookup";
import createListOfStrokes from "../utils/createListOfStrokes";

import type { LookupDictWithNamespacedDictsAndConfig } from "../types";

function lookupListOfStrokesAndDicts(
  phrase: string,
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig,
  affixList = AffixList.getSharedInstance()
) {
  let lookupText = phrase;
  let modifiedWordOrPhrase = lookupText.slice();
  modifiedWordOrPhrase = getModifiedWordOrPhraseForLookup(phrase);

  let listOfStrokesAndDicts = createListOfStrokes(
    modifiedWordOrPhrase,
    globalLookupDictionary
  );

  if (phrase === "{") {
    modifiedWordOrPhrase = "{^}" + lookupText;
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary)
    );
  }
  if (phrase === "}") {
    modifiedWordOrPhrase = lookupText + "{^}";
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      createListOfStrokes(modifiedWordOrPhrase, globalLookupDictionary)
    );
  }
  // if (phrase === "[") { listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes("{^}" + lookupText, globalLookupDictionary)); }
  // if (phrase === "]") { listOfStrokesAndDicts = listOfStrokesAndDicts.concat(createListOfStrokes(lookupText + "{^}", globalLookupDictionary)); }

  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{^}" + lookupText + "{^}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(
      modifiedWordOrPhrase,
      globalLookupDictionary
    );
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      listOfStrokesAndDictsWithSuppressedSpaces
    );
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{^}" + lookupText;
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(
      modifiedWordOrPhrase,
      globalLookupDictionary
    );
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      listOfStrokesAndDictsWithSuppressedSpaces
    );
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = lookupText + "{^}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(
      modifiedWordOrPhrase,
      globalLookupDictionary
    );
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      listOfStrokesAndDictsWithSuppressedSpaces
    );
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{^" + lookupText + "^}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(
      modifiedWordOrPhrase,
      globalLookupDictionary
    );
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      listOfStrokesAndDictsWithSuppressedSpaces
    );
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{^" + lookupText + "}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(
      modifiedWordOrPhrase,
      globalLookupDictionary
    );
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      listOfStrokesAndDictsWithSuppressedSpaces
    );
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{" + lookupText + "^}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(
      modifiedWordOrPhrase,
      globalLookupDictionary
    );
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      listOfStrokesAndDictsWithSuppressedSpaces
    );
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = "{" + lookupText + "}";
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(
      modifiedWordOrPhrase,
      globalLookupDictionary
    );
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      listOfStrokesAndDictsWithSuppressedSpaces
    );
  }
  if (listOfStrokesAndDicts.length === 0) {
    modifiedWordOrPhrase = lookupText.trim();
    let listOfStrokesAndDictsWithSuppressedSpaces = createListOfStrokes(
      modifiedWordOrPhrase,
      globalLookupDictionary
    );
    listOfStrokesAndDicts = listOfStrokesAndDicts.concat(
      listOfStrokesAndDictsWithSuppressedSpaces
    );
  }

  listOfStrokesAndDicts = rankOutlines(
    listOfStrokesAndDicts,
    misstrokesJSON,
    modifiedWordOrPhrase,
    affixList
  );

  return [listOfStrokesAndDicts, modifiedWordOrPhrase];
}

export default lookupListOfStrokesAndDicts;
