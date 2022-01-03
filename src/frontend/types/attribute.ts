export type Attribute = 'None' | 'Fire' | 'Water' | 'Wind' | 'Earth' | 'Light' | 'Darkness';

export const attributeLabels: { [key in Attribute]: string } = {
    None: '無',
    Fire: '火',
    Water: '水',
    Wind: '風',
    Earth: '土',
    Light: '光',
    Darkness: '闇',
};

export type DamageAttributeRaw = Attribute | 'Physic' | 'Penetrate';

export const damageAttributeLabels: { [key in DamageAttributeRaw]: string } = {
    ...attributeLabels,
    Physic: '物理',
    Penetrate: '貫通',
};
