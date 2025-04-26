import React, { useEffect } from "react";
import {useFlush} from "./useFlush";
import {useApp} from "./providers/appProvider";
import { RendererType } from "./app";
import {useGame} from "narraleaf-react";

type NarraUIAppProps = {
    children: React.ReactNode;
};

export function NarraUIApp({
    children,
}: Readonly<NarraUIAppProps>) {
    const [flush] = useFlush();
    const {app} = useApp();
    const game = useGame();

    useEffect(() => {
        return app.registerRenderer({
            type: RendererType.App,
            flush,
        }).cancel;
    }, [app, flush]);

    useEffect(() => {}, [app.getTemplate()]);

    return (<>{children}</>);
}
