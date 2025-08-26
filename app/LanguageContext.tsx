import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'ka';

// English translations
const enTranslations = {
  profile: {
    title: 'Profile',
    userName: 'Sophia Carter',
    subtitle: 'Mindful Journey',
    joined: 'Joined 2022',
    settings: 'Settings',
    dayStreak: 'Day Streak',
    ritualsCompleted: 'Rituals Completed',
    journalEntries: 'Journal Entries',
    notifications: 'Notifications',
    accountManagement: 'Account Management',
    helpSupport: 'Help & Support',
    permissionRequired: 'Permission to access gallery is required!',
  },
  notifications: {
    title: 'Notifications',
    reset: 'Reset',
    cancel: 'Cancel',
    resetTitle: 'Reset Settings',
    resetMessage: 'Are you sure you want to reset all notification settings to default?',
    mainNotifications: 'Main Notifications',
    goalsAchievements: 'Goals & Achievements',
    optionalNotifications: 'Optional Notifications',
    dailyReminders: 'Daily Reminders',
    dailyRemindersDesc: 'Get reminded to complete your daily rituals',
    journalReminders: 'Journal Reminders',
    journalRemindersDesc: 'Notifications to write in your journal',
    meditationAlerts: 'Meditation Alerts',
    meditationAlertsDesc: 'Reminders for meditation sessions',
    weeklyGoals: 'Weekly Goals',
    weeklyGoalsDesc: 'Updates on your weekly progress',
    achievementAlerts: 'Achievement Alerts',
    achievementAlertsDesc: 'Celebrate when you reach milestones',
    motivationalQuotes: 'Motivational Quotes',
    motivationalQuotesDesc: 'Daily inspirational messages',
    systemUpdates: 'System Updates',
    systemUpdatesDesc: 'Important app updates and features',
    marketingEmails: 'Marketing Emails',
    marketingEmailsDesc: 'Promotional content and offers',
  },
  help: {
    title: 'Help & Support',
    faqTitle: 'Frequently Asked Questions',
    question1: 'How do I start my daily ritual?',
    answer1: 'Go to the home screen and tap on "Start Ritual". Follow the guided steps to complete your daily practice.',
    question2: 'Can I customize my meditation sessions?',
    answer2: 'Yes! Go to Settings > Meditation Preferences to customize duration, background sounds, and guidance style.',
    question3: 'How do I backup my journal entries?',
    answer3: 'Your journal entries are automatically synced to your account. You can also export them from Settings > Data Management.',
    contactTitle: 'Contact Us',
    email: 'Email Support',
    website: 'Help Website',
    appInfoTitle: 'App Information',
    version: 'Version',
    buildNumber: 'Build Number',
    tipsTitle: 'Pro Tips',
    tip1: 'Set consistent daily reminders to build a strong habit',
    tip2: 'Use the progress tracker to see your growth over time',
    tip3: 'Enable dark mode in settings for better evening use',
  },
  password: {
    title: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    enterCurrentPassword: 'Enter your current password',
    enterNewPassword: 'Enter your new password',
    confirmNewPassword: 'Confirm your new password',
    requirements: 'Password Requirements',
    minLength: 'At least 8 characters',
    hasUpperCase: 'One uppercase letter',
    hasLowerCase: 'One lowercase letter',
    hasNumbers: 'One number',
    hasSpecialChar: 'One special character',
    securityTips: 'Security Tips',
    tip1: 'Use a unique password for this app',
    tip2: 'Change your password regularly',
    tip3: 'Never share your password with others',
    changePassword: 'Change Password',
    error: 'Error',
    success: 'Success',
    fillAllFields: 'Please fill in all fields',
    passwordsDontMatch: 'Passwords do not match',
    weakPassword: 'Password does not meet security requirements',
    passwordChanged: 'Your password has been successfully changed',
    ok: 'OK',
  },
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Switch between light and dark themes',
    language: 'Language',
    currentLanguage: 'Language',
    account: 'Account',
    profile: 'Profile',
    profileDesc: 'View and edit your profile',
    notifications: 'Notifications',
    notificationsDesc: 'Manage your notification preferences',
    security: 'Security',
    securityDesc: 'Change password and security settings',
    support: 'Support',
    helpSupport: 'Help & Support',
    helpSupportDesc: 'Get help and contact support',
  },
  
};

