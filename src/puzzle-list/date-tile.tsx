import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/src/theme/ThemeContext";
import { fetchQuoteFromStorage, loadPersistedState } from "../puzzles/get-puzzle";
import CryptographBase from "../puzzles/base";
import { mapsAreEqual } from "../utils";
import { inverseMap } from "../state";
import { PuzzleRouteItem } from "./check-existing";

type PuzzleTileItem = {
    date: string;
    type: string;
    finished: boolean;
    hints_used: number;
};

type DateItemWidgetProps = {
    item: PuzzleRouteItem;
    onPress: (date: string) => Promise<void>;
};

function DateItemWidget({ item, onPress }: DateItemWidgetProps) {
    const { theme } = useTheme();
    const [puzzle, setPuzzle] = useState<PuzzleTileItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // prevent state updates if unmounted
        const fetchValue = async () => {
            if (isMounted) {
                const crypt_base = await fetchQuoteFromStorage(item.date);
                if (crypt_base) {
                    const { decodingMap, givenHintLetters } = await loadPersistedState(item.date)
                    setPuzzle({
                        date: item.date,
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
    }, [item.date]);

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
            onPress={() => onPress(item.date)}
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
                <Text style={{ color: theme.subtext, fontWeight: "600" }}>
                    {item.type}
                </Text>
            )}
        </TouchableOpacity>


    );
}

// Memoize to avoid unnecessary re-renders
export default React.memo(DateItemWidget, (prevProps, nextProps) => {
    return prevProps.item === nextProps.item && prevProps.onPress === nextProps.onPress;
});

