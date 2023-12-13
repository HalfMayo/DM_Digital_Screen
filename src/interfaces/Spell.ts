export default interface Spell {
    type: string;
    dc: number;
    roll?: string;
    list: {
      "cantrips"?: string;
      "1st"?: string;
      "2nd"?: string;
      "3rd"?: string;
      "4th"?: string;
      "5th"?: string;
      "6th"?: string;
      "7th"?: string;
      "8th"?: string;
      "9th"?: string
     }
}