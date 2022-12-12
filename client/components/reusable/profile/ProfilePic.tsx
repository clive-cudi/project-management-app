import { useRef, useState } from "react";
import styles from "../../../styles/components/reusable/profilepic.module.scss";
import { FcCameraIdentification } from "react-icons/fc";
import { HiUser } from "react-icons/hi";
import { clientS3, generateUserBucketConfig, generateS3ObjectURL } from "../../../utils";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useSession } from "next-auth/react";
import { api, UserQueries } from "../../../utils";
import { API_res_model } from "../../../types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

interface ProfilePic_Props {
    imageURL?: string
    alt?: string
    isLoading?: boolean
    upload?: boolean
    onFileLoad?: () => {}
}

export const ProfilePicUpload = ({imageURL, alt, upload, onFileLoad}: ProfilePic_Props): JSX.Element => {
    const inputPicRef = useRef<HTMLInputElement>(null);
    const session = useSession();
    const updateProfilePic = async (fileS3URL: string | URL): Promise<API_res_model & {picUrl: string}> => {
        return (await api.post(`/user/update-profile-picture`, {picUrl: fileS3URL}, {
            headers: {
                Authorization: session.data?.user.token ?? "",
            }
        })).data;
    }
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPicURL, setCurrentPicURL] = useState<string>("");

    const updatePicMutation = useMutation(
        {
            mutationFn: updateProfilePic,
            onMutate: () => {
                console.log(`Loading profile update API`)
            },
            onSuccess: (res) => {
                setIsLoading(false);
                console.log(res);
                if (res.success === true) {
                    setCurrentPicURL(res.picUrl);
                }
            },
            onSettled: () => {
                console.log(`Finished profile update request`)
            }
        }
    )

    function openFilePicker() {
        if (inputPicRef.current) {
            inputPicRef.current.click();
        }
    }

    return (
        <div className={`${styles.profile_pic_wrapper} ${isLoading ? styles.profile_pic_wrapper_loading : "" }`}>
            {
                currentPicURL ? <div><Image src={currentPicURL} alt={`${session.data?.user.name}`} layout={"fill"} /></div> : <span className={styles.profile_pic_placeholder}><HiUser /></span>
            }
            <button className={styles.profile_pic_upload_btn} onClick={openFilePicker}><FcCameraIdentification /></button>
            <input type={"file"} ref={inputPicRef} onChange={(e) => {
                console.log(session);
                console.log("File INPUT INIT")
                let fileReader = new FileReader();
                fileReader.onload = () => {
                    setIsLoading(true);
                    console.log("loading")
                    let picture = fileReader.result;
                    const file = e.target.files ? e.target.files[0] : null;
                    const metadata = {
                        contentType: file?.type
                    }
                    const userID = session.data?.user.uid ?? "";
                    const fileName = file?.name ?? `file${Math.random() * 100}`;
                    
                    clientS3.send(new PutObjectCommand(generateUserBucketConfig(userID, fileName, file))).then((res) => {
                        // forward url to MONGO
                        console.log(res);
                        const fileS3URL = generateS3ObjectURL(userID, fileName);

                        console.log(fileS3URL);

                        updatePicMutation.mutate(fileS3URL);

                        // api.post(`/user/update-profile-picture`, {
                        //     picUrl: fileS3URL
                        // }).then((res) => {
                        //     console.log(res);

                        // }).catch((err) => {
                        //     console.log(err);
                        // });
                    }).catch((pic_upload_err) => {
                        setIsLoading(false);
                        console.log(pic_upload_err)
                    })
                }

                if (e.target.files) {
                    fileReader?.readAsDataURL(e.target.files[0]);
                }
            }} />
        </div>
    )
}