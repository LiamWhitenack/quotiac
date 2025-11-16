import { View, Text, TouchableOpacity, Image, Platform, Dimensions, StyleSheet, Modal, Pressable } from "react-native";
import { createAppStyles } from "@/src/theme/styles";
import { useTheme } from "@/src/theme/ThemeContext";
import InfiniteLockAnimation from "@/src/icon/infinite-animation";
import SolvingLockAnimation from "@/src/icon/solving-animation";
import type { Theme } from "@/src/theme/themes";
import React, { useState } from "react";
import PuzzlesView from "@/src/puzzle-list/view";

const isWeb = Platform.OS === "web";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Portrait space constraint for web
const webMaxWidth = 500;
const contentWidth = isWeb ? Math.min(screenWidth, webMaxWidth) : screenWidth;

// Scaling helper
const scale = (mobileSize: number, webSize: number) =>
    isWeb ? webSize : mobileSize;

export const createLandingPageStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: theme.background,
        },
        logo: {
            height: 200,
            aspectRatio: 1 / 2,
            resizeMode: "contain" as const,
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
            color: theme.text,
        },
        button: {
            width: scale(contentWidth * 0.6, 280),
            marginTop: scale(0.02 * screenHeight, 8),
        },
        buttonText: {
            flexWrap: "wrap" as const,
            textAlign: "center" as const,
        },
        dateText: {
            fontSize: scale(16, 18),
            marginTop: scale(0.03 * screenHeight, 12),
            fontWeight: "bold" as const,
            textAlign: "center" as const,
            color: theme.text,
        },
    });


interface LandingPageProps {
    urlDate: string | null;
    todayDate: string;
    fixedDate: string;
    startGame: (date: string) => void;
}

function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
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
    const landingPageStyles = createLandingPageStyles(theme);
    const displayDate = formatDate(fixedDate);

    const [showModal, setShowModal] = useState(false);

    return (
        <View style={landingPageStyles.container}>
            <InfiniteLockAnimation />

            <Text style={[styles.title, { textAlign: "center", width: "100%" }]}>
                Quotiac
            </Text>

            <Text
                style={[
                    {
                        textAlign: "center",
                        color: theme.text,
                        alignSelf: "center",
                    },
                    landingPageStyles.subtitle,
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
            >
                Decode a secret message by matching letters to icons.
            </Text>

            <TouchableOpacity
                onPress={() => startGame(fixedDate)}
                style={[styles.elevatedButton, landingPageStyles.button]}
            >
                <Text style={styles.elevatedButtonText}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={[styles.invertedElevatedButton, landingPageStyles.button]}
            >
                <Text style={styles.invertedElevatedButtonText}>Explore Puzzles</Text>
            </TouchableOpacity>

            <Text style={landingPageStyles.dateText}>{displayDate}</Text>

            {explorePuzzles(showModal, setShowModal, startGame)}
        </View>
    );
}

export function explorePuzzles(
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    startGame: (date: string) => void
) {
    const [isMounted, setIsMounted] = React.useState(showModal);

    React.useEffect(() => {
        if (showModal) {
            setIsMounted(true); // mount immediately
        } else {
            // delay unmount until PuzzlesView finishes sliding out
            const id = setTimeout(() => setIsMounted(false), 300);
            return () => clearTimeout(id);
        }
    }, [showModal]);

    if (!isMounted) return null;

    return (
        <Modal
            animationType="none"
            visible={true}
            transparent
            onRequestClose={() => setShowModal(false)}
        >
            <PuzzlesView
                startGame={startGame}
                visible={showModal}
                onClose={() => setShowModal(false)}
            />
        </Modal>
    );
}


