import i18n from "../locales/i18n";


// Formats the date to make it more readable to the user
const formatMonthYear = (date) => {
    const months = i18n.t('months');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`
};

export default formatMonthYear;