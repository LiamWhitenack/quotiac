export type PuzzleRouteItem = {
    date: string;
    type: string;
};

export async function getPuzzleRouteItems(): Promise<PuzzleRouteItem[]> {
    const today = new Date();

    // Fetch the puzzle list from your GitHub JSON file
    const response = await fetch(
        "https://raw.githubusercontent.com/LiamWhitenack/quotiac-data/refs/heads/dev/resources/puzzle-list.json"
    );
    const data = await response.json(); // data is a dictionary like { "quote_20250815": { ...puzzleData... }, ... }

    // Build the puzzle items from the JSON entries
    const puzzleItems: PuzzleRouteItem[] = Object.entries(data)
        .map(([date, type]) => {
            const year = Number(date.slice(0, 4));
            const month = Number(date.slice(4, 6)) - 1;
            const day = Number(date.slice(6, 8));
            const dateObj = new Date(year, month, day);

            if (dateObj > today) return null;

            return {
                date,
                type
            };
        })
        .filter((item): item is PuzzleRouteItem => item !== null)
        .sort((a, b) => a.date.localeCompare(b.date)); // ensure chronological order

    return puzzleItems;
}

