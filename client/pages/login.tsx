import { useMemo } from "react";
import styles from "../styles/pages/login.module.scss";
import { Header, FormContainer, LoginForm, Modal } from "../components";
import Image from "next/image";
import { useModal } from "../hooks";
import { getSession, signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    const { modal } = useModal();
    const session = useSession();

    function handleGoogleAuth() {
        // if (session.status === "unauthenticated") {
            signIn("google").then((res) => {
                console.log(res)
                // localStorage.setItem("google_", JSON.stringify(res))
            }).catch((err) => {
                console.log(err);
            })
        // }
    }

    const socialLogins = useMemo(() => [
        <button key={"google-auth"} onClick={handleGoogleAuth}><span><FcGoogle /></span>Login with Google</button>
    ], [])

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
                        <FormContainer form={<LoginForm />} altLink={{link: "/signup", label: "New user? Sign Up here"}} socials={{enabled: true, providerTriggerElms: socialLogins}} />
                    </div>
                </div>
            </div>
            {modal.open == true && <Modal data={modal.data} />}
        </div>
    )
}

Login.getInitialProps = async (ctx: {req: any, res: any})=>{
    const {req, res} = ctx;
    const session = getSession({req});

    // redirect to home page if user is authenticated

    if ((await session)?.user && res){
        res.writeHead(302, {
            Location: '/'
        });

        res.end();
        return {
            authSession: session
        };
    }

    return {
      authSession: session
    };
}