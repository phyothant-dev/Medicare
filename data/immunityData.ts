// data/immunityData.ts
import { MaterialCommunityIcons } from "@expo/vector-icons";

// --- 1. TYPE DEFINITION ---
export type TipTag = 'cool' | 'hot' | 'monsoon' | 'basic' | 'prevention';

// 💡 UPDATED: Language-specific content interface
interface LanguageContent {
    title: string;
    description: string;
}

// 💡 UPDATED: ImmunityTip interface to hold both languages
export interface ImmunityTip {
    id: number;
    tags: TipTag[];
    iconName: keyof typeof MaterialCommunityIcons.glyphMap; // Use keyof for strict type checking
    iconColor: string;
    english: LanguageContent; // English content
    myanmar: LanguageContent; // Burmese content
}

// 💡 UPDATED: Seasonal Data interface to use language-specific title
export interface SeasonalData {
    headerTitle: string;
    priorityTips: ImmunityTip[];
    generalTips: ImmunityTip[];
}

// --- 2. RAW DATA DEFINITION ---
export const allImmunityTips: ImmunityTip[] = [
    // --- COOL / DRY SEASON (Nov - Feb) ---
    { id: 1, tags: ['cool', 'basic'], iconName: "weather-sunny", iconColor: "#FFD700", 
      english: { title: "Vitamin D Boost", description: "Sunlight is limited during cooler months. Supplementation is key to regulating immune response and fighting seasonal bugs." },
      myanmar: { title: "ဗီတာမင် D အားဖြည့်ခြင်း", description: "အေးတဲ့လတွေမှာ နေရောင်ခြည်ရရှိမှုနည်းပါတယ်။ ကိုယ်ခံအားကို ထိန်းညှိဖို့နဲ့ ရာသီတုပ်ကွေးကို တိုက်ဖျက်ဖို့ ဖြည့်စွက်စာသောက်သုံးတာဟာ အဓိကကျပါတယ်။" } },
    { id: 2, tags: ['cool', 'prevention'], iconName: "plus-circle", iconColor: "red", 
      english: { title: "Stay Vaccinated", description: "Ensure you are current with your seasonal flu shots and any other recommended boosters before peak illness season." },
      myanmar: { title: "ကာကွယ်ဆေး ထိုးထားပါ", description: "ရောဂါအဖြစ်များတဲ့ရာသီမတိုင်ခင် ရာသီတုပ်ကွေးကာကွယ်ဆေးနဲ့ အခြားလိုအပ်တဲ့ ကာကွယ်ဆေးများကို ထိုးထားကြောင်း သေချာပါစေ။" } },
    
    // --- GENERAL / YEAR-ROUND ---
    { id: 3, tags: ['basic'], iconName: "fruit-citrus", iconColor: "#FF8C00", 
      english: { title: "Vitamin C Intake", description: "Essential for immune cell function. Increase intake of citrus, bell peppers, and kiwi." },
      myanmar: { title: "ဗီတာမင် C စားသုံးခြင်း", description: "ကိုယ်ခံအားဆဲလ်လုပ်ဆောင်ချက်အတွက် မရှိမဖြစ်လိုအပ်သည်။ သံပရာ၊ ငရုတ်သီး၊ ကီဝီသီးတို့ကို ပိုမိုစားသုံးပါ။" } },
    { id: 4, tags: ['basic'], iconName: "seed", iconColor: "#4CAF50", 
      english: { title: "Zinc for Defense", description: "Critical for immune cell development. Use a supplement or eat pumpkin seeds and legumes." },
      myanmar: { title: "ခုခံအားအတွက် ဇင့် (Zinc)", description: "ကိုယ်ခံအားဆဲလ်များ ဖွံ့ဖြိုးတိုးတက်ရန် အရေးကြီးသည်။ ဖြည့်စွက်စာသောက်သုံးပါ သို့မဟုတ် ဖရုံစေ့နှင့် ပဲအမျိုးမျိုးကို စားသုံးပါ။" } },
    { id: 5, tags: ['basic'], iconName: "sleep", iconColor: "#1E90FF", 
      english: { title: "Prioritize Sleep", description: "Aim for 7-9 hours nightly. Sleep is when your body produces infection-fighting proteins (cytokines)." },
      myanmar: { title: "အိပ်စက်ခြင်းကို ဦးစားပေးပါ", description: "ညဘက်တွင် ၇-၉ နာရီ ရအောင်အိပ်ပါ။ အိပ်စက်ခြင်းသည် ခန္ဓာကိုယ်မှ ရောဂါတိုက်ဖျက်သည့် ပရိုတင်း (Cytokines) များကို ထုတ်လုပ်သည့်အချိန်ဖြစ်သည်။" } },
    { id: 6, tags: ['basic'], iconName: "meditation", iconColor: "#FF69B4", 
      english: { title: "Manage Stress", description: "Practice daily mindfulness or deep breathing. High stress levels suppress immunity." },
      myanmar: { title: "စိတ်ဖိစီးမှု ထိန်းချုပ်ပါ", description: "နေ့စဉ် သတိပဋ္ဌာန် သို့မဟုတ် အသက်ပြင်းပြင်းရှူခြင်းတို့ကို ကျင့်ပါ။ စိတ်ဖိစီးမှုများခြင်းသည် ကိုယ်ခံအားကို ကျဆင်းစေသည်။" } },
    { id: 7, tags: ['basic'], iconName: "walk", iconColor: "#228B22", 
      english: { title: "Regular Exercise", description: "30 minutes of moderate activity improves circulation of immune cells." },
      myanmar: { title: "ပုံမှန် လေ့ကျင့်ခန်း", description: "အလယ်အလတ် လှုပ်ရှားမှု မိနစ် ၃၀ သည် ကိုယ်ခံအားဆဲလ်များ လည်ပတ်မှုကို တိုးတက်စေသည်။" } },
    { id: 8, tags: ['basic', 'prevention'], iconName: "hand-wash", iconColor: "#3CB371", 
      english: { title: "Hygiene Protocol", description: "Wash hands frequently for 20 seconds, especially after being in public places." },
      myanmar: { title: "သန့်ရှင်းရေးစည်းမျဉ်း", description: "အများပြည်သူနေရာများမှ ပြန်လာပါက လက်ကို စက္ကန့် ၂၀ ကြာ မကြာခဏ ဆေးကြောပါ။" } },

    // --- HOT / DRY SEASON (March - May) ---
    { id: 9, tags: ['hot'], iconName: "water", iconColor: "#00BFFF", 
      english: { title: "Hydration Focus", description: "Drink 2-3 liters of water/electrolytes daily to prevent heat stress and support toxin flushing." },
      myanmar: { title: "ရေဓာတ်ကို အာရုံစိုက်ပါ", description: "အပူဒဏ်ကြောင့် ဖိစီးမှုမဖြစ်စေရန်နှင့် အဆိပ်အတောက်များကို ဖယ်ရှားရန်အတွက် ရေ/ဓာတ်ဆားရည် ၂-၃ လီတာကို နေ့စဉ်သောက်ပါ။" } },
    { id: 10, tags: ['hot'], iconName: "white-balance-sunny", iconColor: "#FFA07A", 
      english: { title: "Sun Safety", description: "Avoid direct midday sun and use protective clothing to preserve skin barrier integrity." },
      myanmar: { title: "နေရောင်ခြည် ဘေးကင်းရေး", description: "အသားအရေကို ကာကွယ်ရန်အတွက် နေ့လယ်နေရောင်ခြည်ကို ရှောင်ရှားပြီး အကာအကွယ်အဝတ်အစားများကို ဝတ်ဆင်ပါ။" } },

    // --- MONSOON / WET SEASON (June - Oct) ---
    { id: 11, tags: ['monsoon'], iconName: "food-turkey", iconColor: "#8B4513", 
      english: { title: "Gut Health Check", description: "Be cautious about water and food safety. Increase probiotics (yogurt, kefir) to guard against waterborne issues." },
      myanmar: { title: "အူကျန်းမာရေး စစ်ဆေးခြင်း", description: "ရေနှင့် အစားအစာ ဘေးကင်းရေးကို သတိပြုပါ။ ရေမှတစ်ဆင့် ဖြစ်ပွားသော ရောဂါများမှ ကာကွယ်ရန် ပရိုဘိုင်အိုတစ် (ဒိန်ချဉ်၊ Kefir) ကို တိုးမြှင့်စားသုံးပါ။" } },
    { id: 12, tags: ['monsoon'], iconName: "bug-outline", iconColor: "#800080", 
      english: { title: "Dengue Awareness", description: "Use mosquito repellent and clear standing water to prevent mosquito-borne diseases." },
      myanmar: { title: "သွေးလွန်တုပ်ကွေး သတိထားပါ", description: "ခြင်မှတစ်ဆင့် ကူးစက်သော ရောဂါများမှ ကာကွယ်ရန် ခြင်ဆေးဖျန်းခြင်းနှင့် ရေဝပ်သောနေရာများကို ရှင်းလင်းပါ။" } },
];

