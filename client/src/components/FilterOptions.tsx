import React, { FC } from "react";
import { Form } from "react-bootstrap";

interface IFilterOptionsProps {
  handleChange: (e: any) => void;
}

const FilterOptions: FC<IFilterOptionsProps> = ({ handleChange }) => {
  return (
    <Form.Select onChange={handleChange}>
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
