import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createAppStyles } from "@/src/theme/styles";
import { useTheme } from "@/src/theme/ThemeContext";

interface LandingPageProps {
    urlDate: string | null;
    todayDate: string;
    fixedDate: string;
    startGame: (date: string) => void;
}

function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

function formatDate(dateString: string) {
    try {
        const year = Number(dateString.slice(0, 4));
        const month = Number(dateString.slice(4, 6)) - 1;
        const day = Number(dateString.slice(6, 8));
        const date = new Date(year, month, day);

        const monthName = date.toLocaleString("en-US", { month: "long" });
        const ordinalSuffix = getOrdinalSuffix(day);

        return `${monthName} ${day}${ordinalSuffix}, ${year}`;
    } catch {
        return dateString;
    }
}

export default function LandingPage({
    urlDate,
    todayDate,
    fixedDate,
    startGame,
}: LandingPageProps) {
    const { theme } = useTheme();
    const styles = createAppStyles(theme);

    const displayDate = formatDate(fixedDate);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: "15%",
                paddingHorizontal: "10%",
            }}
        >
            <Image
                source={require("@/assets/favicon.png")}
                style={{
                    width: "45%", // 1.5 times bigger than 30%
                    aspectRatio: 1 / 2,
                    resizeMode: "contain",
                    marginBottom: "2%",
                }}
            />

            <Text
                style={[
                    styles.title,
                    {
                        marginTop: "1%",
                        fontSize: 24,
                        textAlign: "center",
                        width: "100%",
                    },
                ]}
            >
                Quotiac
            </Text>

            <Text
                style={{
                    fontSize: 14,
                    textAlign: "center",
                    marginBottom: "4%",
                    color: theme.text,
                    maxWidth: "60%", // narrower so it wraps naturally
                    alignSelf: "center",
                    lineHeight: 20, // makes two lines more comfortable
                }}
                numberOfLines={2} // force max 2 lines with truncation if needed
                ellipsizeMode="tail"
            >
                Decode a secret message by matching letters to icons.
            </Text>

            <View style={{ width: "70%", alignItems: "center" }}>
                {!urlDate || urlDate === todayDate ? (
                    <TouchableOpacity
                        onPress={() => startGame(fixedDate)}
                        style={[styles.elevatedButton, { width: "20%" }]} // half width of container
                    >
                        <Text style={styles.elevatedButtonText}>Play</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity
                            onPress={() => startGame(urlDate)}
                            style={[styles.elevatedButton, { width: "30%" }]}
                        >
                            <Text
                                style={[
                                    styles.elevatedButtonText,
                                    { flexWrap: "wrap", textAlign: "center" },
                                ]}
                            >
                                Play Current Puzzle
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => startGame(todayDate)}
                            style={[styles.elevatedButton, { marginTop: "2%", width: "30%" }]}
                        >
                            <Text
                                style={[
                                    styles.elevatedButtonText,
                                    { flexWrap: "wrap", textAlign: "center" },
                                ]}
                            >
                                Play Today's Puzzle
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <Text
                style={{
                    fontSize: 16,
                    marginTop: "3%",
                    color: theme.text,
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                {displayDate}
            </Text>
        </View>
    );
}
