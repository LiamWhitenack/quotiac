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

type LinkItem = {
    id: string;
    url: string;
    description: string;
};

type LinksViewProps = {
    visible: boolean;
    onClose?: () => void;
};

export default function PuzzlesView({ visible, onClose }: LinksViewProps) {
    const { theme } = useTheme();
    const screenWidth = Dimensions.get("window").width;
    const slideAnim = useRef(new Animated.Value(screenWidth)).current;

    const links: LinkItem[] = [
        {
            id: "1",
            url: "https://example.com",
            description: "Example resource",
        },
        {
            id: "2",
            url: "https://github.com/",
            description: "GitHub homepage",
        },
    ];

    // Slide in/out animation based on visibility
    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: screenWidth,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const handleOpenLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.warn("Cannot open URL:", url);
        }
    };

    // Slide-out animation used for both swipe and close button
    const animateClose = () => {
        Animated.timing(slideAnim, {
            toValue: screenWidth,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            onClose?.();
        });
    };

    // Pan responder for swipe-to-close gesture
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return gestureState.dx > 10; // Start gesture if user swipes right
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx > 0) {
                    slideAnim.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > screenWidth * 0.3) {
                    // If swiped enough, close it
                    animateClose();
                } else {
                    // Otherwise snap back
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <Modal
            visible={visible}
            animationType="none"
            transparent={true}
            onRequestClose={animateClose}
        >
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
                    data={links}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                paddingVertical: 12,
                                borderBottomWidth: 1,
                                borderColor: theme.border,
                            }}
                        >
                            <Text style={{ color: theme.text, fontWeight: "600" }}>
                                {item.description}
                            </Text>

                            <TouchableOpacity onPress={() => handleOpenLink(item.url)}>
                                <Text
                                    style={{
                                        color: theme.primary,
                                        textDecorationLine: "underline",
                                        marginTop: 4,
                                    }}
                                >
                                    {item.url}
                                </Text>
                            </TouchableOpacity>
                        </View>
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
                        onPress={animateClose} // 👈 triggers the same slide-out animation
                    >
                        <Text
                            style={{ color: theme.primaryInverse, fontWeight: "600" }}
                        >
                            Close
                        </Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
        </Modal>
    );
}