// Georgian translations
const kaTranslations = {
  profile: {
    title: 'პროფილი',
    userName: 'სოფია კარტერი',
    subtitle: 'შინაგანი განვითარება',
    joined: 'შემოვიდა 2022',
    settings: 'პარამეტრები',
    dayStreak: 'დღეების ჯაჭვი',
    ritualsCompleted: 'დასრულებული რიტუალები',
    journalEntries: 'დღიურის ჩანაწერები',
    notifications: 'შეტყობინებები',
    accountManagement: 'ანგარიშის მართვა',
    helpSupport: 'დახმარება',
    permissionRequired: 'გალერეაზე წვდომის ნებართვა საჭიროა!',
  },
  notifications: {
    title: 'შეტყობინებები',
    reset: 'გადატვირთვა',
    cancel: 'გაუქმება',
    resetTitle: 'პარამეტრების გადატვირთვა',
    resetMessage: 'დარწმუნებული ხარ, რომ გინდა ყველა შეტყობინების პარამეტრის გადატვირთვა?',
    mainNotifications: 'მთავარი შეტყობინებები',
    goalsAchievements: 'მიზნები და მიღწევები',
    optionalNotifications: 'დამატებითი შეტყობინებები',
    dailyReminders: 'ყოველდღიური შეხსენებები',
    dailyRemindersDesc: 'შეხსენება ყოველდღიური რიტუალების შესასრულებლად',
    journalReminders: 'დღიურის შეხსენებები',
    journalRemindersDesc: 'შეტყობინებები დღიურში ჩასაწერად',
    meditationAlerts: 'მედიტაციის გაფრთხილებები',
    meditationAlertsDesc: 'შეხსენება მედიტაციის სესიებისთვის',
    weeklyGoals: 'კვირეული მიზნები',
    weeklyGoalsDesc: 'კვირეული პროგრესის განახლებები',
    achievementAlerts: 'მიღწევების გაფრთხილებები',
    achievementAlertsDesc: 'დზღვნილება მიზნების მიღწევისას',
    motivationalQuotes: 'მოტივაციური ციტატები',
    motivationalQuotesDesc: 'ყოველდღიური შთამბეჭდავი მესიჯები',
    systemUpdates: 'სისტემის განახლებები',
    systemUpdatesDesc: 'მნიშვნელოვანი აპლიკაციის განახლებები',
    marketingEmails: 'მარკეტინგული მეილები',
    marketingEmailsDesc: 'პრომოციული შინაარსი და შეთავაზებები',
  },
  help: {
    title: 'დახმარება',
    faqTitle: 'ხშირად დასმული კითხვები',
    question1: 'როგორ დავიწყო ყოველდღიური რიტუალი?',
    answer1: 'გადადი მთავარ გვერდზე და დააჭირე "რიტუალის დაწყება"-ს. მიყევი ინსტრუქციებს.',
    question2: 'შემიძლია მედიტაციის სესიების მორგება?',
    answer2: 'დიახ! გადადი პარამეტრები > მედიტაციის პრეფერენციები და მოირგე ხანგრძლივობა და სხვა.',
    question3: 'როგორ შევინახო დღიურის ჩანაწერები?',
    answer3: 'დღიურის ჩანაწერები ავტომატურად სინქრონდება. შეგიძლია ექსპორტიც.',
    contactTitle: 'დაგვიკავშირდი',
    email: 'ელ-ფოსტის მხარდაჭერა',
    website: 'დახმარების ვებსაიტი',
    appInfoTitle: 'აპლიკაციის ინფორმაცია',
    version: 'ვერსია',
    buildNumber: 'Build ნომერი',
    tipsTitle: 'პროფესიონალური რჩევები',
    tip1: 'დააყენე რეგულარული შეხსენებები ჩვევის ჩამოყალიბებისთვის',
    tip2: 'იყენებ პროგრესის ტრაკერი შენი განვითარების სანახავად',
    tip3: 'ჩართე მუქი რეჟიმი საღამოობით გამოსაყენებლად',
  },
  password: {
    title: 'პაროლის შეცვლა',
    currentPassword: 'მიმდინარე პაროლი',
    newPassword: 'ახალი პაროლი',
    confirmPassword: 'პაროლის დადასტურება',
    enterCurrentPassword: 'შეიყვანე მიმდინარე პაროლი',
    enterNewPassword: 'შეიყვანე ახალი პაროლი',
    confirmNewPassword: 'დაადასტურე ახალი პაროლი',
    requirements: 'პაროლის მოთხოვნები',
    minLength: 'მინიმუმ 8 სიმბოლო',
    hasUpperCase: 'ერთი დიდი ასო',
    hasLowerCase: 'ერთი პატარა ასო',
    hasNumbers: 'ერთი რიცხვი',
    hasSpecialChar: 'ერთი სპეციალური სიმბოლო',
    securityTips: 'უსაფრთხოების რჩევები',
    tip1: 'გამოიყენე უნიკალური პაროლი ამ აპისთვის',
    tip2: 'შეცვალე პაროლი რეგულარულად',
    tip3: 'არ გაუზიარო პაროლი სხვებს',
    changePassword: 'პაროლის შეცვლა',
    error: 'შეცდომა',
    success: 'წარმატება',
    fillAllFields: 'გთხოვთ შეავსო ყველა ველი',
    passwordsDontMatch: 'პაროლები არ ემთხვევა',
    weakPassword: 'პაროლი არ აკმაყოფილებს უსაფრთხოების მოთხოვნებს',
    passwordChanged: 'პაროლი წარმატებით შეიცვალა',
    ok: 'კარგი',
  },
settings: {
    title: 'პარამეტრები',
    appearance: 'გარეგნობა',
    darkMode: 'მუქი რეჟიმი',
    darkModeDesc: 'ღია და მუქ თემებს შორის გადართვა',
    language: 'ენა',
    currentLanguage: 'ენა',
    account: 'ანგარიში',
    profile: 'პროფილი',
    profileDesc: 'პროფილის ნახვა და რედაქტირება',
    notifications: 'შეტყობინებები',
    notificationsDesc: 'შეტყობინებების პარამეტრების მართვა',
    security: 'უსაფრთხოება',
    securityDesc: 'პაროლისა და უსაფრთხოების პარამეტრების შეცვლა',
    support: 'მხარდაჭერა',
    helpSupport: 'დახმარება',
    helpSupportDesc: 'დახმარების მიღება და მხარდაჭერასთან კონტაქტი',
  },

};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof enTranslations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: enTranslations,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('user_language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ka')) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (newLanguage: Language) => {
    try {
      setLanguageState(newLanguage);
      await AsyncStorage.setItem('user_language', newLanguage);
      console.log('Language changed to:', newLanguage);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  const t = language === 'ka' ? kaTranslations : enTranslations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}