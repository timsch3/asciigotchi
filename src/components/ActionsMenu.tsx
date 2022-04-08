import { FunctionComponent } from 'react';
import { getNow, intervals } from '../lib/intervals';
import moods from '../lib/moods';
import { save } from '../lib/storage';

interface ActionsMenuProps {
  mood: string;
  setBirthTime: (a: number) => void;
  setAge: (a: number) => void;
  setMood: (a: string) => void;
  setJustReceived: (a: boolean) => void;
  setLastFed: (a: number) => void;
  setLastPetted: (a: number) => void;
  setLastCleaned: (a: number) => void;
}

const ActionsMenu: FunctionComponent<ActionsMenuProps> = ({
  mood,
  setBirthTime,
  setAge,
  setMood,
  setJustReceived,
  setLastFed,
  setLastPetted,
  setLastCleaned,
}) => {
  // hatching
  const handleHatch = () => {
    if (mood === moods.hatching) return;
    setMood(moods.hatching);
    document.getElementById('pet')!.style.animation = 'hatch 2s ease-in-out infinite';
    setBirthTime(getNow());
    save('birthTime', getNow());
    setLastFed(getNow() - (intervals.hunger + 1));
    setLastPetted(getNow() - (intervals.loneliness + 1));
    setLastCleaned(getNow() - (intervals.dirtiness + 1));
    setJustReceived(true);
  };
  // actions
  enum actions {
    FEED,
    PET,
    CLEAN,
  }
  const handleAction = (action: actions) => {
    return (event: React.MouseEvent) => {
      if (action === actions.FEED) {
        setLastFed(getNow());
        setMood(moods.fed);
      } else if (action === actions.PET) {
        setLastPetted(getNow());
        setMood(moods.petted);
      } else if (action === actions.CLEAN) {
        setLastCleaned(getNow());
        setMood(moods.cleaned);
      }
      setJustReceived(true);
    };
  };
  if (mood == moods.unborn || mood == moods.hatching) {
    return (
      <div className="actionsMenu">
        <button onClick={handleHatch}>Hatch</button>
      </div>
    );
  } else {
    return (
      <div className="actionsMenu">
        <button onClick={handleAction(actions.FEED)}>Feed</button>
        <button onClick={handleAction(actions.PET)}>Pet</button>
        <button onClick={handleAction(actions.CLEAN)}>Clean</button>
      </div>
    );
  }
};

export default ActionsMenu;
