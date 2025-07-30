import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../styles';
import getPages from './help-modal-pages';

type CryptoHelpModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const CryptoHelpModal: React.FC<CryptoHelpModalProps> = ({ isVisible, onClose }) => {
  const [page, setPage] = useState(0);

  const handleClose = () => {
    setPage(0);
    onClose();
  };

  const pages = getPages(); // Call the external function here

  const current = pages[page];

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.4}>
      <View
        style={[
          styles.container,
          { justifyContent: 'space-between' } // Keep your existing styles here
        ]}
      >
        {/* Wrap all but footer */}
        <View style={{ flexShrink: 1 }}>
          {/* Title */}
          <Text style={styles.title}>{current.title}</Text>

          {/* Body */}
          <View style={styles.body}>{current.content}</View>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          {page > 0 ? (
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => setPage(page - 1)}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.footerButtonPlaceholder} />
          )}

          {page < pages.length - 1 ? (
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => setPage(page + 1)}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.footerButton} onPress={handleClose}>
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CryptoHelpModal;
