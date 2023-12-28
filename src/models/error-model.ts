
export interface Error {
    error: string;
    message: string;
}

export const setError = (err: string, message: string) => {
    const error : Error = {
        error: err,
        message,
    }
    return error
}