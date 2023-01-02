import { useMemo, useState, ChangeEvent, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import styles from "../../styles/components/forms/createProjectForm.module.scss";
import {
  InputDiv,
  InputSelect,
  RegularBtn,
  IconBtn,
  DropdownMultiOptionChoosenWidget,
} from "../reusable";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useContextMenu } from "../../hooks";
import { useQuery } from "@tanstack/react-query";
import { UserQueries } from "../../utils";
import { useSession } from "next-auth/react";
import { clientRes, API_res_model } from "../../types";

export const CreateProjectForm = (): JSX.Element => {
  const projectStageData = useMemo(
    () => [
      { label: "New Project", value: "new" },
      { label: "Development", value: "development" },
      { label: "Launch", value: "launch" },
    ],
    []
  );
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    stage: "",
    client: "",
    bugdet: "",
    start: "",
    finish: "",
    description: "",
  });
  const { openAtCursor } = useContextMenu();
  // Fetch clients from backend
  const session = useSession();
  const { getClients } = UserQueries(session);
  const {
    data: client_info_data = {} as API_res_model & { clients: clientRes[] },
    isLoading: client_info_loading,
    isError: client_info_fetch_error,
  } = useQuery({
    queryKey: ["get_clients"],
    queryFn: getClients,
  });
  const [availableClients, setAvailableClients] =
    useState<{ clientID: string; name: string }[]>();
  // Initialize tippy.js
  const [choosenClients, setChoosenClients] = useState<
    { clientID: string; name: string }[]
  >([]);
  const addClientOptions = useMemo<JSX.Element[]>(
    () => [<button key={1}>Add a new Client</button>],
    []
  );

  useEffect(() => {
    setAvailableClients((prev) =>
      client_info_data
        ? client_info_data?.clients?.map((client_) => ({
            clientID: client_.cid,
            name: client_.firstName,
          }))
        : []
    );
  }, [client_info_data]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
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

    setNewProjectData((prevData) => ({
      ...prevData,
      [name]: value(),
    }));
  }

  function submitNewProject() {
    const { client, description, ...requiredData } = newProjectData;

    if ([...Object.values(requiredData)].every(Boolean)) {
      console.log("submitting project create");
    }
  }

  function addClientToChoiceList(client: { clientID: string; name: string }) {
    // check if the choice is already included
    // console.log(`
    //     client.clientID: ${client.clientID}
    //     client__: ${choosenClients}
    // `)
    // console.log(choosenClients.filter((client__) => client__.name === client.name ))
    if (!choosenClients.some((client__) => client__.clientID == client.clientID)) {
        setChoosenClients((prevChosen) => [...prevChosen, client]);
    }
  }

  function removeFromChoiceList(client: { clientID: string | number; name: string | number }) {
    console.log([...choosenClients].filter((val) => val.clientID !== client.clientID))
    setChoosenClients((prevChosen) =>
      [...prevChosen].filter((val) => val.clientID !== client.clientID)
    );
  }

  return (
    <form
      className={styles.cpf_form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={styles.cpf_form_strip}>
        <div className={styles.cpf_form_field}>
          <span>Project&nbsp;Name</span>
          <InputDiv
            type={`text`}
            placeholder={``}
            variant={"primary"}
            inputArgs={{ name: "name" }}
            onChange={handleChange}
          />
        </div>
        <div className={styles.cpf_form_field}>
          <span>Stage</span>
          <InputSelect
            options={projectStageData}
            name={"stage"}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.cpf_form_strip}>
        <div className={styles.cpf_form_field}>
          <span>Client&nbsp;Name</span>
          {/* <InputDiv type={`text`} placeholder={``} variant={"primary"} inputArgs={{name: "client"}} onChange={handleChange} /> */}
          {/* fetch clients related to the user for choosing */}
          {/* if the client doesn't exist in list, the user has to create a new client */}
          <div className={styles.cpf_multi_option_input}>
            {choosenClients.map((choosen_client) => (
              <DropdownMultiOptionChoosenWidget
                label={choosen_client.name}
                value={choosen_client.clientID}
                onCancel={(e, val) => {removeFromChoiceList({clientID: val.value, name: val.label})}}
              />
            ))}
          </div>
          <IconBtn
            id={"add_client_btn"}
            icon={<BsPlus />}
            variant={"util"}
            data-elm-type={"icon-btn-add"}
            onClick={(e) => {
              openAtCursor(
                e,
                (availableClients?.map((available_client) => (
                  <button
                    onClick={() => {
                      addClientToChoiceList(available_client);
                    }}
                  >
                    {available_client.name}
                  </button>
                )).concat(<button onClick={() => {}}>Add new Client</button>) ?? [])
              );
            }}
          />
        </div>
      </div>
      <div className={styles.cpf_form_strip}>
        <div className={styles.cpf_form_field}>
          <span>Budget</span>
          <InputDiv
            type={`text`}
            placeholder={``}
            variant={"primary"}
            inputArgs={{ name: "budget" }}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.cpf_form_strip}>
        <div className={styles.cpf_form_field}>
          <span>Start&nbsp;Date</span>
          <InputDiv
            type={`date`}
            placeholder={``}
            variant={"primary"}
            inputArgs={{ name: "start" }}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.cpf_form_strip}>
        <div className={styles.cpf_form_field}>
          <span>Closing&nbsp;Date</span>
          <InputDiv
            type={`date`}
            placeholder={``}
            variant={"primary"}
            inputArgs={{ name: "finish" }}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.cpf_form_strip}>
        <div
          className={`${styles.cpf_form_field} ${styles.textarea_exception}`}
        >
          <span>Description</span>
          <textarea name={"description"} onChange={handleChange}></textarea>
        </div>
      </div>
      <div
        className={`${styles.cpf_form_strip} ${styles.cpf_form_submit_exception}`}
      >
        <RegularBtn type={"submit"} label={`Save`} onClick={() => {}} />
      </div>
    </form>
  );
};
