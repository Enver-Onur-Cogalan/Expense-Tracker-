import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const isSmallDevice = width < 360;

const fonts = {
    tiny: isSmallDevice ? 10 : 12,
    small: isSmallDevice ? 12 : 14,
    medium: isSmallDevice ? 14 : 16,
    large: isSmallDevice ? 18 : 20,
    xl: isSmallDevice ? 22 : 24,
    xxl: isSmallDevice ? 26 : 30,
};

export default fonts;