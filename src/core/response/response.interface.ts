export interface IResponseMetadata {
    code?: number;
    message?: string;
    [key: string]: any;
}
export interface IResponse {
    metadata?: IResponseMetadata;
    [key: string]: any;
}

export interface IResponsePaging {
    totalData: number;
    totalPage?: number;
    currentPage?: number;
    perPage?: number;
    availableSearch?: string[];
    availableSort?: string[];
    metadata?: IResponseMetadata;
    data: Record<string, any>[];
}

export interface IResponseArray {
    [key: string]: any[];
}
