// data/foodGroupsData.ts
import { MaterialCommunityIcons } from "@expo/vector-icons";

// 💡 NEW: Interface for language-specific content
interface LanguageContent {
    name: string;
    description: string;
    examples: string[];
}

// 💡 UPDATED: FoodGroup Interface
export interface FoodGroup {
    id: string;
    iconName: keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor: string;
    english: LanguageContent; // English content
    myanmar: LanguageContent; // Burmese content
}

// 💡 UPDATED: Seasonal Advice Interface
export interface SeasonalAdvice {
    groupName: string; // Used for matching against FoodGroup.english.name
    englishTip: string;
    myanmarTip: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

// --- CORE DATA ---
export const threeFoodGroups: FoodGroup[] = [
    {
        id: '1',
        iconName: 'fire',
        iconColor: '#FF6347',
        english: {
            name: 'Energy-Giving Foods (Carbohydrates)',
            description: 'These foods provide the primary fuel (calories) needed for the body to perform daily activities, from breathing to exercising.',
            examples: ['Rice', 'Bread', 'Potatoes', 'Pasta', 'Oats', 'Sugars'],
        },
        myanmar: {
            name: 'စွမ်းအင်ပေး အစားအစာများ (ကာဗိုဟိုက်ဒရိတ်)',
            description: 'ဤအစားအစာများသည် အသက်ရှူခြင်းမှ လေ့ကျင့်ခန်းလုပ်ခြင်းအထိ နေ့စဉ်လုပ်ဆောင်မှုများအတွက် လိုအပ်သော အဓိက လောင်စာ (ကယ်လိုရီ) ကို ပေးစွမ်းသည်။',
            examples: ['ထမင်း', 'ပေါင်မုန့်', 'အာလူး', 'ခေါက်ဆွဲ', 'ဂျုံ', 'သကြားဓာတ်များ'],
        },
    },
    {
        id: '2',
        iconName: 'fish',
        iconColor: '#1E90FF',
        english: {
            name: 'Body-Building Foods (Proteins)',
            description: 'Proteins are essential for growth, maintenance, and repair of all body tissues, including muscles, organs, and the immune system.',
            examples: ['Meat', 'Fish', 'Eggs', 'Milk', 'Cheese', 'Beans', 'Lentils'],
        },
        myanmar: {
            name: 'ခန္ဓာကိုယ်တည်ဆောက်သော အစားအစာများ (ပရိုတင်း)',
            description: 'ပရိုတင်းများသည် ကြွက်သားများ၊ ကိုယ်တွင်းအင်္ဂါများနှင့် ကိုယ်ခံအားစနစ် အပါအဝင် ခန္ဓာကိုယ်တစ်ရှူးအားလုံး ကြီးထွားရန်၊ ထိန်းသိမ်းရန်နှင့် ပြုပြင်ရန်အတွက် မရှိမဖြစ်လိုအပ်သည်။',
            examples: ['အသား', 'ငါး', 'ဥ', 'နို့', 'ဒိန်ခဲ', 'ပဲအမျိုးမျိုး', 'ပဲနီလေး'],
        },
    },
    {
        id: '3',
        iconName: 'basket-outline',
        iconColor: '#3CB371',
        english: {
            name: 'Protective Foods (Vitamins & Minerals)',
            description: 'These foods contain vitamins and minerals that keep the body healthy, regulate metabolism, and protect against diseases.',
            examples: ['Fruits', 'Vegetables', 'Berries', 'Leafy Greens', 'Citrus Fruits'],
        },
        myanmar: {
            name: 'ကာကွယ်မှုပေး အစားအစာများ (ဗီတာမင်နှင့် သတ္တုဓာတ်များ)',
            description: 'ဤအစားအစာများတွင် ခန္ဓာကိုယ်ကို ကျန်းမာစေသော၊ ဇီဝကမ္မဖြစ်စဉ်ကို ထိန်းညှိပေးသော၊ ရောဂါများကို ကာကွယ်ပေးသော ဗီတာမင်နှင့် သတ္တုဓာတ်များ ပါဝင်သည်။',
            examples: ['သစ်သီးများ', 'ဟင်းသီးဟင်းရွက်များ', 'ဘယ်ရီသီးများ', 'အရွက်စိမ်းများ', 'အချဉ်ဓာတ်ပါသော သစ်သီးများ'],
        },
    },
];

// --- SEASONAL ADVICE DATA ---
const seasonalAdviceData: SeasonalAdvice[] = [
    {
        groupName: 'Protective Foods',
        englishTip: 'Focus on Vitamin C rich foods (citrus, peppers) and leafy greens to boost your immune system.',
        myanmarTip: 'ကိုယ်ခံအားကို မြှင့်တင်ရန်အတွက် ဗီတာမင်စီ ကြွယ်ဝသော အစားအစာများ (သံပရာ၊ ငရုတ်သီး) နှင့် အရွက်စိမ်းများကို အာရုံစိုက်စားသုံးပါ။',
        icon: 'star-circle',
    },
    // Add more seasonal data here if needed, based on month/time
];

// 💡 DYNAMIC FUNCTION TO GET SEASONAL ADVICE
export const getSeasonalFoodGroupAdvice = (): SeasonalAdvice => {
    // For simplicity, we just return the first one (Protective Foods)
    return seasonalAdviceData[0];
};

// Placeholder image (You should replace this with a local image asset)
export const allFoodGroupsImage = require('@/assets/images/group_food.png'); 
// Assuming you have an image asset at this path for the chart.
// Replace with the correct path or use a static image if preferred.