import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'English' | 'Kazakh' | 'Russian';

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  English: {
    'app.name': 'Eco-Lyceum',
    'auth.welcome': 'Welcome back, Eco-Warrior',
    'auth.create': 'Create your account',
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.join': 'Join the Movement',
    'auth.google': 'Google Account',
    'auth.or': 'Or continue with',
    'auth.noaccount': "Don't have an account?",
    'auth.hasaccount': 'Already have an account?',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'class.select': 'Select Your Class',
    'class.subtitle': 'Join your classmates in the efficiency drive',
    'class.confirm': 'Confirm Selection',
    'nav.home': 'Home',
    'nav.rankings': 'Rankings',
    'nav.journey': 'Journey',
    'nav.admin': 'Input',
    'nav.profile': 'Profile',
    'grade.7': 'Grade 7',
    'grade.8': 'Grade 8',
    'grade.9': 'Grade 9',
    'grade.10': 'Grade 10',
    'dash.welcome': 'Welcome back,',
    'dash.totalFund': 'Total Impact Fund',
    'dash.activeProjects': 'Active Projects',
    'dash.impactScore': 'Impact Score',
    'dash.quickStats': 'Quick Stats',
    'dash.recentActivity': 'Recent Activity',
    'dash.viewAll': 'View All',
    'dash.invest': 'Invest in Green Future',
    'dash.recycled': 'Recycled',
    'dash.network': 'Network',
    'dash.rank': 'Rank',
    'dash.streak': 'Streak',
    'dash.nextMilestone': 'Next Milestone',
    'dash.notifications': 'Notifications',
    'dash.user': 'Seidulla',
    'settings.title': 'Settings',
    'settings.preferences': 'Preferences',
    'settings.notifications': 'Notifications',
    'settings.notifSub': 'Pickup alerts & leaderboard updates',
    'settings.darkMode': 'Dark Mode',
    'settings.darkSub': 'Switch to dark interface',
    'settings.language': 'Language',
    'settings.security': 'Security & Support',
    'settings.privacy': 'Privacy Policy',
    'settings.about': 'About Platform',
    'settings.version': 'Eco-Lyceum v2.4.0-Stable',
    'rank.title': 'Turkistan Leaderboard',
    'rank.search': 'Search classes (e.g. 7A, 10C)...',
    'rank.weekly': 'Weekly',
    'rank.monthly': 'Monthly',
    'rank.alltime': 'All Time',
    'rank.leader': '#1 LEADER',
    'rank.totalKg': 'Total KG',
    'rank.paper': 'Paper',
    'rank.plastic': 'Plastic',
    'rank.challengers': 'Challengers',
    'rank.updated': 'Updated 5m ago',
    'rank.noresults': 'No classes found',
  },
  Kazakh: {
    'app.name': 'Eco-Lyceum',
    'auth.welcome': 'Қош келдіңіз, Эко-Жауынгер',
    'auth.create': 'Тіркелгі жасау',
    'auth.signin': 'Кіру',
    'auth.signup': 'Тіркелу',
    'auth.join': 'Қозғалысқа қосылыңыз',
    'auth.google': 'Google есептік жазбасы',
    'auth.or': 'Немесе арқылы жалғастырыңыз',
    'auth.noaccount': 'Тіркелгіңіз жоқ па?',
    'auth.hasaccount': 'Тіркелгіңіз бар ма?',
    'auth.email': 'Электрондық пошта',
    'auth.password': 'Құпия сөз',
    'class.select': 'Сыныбыңызды таңдаңыз',
    'class.subtitle': 'Тиімділік науқанында сыныптастарыңызға қосылыңыз',
    'class.confirm': 'Таңдауды растау',
    'nav.home': 'Басты',
    'nav.rankings': 'Рейтинг',
    'nav.journey': 'Саяхат',
    'nav.admin': 'Енгізу',
    'nav.profile': 'Профиль',
    'grade.7': '7-сынып',
    'grade.8': '8-сынып',
    'grade.9': '9-сынып',
    'grade.10': '10-сынып',
    'dash.welcome': 'Қош келдіңіз,',
    'dash.totalFund': 'Жалпы әсер қоры',
    'dash.activeProjects': 'Белсенді жобалар',
    'dash.impactScore': 'Әсер ету ұпайы',
    'dash.quickStats': 'Жылдам статистика',
    'dash.recentActivity': 'Соңғы әрекеттер',
    'dash.viewAll': 'Барлығын көру',
    'dash.invest': 'Жасыл болашаққа инвестиция салу',
    'dash.recycled': 'Қайта өңделген',
    'dash.network': 'Желі',
    'dash.rank': 'Рейтинг',
    'dash.streak': 'Серия',
    'dash.nextMilestone': 'Келесі белес',
    'dash.notifications': 'Хабарландырулар',
    'dash.user': 'Сейдулла',
    'settings.title': 'Параметрлер',
    'settings.preferences': 'Теңшелімдер',
    'settings.notifications': 'Хабарландырулар',
    'settings.notifSub': 'Алып кету туралы ескертулер',
    'settings.darkMode': 'Түнгі режим',
    'settings.darkSub': 'Қараңғы интерфейске ауысу',
    'settings.language': 'Тіл',
    'settings.security': 'Қауіпсіздік және қолдау',
    'settings.privacy': 'Құпиялылық саясаты',
    'settings.about': 'Платформа туралы',
    'settings.version': 'Eco-Lyceum v2.4.0-Тұрақты',
    'rank.title': 'Түркістан рейтингі',
    'rank.search': 'Сыныптарды іздеу (мысалы, 7A, 10C)...',
    'rank.weekly': 'Апталық',
    'rank.monthly': 'Айлық',
    'rank.alltime': 'Барлық уақыт',
    'rank.leader': '#1 КӨШБАСШЫ',
    'rank.totalKg': 'Жалпы кг',
    'rank.paper': 'Қағаз',
    'rank.plastic': 'Пластик',
    'rank.challengers': 'Үміткерлер',
    'rank.updated': '5 минут бұрын жаңартылды',
    'rank.noresults': 'Сыныптар табылмады',
  },
  Russian: {
    'app.name': 'Eco-Lyceum',
    'auth.welcome': 'С возвращением, Эко-Воин',
    'auth.create': 'Создать аккаунт',
    'auth.signin': 'Войти',
    'auth.signup': 'Регистрация',
    'auth.join': 'Присоединяйтесь к движению',
    'auth.google': 'Google аккаунт',
    'auth.or': 'Или продолжите через',
    'auth.noaccount': 'Нет аккаунта?',
    'auth.hasaccount': 'Уже есть аккаунт?',
    'auth.email': 'Электронная почта',
    'auth.password': 'Пароль',
    'class.select': 'Выберите свой класс',
    'class.subtitle': 'Присоединяйтесь к одноклассникам в борьбе за эффективность',
    'class.confirm': 'Подтвердить выбор',
    'nav.home': 'Главная',
    'nav.rankings': 'Рейтинг',
    'nav.journey': 'Путь',
    'nav.admin': 'Ввод',
    'nav.profile': 'Профиль',
    'grade.7': '7 класс',
    'grade.8': '8 класс',
    'grade.9': '9 класс',
    'grade.10': '10 класс',
    'dash.welcome': 'С возвращением,',
    'dash.totalFund': 'Общий фонд влияния',
    'dash.activeProjects': 'Активные проекты',
    'dash.impactScore': 'Балл влияния',
    'dash.quickStats': 'Быстрая статистика',
    'dash.recentActivity': 'Последние действия',
    'dash.viewAll': 'Посмотреть все',
    'dash.invest': 'Инвестировать в зеленое будущее',
    'dash.recycled': 'Переработано',
    'dash.network': 'Сеть',
    'dash.rank': 'Ранг',
    'dash.streak': 'Серия',
    'dash.nextMilestone': 'Следующий рубеж',
    'dash.notifications': 'Уведомления',
    'dash.user': 'Сейдулла',
    'settings.title': 'Настройки',
    'settings.preferences': 'Предпочтения',
    'settings.notifications': 'Уведомления',
    'settings.notifSub': 'Оповещения о сборе и лидерборде',
    'settings.darkMode': 'Темная тема',
    'settings.darkSub': 'Переключиться на темный интерфейс',
    'settings.language': 'Язык',
    'settings.security': 'Безопасность и поддержка',
    'settings.privacy': 'Политика конфиденциальности',
    'settings.about': 'О платформе',
    'settings.version': 'Eco-Lyceum v2.4.0-Стабильная',
    'rank.title': 'Рейтинг Туркестана',
    'rank.search': 'Поиск классов (напр. 7A, 10C)...',
    'rank.weekly': 'Еженедельно',
    'rank.monthly': 'Ежемесячно',
    'rank.alltime': 'Все время',
    'rank.leader': '#1 ЛИДЕР',
    'rank.totalKg': 'Всего кг',
    'rank.paper': 'Бумага',
    'rank.plastic': 'Пластик',
    'rank.challengers': 'Претенденты',
    'rank.updated': 'Обновлено 5 мин. назад',
    'rank.noresults': 'Классы не найдены',
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkModeState] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'English';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setDarkMode = (dark: boolean) => setDarkModeState(dark);
  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, language, setLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
