import React, {useEffect, useState} from "react";
import { create } from "jss";
import { StylesProvider } from "@material-ui/styles";
import { jssPreset } from "@material-ui/core/styles";

export default function MaterialUiSheets({ children }) {
    const [iframeRef, setIframeRef] = useState(undefined);
    useEffect(() => {
        const iframe = document.querySelector('#nc-root iframe');
        const iframeHeadElem = iframe && iframe.contentDocument.head;
        setIframeRef(iframeHeadElem);
    });
    if (!iframeRef) {
        return <>Loading</>;
    }

    const jss = create({
        plugins: [...jssPreset().plugins],
        insertionPoint: iframeRef.firstChild,
    });

    return <StylesProvider jss={jss}>{children}</StylesProvider>;
}