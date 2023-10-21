export const errorHandler = (statusCode,message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}
//this is for a manual error statusCode and messasge are belonging from a error route