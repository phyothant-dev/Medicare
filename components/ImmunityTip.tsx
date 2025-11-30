// components/ImmunityTip.tsx
import { ImmunityTip } from "@/data/immunityData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// The interface is fine, as it extends the properties from ImmunityTip
interface ImmunityTipProps extends ImmunityTip {
    isPriority?: boolean;
    language: 'english' | 'myanmar'; 
}

const ImmunityTipComponent: React.FC<ImmunityTipProps> = ({ 
    // 💡 FIX: Destructure the correct property names from ImmunityTip
    iconName, 
    iconColor, 
    english, 
    myanmar, 
    isPriority = false, 
    language 
}) => {
    
    // Select the content based on the language prop
    const content = language === 'myanmar' ? myanmar : english;

    return (
        <View style={[styles.tipCard, isPriority && styles.priorityCard]}>
            <View style={[styles.iconContainer, { backgroundColor: isPriority ? '#ffedcc' : '#e6f7ff' }]}>
                {/* 💡 Use the correct destructured name */}
                <MaterialCommunityIcons name={iconName as any} size={30} color={iconColor} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.tipTitle, { color: isPriority ? '#FF8C00' : '#1E90FF' }]}>
                    {content.title}
                </Text>
                <Text style={styles.tipDescription}>
                    {content.description}
                </Text>
            </View>
        </View>
    );
};

export default ImmunityTipComponent;

const styles = StyleSheet.create({
    tipCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderLeftWidth: 5,
        borderLeftColor: '#e0e0e0',
        elevation: 2,
    },
    priorityCard: {
        borderLeftColor: '#FF8C00', 
        backgroundColor: '#fffaf0',
        elevation: 4,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    tipDescription: {
        fontSize: 14,
        color: '#555',
    },
});