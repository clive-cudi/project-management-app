import React, { useState, useMemo, useEffect} from "react";
import styles from "../../../styles/pages/account_verification.module.scss";
import { InputDiv, InputSelect, RegularBtn } from "../../reusable";
import { useServices } from "../../../hooks";

interface AccountVerificationForm_Props {
    profileImgURL?: string
}

export const AccountVerificationForm = ({profileImgURL}: AccountVerificationForm_Props): JSX.Element => {
    const { getCountriesOptionList, getTimeZoneList, languageData } = useServices();
    const [verificationData, setVerificationData] = useState({
        profilePicUrl: "",
        about: "",
        phone: "",
        language: "en",
        timezone: "Africa/Nairobi",
        gender: "",
        skills: [],
        country: "KE",
        location: "",
        street: ""
    });
    const languagesData = useMemo(()=> languageData, [languageData]);
    // const timezonesData = useMemo(()=> [], []);
    const [timezonesData, setTimezonesData] = useState([])
    const [countryData, setCountryData] = useState([]);
    const genderData = useMemo(()=> [
        {
            label: "Choose your gender...",
            value: ""
        },
        {
            label: "male",
            value: "M"
        },
        {
            label: "female",
            value: "F"
        },
        {
            label: "non-binary",
            value: "N"
        }
    ], []);

    useEffect(()=> {
        console.log("setting list")
        getTimeZoneList().then((tzList)=> {setTimezonesData(tzList as [])})
        getCountriesOptionList().then((list)=> {setCountryData(list as [])});
    }, [getCountriesOptionList, getTimeZoneList]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const type = e.target.type;
        const name = e.target.name;

        const value = () => {
            switch (type) {
                case "checkbox":
                    return (e.target as HTMLInputElement).checked;
                default:
                    return e.target.value;
            }
        }

        console.log(value());

        setVerificationData((prevVerificationData) => {
            return {
                ...prevVerificationData,
                [name]: value()
            }
        })
    }

    function checkInputs():boolean {
        return true;
    }

    function submitVerification(): void {
        if (checkInputs()) {
            console.log(verificationData)
        }
    }

    return (
        <form className={styles.av_form} onSubmit={(e)=>{e.preventDefault()}}>
            <fieldset>
                <legend>Phone Number *</legend>
                <InputDiv type={`tel`} placeholder={`+254 ...`} onChange={(e)=>{handleChange(e)}} inputArgs={{name: "phone"}} />
            </fieldset>
            <fieldset>
                <legend>Choose your Language:</legend>
                <InputSelect options={languagesData} defaultOption={{label: "English", value: "en"}} name={"language"} onChange={(e)=>{handleChange(e)}} />
            </fieldset>
            <fieldset>
                <legend>Choose your timezone:</legend>
                <InputSelect options={timezonesData} defaultOption={{label: "Africa/Nairobi", value: "Africa/Nairobi"}} name={"timezone"} onChange={handleChange} />
            </fieldset>
            <fieldset>
                <legend>Choose your Country:</legend>
                <InputSelect options={countryData} defaultOption={{label: "Kenya", value: "KE"}} onChange={handleChange} name={"country"} />
            </fieldset>
            <fieldset>
                <legend>Gender: *</legend>
                <InputSelect options={genderData} onChange={handleChange} name={"gender"} />
            </fieldset>
            <fieldset>
                <legend>Skills</legend>
            </fieldset>
            <div className={styles.av_form_verify_btn}>
                <RegularBtn type="submit" label="Verify" onClick={()=>{submitVerification()}} />
            </div>
        </form>
    )
}