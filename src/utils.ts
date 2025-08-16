export function mapsAreEqual<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
    if (map1.size !== map2.size) {
        return false;
    }

    for (const [key, value] of map1) {
        if (!map2.has(key)) {
            return false;
        }
        if (map2.get(key) !== value) {
            return false;
        }
    }

    return true;
}

export function todayString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
}