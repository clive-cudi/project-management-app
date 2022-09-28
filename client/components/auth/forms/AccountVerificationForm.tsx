import React, { useState, useMemo } from "react";
import styles from "../../../styles/pages/account_verification.module.scss";
import { InputDiv, InputSelect, RegularBtn } from "../../reusable";

interface AccountVerificationForm_Props {
    profileImgURL?: string
}

export const AccountVerificationForm = ({profileImgURL}: AccountVerificationForm_Props): JSX.Element => {
    const [verificationData, setVerificationData] = useState({
        profilePicUrl: "",
        about: "",
        phone: "",
        language: "",
        timezone: "",
        gender: "",
        skills: [],
        country: "",
        location: "",
        street: ""
    });
    const languagesData = useMemo(()=> [], []);
    const timezonesData = useMemo(()=> [], []);
    const countryData = useMemo(()=> [], []);
    const genderData = useMemo(()=> [
        {
            gender: "male",
            value: "M"
        },
        {
            gender: "female",
            value: "F"
        },
        {
            gender: "non-binary",
            value: "N"
        }
    ], [])

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

        setVerificationData((prevVerificationData) => {
            return {
                ...prevVerificationData,
                [name]: value()
            }
        })
    }

    function submitVerification(): void {

    }

    return (
        <form className={styles.av_form} onSubmit={(e)=>{e.preventDefault()}}>
            
        </form>
    )
}