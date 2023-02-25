import { ICheckboxFilter } from "./interface/checkbox-filter";

export abstract class AbstractPageFilter {

    composeInputFilter(urlParams: string, filter: string): string {
        if (filter.length > 0) {
            if (urlParams.length > 0) {
                return urlParams.concat("&filter=", filter);
            } else {
                return urlParams.concat("?filter=", filter);
            }
        }

        return urlParams;
    }

    composeListParamsFilter(urlParams: string, param: string, filter: ICheckboxFilter[]): string {
        const paramsId: number[] = [];
        filter.forEach(d => paramsId.push(d.id));

        if (filter.length > 0) {
            if (urlParams.length > 0) {
                return urlParams.concat(`&${param}=`, paramsId.join(","));
            } else {
                return urlParams.concat(`?${param}=`, paramsId.join(","));
            }
        }

        return urlParams;
    }
}