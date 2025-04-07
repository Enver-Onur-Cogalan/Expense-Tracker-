import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import fonts from '../theme/fonts';

// Component that displays the category name and performs selection or deletion when clicked
const CategoryItem = ({ item, onSelect, onDelete }) => {
    return (
        <View style={[styles.container, { backgroundColor: colors[item] || colors.primary }]}>
            <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
                <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CategoryItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        padding: spacing.medium,
        marginBottom: spacing.small,
    },
    item: {
        padding: spacing.medium,
    },
    text: {
        color: '#fff',
        fontSize: fonts.large,
    },
    deleteButton: {
        marginLeft: spacing.small,
    },
    deleteButtonText: {
        fontSize: fonts.large,
    },
});