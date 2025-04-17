import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import fonts from '../theme/fonts';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'
import categoryIconMap from '../utils/iconMap';

const deleteIcon = <Icon name='trash-outline' size={18} color='#555' />

// Component that displays the category name and performs selection or deletion when clicked
const CategoryItem = ({ item, onSelect, onDelete, align }) => {
    const iconName = categoryIconMap[item] || 'help-circle-outline';
    return (
    <Animatable.View animation="fadeInUp" duration={500} style={[styles.chipContainer, {alignSelf: align}]}>
      <TouchableOpacity style={styles.chip} onPress={() => onSelect(item)}>
        <Icon name={iconName} size={16} color='#555' style={{ marginRight: 6}} />
        <Text style={styles.chipText} numberOfLines={1}>{item}</Text>
        <TouchableOpacity onPress={() => onDelete(item)} style={styles.icon}>
            {deleteIcon}
        </TouchableOpacity>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
    chipContainer: {
        margin: spacing.small / 1.5,
        width: '48%'
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 20,
        width: '100%',
        marginVertical: 8,
        elevation: 1,
    },
    chipText: {
        flex: 1,
        color: colors.text,
        fontSize: fonts.small,
        flexShrink: 1,
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
    