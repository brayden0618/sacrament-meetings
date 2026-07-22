import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

import type {
  SacramentMeeting,
  WardBusinessItem,
  Hymn,
  Speaker,
} from "./types";


function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }

  return neon(process.env.DATABASE_URL);
}


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
        OR LOWER(meeting_type) LIKE ${`%${query.toLowerCase()}%`}
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
        OR LOWER(meeting_type) LIKE ${`%${query.toLowerCase()}%`}
        OR LOWER(speakers::text) LIKE ${`%${query.toLowerCase()}%`}
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


export type MeetingFormData = {
  date: string;
  meetingType: string;
  presiding: string;
  conducting: string;

  announcements: string[];

  openingHymn: Hymn;
  openingPrayer: string;

  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;

  sacramentHymn: Hymn;

  speakers: Speaker[];

  closingHymn: Hymn;
  closingPrayer: string;
};


export async function createMeeting(data: MeetingFormData) {

  const sql = getSql();

  await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${JSON.stringify(data.announcements)},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)},
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers)},
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
  `;
}


export async function updateMeeting(
  id: number,
  data: MeetingFormData
) {

  const sql = getSql();

  await sql`
    UPDATE meetings
    SET
      date = ${data.date},
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ${JSON.stringify(data.announcements)},
      opening_hymn = ${JSON.stringify(data.openingHymn)},
      opening_prayer = ${data.openingPrayer},
      ward_business = ${JSON.stringify(data.wardBusiness)},
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(data.sacramentHymn)},
      speakers = ${JSON.stringify(data.speakers)},
      closing_hymn = ${JSON.stringify(data.closingHymn)},
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
  `;
}


export async function deleteMeeting(id: number) {

  const sql = getSql();

  await sql`
    DELETE FROM meetings
    WHERE id = ${id}
  `;
}


export async function deleteMeetingAction(
  id: number
): Promise<void> {

  try {
    await deleteMeeting(id);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete meeting.");
  }

  revalidatePath("/meetings");
}