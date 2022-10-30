import React, { useEffect, useState} from "react";
import { getCountDownReturnValues } from "../../utils";

export function useCountDown(targetDate: number) {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState<number>(countDownDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    
    return getCountDownReturnValues(countDown);
}