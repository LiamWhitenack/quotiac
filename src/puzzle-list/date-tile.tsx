import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/src/theme/ThemeContext";
import { fetchQuoteFromStorage, loadPersistedState } from "../puzzles/get-puzzle";
import CryptographBase from "../puzzles/base";
import { mapsAreEqual } from "../utils";
import { inverseMap } from "../state";

type PuzzleTileItem = {
    date: string;
    type: string;
    finished: boolean;
    hints_used: number;
};

type DateItemWidgetProps = {
    date: string; // e.g. "2025-08-15"
    onPress: (date: string) => Promise<void>;
};

function DateItemWidget({ date, onPress }: DateItemWidgetProps) {
    const { theme } = useTheme();
    const [puzzle, setPuzzle] = useState<PuzzleTileItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // prevent state updates if unmounted
        const fetchValue = async () => {
            if (isMounted) {
                const crypt_base = await fetchQuoteFromStorage(date);
                if (crypt_base) {
                    const { decodingMap, givenHintLetters } = await loadPersistedState(date)
                    setPuzzle({
                        date: date,
                        type: crypt_base.puzzleType,
                        finished: (decodingMap) ? mapsAreEqual(inverseMap(crypt_base.encodingMap), decodingMap) : false,
                        hints_used: (givenHintLetters) ? givenHintLetters.length : 0,
                    });
                }
                setLoading(false);
            }
        };

        fetchValue();

        return () => {
            isMounted = false;
        };
    }, [date]);

    return (
        <TouchableOpacity
            style={{
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: theme.border,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            onPress={() => onPress(date)}
        >
            {loading ? (
                <ActivityIndicator color={theme.text} />
            ) : puzzle ? (
                <>
                    <Text
                        style={{
                            color: puzzle.finished ? theme.hint : theme.text,
                            fontWeight: "600",
                        }}
                    >
                        {puzzle.type}
                    </Text>
                    <Text style={{ color: theme.text, fontSize: 16 }}>
                        {"💡".repeat(puzzle.hints_used)}
                    </Text>
                </>
            ) : (
                <Text style={{ color: theme.text, fontWeight: "600" }}>
                    No entry for {date}
                </Text>
            )}
        </TouchableOpacity>


    );
}

// Memoize to avoid unnecessary re-renders
export default React.memo(DateItemWidget, (prevProps, nextProps) => {
    return prevProps.date === nextProps.date && prevProps.onPress === nextProps.onPress;
});

