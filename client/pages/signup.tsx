import styles from "../styles/pages/login.module.scss";
import { Header, FormContainer, Signupform, Modal } from "../components";
import Image from "next/image";
import { useModal } from "../hooks";

export default function Signup() {
    const { modal } = useModal();

    return (
        <div className={`app ${styles.login_app}`}>
            <Header title="Sign Up" description="Project management app. Sign Up." />
            <div className={`content ${styles.login_content}`}>
                <div className={styles.login_col}>
                    <div className={styles.login_ill_wrapper}>
                        <Image src={"/auth/signup_ill.png"} alt="Signup Illustration Image" layout={"fill"} />
                        {/* <img src={"/auth/signup_ill.png"} alt="Login Illustration" /> */}
                    </div>
                </div>
                <div className={styles.login_col}>
                    <div className={styles.login_form_wrapper}>
                        <FormContainer form={<Signupform />} altLink={{link: "/login", label: "Already have an account? Login"}} />
                    </div>
                </div>
            </div>
            {modal.open == true && <Modal data={modal.data} />}
        </div>
    )
}