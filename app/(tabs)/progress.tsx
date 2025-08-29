import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const { width } = Dimensions.get('window');

interface ProgressData {
  date: string;
  value: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  achieved: boolean;
  date?: string;
}

export default function ProgressScreen() {
  const { colors } = useTheme();
  const { language } = useLanguage();

  const weeklyData: ProgressData[] = [
    { date: 'Mon', value: 20 },
    { date: 'Tue', value: 35 },
    { date: 'Wed', value: 15 },
    { date: 'Thu', value: 45 },
    { date: 'Fri', value: 30 },
    { date: 'Sat', value: 25 },
    { date: 'Sun', value: 40 },
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: language === 'ka' ? 'პირველი ნაბიჯი' : 'First Step',
      description: language === 'ka' ? 'პირველი მედიტაცია დასრულებული' : 'Complete your first meditation',
      icon: 'footsteps',
      achieved: true,
      date: '2024-08-25'
    },
    {
      id: '2', 
      title: language === 'ka' ? '7 დღე ზედიზედ' : '7 Day Streak',
      description: language === 'ka' ? '7 დღე მედიტაცია ყოველდღე' : 'Meditate 7 days in a row',
      icon: 'flame',
      achieved: true,
      date: '2024-08-28'
    },
    {
      id: '3',
      title: language === 'ka' ? 'ზენის ოსტატი' : 'Zen Master',
      description: language === 'ka' ? '50 მედიტაცია დასრულებული' : 'Complete 50 meditations',
      icon: 'diamond',
      achieved: false,
    },
    {
      id: '4',
      title: language === 'ka' ? 'ყოველდღიური პრაქტიკა' : 'Daily Practice',
      description: language === 'ka' ? '30 დღე ზედიზედ' : '30 days in a row',
      icon: 'trophy',
      achieved: false,
    }
  ];

  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {language === 'ka' ? 'შენი პროგრესი' : 'Your Progress'}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {language === 'ka' 
            ? 'ნახე როგორ იზრდები ყოველდღე' 
            : 'See how you grow every day'}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Weekly Overview */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            {language === 'ka' ? 'ამ კვირის მიმოხილვა' : 'This Week Overview'}
          </Text>
          
          <View style={styles.chartContainer}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: (day.value / maxValue) * 80,
                      backgroundColor: colors.primary 
                    }
                  ]} 
                />
                <Text style={[styles.chartLabel, { color: colors.textSecondary }]}>
                  {day.date}
                </Text>
                <Text style={[styles.chartValue, { color: colors.text }]}>
                  {day.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Monthly Stats */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            {language === 'ka' ? 'თვიური სტატისტიკა' : 'Monthly Statistics'}
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="calendar" size={24} color={colors.primary} />
              <Text style={[styles.statBigNumber, { color: colors.text }]}>23</Text>
              <Text style={[styles.statCardLabel, { color: colors.textSecondary }]}>
                {language === 'ka' ? 'დღე აქტიური' : 'Active Days'}
              </Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="time" size={24} color={colors.primary} />
              <Text style={[styles.statBigNumber, { color: colors.text }]}>340</Text>
              <Text style={[styles.statCardLabel, { color: colors.textSecondary }]}>
                {language === 'ka' ? 'სულ წუთები' : 'Total Minutes'}
              </Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="trending-up" size={24} color={colors.primary} />
              <Text style={[styles.statBigNumber, { color: colors.text }]}>+15%</Text>
              <Text style={[styles.statCardLabel, { color: colors.textSecondary }]}>
                {language === 'ka' ? 'გაუმჯობესება' : 'Improvement'}
              </Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="heart" size={24} color={colors.primary} />
              <Text style={[styles.statBigNumber, { color: colors.text }]}>8.2</Text>
              <Text style={[styles.statCardLabel, { color: colors.textSecondary }]}>
                {language === 'ka' ? 'საშ. განწყობა' : 'Avg Mood'}
              </Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            {language === 'ka' ? 'მიღწევები' : 'Achievements'}
          </Text>
          
          {achievements.map(achievement => (
            <View key={achievement.id} style={styles.achievementItem}>
              <View style={[
                styles.achievementIcon,
                { 
                  backgroundColor: achievement.achieved ? colors.primary + '20' : colors.border + '40',
                }
              ]}>
                <Ionicons 
                  name={achievement.icon as any} 
                  size={24} 
                  color={achievement.achieved ? colors.primary : colors.textSecondary} 
                />
              </View>
              
              <View style={styles.achievementInfo}>
                <Text style={[
                  styles.achievementTitle, 
                  { 
                    color: achievement.achieved ? colors.text : colors.textSecondary,
                    opacity: achievement.achieved ? 1 : 0.6
                  }
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDesc, { color: colors.textSecondary }]}>
                  {achievement.description}
                </Text>
                {achievement.achieved && achievement.date && (
                  <Text style={[styles.achievementDate, { color: colors.primary }]}>
                    {language === 'ka' ? 'მიღწეული: ' : 'Achieved: '}{achievement.date}
                  </Text>
                )}
              </View>
              
              {achievement.achieved && (
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingVertical: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  headerSubtitle: { fontSize: 16 },
  
  content: { flex: 1 },
  
  card: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  
  // Chart styles
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    marginTop: 20,
  },
  chartBar: { alignItems: 'center', flex: 1 },
  bar: {
    width: 24,
    backgroundColor: '#6366F1',
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: { fontSize: 12, marginBottom: 4 },
  chartValue: { fontSize: 12, fontWeight: '500' },
  
  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  statBigNumber: { fontSize: 24, fontWeight: 'bold', marginTop: 8, marginBottom: 4 },
  statCardLabel: { fontSize: 12, textAlign: 'center' },
  
  // Achievements
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementInfo: { flex: 1 },
  achievementTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  achievementDesc: { fontSize: 14, lineHeight: 20 },
  achievementDate: { fontSize: 12, marginTop: 4, fontWeight: '500' },
});