import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/ThemeContext';

const iconData = [
    { name: 'sad', label: 'S' },
    { name: 'open', label: 'O' },
    { name: 'leaf', label: 'L' },
    { name: 'videocam', label: 'V' },
    { name: 'eye', label: 'E' },
];

export default function IconInitialsWidget() {
    const { theme, mode } = useTheme();
    return (
        <View style={styles.container}>
            {iconData.map((icon) => (
                <View key={icon.name} style={styles.iconBlock}>
                    <Ionicons name={`${icon.name}-outline`} size={32} color={theme.text} />
                    <Text style={styles.label || { color: theme.text }}>{icon.label}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    iconBlock: {
        alignItems: 'center',
        flex: 1, // evenly distributes available space
    },
    label: {
        marginTop: 2,
        fontSize: 12
    },
});
