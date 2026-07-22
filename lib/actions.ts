"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import {
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "./meetings-db";

import type { MeetingFormData } from "./meetings-db";


export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
  };
  message?: string | null;
};


const MeetingFormSchema = z.object({
  date: z.string().min(1, "Date is required."),
  meetingType: z.string().min(1, "Meeting type is required."),
  presiding: z.string().min(1, "Presiding officer is required."),
  conducting: z.string().min(1, "Conducting leader is required."),
});


function getMeetingData(formData: FormData): MeetingFormData {
  const speakers = [
    {
      name: formData.get("speaker1Name") as string,
      topic: formData.get("speaker1Topic") as string,
    },
    {
      name: formData.get("speaker2Name") as string,
      topic: formData.get("speaker2Topic") as string,
    },
  ].filter((speaker) => speaker.name);


  const announcements = [
    formData.get("announcement1") as string,
    formData.get("announcement2") as string,
  ].filter(Boolean);


  const wardBusinessTitle =
    formData.get("wardBusinessTitle") as string;

  const wardBusinessDescription =
    formData.get("wardBusinessDescription") as string;


  return {
    date: formData.get("date") as string,

    meetingType:
      formData.get("meetingType") as string,

    presiding:
      formData.get("presiding") as string,

    conducting:
      formData.get("conducting") as string,


    announcements,


    openingHymn: {
      number: Number(
        formData.get("openingHymnNumber")
      ),
      title:
        formData.get("openingHymnTitle") as string,
    },


    openingPrayer:
      (formData.get("openingPrayer") as string) ?? "",


    wardBusiness:
      wardBusinessTitle
        ? [
            {
              title: wardBusinessTitle,
              description: wardBusinessDescription,
            },
          ]
        : [],


    stakeBusiness:
      formData.get("stakeBusiness") === "true",


    sacramentHymn: {
      number: Number(
        formData.get("sacramentHymnNumber")
      ),
      title:
        formData.get("sacramentHymnTitle") as string,
    },


    speakers,


    closingHymn: {
      number: Number(
        formData.get("closingHymnNumber")
      ),
      title:
        formData.get("closingHymnTitle") as string,
    },


    closingPrayer:
      (formData.get("closingPrayer") as string) ?? "",
  };
}



export async function createMeetingAction(
  prevState: State,
  formData: FormData
): Promise<State> {

  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
  });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }


  try {

    const data = getMeetingData(formData);

    await createMeeting(data);

  } catch (error) {

    console.error(error);

    return {
      message: `Database Error: ${error}`,
    };
  }


  revalidatePath("/meetings");
  redirect("/meetings");
}



export async function updateMeetingAction(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {

  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
  });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }


  try {

    const data = getMeetingData(formData);

    await updateMeeting(id, data);

  } catch (error) {

    console.error(error);

    return {
      message: `Database Error: ${error}`,
    };
  }


  revalidatePath("/meetings");
  redirect("/meetings");
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