export const isObject = function (data) {
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
        return true;
    }
    return false;
};
