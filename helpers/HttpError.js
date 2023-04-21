const errorMessageList = {
    400: "",
    401: "Not authorized",
    403: "",
    404: "Not found",
    409: ""
}

const HttpError = (status, message = errorMessageList[status]) =>{
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;