import React from "react";
import { ComponentType } from "../components";


export abstract class BaseComponent {
    abstract type: ComponentType;
    abstract name: `${string}:${string}`;
    abstract render(): React.ReactNode;
}
