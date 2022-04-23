import { FunctionComponent } from 'react';
import { getNow, intervals, getIsDead } from '../lib/intervals';
import moods from '../lib/moods';
import { save } from '../lib/storage';
import { ReactComponent as IconEgg } from './icons/egg.svg';
import { ReactComponent as IconFood } from './icons/food.svg';

interface ActionsMenuProps {
  mood: string;
  lastHealthy: number;
  setBirthTime: (a: number) => void;
  setMood: (a: string) => void;
  setJustReceived: (a: boolean) => void;
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
    setLastFed(getNow() - intervals.hunger / 1.1);
    setLastPetted(getNow() - intervals.loneliness / 1.1);
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
          <button onClick={handleAction(actions.FEED)}>
            <IconFood />
          </button>
          <button onClick={handleAction(actions.PET)}>
            <IconFood />
          </button>
          <button onClick={handleAction(actions.CLEAN)}>
            <IconFood />
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default ActionsMenu;
