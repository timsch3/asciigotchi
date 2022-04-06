import { FunctionComponent } from 'react';
import { getNow } from '../lib/intervals';
import moods from '../lib/moods';

interface ActionsMenuProps {
  setMood: (a: string) => void;
  setJustReceived: (a: boolean) => void;
  lastFed: number;
  lastPetted: number;
  lastCleaned: number;
}

const ActionsMenu: FunctionComponent<ActionsMenuProps> = ({
  setMood,
  setJustReceived,
  lastFed,
  lastPetted,
  lastCleaned,
}) => {
  return (
    <div className="actionsMenu">
      <button
        className="actionsMenuButton"
        onClick={() => {
          lastFed = getNow();
          setMood(moods.fed);
          setJustReceived(true);
        }}
      >
        Feed
      </button>
      <button
        className="actionsMenuButton"
        onClick={() => {
          lastPetted = getNow();
          setMood(moods.petted);
          setJustReceived(true);
        }}
      >
        Pet
      </button>
      <button
        className="actionsMenuButton"
        onClick={() => {
          lastCleaned = getNow();
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
