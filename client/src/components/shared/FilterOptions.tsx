import React, { FC } from "react";
import { Form } from "react-bootstrap";

interface IFilterOptionsProps {
  handleChange: (e: any) => void;
  options: string[];
}

// Custom select component for dropdown menu
const FilterOptions: FC<IFilterOptionsProps> = ({ handleChange, options }) => {
  return (
    <Form.Select onChange={handleChange}>
      <option>-- Show All --</option>
      {options.map((o, key) => (
        <option key={key} value={o}>
          {o}
        </option>
      ))}
    </Form.Select>
  );
};

export default FilterOptions;
