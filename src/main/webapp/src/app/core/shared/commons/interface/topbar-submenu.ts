import { ITopbarSubMenuItem, TopbarSubMenuItem } from "./topbar-submenu-item";

export interface ITopbarSubMenu {
    name: string;
    icon: string;
    router: string;
    page_param: string;
    items: TopbarSubMenuItem[];
}


export class TopbarSubMenu implements ITopbarSubMenu {
    name!: string;
    icon!: string;
    router!: string;
    page_param!: string;
    items: TopbarSubMenuItem[] = [];


    setName(name: string): TopbarSubMenu {
        this.name = name;
        return this;
    }

    setIcon(icon: string): TopbarSubMenu {
        this.icon = icon;
        return this;
    }

    setRouter(router: string): TopbarSubMenu {
        this.router = router;
        return this;
    }

    setPageParam(param: string): TopbarSubMenu {
        this.page_param = param;
        return this;
    }

    setItems(...items: TopbarSubMenuItem[]): TopbarSubMenu {
        this.items = items;
        return this;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}