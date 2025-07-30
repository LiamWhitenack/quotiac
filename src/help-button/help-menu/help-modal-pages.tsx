import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';
import HintDemonstration from '@/src/help-button/help-menu/animations/hint-animation';
import IconInitialsWidget from './animations/icon-letters';
import SolvingDemonstration from './animations/solving-animation';
import CustomIonicons from "@/src/custom-icons";
export default function getPages() {
    return [
        {
            title: 'How to Play',
            content: (
                <>
                    <IconInitialsWidget />
                    <Text style={styles.instructionsTitle}>Instructions:</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>
                            • Decode the sentence by replacing each symbol with the correct letter.
                        </Text>
                        <Text style={styles.bulletItem}>
                            • Each symbol represents a different hidden letter.
                        </Text>
                        <Text style={styles.bulletItem}>
                            • Punctuation does not represent a hidden letter.
                        </Text>
                    </View>
                </>
            ),
        },
        {
            title: 'How to Play',
            content: (
                <>
                    <SolvingDemonstration />
                    <Text style={styles.instructionsTitle}>Solving:</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>
                            • Complete the puzzle by replacing each symbol with its correct letter.
                        </Text>
                        <Text style={styles.bulletItem}>
                            • Select a symbol by clicking a letter - this will highlight the symbol in blue.
                        </Text>
                        <Text style={styles.bulletItem}>
                            • Whenever you assign a letter, the next unassigned symbol will automatically be selected.
                        </Text>
                        <Text style={styles.bulletItem}>
                            • To assign a letter, select a symbol and then click the letter you want to use.
                        </Text>
                        <Text style={styles.bulletItem}>
                            • To remove a symbol-letter pairing, click the letter in the quote display or use the delete icon on the keyboard.
                        </Text>
                    </View>
                </>
            ),
        },
        {
            title: 'How to Play',
            content: (
                <>
                    <HintDemonstration />
                    <Text style={styles.instructionsTitle}>Hint Button:</Text>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomIonicons name="bulb-outline" size={48} />
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text style={styles.bulletItem || { flexWrap: 'wrap' }}>
                                Press the hint button to get a random new letter.
                            </Text>
                            <Text style={styles.bulletItem || { flexWrap: 'wrap' }}>
                                These new letters will be marked green to show that they are correct.
                            </Text>
                            <Text style={styles.bulletItem || { flexWrap: 'wrap' }}>
                                Be careful, you will only get 5 hints!
                            </Text>
                        </View>
                    </View>
                </>
            ),
        },
    ];
}