import { Constants } from "./constants.js"

export const responseBody = (statusCode, message, data) => {
    const responseBody = {
        id: statusCode == 1 ? statusCode : 2,
        message: message,
        data: data,
        stringAlternativo: (data && data.stringAlternativo) ? data.stringAlternativo : Constants.STRING_EMPTY,
        intAlternativo: (data && data.intAlternativo) ? data.intAlternativo : Constants.NUMBER_ZERO
    }
    return responseBody
}