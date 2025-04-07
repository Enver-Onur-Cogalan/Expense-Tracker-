import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import fonts from '../theme/fonts';

const ExpenseItem = ({ title, amount, date, category, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.category}>{category}</Text>
            </View>

            <View style={styles.amountContainer}>
                <Text style={styles.amount}>₺{amount}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        padding: spacing.medium,
        marginBottom: spacing.small,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: fonts.large,
        color: colors.textLight,
        fontWeight: 'bold',
    },
    category: {
        fontSize: fonts.medium,
        color: colors.cardText,
        opacity: 0.7,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: fonts.large,
        color: colors.text,
        fontWeight: 'bold',
    },
    date: {
        fontSize: fonts.small,
        color: colors.text,
        opacity: 0.7,
    },
});