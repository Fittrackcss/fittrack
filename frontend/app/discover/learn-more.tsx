import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from "expo-router";

const LearnMoreScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const { title, description, category, icon } = params;

  // Mock detailed content based on the topic
  const getDetailedContent = (topicTitle: string) => {
    const contentMap: { [key: string]: any } = {
      "Stay Hydrated": {
        image: "https://picsum.photos/800/600?random=1",
        subtitle: "The Foundation of Health",
        sections: [
          {
            title: "Why Hydration Matters",
            content: "Water is essential for every cell, tissue, and organ in your body. It helps regulate body temperature, transport nutrients, and remove waste. Even mild dehydration can affect your mood, energy levels, and cognitive function."
          },
          {
            title: "How Much Water Do You Need?",
            content: "The general recommendation is 8 glasses (64nces) per day, but individual needs vary based on activity level, climate, and body size. A good rule of thumb: drink half your body weight in ounces daily."
          },
          {
            title: "Signs of Dehydration",
            content: "• Dark yellow urine\n• Dry mouth and lips\n• Fatigue and dizziness\n• Headaches\n• Decreased urine output"
          },
          {
            title: "Tips for Better Hydration",
            content: "• Start your day with a glass of water\n• Keep a water bottle with you\n• Set hydration reminders\n• Eat water-rich foods (cucumbers, watermelon)\n• Monitor your urine color"
          }
        ]
      },
      "Get Enough Sleep": {
        image: "https://picsum.photos/800/600?random=2",
        subtitle: "Your Body's Recovery Time",
        sections: [
          {
            title: "The Science of Sleep",
            content: "During sleep, your body repairs tissues, consolidates memories, and regulates hormones. Quality sleep is crucial for immune function, metabolism, and mental health."
          },
          {
            title: "Sleep Cycles Explained",
            content: "Sleep consists of 4-6 cycles per night, each lasting 90-120inutes. Deep sleep (stages 3-4) is when physical restoration occurs, while REM sleep supports memory and learning."
          },
          {
            title: "Creating a Sleep Routine",
            content: "• Go to bed and wake up at the same time\n• Create a relaxing bedtime ritual\n• Keep your bedroom cool and dark\n• Avoid screens1 hour before bed\n• Exercise regularly, but not close to bedtime"
          },
          {
            title: "Sleep Quality Tips",
            content: "• Invest in a comfortable mattress\n• Use blackout curtains\n• Try white noise machines\n• Practice relaxation techniques\n• Limit caffeine after 2 "}
        ]
      },
      "Eat More Protein": {
        image: "https://picsum.photos/800/600?random=3",
        subtitle: "Building Blocks for Your Body",
        sections: [
          {
            title: "Why Protein is Essential",
            content: "Protein is crucial for building and repairing muscles, producing enzymes and hormones, and maintaining a strong immune system. It also helps you feel full longer."
          },
          {
            title: "How Much Protein Do You Need?",
            content: "Aim for0.80.2grams per pound of body weight daily. Active individuals and those building muscle may need1.20.6grams per pound."
          },
          {
            title: "Best Protein Sources",
            content: "• Lean meats (chicken, turkey, fish)\n• Eggs and dairy products\n• Legumes (beans, lentils, chickpeas)\n• Nuts and seeds\n• Plant-based proteins (tofu, tempeh)"
          },
          {
            title: "Protein Timing",
            content: "• Distribute protein throughout the day\n• Include protein in every meal\n• Consume protein within 30 minutes after exercise\n• Consider protein before bed for muscle recovery"
          }
        ]
      },
      "Move Daily": {
        image: "https://picsum.photos/800/600?random=4",
        subtitle: "Movement is Medicine",
        sections: [
          {
            title: "Benefits of Daily Movement",
            content: "Regular physical activity improves cardiovascular health, strengthens muscles and bones, boosts mood, and reduces the risk of chronic diseases."
          },
          {
            title: "Types of Exercise",
            content: "• Cardio: Walking, running, cycling, swimming\n• Strength training: Weight lifting, bodyweight exercises\n• Flexibility: Yoga, stretching\n• Balance: Tai chi, single-leg exercises"
          },
          {
            title: "Getting Started",
            content: "• Start with 1015daily\n• Gradually increase duration and intensity\n• Find activities you enjoy\n• Mix different types of exercise\n• Set realistic goals"
          },
          {
            title: "Making Exercise a Habit",
            content: "• Schedule exercise like any other appointment\n• Work out at the same time each day\n• Prepare your workout clothes the night before\n• Find an exercise buddy\n• Track your progress"
          }
        ]
      },
      "Practice Mindfulness": {
        image: "https://picsum.photos/800/600?random=5",
        subtitle: "Mental Health Matters",
        sections: [
          {
            title: "What is Mindfulness?",
            content: "Mindfulness is the practice of being present and fully engaged in the current moment, without judgment. It helps reduce stress, improve focus, and enhance emotional well-being."
          },
          {
            title: "Benefits of Mindfulness",
            content: "• Reduces stress and anxiety\n• Improves concentration and memory\n• Enhances emotional regulation\n• Better sleep quality\n• Increased self-awareness"
          },
          {
            title: "Simple Mindfulness Practices",
            content: "• Mindful breathing: Focus on your breath for 5-10nutes\n• Body scan: Pay attention to each part of your body\n• Mindful walking: Notice your surroundings and sensations\n• Gratitude practice: Reflect on things youre thankful for"
          },
          {
            title: "Building a Mindfulness Habit",
            content: "• Start with just 5 daily\n• Practice at the same time each day\n• Use guided meditation apps\n• Be patient with yourself\n• Remember, its about progress, not perfection"
          }
        ]
      }
    };
    
    return contentMap[topicTitle as string] || contentMap["Stay Hydrated"];
  };

  const content = getDetailedContent(title as string);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: content.image }} 
            style={styles.headerImage}
            resizeMode="cover"
            onError={(error) => {
              console.log('Image loading error:', error);
              // You could set a fallback image here
            }}
            onLoad={() => console.log('Image loaded successfully')}
          />
          <View style={styles.imageOverlay}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.categoryBadge}>
              <MaterialCommunityIcons 
                name={icon as any} 
                size={16} 
                color={colors.primary} 
              />
              <Text style={styles.categoryText}>{category}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{content.subtitle}</Text>
          </View>

          {/* Sections */}
          {content.sections.map((section: any, index: number) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <MaterialCommunityIcons name="bookmark-outline" size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>Save Article</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <MaterialCommunityIcons name="share-variant" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  titleSection: {
    marginTop: -30,
    backgroundColor: colors.background.main,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#7F9497',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 600,
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 20,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#7F9497',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 600,
    marginLeft: 8,
  },
});

export default LearnMoreScreen; 