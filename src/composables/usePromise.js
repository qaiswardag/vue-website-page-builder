export const usePromise = function (time) {
    // new promise
    return new Promise((resolve, reject) => {
        return setTimeout(() => {
            resolve(() => {
                return;
            });
        }, time);
    });
};
