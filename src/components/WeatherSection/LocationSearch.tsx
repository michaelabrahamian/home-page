import { TextField } from '@mui/material';

type LocationSearchProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const LocationSearch = ({
  searchValue,
  setSearchValue,
}: LocationSearchProps) => (
  <TextField
    label="Location"
    id="location"
    variant="standard"
    style={{ width: '80%', marginBottom: 10 }}
    value={searchValue}
    onChange={(event) => setSearchValue(event.target.value)}
    autoFocus
  />
);
