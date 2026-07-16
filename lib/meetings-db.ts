import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting, WardBusinessItem } from "./types";

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }

  return neon(process.env.DATABASE_URL);
}

type Hymn = {
  number: number;
  title: string;
};

type Speaker = {
  name: string;
  topic: string;
};

type MeetingRow = {
  id: number;
  date: Date | string;
  meeting_type: string;
  presiding: string;
  conducting: string;

  announcements: string[];

  opening_hymn: Hymn;
  opening_prayer: string;

  ward_business: WardBusinessItem[];
  stake_business: boolean;

  sacrament_hymn: Hymn;

  speakers: Speaker[];

  closing_hymn: Hymn;
  closing_prayer: string;
};

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date:
      row.date instanceof Date
        ? row.date.toISOString().split("T")[0]
        : row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements,

    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,

    wardBusiness: row.ward_business,
    stakeBusiness: row.stake_business,

    sacramentHymn: row.sacrament_hymn,

    speakers: row.speakers,

    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}


export async function getMeetings(
  query?: string,
  page: number = 1,
  limit: number = 5
): Promise<SacramentMeeting[]> {

  const offset = (page - 1) * limit;
  const sql = getSql();

  let rows: MeetingRow[];

  if (query) {
    rows = await sql`
      SELECT *
      FROM meetings
      WHERE
        LOWER(conducting) LIKE ${`%${query.toLowerCase()}%`}
        OR LOWER(presiding) LIKE ${`%${query.toLowerCase()}%`}
        OR LOWER(speakers::text) LIKE ${`%${query.toLowerCase()}%`}
      ORDER BY date DESC
      LIMIT ${limit}
      OFFSET ${offset}
    ` as MeetingRow[];
  } else {
    rows = await sql`
      SELECT *
      FROM meetings
      ORDER BY date DESC
      LIMIT ${limit}
      OFFSET ${offset}
    ` as MeetingRow[];
  }

  return rows.map(mapMeeting);
}


export async function getMeetingsPages(
  query?: string,
  limit: number = 5
): Promise<number> {

  const sql = getSql();

  let result;

  if (query) {
    result = await sql`
      SELECT COUNT(*)
      FROM meetings
      WHERE
        LOWER(conducting) LIKE ${`%${query.toLowerCase()}%`}
        OR LOWER(presiding) LIKE ${`%${query.toLowerCase()}%`}
        OR LOWER(speakers::text) LIKE ${`%${query.toLowerCase()}%`}
        OR LOWER(meeting_type) LIKE ${`%${query.toLowerCase()}%`}
    `;
  } else {
    result = await sql`
      SELECT COUNT(*)
      FROM meetings
    `;
  }

  return Math.ceil(Number(result[0].count) / limit);
}


export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {

  const sql = getSql();

  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE id = ${id}
  ` as MeetingRow[];

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(rows[0]);
}