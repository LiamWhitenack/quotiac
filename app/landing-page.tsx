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

function formatDate(dateString: string) {
    try {
        const year = Number(dateString.slice(0, 4));
        const month = Number(dateString.slice(4, 6)) - 1;
        const day = Number(dateString.slice(6, 8));
        const date = new Date(year, month, day);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
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
    const imageWidth = 75;

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-start", // centers vertically
                alignItems: "center", // centers horizontally
            }}
        >
            <Image
                source={require("@/assets/favicon.png")}
                style={{
                    width: imageWidth,
                    height: 200,
                    resizeMode: "contain",
                    marginTop: 40
                }}
            />

            <Text style={[styles.title, { marginTop: -5 }]}>Quotiac</Text>


            <Text
                style={{
                    fontSize: 16,
                    textAlign: "center",
                    marginBottom: 20,
                    color: theme.text,
                    maxWidth: imageWidth * 3
                }}
            >
                Decode a secret message by matching letters to icons.
            </Text>

            <View style={{ width: 220 }}>
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
                            onPress={() => startGame(fixedDate)}
                            style={[styles.elevatedButton, { marginTop: 20 }]}
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
                            style={[styles.elevatedButton, { marginTop: 20 }]}
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
                    fontSize: 14,
                    marginTop: 30,
                    color: theme.text
                }}
            >
                {displayDate}
            </Text>
        </View>
    );
}
