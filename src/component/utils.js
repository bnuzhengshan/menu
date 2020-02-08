// 交换数组子项
const swapItems = (arr, index1, index2) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};

// 上移
const upArrayItem = (arr, index) => {
    if (index === 0) {
        return arr;
    }
    return swapItems(arr, index, index - 1);
};

// 下移
const downArrayItem = (arr, index) => {
    if (index === arr.length - 1) {
        return arr;
    }
    return swapItems(arr, index, index + 1);
}
export {
    swapItems,
    upArrayItem,
    downArrayItem
}