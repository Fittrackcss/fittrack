import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const options = [
  { id: 1, label: 'Friends or Family' },
  { id: 2, label: 'TV Programming', sub: 'Jimmy Kimmel, Today Show, etc.' },
  { id: 3, label: 'Facebook' },
  { id: 4, label: 'Instagram' },
  { id: 5, label: 'Search Engine', sub: 'Google, Bing' },
    { id: 6, label: 'Adam Devine'},
  { id: 7, label: 'Billboard', sub: 'Highway, Bus Stop' },
  { id: 8, label: 'Health Professional' },
    { id: 9, label: 'TV ads' , Sub: 'Hulu,Peacock'},
  { id: 10, label: 'YouTube' },
  { id: 11, label: 'TikTok' },
  { id: 12, label: 'App Store' },
];

export default function CreateAccountScreen() {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [otherText, setOtherText] = useState('');

  const toggleOption = (id: number) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((optId) => optId !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
      <Text style={styles.title}>How did you hear about us?</Text>
      <Text style={styles.optional}>(Optional)</Text>

      <ScrollView style={{ marginTop: 15 }}>
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <TouchableOpacity
           
              key={option.id}
              style={[styles.option, isSelected && styles.selected]}
              onPress={() => toggleOption(option.id)}
            >
              <View style={styles.orange} >
                <Text style={styles.optionLabel}>{option.label}</Text>
                {option.sub && <Text style={styles.sub}>{option.sub}</Text>}
              </View>
              <Ionicons
                name={isSelected ? 'checkbox-outline' : 'square-outline'}
                size={24}
                color={isSelected ? '#007aff' : '#ccc'}
              />
            </TouchableOpacity>
          );
        })}

        {/* 'Other' as a direct text input */}
        <TextInput
          placeholder="Other..."
          placeholderTextColor="#aaa"
          style={styles.input}
          value={otherText}
          onChangeText={setOtherText}
        />
      </ScrollView>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  optional: { color: '#aaa', fontSize: 13 },
  option: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selected: {
    borderColor: '#007aff',
    borderWidth: 1.5,
  },
  optionLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sub: { color: '#aaa', fontSize: 13, marginTop: 3 },
  input: {
    backgroundColor: '#1a1a1f',
    borderColor: '#007aff',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
  },
  nextText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  orange: {
    backgroundColor: 'orange'
  }
});

