interface Foes {
  name: string;
  unique: boolean;
  perception: string;
  languages: string;
  skills: string;
  stats: string;
  items: string;
  ac: string;
  ts: string;
  hp: string;
  feats?: {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
  };
  speed: string;
  attacks: {
    melee?: {
      1?: string;
      2?: string;
    };
    ranged?: {
      1?: string;
      2?: string;
    };
    special?: {
      1?: string;
      2?: string;
    };
  };
}

const foes: Foes[] = [
  {
    name: "Guard",
    unique: false,
    perception: "+7; (8 to find concealed objects)",
    languages: "common",
    skills: "Athletics +7, Intimidation +5, Legal Lore +3",
    stats: "Str +4, Dex +2, Con +2, Int +0, Wis +2, Cha -1",
    items: "club, crossbow (10 bolts), dagger, sap, scale mail, signal whistle",
    ac: "18",
    ts: "Fort +7, Ref +5, Will +5",
    hp: "20",
    feats: {
      1: "Attack of Opportunity",
    },
    speed: "25 feet",
    attacks: {
      melee: {
        1: "Club +9 [+4/-1], 1d6+4 bludgeoning",
        2: "Sap +9 [+5/+1] (agile, nonlethal), 1d6+4 bludgeoning",
      },
      ranged: {
        1: "Crossbow +7 [+2/-3] (range increment 120 feet, reload 1), 1d8 piercing",
        2: "Club +7 [+2/-3] (thrown 10 feet), 1d6+4 bludgeoning",
      },
    },
  },
  {
    name: "Watch Officer",
    unique: false,
    perception: "+8; (9 to Sense Motive)",
    languages: "common",
    skills:
      "Athletics +11, Diplomacy +6, Intimidation +9, Legal Lore +7, Society +5",
    stats: "Str +4, Dex +1, Con +3, Int +0, Wis +1, Cha +1",
    items:
      "breastplate, crossbow (20 bolts), dagger, signal whistle, steel shield (Hardness 5, 20 HP, BT 10), warhammer",
    ac: "20 (22 with shield raised)",
    ts: "Fort +10, Ref +6, Will +8",
    hp: "45",
    feats: {
      1: "Air of Authority (aura, emotion, mental) 10 feet: Creatures in the aura who are the same or lower level than the watch officer take a -2 status penalty to their Will DC against the watch officer's attempts to Coerce or Demoralize them.",
      2: "Bravery: When the watch officer rolls a success on a Will save against a fear effect, they get a critical success instead. In addition, any time they gain the frightened condition, reduce its value by 1.",
      3: "Attack of Opportunity",
      4: "Shield Block",
    },
    speed: "25 feet",
    attacks: {
      melee: {
        1: "Warhammer +13 [+8/+3] (shove), 1d8+7 bludgeoning",
      },
      ranged: {
        1: "Crossbow +10 [+5/+0] (range increment 120 feet, reload 1), 1d8+3 piercing",
        2: "Club +7 [+2/-3] (thrown 10 feet), 1d6+4 bludgeoning",
      },
      special: {
        1: "Sudden Charge (2) Frequency once per round; Effect The watch officer Strides twice. If they end their movement within melee reach of at least one enemy, they can make a melee Strike against that enemy.",
      },
    },
  },
];

export default foes;
