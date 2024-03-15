"use client"
import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
    id:string,
    onLayerPointerDown : (e:React.PointerEvent,layerId:string)=> void;
    selectionColor ?:string;
}

export const LayerPreview = memo(({id,onLayerPointerDown,selectionColor}:LayerPreviewProps) =>{
    const layer = useStorage((root)=>root.layers.get(id));
    if( !layer )
        return null;
    switch (layer.type){
        case LayerType.Rectangle:return (
        <Rectangle 
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
        />
        )
        case LayerType.Ellipse:return (<div>Rectangle</div>)
        case LayerType.Path:return (<div>Rectangle</div>)
        case LayerType.Text:return (<div>Rectangle</div>)
        case LayerType.Note:return (<div>Rectangle</div>)
        default :console.warn("Unknown Layer Type");return null;
    }
});
LayerPreview.displayName = "LayerPreview";