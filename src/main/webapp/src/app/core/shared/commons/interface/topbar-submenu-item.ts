export interface ITopbarSubMenuItem {
    name: string;
    router: string;
    page_param: string;
    items: TopbarSubMenuItem[];
}

export class TopbarSubMenuItem implements ITopbarSubMenuItem {
    name!: string;
    router!: string;
    page_param!: string;
    items: TopbarSubMenuItem[] = [];


    setName(name: string): TopbarSubMenuItem {
        this.name = name;
        return this;
    }

    setRouter(router: string): TopbarSubMenuItem {
        this.router = router;
        return this;
    }

    setPageParam(param: string): TopbarSubMenuItem {
        this.page_param = param;
        return this;
    }

    setItems(...items: TopbarSubMenuItem[]): TopbarSubMenuItem {
        this.items = items;
        return this;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}