import { convertMetresPerSecondToKilometresPerHour } from '../../utils/unitConversions';

type WindProps = {
  windSpeedMetresPerSecond?: number;
};

export const Wind = ({ windSpeedMetresPerSecond }: WindProps) => {
  if (!windSpeedMetresPerSecond) {
    return null;
  }

  return (
    <p>
      Wind:{' '}
      {Math.round(
        convertMetresPerSecondToKilometresPerHour(windSpeedMetresPerSecond)
      )}
      &nbsp;km/h
    </p>
  );
};
