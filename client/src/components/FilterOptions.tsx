import React, { FC } from "react";
import { Form } from "react-bootstrap";

interface IFilterOptionsProps {
  setFilterText: (value: string) => void;
}

const FilterOptions: FC<IFilterOptionsProps> = ({ setFilterText }) => {
  return (
    <Form.Select onChange={(e) => setFilterText(e.target.value)}>
      <option>-- Filter by position --</option>
      <option value="Keeper">Keeper</option>
      <option value="Defender">Defender</option>
      <option value="Midfielder">Midfielder</option>
      <option value="Forward">Forward</option>
      <option value="reset">Reset</option>
    </Form.Select>
  );
};

export default FilterOptions;
