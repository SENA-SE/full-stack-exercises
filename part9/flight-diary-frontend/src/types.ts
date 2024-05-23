export enum WeatherType {
    Sunny = 'Sunny',
    Cloudy = 'Cloudy',
    Rainy = 'Rainy',
    Stormy = 'Stormy',
    Windy = 'Windy'
}

export enum Visibility {
    Great = 'Great',
    Good = 'Good',
    Ok = 'Ok',
    Poor = 'Poor',
}

export interface DiaryEntry {
    id: string;
    date: string;
    comment: string;
    weather: WeatherType;
    visibility: Visibility;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;