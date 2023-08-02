export default interface Foe {
    name: string,
    img?: string,
    unique: boolean,
    perception: string,
    languages?: string,
    skills: string,
    stats: string,
    items?: string,
    ac: string,
    ts: string,
    hp: string,
    immunities?: string,
    resistances?: string,
    weaknesses?: string,
    conditions?: {
        1?: string,
        2?: string,
    },
    feats?: {
        1?: string,
        2?: string,
        3?: string,
        4?: string
    },
    speed: string,
    attacks: {
        melee?: {
            1?: string,
            2?: string
        },
        ranged?: {
            1?: string,
            2?: string
        },
        special?: {
            1?: string,
            2?: string,
            3?: string
        }
    }
    spells?: string
}