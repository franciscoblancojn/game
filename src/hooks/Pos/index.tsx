import { Dispatch, SetStateAction, useState } from "react";
import { validatePos } from "@/functions/validatePos";
import { Pos } from "@/interfaces/Pos";
import { Size } from "@/interfaces/Size";
import { useAction, useActionProps } from "fenextjs";

export interface usePosActionProps extends Omit<useActionProps<Pos>,"env_log">{
    
}

export const usePosAction = ({...props}:usePosActionProps) => {
    return useAction<Pos>({...props})
}


export interface usePosProps extends usePosActionProps{
    defaultPos?: Pos
    size: Size
    onChangePos?: (pos: Pos) => void
}

export const usePos = ({
    defaultPos = {
        x: 0,
        y: 0,
    },
    size,
    onChangePos,

    name
}: usePosProps) => {
    const [pos, setPos_] = useState<Pos>(defaultPos);

    const setPos: Dispatch<SetStateAction<Pos>> = (set) => {
        setPos_((old) => {
            let pos = { ...old };
            if (typeof set == "function") {
                pos = set(pos)
            } else {
                pos = set
            }
            pos = {
                ...pos,
                ...validatePos({ pos, size })
            }
            if (JSON.stringify(old) == JSON.stringify(pos)) {
                return old
            }
            onChangePos?.(pos)
            return pos
        });
    }
    
    usePosAction({
        name,
        onActionExecute:(e)=>{if(e){setPos_(e)}}
    })

    return {
        pos,
        setPos,
    }
}