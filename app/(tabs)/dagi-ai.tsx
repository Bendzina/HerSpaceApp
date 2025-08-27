import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function DagiAIScreen() {
  const { colors } = useTheme();
  const { t, language } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text:
        language === 'ka'
          ? 'გამარჯობა! მე ვარ Dagi, შენი AI ასისტენტი მენტალური კეთილდღეობისთვის. როგორ შემიძლია დაგეხმარო დღეს? 🌟'
          : 'Hello! I’m Dagi, your AI assistant for mental well-being. How can I support you today? 🌟',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const responses =
        language === 'ka'
          ? [
              'ეს საინტერესო კითხვაა! მოდი უფრო ღრმად ჩავხედოთ...',
              'შეიძლება დაგეხმაროს თუ დღიურის წერა სცადო ✨',
              'გესმის, ეს ნამდვილად მნიშვნელოვანია შენი კეთილდღეობისთვის',
              'დარწმუნებული ვარ ერთად ვიპოვით გზას! 💜',
            ]
          : [
              'That’s an interesting question! Let’s explore it more deeply...',
              'Maybe journaling could help you ✨',
              'I hear you, that’s really important for your well-being',
              'I’m sure we can find a way forward together! 💜',
            ];

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);

    // Scroll down after sending
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'ka' ? 'ka-GE' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>🤖</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Dagi AI</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              {language === 'ka' ? 'შენი პირადი მენტალური ასისტენტი' : 'Your personal mental assistant'}
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(message => (
            <View
              key={message.id}
              style={[styles.messageContainer, message.isUser ? styles.userMessage : styles.aiMessage]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.isUser ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface },
                ]}
              >
                <Text style={[styles.messageText, { color: message.isUser ? '#FFF' : colors.text }]}>
                  {message.text}
                </Text>
              </View>
              <Text style={[styles.messageTime, { color: colors.textSecondary }]}>
                {formatTime(message.timestamp)}
              </Text>
            </View>
          ))}

          {isTyping && (
            <View style={[styles.messageContainer, styles.aiMessage]}>
              <View style={[styles.messageBubble, { backgroundColor: colors.surface }]}>
                <Text style={[styles.typingText, { color: colors.textSecondary }]}>
                  {language === 'ka' ? 'Dagi წერს...' : 'Dagi is typing...'}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={[styles.inputContainer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
          <View style={[styles.inputWrapper, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              value={inputText}
              onChangeText={setInputText}
              placeholder={language === 'ka' ? 'მითხარი რა გაწუხებს...' : 'Type your question...'}
              placeholderTextColor={colors.textSecondary}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: colors.primary }]}
              onPress={sendMessage}
              disabled={inputText.trim() === ''}
            >
              <Ionicons name="send" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  header: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { fontSize: 20 },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  messagesContainer: { flex: 1, paddingHorizontal: 16 },
  messageContainer: { marginVertical: 4 },
  userMessage: { alignItems: 'flex-end' },
  aiMessage: { alignItems: 'flex-start' },
  messageBubble: { maxWidth: '80%', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20 },
  messageText: { fontSize: 16, lineHeight: 22 },
  messageTime: { fontSize: 12, marginTop: 4, marginHorizontal: 8 },
  typingText: { fontSize: 14, fontStyle: 'italic' },
  inputContainer: { paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1 },
  inputWrapper: { flexDirection: 'row', alignItems: 'flex-end', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 8, minHeight: 50 },
  textInput: { flex: 1, fontSize: 16, lineHeight: 20, maxHeight: 100, marginRight: 8 },
  sendButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
