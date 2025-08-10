import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createAppStyles } from "@/src/theme/styles";
import { useTheme } from "@/src/theme/ThemeContext";
import sizing from "@/src/sizing/sizing";

interface LandingPageProps {
    urlDate: string | null;
    todayDate: string;
    fixedDate: string;
    startGame: (date: string) => void;
}

function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) {
        return "th";
    }
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
    startGame
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
                paddingTop: sizing.screenHeight * 0.15, // 15% down from the top
            }}
        >
            <Image
                source={require("@/assets/favicon.png")}
                style={{
                    width: sizing.screenHeight * 0.09, // 9% of screen height
                    height: sizing.screenHeight * 0.18, // 18% of screen height
                    resizeMode: "contain",
                }}
            />

            <Text style={[styles.title, { marginTop: sizing.screenHeight * 0.01 }]}>
                Quotiac
            </Text>

            <Text
                style={{
                    fontSize: sizing.screenHeight * 0.02, // ~2% of screen height
                    textAlign: "center",
                    marginBottom: sizing.screenHeight * 0.03,
                    color: theme.text,
                    maxWidth: sizing.screenHeight * 0.27
                }}
            >
                Decode a secret message by matching letters to icons.
            </Text>

            <View style={{ width: sizing.screenHeight * 0.25 }}>
                {(!urlDate || urlDate === todayDate) ? (
                    <TouchableOpacity
                        onPress={() => startGame(fixedDate)}
                        style={styles.elevatedButton}
                    >
                        <Text style={styles.elevatedButtonText}>Play</Text>
                    </TouchableOpacity>
                ) : (
                    <View>
                        <TouchableOpacity
                            onPress={() => startGame(urlDate)}
                            style={[styles.elevatedButton, { marginTop: sizing.screenHeight * 0.025 }]}
                        >
                            <Text
                                style={[
                                    styles.elevatedButtonText,
                                    { flexWrap: "wrap", textAlign: "center" }
                                ]}
                            >
                                Play Current Puzzle
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => startGame(todayDate)}
                            style={[styles.elevatedButton, { marginTop: sizing.screenHeight * 0.025 }]}
                        >
                            <Text
                                style={[
                                    styles.elevatedButtonText,
                                    { flexWrap: "wrap", textAlign: "center" }
                                ]}
                            >
                                Play Today's Puzzle
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <Text
                style={{
                    fontSize: sizing.screenHeight * 0.018,
                    marginTop: sizing.screenHeight * 0.02,
                    color: theme.text,
                    fontWeight: "bold",
                }}
            >
                {displayDate}
            </Text>
        </View>
    );
}
