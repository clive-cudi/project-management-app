import styles from "../styles/pages/login.module.scss";
import { Header, FormContainer, LoginForm } from "../components";
import Image from "next/image";

export default function Login() {
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
                        <FormContainer form={<LoginForm />} />
                    </div>
                </div>
            </div>
        </div>
    )
}