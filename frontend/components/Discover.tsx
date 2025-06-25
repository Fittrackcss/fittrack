import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type DiscoverProps = {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
    subtitle: string;
    color?: string;
};

const DiscoverCards = () => {
    const cards: DiscoverProps[] = [
        {
            icon: "power-sleep",
            title: "Sleep",
            subtitle: "Eat right, sleep tight",
            color: colors.primary
        },
        {
            icon: "chef-hat",
            title: "Recipe",
            subtitle: "Cook, eat, log, repeat",
            color: colors.primary
        },
        {
            icon: "dumbbell",
            title: "Workouts",
            subtitle: "Sweating is self-care",
            color: colors.primary
        },
        {
            icon: "sync",
            title: "Sync up",
            subtitle: "Link apps & devices",
            color: colors.primary
        },
        {
            icon: "account-multiple",
            title: "Friends",
            subtitle: "Your support squad",
            color: colors.primary
        },
        {
            icon: "account-group",
            title: "Community",
            subtitle: "Food & Fitness inspo",
            color: colors.primary
        }
    ];

    return (
        <View style={styles.container}>
            {cards.map((card, index) => (
                <TouchableOpacity key={index} style={styles.card}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons 
                            name={card.icon} 
                            size={24} 
                            color={card.color || "#000"} 
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection:'row',
        flexWrap: 'wrap',
         justifyContent: 'space-between',
        
    },
    card: {
        justifyContent: 'center',
        alignContent:'center',
        width: '48.5%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '##7F9497',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 4,
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: colors.secondary,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#1C1C1C',
    },
    cardSubtitle: {
        fontSize: 13,
        color: colors.gray,
         textAlign: 'center',
    },
});

export default DiscoverCards;