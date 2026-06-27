import type { EquipmentItem } from "@/lib/api/types";

const productSkuToEquipmentName: Record<string, string> = {
  "AB-YOGA-13MM": "Yoga Mat (13mm NBR)",
  "BF-YOGA-6MM": "TPE Yoga Mat (6mm Anti-Slip)",
  "KORE-DB-20KG": "Adjustable Dumbbell Set (20 kg)",
  "STR-HEX-DB": "Rubber Coated Hex Dumbbells",
  "ON-GS-WHEY-17": "Whey Protein Powder",
  "MB-BIOZ-2KG": "Biozyme Performance Whey",
  "OSOAA-IMP-1KG": "Impact Whey + Creatine",
  "BF-RB-5PK": "Resistance Bands Set (5 Levels)",
  "LL-SKIP-CNT": "Adjustable Skipping Rope",
  "SLV-GLOVES": "Gym Gloves with Wrist Support",
  "DEC-KB": "Cast Iron Kettlebell",
  "MP-CREAT-250": "Creatine Monohydrate",
  "RDX-BAG-40": "Gym Duffel Bag (40L)",
  "STR-AW-2KG": "Ankle/Wrist Weights (2 kg Pair)",
  "FS-PLANT-500": "Plant Protein Powder",
  "STR-BELT-6": "Nylon Weightlifting Belt (6 inch)",
};

const productNameToEquipmentName: Record<string, string> = {
  "Amazon Basics 13mm Extra Thick NBR Yoga Mat with Carrying Strap":
    "Yoga Mat (13mm NBR)",
  "Boldfit Anti-Slip TPE Yoga Mat 6mm with Alignment Lines":
    "TPE Yoga Mat (6mm Anti-Slip)",
  "Kore PVC Adjustable Dumbbell Set with Rods & Plates (20 kg)":
    "Adjustable Dumbbell Set (20 kg)",
  "Strauss Rubber Coated Hex Dumbbells (Pair)": "Rubber Coated Hex Dumbbells",
  "Optimum Nutrition (ON) Gold Standard 100% Whey Protein 1.7 kg":
    "Whey Protein Powder",
  "MuscleBlaze Biozyme Performance Whey Protein 2 kg":
    "Biozyme Performance Whey",
  "OSOAA Impact Whey Protein 1 kg with Creatine": "Impact Whey + Creatine",
  "Boldfit Resistance Bands Set of 5 with Door Anchor":
    "Resistance Bands Set (5 Levels)",
  "Lifelong Adjustable Skipping Rope with Calorie Counter":
    "Adjustable Skipping Rope",
  "SLOVIC Gym Gloves with Wrist Support": "Gym Gloves with Wrist Support",
  "Decathlon Domyos Cast Iron Kettlebell": "Cast Iron Kettlebell",
  "MyProtein Creatine Monohydrate (Unflavoured) 250g": "Creatine Monohydrate",
  "RDX Leather Gym Bag 40L with Shoe Compartment": "Gym Duffel Bag (40L)",
  "Strauss Adjustable Ankle/Wrist Weights 2 kg (Pair)":
    "Ankle/Wrist Weights (2 kg Pair)",
  "Foodstrong Plant Protein Powder 500g (Chocolate)": "Plant Protein Powder",
  "Strauss Nylon Weightlifting Belt 6 inch":
    "Nylon Weightlifting Belt (6 inch)",
};

function tokenize(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replaceAll("(", " ")
      .replaceAll(")", " ")
      .replaceAll("/", " ")
      .split(/\s+/)
      .filter((token) => token.length > 2),
  );
}

function sortMatched(items: EquipmentItem[]): EquipmentItem[] {
  const unique = new Map<number, EquipmentItem>();
  for (const item of items) {
    unique.set(item.id, item);
  }

  return [...unique.values()].sort((a, b) => {
    if (Boolean(a.isPrimary) !== Boolean(b.isPrimary)) {
      return a.isPrimary ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}

export function matchEquipmentForProduct({
  equipment,
  productName,
  productSku,
}: {
  equipment: EquipmentItem[];
  productName?: string;
  productSku?: string;
}): EquipmentItem[] {
  if (equipment.length === 0) return [];

  const sku = productSku?.trim();
  if (sku) {
    const expectedName = productSkuToEquipmentName[sku];
    if (expectedName) {
      const bySku = equipment.filter((item) => item.name === expectedName);
      if (bySku.length > 0) return sortMatched(bySku);
    }
  }

  const normalizedName = productName?.trim();
  if (normalizedName) {
    const exactNameMatch = productNameToEquipmentName[normalizedName];
    if (exactNameMatch) {
      const byName = equipment.filter((item) => item.name === exactNameMatch);
      if (byName.length > 0) return sortMatched(byName);
    }

    const productNameLower = normalizedName.toLowerCase();
    const matched: EquipmentItem[] = [];

    for (const item of equipment) {
      const equipmentNameLower = item.name.toLowerCase();
      if (equipmentNameLower === productNameLower) {
        matched.push(item);
        continue;
      }
      if (
        equipmentNameLower.includes(productNameLower) ||
        productNameLower.includes(equipmentNameLower)
      ) {
        matched.push(item);
        continue;
      }

      const sharedTokens = [...tokenize(equipmentNameLower)].filter((token) =>
        tokenize(productNameLower).has(token),
      );
      if (sharedTokens.length >= 2) {
        matched.push(item);
      }
    }

    if (matched.length > 0) return sortMatched(matched);
  }

  return [];
}
