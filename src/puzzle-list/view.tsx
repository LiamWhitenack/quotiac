import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    Linking,
    PanResponder,
} from "react-native";
import { useTheme } from "@/src/theme/ThemeContext";

type PuzzleRouteItem = {
    id: string;
    date: string;
    description: string;
};

type PuzzlesViewProps = {
    visible: boolean;
    onClose?: () => void;
    startGame: (date: string) => void;
};

export default function PuzzlesView({ visible, onClose, startGame }: PuzzlesViewProps) {
    const { theme } = useTheme();
    const screenWidth = Dimensions.get("window").width;
    const slideAnim = useRef(new Animated.Value(screenWidth)).current;

    const navigation = useNavigation(); // ✅ Move hook to top level

    const links: PuzzleRouteItem[] = [
        { id: "1", date: "20250911", description: "9/11" },
        { id: "2", date: "20251031", description: "Halloween" },
    ];


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
        }).start(() => {
            onClose?.();
        });
    };

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
                <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.text, marginBottom: 12, textAlign: "center" }}>
                    Previous Puzzles
                </Text>

                <FlatList
                    data={links}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: theme.border }}
                            onPress={() => startGame(item.date)}
                        >
                            <Text style={{ color: theme.text, fontWeight: "600" }}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
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

