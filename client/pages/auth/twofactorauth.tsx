import { useState, useEffect } from "react";
import styles from "../../styles/pages/auth/twofactorsetup.module.scss";
import { TwoFactorAuthVerifyForm, Modal, ErrorModal, Header } from "../../components";
import { useModal } from "../../hooks";
import Image from "next/image";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function TwoFactorAuthPage({isTwoFA}: {isTwoFA: boolean}) {
    const { modal } = useModal();
    const router = useRouter();

    useEffect(()=>{
        if (isTwoFA !== true) {
            router.push("/");
        }
    }, [isTwoFA])

    return (
        <div className={`app ${styles.tf_app}`}>
            <Header title="2FA Login" description="Project management app. Two Factor Auth Login." />
            <div className={`content ${styles.tf_content}`}>
                <div className={styles.tf_qr_image_wrapper}>
                    <div className={styles.tf_qr_image}>
                        <Image src={`/auth/two_factor_auth_illustration.jpg`} alt={"@FA Illustration"} layout={"fill"} />
                    </div>
                </div>
                <p>
                    Enter the code in the authenticator app that you used to register for Two Factor Authentication.
                </p>
                <div className={styles.tf_token_form_wrapper}>
                    <TwoFactorAuthVerifyForm />
                </div>
            </div>
            {
                modal.open === true && <Modal data={modal.data} />
            }
        </div>
    )
}

TwoFactorAuthPage.requireAuth = {
    auth: true,
    userType: "individual",
    multipleUserTypes: {
      status: true,
      supported: ["individual", "organization"],
    },
}

export async function getServerSideProps(ctx: {req: any, res: any}) {
    const {req, res} = ctx;
    const session = getSession({req});

    const { data } = await axios.get(`${process.env.BACKEND_API_URL}/auth/tfa-enabled`, {
        headers: {
            Authorization: (await session)?.user.token ?? ""
        }
    });

    if (data.isTwoFA.status !== true) {
        // redirect to homePage since 2FA is not enabled
        console.log('@FA disabled')
        res.writeHead(302, {
            Location: '/'
        });

        res.end();

        return {
            // redirect: {
            //     permanent: false,
            //     destination: "/"
            // },
            props: {
                isTwoFA: data.isTwoFA.status ?? null
            }
        }
    }

    return {
        props: {
            isTwoFA: data.isTwoFA.status ?? null
        }
    }
}