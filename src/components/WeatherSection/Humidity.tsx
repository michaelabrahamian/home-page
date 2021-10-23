type HumidityProps = {
  humidity?: number;
};

export const Humidity = ({ humidity }: HumidityProps) => {
  if (!humidity) {
    return null;
  }

  return <p>Humidity: {Math.round(humidity)}%</p>;
};
