import styles from "../styles/pages/login.module.scss";
import { Header, FormContainer, LoginForm, Modal } from "../components";
import Image from "next/image";
import { useModal } from "../hooks";

export default function Login() {
    const { modal } = useModal();

    return (
        <div className={`app ${styles.login_app}`}>
            <Header title="Login" description="Project management app. Login" />
            <div className={`content ${styles.login_content}`}>
                <div className={styles.login_col}>
                    <div className={styles.login_ill_wrapper}>
                        <Image src={"/auth/login_ill.png"} alt="Login Illustration Image" layout={"fill"} />
                        {/* <img src={"/auth/login_ill.png"} alt="Login Illustration" /> */}
                    </div>
                </div>
                <div className={styles.login_col}>
                    <div className={styles.login_form_wrapper}>
                        <FormContainer form={<LoginForm />} altLink={{link: "/signup", label: "New user? Sign Up here"}} />
                    </div>
                </div>
            </div>
            {modal.open == true && <Modal data={modal.data} />}
        </div>
    )
}