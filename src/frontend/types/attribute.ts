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
