# Expense Tracker App

**Expense Tracker** is a mobile application where users can record, view, and analyze their expenses based on categories.
The project was developed with a prop drilling architecture (without global state management).

---

# 🚀 Features

- Add, view, and delete expenses
- Select and add new categories
- Automatic mock expenses loading on app start
- Monthly expense chart on the Statistics screen (PieChart)
- Display of total monthly spending
- Language selection (Turkish / English)
- Responsive and modern user interface
- Clean, modular, and well-commented code structure

---

# ⚙️ Technologies Used

- React Native (CLI)
- React Navigation (Stack Navigation)
- react-native-chart-kit (for charts)
- react-native-animatable (for animations)
- i18n-js (multi-language support)
- react-native-community/datetimepicker (date selection)

---

# 🛠️ Installation Steps

1. Clone this repository to your device:
   ```bash
   git clone https://github.com/Enver-Onur-Cogalan/Expense-Tracker-.git
   ```

2. Navigate into the project directory:
   ```bash
   cd ExpenseTracker-RN
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. For iOS:
   ```bash
   cd ios
   pod install
   cd ..
   ```

5. To run on Android:
   ```bash
   yarn android
   ```

6. To run on iOS:
   ```bash
   yarn ios
   ```

---

# 📋 Evaluation Criteria

- Functionality: All main features are working.
- Code Structure: Modular and readable code.
- UI/UX: Responsive and user-friendly design.
- Error Handling: Input validation and error feedback are implemented.
- Performance: Smooth and optimized navigation and screen transitions.
- Architecture: Pure Prop Drilling without global state management.

---

# 👨‍💻 Developer

- **Name:** Enver Onur Cogalan
- **GitHub:** [github.com/Enver-Onur-Cogalan](https://github.com/Enver-Onur-Cogalan)
- **Contact:** [https://www.linkedin.com/in/onurcogalan/]

---

# 🎯 Notes

- This project was developed for personal improvement and mobile development practice.
- Written according to Clean Code principles.
- No global state management libraries (like Redux, Zustand, etc.) were used.
Instead, all data flow is managed via prop drilling and local component states.

---

# 🔥 Additional Information

- ✨ Animations are added using react-native-animatable to enhance user experience.
- ✨ Monthly expenses are dynamically displayed with PieChart on the Statistics screen.
- ✨ Multi-language support (Turkish and English) is provided using i18n-js.

---

# 🚀 SPECIAL POINTS

- ✅ Mockdata loads on first app open if there are no expenses.
- ✅ FlatList rendering is tested with large datasets for performance.