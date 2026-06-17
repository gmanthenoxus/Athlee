import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import {
  MOCK_USERS,
  validateUserName,
  AccountType,
  type User,
  type PlayerUser,
  type BusinessUser,
} from '@athlehub/shared';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    // Validate name
    const validation = validateUserName(name);
    if (!validation.valid) {
      setError(validation.error || 'Invalid name');
      return;
    }

    try {
      await login(name);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  const handleQuickLogin = async (userName: string, accountType: AccountType) => {
    try {
      await login(userName, accountType);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  // Helper function to get display name for any user type
  const getUserDisplayName = (user: User): string => {
    if (user.accountType === AccountType.Player) {
      const playerUser = user as PlayerUser;
      return `${playerUser.firstName} ${playerUser.lastName}`;
    } else if (user.accountType === AccountType.Business) {
      const businessUser = user as BusinessUser;
      return businessUser.businessName;
    }
    return 'Visitor';
  };

  // Helper function to get initials for any user type
  const getUserInitials = (user: User): string => {
    if (user.accountType === AccountType.Player) {
      const playerUser = user as PlayerUser;
      return `${playerUser.firstName[0]}${playerUser.lastName[0]}`.toUpperCase();
    } else if (user.accountType === AccountType.Business) {
      const businessUser = user as BusinessUser;
      return businessUser.businessName.substring(0, 2).toUpperCase();
    }
    return 'V';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Athlehub</Text>
          <Text style={styles.subtitle}>Mock Authentication</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.form}>
            <Text style={styles.label}>Enter your username</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="John Doe"
              placeholderTextColor="#9CA3AF"
              editable={!isLoading}
              autoCapitalize="words"
              autoCorrect={false}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, (!name.trim() || isLoading) && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={!name.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerLink}
              onPress={() => router.push('/register')}
              disabled={isLoading}
            >
              <Text style={styles.registerLinkText}>
                Don't have an account? Register here
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or use a mock profile</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.mockUsers}>
            {MOCK_USERS.map((user) => (
              <TouchableOpacity
                key={user.id}
                style={styles.userCard}
                onPress={() => handleQuickLogin(getUserDisplayName(user), user.accountType)}
                disabled={isLoading}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getUserInitials(user)}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{getUserDisplayName(user)}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
                <View style={styles.accountTypeBadge}>
                  <Text style={styles.accountTypeText}>{user.accountType}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.disclaimer}>
          This is a mock authentication system for development purposes only.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  error: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#2563EB',
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  mockUsers: {
    gap: 12,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  accountTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#DBEAFE',
    borderRadius: 4,
  },
  accountTypeText: {
    fontSize: 11,
    color: '#1E40AF',
    fontWeight: '500',
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 24,
  },
});
