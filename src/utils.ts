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
