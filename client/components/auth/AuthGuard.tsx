import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface AuthGuard_Props {
    children: ReactNode | JSX.Element
    userType: "individual" | "organization"
    multipleUserTypes?: {
        status: boolean
        supported: string[]
    }
}

export function AuthGuard({children, userType, multipleUserTypes}: AuthGuard_Props) {
    const session = useSession();
    const router = useRouter();
    const [showRedirectMessage, setShowRedirectMessage] = useState<boolean>(false);
    const [multipleUserTypeSupport, setMultipleUserTypeSupport] = useState<boolean>(false);

    useEffect(()=> {
        if (session.status !== "loading" && session.status === "unauthenticated") {
            router.push("/login");
        }
        
        if (session.status !== "loading" &&
            session.status === "authenticated" && 
            multipleUserTypes?.status !== true &&
            session.data.user?.user?.usertype !== userType
        ) {
            switch (session.data.user.user.usertype) {
                case "individual":
                    router.push("/individual");
                    break;
                case "organization":
                    router.push("/organization");
                    break;
            }
        }

        if (
            multipleUserTypes?.status === true &&
            session.status === "authenticated"
        ) {
            if (multipleUserTypes?.supported.includes(userType)) {
                // allow access to page
                setMultipleUserTypeSupport(true);
            } else {
                // dafault redirect to the required userType
                setMultipleUserTypeSupport(false);
                
                router.push(`/${userType.toLocaleLowerCase}`);
            }
        }
        // eslint-disable-next-line
    }, [session, router]);

    // show manual redirect message after five seconds
    setTimeout(()=>{setShowRedirectMessage(true)}, 5000);


    if (
        session.status !== "loading" &&
        session.status === "authenticated" &&
        session.data.user?.user?.usertype === userType &&
        multipleUserTypes?.status !== true
    ) {
        return <>{children}</>
    }

    if (multipleUserTypeSupport === true) {
        return <>{children}</>
    }

    return (
        <div style={styling.wrapperDiv} >
            <h3 style={styling.h3}>
                Checking Session Validity...
            </h3>
            <h4>Please wait for redirection</h4>
            {showRedirectMessage && <span>or</span>}
            {
                showRedirectMessage && <span>Try <span style={{color: "#2563eb"}} onClick={()=>{
                router.reload();
                }}>refreshing</span> the page.</span>
            }
        </div>
    )
}

const styling: {[key: string]: CSSProperties} = {
    wrapperDiv: {
      display: "flex",
      height: "100vh",  
      width: "100vw",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    },
    h3: {
      fontSize: "30px",
      color: "black",
      margin: "10px"
    }
  }
  