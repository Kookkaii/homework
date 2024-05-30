export interface IResponseMessage<T> {
    data: T;
    httpStatus: string;
}