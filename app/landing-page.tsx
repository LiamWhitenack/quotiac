import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createAppStyles } from "@/src/theme/styles";
import { useTheme } from "@/src/theme/ThemeContext";
import { Platform, Dimensions } from "react-native";

const isWeb = Platform.OS === "web";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Portrait space constraint for web
const webMaxWidth = 500;
const contentWidth = isWeb ? Math.min(screenWidth, webMaxWidth) : screenWidth;

// Scaling helper
const scale = (mobileSize: number, webSize: number) =>
    isWeb ? webSize : mobileSize;

export const landingPageSizing = {
    container: {
        flex: 1,
        justifyContent: "center", // Center vertically on all platforms
        alignItems: "center",      // Center horizontally on all platforms
        paddingHorizontal: scale(0.10 * screenWidth, 20),
        maxWidth: isWeb ? webMaxWidth : undefined,
        alignSelf: "center",
    },
    logo: {
        // Mobile: 3× bigger than old 0.45 * width → 1.35 * width, capped
        // width: isWeb
        //     ? contentWidth * 0.45
        //     : Math.min(contentWidth * 1.35, screenWidth * 0.9),
        // aspectRatio: 1 / 2,
        // marginBottom: scale(0.02 * screenHeight, 10),
        // resizeMode: "contain" as const,
    },
    title: {
        marginTop: scale(0.01 * screenHeight, 8),
        fontSize: scale(24, 28),
        textAlign: "center" as const,
        width: "100%",
    },
    subtitle: {
        fontSize: scale(14, 16),
        marginBottom: scale(0.04 * screenHeight, 16),
        maxWidth: scale(contentWidth * 0.6, 300),
        lineHeight: scale(20, 22),
        textAlign: "center" as const,
        alignSelf: "center" as const,
    },
    button: {
        width: scale(contentWidth * 0.6, 280),
        marginTop: scale(0.02 * screenHeight, 8),
    },
    dateText: {
        fontSize: scale(16, 18),
        marginTop: scale(0.03 * screenHeight, 12),
        fontWeight: "bold" as const,
        textAlign: "center" as const,
    },
};



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
        <View style={landingPageSizing.container}>
            <Image
                source={require("@/assets/favicon.png")}
                style={landingPageSizing.logo}
            />


            <Text style={[styles.title, { textAlign: "center", width: "100%" }, landingPageSizing.title]}>
                Quotiac
            </Text>

            <Text
                style={[
                    {
                        textAlign: "center",
                        color: theme.text,
                        alignSelf: "center",
                    },
                    landingPageSizing.subtitle,
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
            >
                Decode a secret message by matching letters to icons.
            </Text>

            {!urlDate || urlDate === todayDate ? (
                <TouchableOpacity onPress={() => startGame(fixedDate)} style={[styles.elevatedButton, landingPageSizing.button]}>
                    <Text style={styles.elevatedButtonText}>Play</Text>
                </TouchableOpacity>
            ) : (
                <>
                    <TouchableOpacity onPress={() => startGame(urlDate)} style={[styles.elevatedButton, landingPageSizing.button]}>
                        <Text style={[styles.elevatedButtonText, { flexWrap: "wrap", textAlign: "center" }]}>
                            Play Current Puzzle
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => startGame(todayDate)} style={[styles.elevatedButton, landingPageSizing.button]}>
                        <Text style={[styles.elevatedButtonText, { flexWrap: "wrap", textAlign: "center" }]}>
                            Play Today's Puzzle
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            <Text style={[{ color: theme.text, fontWeight: "bold", textAlign: "center" }, landingPageSizing.dateText]}>
                {displayDate}
            </Text>
        </View>
    );
}
