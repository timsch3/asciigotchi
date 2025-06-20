import { FunctionComponent } from 'react';
import { getNow, intervals, getIsDead } from '../lib/intervals';
import moods from '../lib/moods';
import { save } from '../lib/storage';
import IconEgg from './icons/egg.svg?react';
import IconFood from './icons/food.svg?react';
import IconPet from './icons/pet.svg?react';
import IconClean from './icons/clean.svg?react';

interface ActionsMenuProps {
  mood: string;
  lastHealthy: number;
  setBirthTime: (a: number) => void;
  setMood: (a: string) => void;
  setJustReceived: (a: boolean) => void;
  justReceived: boolean;
  setLastFed: (a: number) => void;
  setLastPetted: (a: number) => void;
  setLastCleaned: (a: number) => void;
  setLastHealthy: (a: number) => void;
}

const ActionsMenu: FunctionComponent<ActionsMenuProps> = ({
  mood,
  lastHealthy,
  setBirthTime,
  setMood,
  setJustReceived,
  justReceived,
  setLastFed,
  setLastPetted,
  setLastCleaned,
  setLastHealthy,
}) => {
  // hatching
  const handleHatch = () => {
    if (mood === moods.hatching) return;
    setMood(moods.hatching);
    setBirthTime(getNow());
    save('birthTime', getNow());
    setLastFed(getNow() - intervals.hunger / 1.4);
    setLastPetted(getNow() - intervals.loneliness / 1.8);
    setLastCleaned(getNow() - intervals.dirtiness / 1.1);
    setLastHealthy(getNow() - intervals.health / 1.1);
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
  if (mood === moods.unborn || mood === moods.hatching) {
    return (
      <div className="actionsMenu">
        <button onClick={handleHatch}>
          <IconEgg />
        </button>
      </div>
    );
  } else {
    if (!getIsDead(lastHealthy)) {
      return (
        <div className="actionsMenu">
          <button disabled={justReceived} onClick={handleAction(actions.FEED)}>
            <IconFood />
          </button>
          <button disabled={justReceived} onClick={handleAction(actions.PET)}>
            <IconPet />
          </button>
          <button disabled={justReceived} onClick={handleAction(actions.CLEAN)}>
            <IconClean />
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default ActionsMenu;
