type TemperatureProps = {
  temperature?: number;
};

export const Temperature = ({ temperature }: TemperatureProps) => {
  if (!temperature) {
    return null;
  }

  return (
    <p>
      <strong>{Math.round(temperature)}&#176;C</strong>
    </p>
  );
};
