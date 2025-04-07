import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import spacing from '../theme/spacing'
import colors from '../theme/colors'


const ExpenseDetailScreen = ({ route, navigation }) => {
  const { expense } = route.params;

  const handleDelete = () => {
    Alert.alert(
      'Gideri Sil',
      'Bu gideri silmek istediğine emin misin?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          onPress: () => {
            navigation.navigate('Home', { deleteExpenseId: expense.id });
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{expense.title}</Text>
      <Text style={styles.text}>💵{expense.amount}</Text>
      <Text style={styles.text}>Tarih: {expense.date}</Text>
      <Text style={styles.title}>Kategori: {expense.category}</Text>

      <View style={{ marginTop: spacing.large }}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Giderleri Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExpenseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.medium,
    color: colors.text,
  },
  text: {
    fontSize: 16,
    marginBottom: spacing.small,
    color: colors.text,
  },
  deleteButton: {
    backgroundColor: colors.error,
    padding: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.large,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});