import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/src/theme/ThemeContext";

type DateItemWidgetProps = {
    date: string; // e.g. "2025-08-15"
    onPress: (date: string) => Promise<void>;
};

function DateItemWidget({ date, onPress }: DateItemWidgetProps) {
    const { theme } = useTheme();
    const [value, setValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // prevent state updates if unmounted
        const fetchValue = async () => {
            const formattedDate = date.replaceAll("-", "");
            const key = `quote_${formattedDate}`;
            try {
                const storedValue = await AsyncStorage.getItem(key);
                if (isMounted) {
                    setValue(storedValue);
                    setLoading(false);
                }
            } catch (e) {
                if (isMounted) {
                    setValue(null);
                    setLoading(false);
                }
                console.error(`Error fetching ${key} from AsyncStorage`, e);
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
            }}
            onPress={() => onPress(date)}
        >
            {loading ? (
                <ActivityIndicator color={theme.text} />
            ) : (
                <Text style={{ color: theme.text, fontWeight: "600" }}>
                    {value ? value : `No entry for ${date}`}
                </Text>
            )}
        </TouchableOpacity>
    );
}

// Memoize to avoid unnecessary re-renders
export default React.memo(DateItemWidget, (prevProps, nextProps) => {
    return prevProps.date === nextProps.date && prevProps.onPress === nextProps.onPress;
});
