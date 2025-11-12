import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useCallback, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    PanResponder,
} from "react-native";
import { useTheme } from "@/src/theme/ThemeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateItemWidget from './date-tile';
import { getPuzzleRouteItems, PuzzleRouteItem } from './check-existing';

type PuzzlesViewProps = {
    visible: boolean;
    onClose?: () => void;
    startGame: (date: string) => void;
};

export default function PuzzlesView({ visible, onClose, startGame }: PuzzlesViewProps) {
    const { theme } = useTheme();
    const screenWidth = Dimensions.get("window").width;
    const slideAnim = useRef(new Animated.Value(screenWidth)).current;
    const [puzzles, setPuzzles] = useState<PuzzleRouteItem[]>([]);
    const fetchedOnce = useRef(false);

    // Fetch puzzles once
    const fetchPuzzles = async () => {
        const puzzleItems = await getPuzzleRouteItems();
        puzzleItems.sort((a, b) => b.date.localeCompare(a.date));
        setPuzzles(puzzleItems);
    };

    useEffect(() => {
        if (!fetchedOnce.current) {
            fetchPuzzles();
            fetchedOnce.current = true;
        }
    }, []);

    // Slide animation for modal
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : screenWidth,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const animateClose = () => {
        Animated.timing(slideAnim, {
            toValue: screenWidth,
            duration: 250,
            useNativeDriver: true,
        }).start(() => onClose?.());
    };

    // Pan gesture to close
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dx > 10,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx > 0) slideAnim.setValue(gestureState.dx);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > screenWidth * 0.3) {
                    animateClose();
                } else {
                    Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start();
                }
            },
        })
    ).current;

    // Stable callback for onPress
    const openPuzzleCallback = useCallback(async (date: string) => {
        try {
            const puzzleData = await AsyncStorage.getItem(`puzzle:${date}`);
            if (puzzleData) {
                const puzzle = JSON.parse(puzzleData);
                startGame?.(puzzle);
            }
        } catch (error) {
            console.error("Failed to open puzzle:", error);
        }
    }, [startGame]);

    // Memoized renderItem for FlatList
    const renderItem = useCallback(
        ({ item }: { item: PuzzleRouteItem }) => (
            <DateItemWidget date={item.date} onPress={openPuzzleCallback} />
        ),
        [openPuzzleCallback]
    );

    return (
        <Modal visible={visible} animationType="none" transparent onRequestClose={animateClose}>
            <Animated.View
                {...panResponder.panHandlers}
                style={{
                    flex: 1,
                    backgroundColor: theme.background,
                    transform: [{ translateX: slideAnim }],
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: theme.text,
                        marginBottom: 12,
                        textAlign: "center",
                    }}
                >
                    Previous Puzzles
                </Text>

                <FlatList
                    data={puzzles}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    initialNumToRender={5}
                    windowSize={5}
                    removeClippedSubviews
                />

                {onClose && (
                    <TouchableOpacity
                        style={{
                            marginTop: 20,
                            alignSelf: "center",
                            backgroundColor: theme.elevatedSurface,
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}
                        onPress={animateClose}
                    >
                        <Text style={{ color: theme.primaryInverse, fontWeight: "600" }}>Close</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
        </Modal>
    );
}
