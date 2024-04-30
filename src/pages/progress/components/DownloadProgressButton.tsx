import React from "react";
import GoogleAnalytics from "react-ga4";
import formatProgressFileDownloadName from "../utils/formatProgressFileDownloadName";
import makeDownloadHref from "../../../utils/makeDownloadHref";
import { useAtomValue } from "jotai";
import { metWordsState } from "../../../states/metWordsState";


const DownloadProgressButton = () => {
  const metWords = useAtomValue(metWordsState);
  const downloadProgress = () => {
    GoogleAnalytics.event({
      category: "Downloads",
      action: "Click",
      label: "typey-type-progress.json",
    });
  };

  return (
    <a
      href={makeDownloadHref(metWords)}
      download={formatProgressFileDownloadName("typey-type-progress-")}
      onClick={downloadProgress}
      className="link-button link-button-ghost table-cell mr1"
    >
      Download progress file
    </a>
  );
};

export default DownloadProgressButton;
