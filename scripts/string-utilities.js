export const joinString = (string) => {
    const strArr = string.split(" ");
    return strArr.join("+");
};

export const truncateString = (string, num) => {
    if (string.length > num) {
        const strArr = string.split(" ");
        return strArr.slice(0, num).join(" ") + "...";
    } else {
        return string;
    }
};
