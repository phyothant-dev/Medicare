// components/SymptomAnalysisModal.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react';
import {
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Get screen width for responsive modal size
const { width } = Dimensions.get('window');

interface SymptomAnalysisModalProps {
  isVisible: boolean;
  onClose: () => void;
  analysisText: string;
}

const SymptomAnalysisModal: React.FC<SymptomAnalysisModalProps> = ({
  isVisible,
  onClose,
  analysisText,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { width: width * 0.9 }]}>
          
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>🧠 AI Analysis Report</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={28} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Body - Scrollable Content */}
          <ScrollView style={styles.modalBody}>
            <Text style={styles.modalText}>
              {analysisText || "No analysis data available."}
            </Text>
          </ScrollView>

          {/* Footer - Close Button */}
          <TouchableOpacity
            style={styles.modalButton}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>Acknowledge & Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SymptomAnalysisModal;

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "stretch",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      maxHeight: '80%', // Limit height on larger screens
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingBottom: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#00BFFF", // Deep Sky Blue
    },
    modalBody: {
      maxHeight: 400, // Constrain scroll view height
      marginBottom: 20,
    },
    modalText: {
      marginBottom: 10,
      textAlign: "left", // Improved readability over justify
      lineHeight: 22,
      fontSize: 16,
      color: "#333",
    },
    modalButton: {
      backgroundColor: "#00BFFF",
      borderRadius: 10,
      padding: 12,
      elevation: 2,
    },
    modalButtonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },
});