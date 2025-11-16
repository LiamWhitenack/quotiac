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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type PuzzlesViewProps = {
    visible: boolean;
    onClose?: () => void;
    startGame: (date: string) => void;
};

export default function PuzzlesView({ visible, onClose, startGame }: PuzzlesViewProps) {
    const { theme } = useTheme();
    const { top } = useSafeAreaInsets();
    const screenWidth = Dimensions.get("window").width;
    const slideAnim = useRef(new Animated.Value(screenWidth)).current;

    const [puzzles, setPuzzles] = useState<PuzzleRouteItem[]>([]);
    const fetchedOnce = useRef(false);

    // Mount state to prevent modal overlay from blocking touches
    const [isMounted, setIsMounted] = useState(visible);

    // Fetch puzzles once
    useEffect(() => {
        if (!fetchedOnce.current) {
            (async () => {
                const puzzleItems = await getPuzzleRouteItems();
                puzzleItems.sort((a, b) => b.date.localeCompare(a.date));
                setPuzzles(puzzleItems);
            })();
            fetchedOnce.current = true;
        }
    }, []);

    // Slide animation + mount control
    useEffect(() => {
        if (visible) {
            setIsMounted(true);   // show Modal immediately
        }

        Animated.timing(slideAnim, {
            toValue: visible ? 0 : screenWidth,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            if (!visible) {
                setIsMounted(false);  // fully unmount after animation
                onClose?.();
            }
        });
    }, [visible]);

    const animateClose = () => {
        Animated.timing(slideAnim, {
            toValue: screenWidth,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            setIsMounted(false);
            onClose?.();
        });
    };

    // Pan gesture to close
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, g) => g.dx > 10,
            onPanResponderMove: (_, g) => {
                if (g.dx > 0) slideAnim.setValue(g.dx);
            },
            onPanResponderRelease: (_, g) => {
                if (g.dx > screenWidth * 0.3) {
                    animateClose();
                } else {
                    Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start();
                }
            },
        })
    ).current;

    const openPuzzleCallback = useCallback(
        (date: string) => startGame?.(date),
        [startGame]
    );

    const renderItem = useCallback(
        ({ item }: { item: PuzzleRouteItem }) => (
            // @ts-ignore
            <DateItemWidget item={item} onPress={openPuzzleCallback} />
        ),
        [openPuzzleCallback]
    );

    // Prevent Modal overlay from blocking touches when closed
    if (!isMounted) return null;

    return (
        <Modal
            visible={true}
            animationType="none"
            transparent
            onRequestClose={animateClose}
        >
            <Animated.View
                {...panResponder.panHandlers}
                style={{
                    flex: 1,
                    backgroundColor: theme.background,
                    marginTop: top,
                    transform: [{ translateX: slideAnim }],
                    padding: 20,
                }}
            >
                <FlatList
                    data={puzzles}
                    keyExtractor={(item) => item.date}
                    renderItem={renderItem}
                    initialNumToRender={25}
                    windowSize={25}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 50, marginBottom: 50 }}
                    removeClippedSubviews
                />

                {onClose && (
                    <TouchableOpacity
                        style={{
                            marginTop: 20,
                            alignSelf: "center",
                            backgroundColor: theme.primary,
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}
                        onPress={animateClose}
                    >
                        <Text style={{ color: theme.primaryInverse, fontWeight: "600" }}>
                            Close
                        </Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
        </Modal>
    );
}

