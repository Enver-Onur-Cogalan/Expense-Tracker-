const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#8AC926', '#FF595E', '#6A4C93', '#1982C4'
];
const randomColors = (index) => colors[index % colors.length];

export default randomColors;