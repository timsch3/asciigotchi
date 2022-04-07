import { FunctionComponent } from 'react';
import { getNow, intervals } from '../lib/intervals';
import moods from '../lib/moods';
import { save } from '../lib/storage';

interface ActionsMenuProps {
  birthTime: number | undefined;
  setBirthTime: (a: number) => void;
  setAge: (a: number) => void;
  setMood: (a: string) => void;
  setJustReceived: (a: boolean) => void;
  setLastFed: (a: number) => void;
  setLastPetted: (a: number) => void;
  setLastCleaned: (a: number) => void;
}

const ActionsMenu: FunctionComponent<ActionsMenuProps> = ({
  birthTime,
  setBirthTime,
  setAge,
  setMood,
  setJustReceived,
  setLastFed,
  setLastPetted,
  setLastCleaned,
}) => {
  const handleHatch = () => {
    setMood(moods.hatching);
    document.getElementById('pet')!.style.animation = 'hatch 2s ease-in-out infinite';
    setBirthTime(getNow());
    save('birthTime', getNow());
    setAge(1);
    setLastFed(getNow() - (intervals.hunger + 1));
    setLastPetted(getNow() - (intervals.loneliness + 1));
    setLastCleaned(getNow() - (intervals.dirtiness + 1));
    setJustReceived(true);
  };
  if (birthTime !== undefined) {
    return (
      <div className="actionsMenu">
        <button
          onClick={() => {
            setLastFed(getNow());
            setMood(moods.fed);
            setJustReceived(true);
          }}
        >
          Feed
        </button>
        <button
          onClick={() => {
            setLastPetted(getNow());
            setMood(moods.petted);
            setJustReceived(true);
          }}
        >
          Pet
        </button>
        <button
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
  } else {
    return (
      <div className="actionsMenu">
        <button
          onClick={() => {
            handleHatch();
          }}
        >
          Hatch
        </button>
      </div>
    );
  }
};

export default ActionsMenu;
