import React, { FC } from "react";
import { Form } from "react-bootstrap";

interface IFilterOptionsProps {
  setFilterText: (value: string) => void;
  options: string[];
}

const FilterOptions: FC<IFilterOptionsProps> = ({ setFilterText, options }) => {
  return (
    <Form.Select onChange={(e) => setFilterText(e.target.value)}>
      <option>-- Show All --</option>
      {options.map((o) => (
        <option value={o}>{o}</option>
      ))}
    </Form.Select>
  );
};

export default FilterOptions;
