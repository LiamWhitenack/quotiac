import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import getPages from './help-modal-pages';
import { createStyles } from '../styles';
import { useTheme } from '@/src/theme/ThemeContext';
import { createAppStyles } from '@/src/theme/styles';

type CryptoHelpModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const CryptoHelpModal: React.FC<CryptoHelpModalProps> = ({ isVisible, onClose }) => {
  const [page, setPage] = useState(0);
  const { theme, mode } = useTheme();
  const styles = createStyles(theme);
  const appStyles = createAppStyles(theme);


  const handleClose = () => {
    setPage(0);
    onClose();
  };

  const pages = getPages();

  const current = pages[page];

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.4}>
      <View
        style={[
          styles.container,
          { justifyContent: 'space-between' }
        ]}
      >
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.title}>{current.title}</Text>
          <View style={styles.body}>{current.content}</View>
        </View>

        {/* Footer Buttons with equal width */}
        <View style={[styles.footer, { flexDirection: 'row' }]}>
          <TouchableOpacity
            style={[appStyles.elevatedButton, { flex: 1, marginRight: 8, opacity: page === 0 ? 0 : 1 }]}
            onPress={() => setPage(page - 1)}
            disabled={page === 0}
          >
            <Text style={appStyles.elevatedButtonText}>Back</Text>
          </TouchableOpacity>

          {page < pages.length - 1 ? (
            <TouchableOpacity
              style={[appStyles.elevatedButton, { flex: 1 }]}
              onPress={() => setPage(page + 1)}
            >
              <Text style={appStyles.elevatedButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[appStyles.elevatedButton, { flex: 1 }]}
              onPress={handleClose}
            >
              <Text style={appStyles.elevatedButtonText}>Play</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CryptoHelpModal;
