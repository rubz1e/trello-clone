export default (arr) => {
    let i = 0;
    while (arr) {
        if (!arr.some((item) => item.id === i)) {
            return i
        }
        i++;
    }
}