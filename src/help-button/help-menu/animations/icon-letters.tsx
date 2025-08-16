import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/ThemeContext';
import CustomIonicons from '@/src/custom-icons';
import { Theme } from '@/src/theme/themes';

const iconData = [
    { name: 'paw', label: 'S' },
    { name: 'boat', label: 'O' },
    { name: 'leaf', label: 'L' },
    { name: 'desktop', label: 'V' },
    { name: 'eye', label: 'E' },
];

export default function IconInitialsWidget() {
    const { theme, mode } = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.container}>
            {iconData.map((icon) => (
                <View key={icon.name} style={styles.iconBlock}>
                    {/* @ts-ignore */}
                    <CustomIonicons name={`${icon.name}`} size={32} color={theme.text} />
                    <Text style={styles.label || { color: theme.text }}>{icon.label}</Text>
                </View>
            ))}
        </View>
    );
}

export const createStyles = (theme: Theme) => StyleSheet.create({
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
        fontSize: 12,
        color: theme.text
    },
});
