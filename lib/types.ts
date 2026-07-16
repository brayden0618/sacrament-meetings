export interface Hymn {
  number: number;
  title: string;
}

export interface Speaker {
  name: string;
  topic: string;
}

export interface WardBusinessItem {
  title: string;
  description: string;
}

export interface SacramentMeeting {
  id: number;
  date: string;
  meetingType: string;
  presiding: string;
  conducting: string;

  announcements: string[];

  openingHymn: Hymn;
  sacramentHymn: Hymn;
  closingHymn: Hymn;

  openingPrayer: string;

  wardBusiness: WardBusinessItem[];

  stakeBusiness: boolean;

  speakers: Speaker[];

  closingPrayer: string;
}