// --- 3. SEASONAL LOGIC (TypeScript Function) ---
// 💡 UPDATED: Function now accepts language parameter
export const getSeasonalImmunityData = (language: 'english' | 'myanmar'): SeasonalData => {
    const month = new Date().getMonth(); 
    
    let seasonTag: 'cool' | 'hot' | 'monsoon' | 'basic' = 'basic'; 
    let headerTitle: string;
    
    // Seasonal Header Titles mapped by language
    const headerTitles = {
        cool: {
            english: "❄️ Cool Season Immune Defense: Focus on Flu & Cold Prevention",
            myanmar: "❄️ အေးသောရာသီ ကိုယ်ခံအား ကာကွယ်ရေး- တုပ်ကွေးနှင့် အအေးမိခြင်း ကာကွယ်ရန် အသားပေးပါ။"
        },
        hot: {
            english: "🔥 Hot Season Immunity: Focus on Hydration & Minerals",
            myanmar: "🔥 ပူသောရာသီ ကိုယ်ခံအား- ရေဓာတ်နှင့် သတ္တုဓာတ်များ ဖြည့်တင်းရန် အသားပေးပါ။"
        },
        monsoon: {
            english: "🌧️ Monsoon Season Immunity: Focus on Hygiene & Gut Health",
            myanmar: "🌧️ မုတ်သုန်ရာသီ ကိုယ်ခံအား- သန့်ရှင်းရေးနှင့် အူလမ်းကြောင်း ကျန်းမာရေးကို အသားပေးပါ။"
        },
        basic: { // Fallback/Default
            english: "Essential Immune Boosters (Year-Round)",
            myanmar: "မရှိမဖြစ် ကိုယ်ခံအား မြှင့်တင်ရေး (တစ်နှစ်ပတ်လုံး)"
        }
    };

    // Myanmar Climate (Approximate)
    // Cool/Dry Season: Nov (10) - Feb (1)
    if (month >= 10 || month <= 1) { 
        seasonTag = 'cool';
    } 
    // Hot/Dry Season: Mar (2) - May (4)
    else if (month >= 2 && month <= 4) {
        seasonTag = 'hot';
    } 
    // Monsoon/Wet Season: June (5) - Oct (9)
    else {
        seasonTag = 'monsoon';
    }

    // Set header title based on determined season and requested language
    headerTitle = headerTitles[seasonTag][language];


    // Filter: Always include 'basic' tips PLUS tips relevant to the current season tag
    const seasonalTips = allImmunityTips.filter(tip => 
        tip.tags.includes(seasonTag) || tip.tags.includes('basic')
    );

    // Separate General Tips from Seasonal Priority Tips
    const generalTips = seasonalTips.filter(tip => tip.tags.length === 1 && tip.tags.includes('basic'));
    const priorityTips = seasonalTips.filter(tip => !generalTips.includes(tip)); // All other tips that aren't just 'basic'

    return {
        headerTitle,
        priorityTips,
        generalTips
    };
};