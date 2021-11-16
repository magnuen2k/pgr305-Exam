import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { StaffContext } from "../../contexts/StaffContext";
import { IStaff } from "../../interfaces/IStaff";
import { StaffContextType } from "../../types/StaffContextType";
import { API_URL } from "../../utils/Constants";

const AdminAddStaffForm = () => {
  const initialState = {
    name: "",
    club: "Liverpool FC",
    image: "klopp.jpeg",
    nationality: "",
    dateOfBirth: new Date(),
    role: "",
  };

  const roles = ["Manager", "Coach", "Scout", "Physiotherapist"];

  const [staff, setStaff] = useState<IStaff>(initialState);
  const [file, setFile] = useState<File>();
  const [response, setResponse] = useState<string>("");
  const { addStaff } = useContext(StaffContext) as StaffContextType;

  const addNewStaff = async () => {
    if (file) {
      let data = new FormData();
      data.append("file", file);
      let res;

      try {
        res = await axios({
          method: "POST",
          url: `${API_URL}/ImageUpload/SaveImage`,
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (e) {
        console.log(e);
      }

      if (res?.status === 201) {
        let staffRes;

        try {
          staffRes = addStaff(staff);
        } catch (e) {
          console.log(e);
        }

        console.log(staffRes);
      }
    }

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
          <Form.Select onChange={handleRole}>
            <option value="default">-- Choose role --</option>
            {roles.map((role, key) => (
              <option key={key} value={role}>
                {role}
              </option>
            ))}
          </Form.Select>
          {/* <FormControl
            placeholder="Position"
            value={player.position}
            onChange={(e) => setPlayer({ ...player, position: e.target.value })}
          /> */}
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
        <Button onClick={addNewStaff} disabled={file ? false : true}>
          Add staff
        </Button>
      </Form>
    </div>
  );
};

export default AdminAddStaffForm;
