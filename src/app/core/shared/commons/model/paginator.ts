export interface IPaginator {
    content: any,
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    pageable: any,
    size: number,
    sort: ISort,
    totalElements: number,
    totalPages: number
}

export interface ISort {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
}

export interface IPageable {
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean
    sort: ISort,
    unpaged: boolean
}