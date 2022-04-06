import { FunctionComponent } from 'react';
import { getNow } from '../lib/intervals';
import moods from '../lib/moods';

interface ActionsMenuProps {
  setMood: (a: string) => void;
  setJustReceived: (a: boolean) => void;
  setLastFed: (a: number) => void;
  setLastPetted: (a: number) => void;
  setLastCleaned: (a: number) => void;
}

const ActionsMenu: FunctionComponent<ActionsMenuProps> = ({
  setMood,
  setJustReceived,
  setLastFed,
  setLastPetted,
  setLastCleaned,
}) => {
  return (
    <div className="actionsMenu">
      <button
        className="actionsMenuButton"
        onClick={() => {
          setLastFed(getNow());
          setMood(moods.fed);
          setJustReceived(true);
        }}
      >
        Feed
      </button>
      <button
        className="actionsMenuButton"
        onClick={() => {
          setLastPetted(getNow());
          setMood(moods.petted);
          setJustReceived(true);
        }}
      >
        Pet
      </button>
      <button
        className="actionsMenuButton"
        onClick={() => {
          setLastCleaned(getNow());
          setMood(moods.cleaned);
          setJustReceived(true);
        }}
      >
        Clean
      </button>
    </div>
  );
};

export default ActionsMenu;
