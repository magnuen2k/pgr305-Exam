import React, { FC } from "react";
import { Form } from "react-bootstrap";

interface IFilterOptionsProps {
  handleChange: (e: any) => void;
  options: string[];
  defaultOption?: string;
}

// Custom select component for dropdown menu
const FilterOptions: FC<IFilterOptionsProps> = ({
  handleChange,
  options,
  defaultOption,
}) => {
  const handleOptions = () => {
    if (defaultOption) {
      options = options.filter((o) => o !== defaultOption);
      return <option value={defaultOption}>{defaultOption}</option>;
    } else {
      return <option>-- Show All --</option>;
    }
  };

  return (
    <Form.Select onChange={handleChange}>
      {handleOptions()}
      {options.map((o, key) => (
        <option key={key} value={o}>
          {o}
        </option>
      ))}
    </Form.Select>
  );
};

export default FilterOptions;
