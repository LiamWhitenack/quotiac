import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

type CryptoHelpModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const pages = [
  {
    title: 'How to Play',
    content: [
      'Decode the quote by replacing each symbol with the correct letter.',
      'Each symbol stands for a different letter.',
      'Use patterns and common words to help you solve it.',
    ],
  },
  {
    title: 'Making Guesses',
    content: [
      'Tap a symbol, then tap a letter to assign it.',
      'You can reassign or clear guesses at any time.',
      '[Placeholder for animation here]',
    ],
  },
  {
    title: 'Winning the Game',
    content: [
      'When all symbols have correct letters, the full quote is revealed.',
      'Use logic and deduction to complete the puzzle!',
    ],
  },
];

const CryptoHelpModal: React.FC<CryptoHelpModalProps> = ({ isVisible, onClose }) => {
  const [page, setPage] = useState(0);

  const current = pages[page];

  const handleClose = () => {
    setPage(0);
    onClose();
  };

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.4}>
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color="#444" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{current.title}</Text>

        {/* Content */}
        <View style={styles.body}>
          {current.content.map((line, index) => (
            <Text key={index} style={styles.text}>
              {line}
            </Text>
          ))}
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          {page > 0 ? (
            <TouchableOpacity style={styles.footerButton} onPress={() => setPage(page - 1)}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.footerButtonPlaceholder} />
          )}

          {page < pages.length - 1 ? (
            <TouchableOpacity style={styles.footerButton} onPress={() => setPage(page + 1)}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.footerButton} onPress={handleClose}>
              <Text style={styles.buttonText}>Got It</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CryptoHelpModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  body: {
    marginBottom: 20,
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  footerButtonPlaceholder: {
    minWidth: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});
