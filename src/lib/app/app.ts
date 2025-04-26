import { ComponentType } from "../components";
import { BaseTemplate } from "../template/baseTemplate";
import { IAppConfig } from "./types";
import merge from "lodash.merge";

export enum RendererType {
    Component = "component",
    App = "app",
}

export type RendererHandle = {
    type: RendererType;
    flush: () => void;
};

export type AppEventToken = {
    cancel: () => void;
};

export class App {
    static DefaultConfig: IAppConfig = {
    }

    private template: BaseTemplate | null = null;
    private renderers: RendererHandle[] = [];
    public config: IAppConfig;

    constructor(config: IAppConfig) {
        this.config = merge({}, App.DefaultConfig, config);
    }

    public getTemplate(): BaseTemplate | null {
        return this.template;
    }

    public setTemplate(template: BaseTemplate): void {
        this.template = template;
    }

    public registerRenderer(renderer: RendererHandle): AppEventToken {
        this.renderers.push(renderer);
        return {
            cancel: () => {
                this.renderers = this.renderers.filter((r) => r !== renderer);
            },
        };
    }

    public flushRenderers(type: RendererType): void {
        const renderers = this.renderers.filter((renderer) => renderer.type === type);
        renderers.forEach((renderer) => {
            renderer.flush();
        });
    }

    private flushAllRenderers(): void {
        this.renderers.forEach((renderer) => {
            renderer.flush();
        });
    }

}


