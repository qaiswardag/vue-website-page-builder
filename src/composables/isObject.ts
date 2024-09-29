export const isObject = function (data: any) {
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
        return true;
    }
    return false;
};
