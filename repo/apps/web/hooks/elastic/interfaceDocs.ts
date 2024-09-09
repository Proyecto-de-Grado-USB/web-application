export interface Document {
    _id: string;
    _source: {
        name: string;
        summary: string;
        content: string;
        [key: string]: any;
    };
    [key: string]: any;
}

export interface SearchResponse {
    documents: Document[];
}

export interface ErrorResponse {
    message: string;
}