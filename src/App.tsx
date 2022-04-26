import './App.css';
import { useState, useEffect } from 'react';
import ActionsMenu from './components/ActionsMenu';
import Pet from './components/Pet';
import moods from './lib/moods';
import { getNow, Hunger, Loneliness, Dirtiness, getIsSick, getIsDead } from './lib/intervals';
import { save, load } from './lib/storage';
import { useElapsedTime } from 'use-elapsed-time';
import TopBar from './components/TopBar';

function App() {
  const [birthTime, setBirthTime] = useState(load('birthTime'));
  const [age, setAge] = useState(0);
  const [mood, setMood] = useState(moods.unborn);
  const [justReceived, setJustReceived] = useState(false);

  const [lastFed, setLastFed] = useState(load('lastFed') || getNow());
  const [lastPetted, setLastPetted] = useState(load('lastPetted') || getNow());
  const [lastCleaned, setLastCleaned] = useState(load('lastCleaned') || getNow());
  const [lastHealthy, setLastHealthy] = useState(load('lastHealthy') || getNow());

  // use to trigger useEffect every second
  const { elapsedTime } = useElapsedTime({
    isPlaying: true,
    updateInterval: 1,
  });

  const checkAndTrack = () => {
    // check if already hatched
    if (birthTime === undefined) return;
    // track age
    if (mood !== moods.dead) setAge(getNow() - birthTime);
  };

  const setCurrentMood = () => {
    setMood(moods.happy);
    if (Hunger.needsFulfilment(lastFed)) {
      setMood(moods.hungry);
      if (Loneliness.needsFulfilment(lastPetted) && Dirtiness.needsFulfilment(lastFed))
        setMood(moods.hungryLonelyAndDirty);
      else if (Loneliness.needsFulfilment(lastPetted)) setMood(moods.hungryAndLonely);
      else if (Dirtiness.needsFulfilment(lastCleaned)) setMood(moods.hungryAndDirty);
    } else if (Loneliness.needsFulfilment(lastPetted)) {
      setMood(moods.lonely);
      if (Dirtiness.needsFulfilment(lastCleaned)) setMood(moods.lonelyAndDirty);
    } else if (Dirtiness.needsFulfilment(lastCleaned)) {
      setMood(moods.dirty);
    }
    // check if healthy or dead
    getIsSick(lastFed, lastPetted, lastCleaned) ? setMood(moods.sick) : setLastHealthy(getNow());
    if (getIsDead(lastHealthy) || Math.round(age / 86400) > 365) setMood(moods.dead);
  };

  const saveStates = () => {
    save('lastFed', lastFed);
    save('lastPetted', lastPetted);
    save('lastCleaned', lastCleaned);
    save('lastHealthy', lastHealthy);
  };

  useEffect(() => {
    checkAndTrack();
    setCurrentMood();
    saveStates();
  }, [elapsedTime, checkAndTrack, setCurrentMood, saveStates]);

  return (
    <div className="App">
      <TopBar
        mood={mood}
        setBirthTime={setBirthTime}
        setMood={setMood}
        age={age}
        lastFed={lastFed}
        lastPetted={lastPetted}
        lastCleaned={lastCleaned}
      />
      <Pet mood={mood} age={age} lastHealthy={lastHealthy} />
      <ActionsMenu
        mood={mood}
        lastHealthy={lastHealthy}
        setBirthTime={setBirthTime}
        setMood={setMood}
        setJustReceived={setJustReceived}
        setLastFed={setLastFed}
        setLastPetted={setLastPetted}
        setLastCleaned={setLastCleaned}
        setLastHealthy={setLastHealthy}
      />
    </div>
  );
}

export default App;
