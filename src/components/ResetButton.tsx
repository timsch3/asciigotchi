import { FunctionComponent } from 'react';

interface ResetButtonProps {}

const ResetButton: FunctionComponent<ResetButtonProps> = () => {
  return (
    <div className="resetButtonContainer">
      <button id="resetButton">RESET</button>
    </div>
  );
};

export default ResetButton;
