import AsyncStorage from "@react-native-async-storage/async-storage";

export type PuzzleRouteItem = {
    id: string;
    date: string;
    started: boolean;
};

export async function getPuzzleRouteItems(): Promise<PuzzleRouteItem[]> {
    const today = new Date();
    const startDate = new Date(2025, 7, 15); // August 15, 2025

    const keysToCheck: { key: string; date: string }[] = [];
    const current = new Date(startDate);

    while (current <= today) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, "0");
        const day = String(current.getDate()).padStart(2, "0");
        const key = `quote_${year}${month}${day}`;
        const formattedDate = `${year}-${month}-${day}`;
        keysToCheck.push({ key, date: formattedDate });
        current.setDate(current.getDate() + 1);
    }

    // Retrieve existing keys from AsyncStorage
    const existingKeys = await AsyncStorage.getAllKeys();

    const puzzleItems: PuzzleRouteItem[] = keysToCheck.map(({ key, date }) => ({
        id: key,
        date,
        started: existingKeys.includes(key),
    }));

    return puzzleItems;
}
