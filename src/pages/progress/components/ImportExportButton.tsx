import React, { useState } from "react";
import GoogleAnalytics from "react-ga4";
import formatProgressFileDownloadName from "../utils/formatProgressFileDownloadName";
import makeDownloadHref from "../../../utils/makeDownloadHref";
import type { MetWords } from "../../../types";
import ReactModal from "react-modal";
import PseudoContentButton from "../../../components/PseudoContentButton";

type Props = {
  metWords: MetWords;
  handleLoadProgress: () => void;
};

const ImportExportButton = ({ metWords, handleLoadProgress }: Props) => {
  const downloadProgress = () => {
    GoogleAnalytics.event({
      category: "Downloads",
      action: "Click",
      label: "typey-type-progress.json"
    });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [flashWarning, setFlashWarning] = useState("");
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="button">
        Import / Export
      </button>
      <ReactModal
        isOpen={modalOpen}
        aria={{
          labelledby: "aria-modal-heading",
          describedby: "aria-modal-description"
        }}
        ariaHideApp={true}
        closeTimeoutMS={300}
        role="dialog"
        onRequestClose={() => setModalOpen(false)}
        className={{
          "base": "modal",
          "afterOpen": "modal--after-open",
          "beforeClose": "modal--before-close"
        }}
        overlayClassName={{
          "base": "modal__overlay",
          "afterOpen": "modal__overlay--after-open",
          "beforeClose": "modal__overlay--before-close"
        }}
      >
        <div className="fr">
          <button
            className="de-emphasized-button hide-md"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </div>
        <h3 id="aria-modal-heading">Import / Export</h3>
        <div id="aria-modal-description">
          <div className="pl3 pr3 pt3 mx-auto mw-1024">
            <div className="panel bg-white dark:bg-coolgrey-1000 p3 mb3">
              <h2>Save your progress</h2>
              <p>
                Typey&nbsp;Type saves your brief progress in your browser’s
                local storage.
                <strong className="bg-danger dark:text-coolgrey-900">
                  {" "}
                  You’ll lose your progress if you clear your browsing data
                  (history, cookies, and cache).
                </strong>{" "}
                If you share this device with other people or use
                Typey&nbsp;Type across several devices and browsers, you should
                save your progress elsewhere. Copy your progress to your
                clipboard and save it in a text file somewhere safe. When you
                return, enter your progress to load it back into
                Typey&nbsp;Type.
              </p>
              <p className="mb0">
                <PseudoContentButton
                  className="js-clipboard-button link-button copy-to-clipboard mr1"
                  dataClipboardTarget="#js-metwords-from-typey-type"
                >
                  Copy progress to clipboard
                </PseudoContentButton>

                <a
                  href={makeDownloadHref(metWords)}
                  download={formatProgressFileDownloadName("typey-type-progress-")}
                  onClick={downloadProgress}
                  className="link-button px2 py1"
                >
                  Download progress file
                </a>
              </p>
            </div>

            <div className="panel bg-white dark:bg-coolgrey-1000 p3 mb3">
              <h2 className="mt0">Load your progress</h2>
              <p className="mt2 mb3">
                Restore your progress from a previous session by entering your
                saved progress and loading it into Typey&nbsp;Type. You can also
                clear your progress by loading in empty curly braces,{" "}
                <code>{"{}"}</code>.
              </p>
              <p className="mt4 mb0">
                <label
                  htmlFor="metwords-from-personal-store"
                  className="inline-block mb05"
                >
                  Enter your progress here:
                </label>
                <textarea
                  id="metwords-from-personal-store"
                  className="js-metwords-from-personal-store progress-textarea bg-info dark:text-coolgrey-900 px1 py05 bw-1 b--solid br-4 db w-100"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  rows={2}
                />
              </p>
              <p className="mt2 mb0">
                <PseudoContentButton
                  className="link-button load-progress"
                  onClick={() => {
                    handleLoadProgress();

                    setFlashWarning("To update your lesson progress, visit the lessons.");
                  }}
                >
                  Load progress from text
                </PseudoContentButton>
              </p>
            </div>
          </div>
          <div className={"mt1 mb0"}>
          </div>
        </div>

        <p
          className={flashWarning.length > 0 ? "bg-warning pl1 pr1" : "hide"}
          aria-live="polite"
        >
          {flashWarning}
        </p>
        <div className="text-right">
          <button className="button" onClick={() => setModalOpen(false)}>
            OK
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default ImportExportButton;
