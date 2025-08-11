export interface Page<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    pageSize?: number;
    totalElements?: number;
    numberOfElements?: number;
}