type TemperatureProps = {
  temperature?: number;
};

export const Temperature = ({ temperature }: TemperatureProps) => (
  <p>{temperature ? Math.round(temperature) : 0}&#176;C</p>
);
