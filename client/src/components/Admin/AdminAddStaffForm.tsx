import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { StaffContext } from "../../contexts/StaffContext";
import { IStaff } from "../../interfaces/IStaff";
import { StaffContextType } from "../../types/StaffContextType";
import { API_URL, STAFF_ROLES } from "../../utils/Constants";
import FilterOptions from "../shared/FilterOptions";
import { IResponse } from "../../interfaces/IResponse";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";
import { handleError, handleImageUpload } from "../../utils";

const AdminAddStaffForm = () => {
  const initialState = {
    name: "",
    club: "Liverpool FC",
    image: "klopp.jpeg",
    nationality: "",
    dateOfBirth: new Date(),
    role: "",
  };

  const [staff, setStaff] = useState<IStaff>(initialState);
  const [file, setFile] = useState<File>();
  const [response, setResponse] = useState<IResponse>();
  const { addStaff } = useContext(StaffContext) as StaffContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addNewStaff = async () => {
    // Upload image to server, if successful, add player to database
    if (file) {
      if ((await handleImageUpload(file, setIsLoading, setResponse)) === 201) {
        // Add staff to database
        let staffRes;

        // Try to POST new staff, else handle error
        try {
          staffRes = await addStaff(staff);
          setIsLoading(true);
        } catch (e: any) {
          handleError(e, setIsLoading, setResponse);
        }

        // If POST successful, display message in popup
        if (staffRes && staffRes.status === 201) {
          setIsLoading(false);
          setResponse({
            message: "Staff added successfully",
            statusCode: staffRes.status,
          });
        }
      }
    }

    // Clear input form
    setStaff(initialState);
  };

  const handleRole = (e: any) => {
    if (e.target.value === "default") {
      setStaff({ ...staff, role: "No role" });
    } else {
      setStaff({ ...staff, role: e.target.value });
    }
  };

  return (
    <div className="mb-2 mt-5">
      <Form>
        <Form.Group>
          <FormControl
            placeholder="Name"
            value={staff.name}
            onChange={(e) => setStaff({ ...staff, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            placeholder="Nationality"
            value={staff.nationality}
            onChange={(e) =>
              setStaff({ ...staff, nationality: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            placeholder="Nationality"
            type="date"
            onChange={(e) =>
              setStaff({ ...staff, dateOfBirth: new Date(e.target.value) })
            }
          />
        </Form.Group>
        <Form.Group>
          <FilterOptions handleChange={handleRole} options={STAFF_ROLES} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            onChange={(e: any) => {
              setStaff({ ...staff, image: e.target.files[0].name });
              setFile(e.target.files[0]);
            }}
          />
          {file ? "" : "You need to select a file to upload"}
        </Form.Group>
        <Button onClick={addNewStaff} disabled={!file}>
          Add staff
        </Button>
      </Form>
      {isLoading && <Loading />}
      {response && (
        <ResponseView
          message={response.message}
          statusCode={response.statusCode}
        />
      )}
    </div>
  );
};

export default AdminAddStaffForm;
