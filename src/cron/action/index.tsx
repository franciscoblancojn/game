import { useAction } from "fenextjs";
import { useEffect } from "react";

export interface useCronActionProps {
    onActionExecute?:()=>void
}

export const useCronAction = ({onActionExecute}:useCronActionProps) => {
    return useAction({
        name:"useCronAction",
        onActionExecute
    })
}

export const useCronActionLoad = () => {
    const {onAction} = useCronAction({})
    useEffect(() => {
        const t = setInterval(() => {
            onAction()
        }, 1000);
        return () => {
            clearInterval(t);
        };
    }, []);
}