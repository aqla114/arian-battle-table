export function updateObject<T>(item: T, updateValues: Partial<T>): T {
    return { ...item, ...updateValues };
}

/**
 * @param array 元となる配列
 * @param selector 配列の特定の条件を満たす要素を取り出す関数
 * @param updateItemCallback item を更新する関数
 */
export function updateItemInArray<T>(
    array: Array<T>,
    selector: (item: T) => boolean,
    updateItemCallback: (item: T) => T,
) {
    const updatedItems = array.map(item => {
        if (!selector(item)) {
            return item;
        }
        return updateItemCallback(item);
    });

    return updatedItems;
}
