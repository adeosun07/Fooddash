import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PaymentTransferModal({ visible, onClose, amount, orderId }) {
  const [timeLeft, setTimeLeft] = useState(1139); // 18:59 in seconds
  const [isConfirming, setIsConfirming] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!visible) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text, label) => {
    Clipboard.setStringAsync(text);
    Alert.alert('Copied', `${label} copied to clipboard`);
  };

  const handleConfirmPayment = () => {
    setIsConfirming(true);
    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false);
      onClose(true); // Pass true to indicate payment confirmed
    }, 2000);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => onClose(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header with Close Button */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {isConfirming ? 'Confirming Transfer' : 'Pop-Up Transfer'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onClose(false)}
            >
              <Ionicons name="checkmark-circle" size={28} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          {/* Amount */}
          <Text style={styles.amount}>Pay ₦{amount}</Text>

          {/* Timer */}
          <Text style={styles.timer}>
            Account details expires in {formatTime(timeLeft)}
          </Text>

          {/* Payment Details */}
          <View style={styles.detailsContainer}>
            <DetailRow
              label="Bank Name"
              value="Opay"
              onCopy={() => copyToClipboard('Opay', 'Bank Name')}
            />
            <DetailRow
              label="Account Name"
              value={`Dash-Order${orderId}`}
              onCopy={() => copyToClipboard(`Dash-Order${orderId}`, 'Account Name')}
            />
            <DetailRow
              label="Account Number"
              value="9041156313"
              onCopy={() => copyToClipboard('9041156313', 'Account Number')}
            />
            <DetailRow
              label="Amount"
              value={`₦${amount}`}
              onCopy={() => copyToClipboard(amount.toString(), 'Amount')}
            />
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.confirmButton, isConfirming && styles.confirmButtonDisabled]}
            onPress={handleConfirmPayment}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <View style={styles.confirmingContainer}>
                <Text style={styles.confirmButtonText}>I have sent the money</Text>
                <ActivityIndicator color="#FFF" size="small" style={styles.loader} />
              </View>
            ) : (
              <Text style={styles.confirmButtonText}>I have sent the money</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function DetailRow({ label, value, onCopy }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.detailRight}>
        <Text style={styles.detailValue}>{value}</Text>
        <TouchableOpacity onPress={onCopy} style={styles.copyButton}>
          <MaterialCommunityIcons name="content-copy" size={16} color="#4A90E2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  timer: {
    fontSize: 13,
    color: '#E88D72',
    textAlign: 'center',
    marginBottom: 24,
  },
  detailsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
  },
  detailRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  copyButton: {
    padding: 4,
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#4A90E2',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loader: {
    marginLeft: 8,
  },
});
