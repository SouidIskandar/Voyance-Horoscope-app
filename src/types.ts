export type ZodiacSign = {
  name: string;
  date: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  symbol: string;
};

export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type Horoscope = {
  prediction: string;
  lucky_number: number;
  lucky_color: string;
  mood: string;
};