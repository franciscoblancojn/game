import { CSSProperties } from "react";

export const parseStyles = (data:CSSProperties):CSSProperties => {
    const obj :CSSProperties = {}
    
    Object.keys(data).forEach(k=>{
        const key = k as keyof CSSProperties
        obj[key] = ((data)[key] + "rem") as any
    })
    return obj
}