import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import spacing from '../theme/spacing'
import colors from '../theme/colors'
import fonts from '../theme/fonts';
import i18n from '../locales/i18n';


const ExpenseDetailScreen = ({ route, navigation }) => {
  const { expense } = route.params;

  const handleDelete = () => {
    Alert.alert(
      i18n.t('deleteExpense'),
      i18n.t('confirmDelete'),
      [
        { text: i18n.t('cancel'), style: 'cancel' },
        {
          text: i18n.t('delete'),
          onPress: () => {
            navigation.navigate('Home', { deleteExpenseId: expense.id });
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>⏎ {i18n.t('back')}</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{i18n.t('expenseDetail')}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>{expense.title}</Text>
        <Text style={styles.detailAmount}>{i18n.t('amount')}: ₺{expense.amount}</Text>
        <Text style={styles.detailDate}>{i18n.t('date')}: {expense.date}</Text>
        <Text style={styles.detailCategory}>{i18n.t('category')}: {expense.category}</Text>
      </View>

      <View style={{ marginTop: spacing.large }}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>{i18n.t('deleteExpense')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>


  );
};

export default ExpenseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.background,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.large,
    marginBottom: spacing.medium,
  },
  headerTitle: {
    fontSize: fonts.xl,
    fontWeight: '600',
    color: colors.textLight,
    opacity: 0.7,
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
    fontSize: fonts.medium,
  },
  backButton: {
    backgroundColor: colors.primary,
    padding: spacing.small,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: fonts.small,
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: fonts.large,
    fontWeight: 'bold',
    marginBottom: spacing.medium,
  },
  detailAmount: {
    fontSize: fonts.medium,
    marginBottom: spacing.small,
  },
  detailDate: {
    fontSize: fonts.medium,
    marginBottom: spacing.small,
  },
  detailCategory: {
    fontSize: fonts.medium,
  },
});