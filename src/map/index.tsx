import { GLOBAL } from "@/const/global"
import { parseStyles } from "@/functions/parseStyles"
import { CSSProperties, ReactNode, useEffect, useMemo, useState } from "react"

type MapScroll = {
    x: number,
    y: number
}

interface useMapProps {

}
const useMap = ({ }: useMapProps) => {
    const [size, setSize] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [scroll, setScroll] = useState<MapScroll>({
        x: 0,
        y: 0
    })

    const onMove = ({ x, y }: MapScroll) => {
        setScroll(old => {
            const scroll = {...old}
            scroll.x += x * speed
            scroll.y += y * speed
            return scroll
        })
    }


    const onLoadMap = () => {
        const size = Math.min(window.innerHeight,window.innerWidth) / GLOBAL.REM
        setSize(size)
    }
    useEffect(() => onLoadMap, [])

    return {
        scroll,
        size
    }
}

export interface MapProps {
    children?:ReactNode
}

export const Map = ({children}:MapProps) => {
    const map = useMap({})
    return <>
        <div data-id="map" style={{width:`${GLOBAL.REM}rem`}} >
            {children}
        </div>
        <style jsx global>
            {`
                html{
                    font-size : ${map.size}px
                }
            `}
        </style>
    </>
}