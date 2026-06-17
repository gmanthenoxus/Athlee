/**
 * Mobile End Match Dialog Component
 * Confirmation modal for ending a match
 */

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

interface EndMatchDialogProps {
  teamAName: string;
  teamBName: string;
  scores: {
    teamA: number;
    teamB: number;
  };
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EndMatchDialog: React.FC<EndMatchDialogProps> = ({
  teamAName,
  teamBName,
  scores,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  // Determine winner
  const winner =
    scores.teamA > scores.teamB
      ? teamAName
      : scores.teamB > scores.teamA
        ? teamBName
        : 'Tie';

  const isWinnerTie = winner === 'Tie';

  return (
    <Modal transparent visible={true} animationType="fade">
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Dialog */}
        <View style={styles.dialog}>
          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>End Match</Text>

            {/* Final Score */}
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Final Score</Text>

              <View style={styles.scoreDisplay}>
                <View style={styles.teamScore}>
                  <Text style={styles.teamName}>{teamAName}</Text>
                  <Text style={styles.score}>{scores.teamA}</Text>
                </View>

                <Text style={styles.vs}>-</Text>

                <View style={styles.teamScore}>
                  <Text style={styles.teamName}>{teamBName}</Text>
                  <Text style={styles.score}>{scores.teamB}</Text>
                </View>
              </View>
            </View>

            {/* Winner */}
            {!isWinnerTie ? (
              <View style={styles.winnerContainer}>
                <Text style={styles.winnerLabel}>Winner</Text>
                <Text style={styles.winnerName}>{winner}</Text>
              </View>
            ) : (
              <View style={styles.tieContainer}>
                <Text style={styles.tieText}>Match Tied</Text>
              </View>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirm & Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    width: '85%',
    maxWidth: 320
  },
  content: {
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center'
  },
  scoreContainer: {
    marginBottom: 16,
    alignItems: 'center'
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '600'
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  teamScore: {
    flex: 1,
    alignItems: 'center'
  },
  teamName: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000'
  },
  vs: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF'
  },
  winnerContainer: {
    marginBottom: 12,
    alignItems: 'center'
  },
  winnerLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600'
  },
  winnerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669'
  },
  tieContainer: {
    marginBottom: 12,
    alignItems: 'center'
  },
  tieText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280'
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButton: {
    backgroundColor: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#D1D5DB'
  },
  confirmButton: {
    backgroundColor: '#DC2626'
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937'
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  }
});
