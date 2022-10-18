import React, { useState, useMemo } from "react";
import styles from "../../styles/components/forms/addWorkSpaceForm.module.scss";
import { InputSelect, InputDiv, RegularBtn } from "../reusable";

export const AddWorkSpaceForm = () => {
  const [addWorkSpaceData, setAddWorkSpaceData] = useState({
    type: "",
    name: "",
    description: "",
    start: "",
    finish: "",
    health: "",
    priority: "",
    duration: "",
  });
  const selectData = useMemo<{
    [key: string]: { label: string; value: string }[];
  }>(() => {
    return {
      workSpaceTypes: [
        {
          label: "Project",
          value: "project",
        },
        {
          label: "Program",
          value: "program",
        },
      ],
      health: [
        {
          label: "On Plan",
          value: "on_plan",
        },
        {
          label: "Needs Attention",
          value: "needs_attention",
        },
        {
          label: "In Trouble",
          value: "in_trouble",
        },
      ],
      priority: [
        {
          label: "High",
          value: "high",
        },
        {
          label: "Normal",
          value: "normal",
        },
        {
          label: "Low",
          value: "low",
        },
      ],
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = e.target.name;
    const type = e.target.type;

    const value = () => {
      switch (type) {
        case "checkbox":
          return (e.target as HTMLInputElement).checked;
        default:
          return e.target.value;
      }
    };

    setAddWorkSpaceData((prevAdd) => {
      return {
        ...prevAdd,
        [name]: value(),
      };
    });
  };

  function checkInputs(): boolean {
    const { description, duration, ...requiredData } = addWorkSpaceData;

    if ([...Object.values(requiredData)].every(Boolean)) {
      return true;
    } else {
      // console.log(addWorkSpaceData);
      return false;
    }
  }

  function submitAdd(): void {
    if (checkInputs()) {
      console.log(addWorkSpaceData);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={styles.form}
    >
      <div className={`${styles.awsf_form_field}`}>
        <label>Work Space Type</label>
        <InputSelect
          options={[...selectData.workSpaceTypes]}
          defaultOption={{ label: "Choose WorkSpace Type", value: "" }}
          name={"type"}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles.awsf_form_field}`}>
        <label>Name</label>
        <InputDiv
          type={`text`}
          placeholder="Enter Project Name..."
          onChange={handleChange}
          inputArgs={{ name: "name" }}
        />
      </div>
      <div className={`${styles.awsf_form_field} ${styles.textarea_exception}`}>
        <label>Description</label>
        <textarea name="description" onChange={handleChange}></textarea>
      </div>
      <div className={`${styles.awsf_form_field} ${styles.multi_field}`}>
        <span>
          <label>Start Date</label>
          <InputDiv
            type={`date`}
            onChange={handleChange}
            inputArgs={{ name: "start" }}
          />
        </span>
        <span>
          <label>Finish Date</label>
          <InputDiv
            type={`date`}
            onChange={handleChange}
            inputArgs={{ name: "finish" }}
          />
        </span>
      </div>
      <div className={`${styles.awsf_form_field}`}>
        <label>Health</label>
        <InputSelect
          options={[...selectData.health]}
          defaultOption={{ label: "Choose Health ...", value: "" }}
          name={"health"}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles.awsf_form_field}`}>
        <label>Priority</label>
        <InputSelect
          options={[...selectData.priority]}
          defaultOption={{ label: "Choose Priority ...", value: "" }}
          name={"priority"}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles.awsf_form_field}`}>
        <label>Duration</label>
        <InputDiv
          type={`number`}
          onChange={handleChange}
          placeholder={`Enter Duration ...`}
          inputArgs={{ name: "duration" }}
        />
      </div>
      <div className={`${styles.awsf_form_field} ${styles.justify_center}`}>
        <RegularBtn
          type="submit"
          label="Done"
          variant="text"
          className={styles.awsf_form_submit_btn}
          onClick={submitAdd}
        />
      </div>
    </form>
  );
};
