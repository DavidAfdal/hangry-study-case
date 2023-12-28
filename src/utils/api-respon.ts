
//class for api response
export default class ApiRespone {
    static StatusSuccessWithData(message: string, data: any) {
        return {
            status: "succes",
            message,
            data,
        }
    }
    static StatusSuccess(message: string) {
        return {
            status: "succes",
            message,
        }
    }
    static StatusError(message: string) {
        return {
            status: "error",
            errorMessage: message,
        }
    }
}