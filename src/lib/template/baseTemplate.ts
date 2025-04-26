import { ComponentType } from "../components";
import { BaseComponent } from "./baseComponent";

export abstract class BaseTemplate {
    abstract name: string;
    protected components: {
        [K in ComponentType]?: BaseComponent | null;
    } = {};

    public registerComponent(component: BaseComponent): void {
        this.components[component.type] = component;
    }

    public getComponent(type: ComponentType): BaseComponent | null {
        return this.components[type] || null;
    }

    public unregisterComponent(type: ComponentType): void {
        this.components[type] = null;
    }
}
