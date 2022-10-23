import { useEffect } from "react";
import styles from "../../styles/pages/auth/twofactorsetup.module.scss";
import { getSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { TwoFactorSetupTokenForm, Modal, Header } from "../../components";
import { useModal } from "../../hooks";

interface TwoFactorSetup_Props {
    qrcodeData: {
        qrImg: string,
        secret: {
            ascii: string,
            hex: string,
            base32: string
            otpauth_url: string
        }
    }
}

export default function TwoFactorSetup({ qrcodeData }: TwoFactorSetup_Props) {
    const { modal } = useModal();
    
    useEffect(()=>{console.log(qrcodeData)}, []);

    return (
        <div className={`app ${styles.tf_app}`}>
            <Header title="Enable 2FA" description="Project management app. Enable two factor authentication." />
            <div className={`content ${styles.tf_content}`}>
                <div className={styles.tf_qr_image_wrapper}>
                    <div className={styles.tf_qr_image}>
                        <Image src={qrcodeData.qrImg} alt={"Qr Code"} layout={"fill"} />
                    </div>
                </div>
                <p>
                    Scan the QR code using an Authenticator app such as Authy or Google Authenticator and fill in the token below.
                </p>
                <div className={styles.tf_token_form_wrapper}>
                    <TwoFactorSetupTokenForm base32Secret={qrcodeData.secret.base32} />
                </div>
            </div>
            {
                modal.open === true && <Modal data={modal.data} />
            }
        </div>
    )
}

export async function getServerSideProps(ctx: {req: any, res: any}) {
    const { req, res } = ctx;
    const session = getSession({req});
    const qrcodeData = await axios.post(`${process.env.BACKEND_API_URL}/auth/enabletwofactorstep1`, {}, {
        headers: {
            Authorization: (await session)?.user.token ?? ""
        }
    });

    console.log(qrcodeData);

    return {
        props: {
            qrcodeData: qrcodeData.data.resdata
        }
    }
}

TwoFactorSetup.requireAuth = {
    auth: true,
    userType: "individual",
    multipleUserTypes: {
      status: true,
      supported: ["individual", "organization"],
    },
}