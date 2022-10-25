import styles from "../../styles/pages/auth/twofactorsetup.module.scss";
import { TwoFactorAuthVerifyForm, Modal, ErrorModal, Header } from "../../components";
import { useModal } from "../../hooks";
import Image from "next/image";

export default function TwoFactorAuthPage() {
    const { modal } = useModal();

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