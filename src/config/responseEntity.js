import { Constants } from "./constants"

export const responseBody = (statusCode, message, data) => {
    const responseBody = {
        id: statusCode == 1 ? statusCode : 2,
        message: message,
        data: data,
        stringAlternativo: data.stringAlternativo ? data.stringAlternativo : Constants.STRING_EMPTY,
        intAlternativo: data.intAlternativo ? data.intAlternativo : Constants.NUMBER_ZERO
    }
    return responseBody
}