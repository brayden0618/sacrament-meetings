"use client";

import { useActionState } from "react";

import {
  createMeetingAction,
  State,
} from "@/lib/actions";

import type { SacramentMeeting } from "@/lib/types";


const initialState: State = {
  message: null,
  errors: {},
};


interface MeetingFormProps {
  meeting?: SacramentMeeting;
  formAction?: (
    previousState: State,
    formData: FormData
  ) => Promise<State>;
  submitText?: string;
}


export default function MeetingForm({
  meeting,
  formAction,
  submitText = "Create Meeting",
}: MeetingFormProps) {

  const [state, action, isPending] = useActionState(
    formAction ?? createMeetingAction,
    initialState
  );


  return (
    <form action={action} className="space-y-6">


      {/* Basic Information */}

      <div>
        <label htmlFor="date">
          Meeting Date
        </label>

        <input
          id="date"
          name="date"
          type="date"
          defaultValue={meeting?.date}
          className="border rounded w-full p-2"
          required
        />
      </div>


      <div>
        <label htmlFor="meetingType">
          Meeting Type
        </label>

        <input
          id="meetingType"
          name="meetingType"
          defaultValue={meeting?.meetingType}
          className="border rounded w-full p-2"
          required
        />
      </div>


      <div>
        <label htmlFor="presiding">
          Presiding
        </label>

        <input
          id="presiding"
          name="presiding"
          defaultValue={meeting?.presiding}
          className="border rounded w-full p-2"
          required
        />
      </div>


      <div>
        <label htmlFor="conducting">
          Conducting
        </label>

        <input
          id="conducting"
          name="conducting"
          defaultValue={meeting?.conducting}
          className="border rounded w-full p-2"
          required
        />
      </div>



      {/* Opening */}

      <hr />

      <h2 className="text-xl font-bold">
        Opening
      </h2>


      <div>
        <label htmlFor="openingHymnNumber">
          Opening Hymn Number
        </label>

        <input
          id="openingHymnNumber"
          name="openingHymnNumber"
          type="number"
          defaultValue={meeting?.openingHymn.number}
          className="border rounded w-full p-2"
        />
      </div>


      <div>
        <label htmlFor="openingHymnTitle">
          Opening Hymn Title
        </label>

        <input
          id="openingHymnTitle"
          name="openingHymnTitle"
          defaultValue={meeting?.openingHymn.title}
          className="border rounded w-full p-2"
        />
      </div>


      <div>
        <label htmlFor="openingPrayer">
          Opening Prayer
        </label>

        <input
          id="openingPrayer"
          name="openingPrayer"
          defaultValue={meeting?.openingPrayer}
          className="border rounded w-full p-2"
        />
      </div>




      {/* Announcements */}

      <hr />

      <h2 className="text-xl font-bold">
        Announcements
      </h2>


      <input
        name="announcement1"
        placeholder="Announcement 1"
        defaultValue={meeting?.announcements[0]}
        className="border rounded w-full p-2"
      />

      <input
        name="announcement2"
        placeholder="Announcement 2"
        defaultValue={meeting?.announcements[1]}
        className="border rounded w-full p-2"
      />




      {/* Ward Business */}

      <hr />

      <h2 className="text-xl font-bold">
        Ward Business
      </h2>


      <input
        name="wardBusinessTitle"
        placeholder="Business title"
        defaultValue={meeting?.wardBusiness[0]?.title}
        className="border rounded w-full p-2"
      />


      <input
        name="wardBusinessDescription"
        placeholder="Business description"
        defaultValue={meeting?.wardBusiness[0]?.description}
        className="border rounded w-full p-2"
      />




      <div>
        <label htmlFor="stakeBusiness">
          Stake Business
        </label>

        <select
          id="stakeBusiness"
          name="stakeBusiness"
          defaultValue={
            meeting?.stakeBusiness ? "true" : "false"
          }
          className="border rounded w-full p-2"
        >
          <option value="false">
            No
          </option>

          <option value="true">
            Yes
          </option>
        </select>
      </div>




      {/* Sacrament */}

      <hr />

      <h2 className="text-xl font-bold">
        Sacrament
      </h2>


      <input
        name="sacramentHymnNumber"
        type="number"
        placeholder="Sacrament hymn number"
        defaultValue={meeting?.sacramentHymn.number}
        className="border rounded w-full p-2"
      />


      <input
        name="sacramentHymnTitle"
        placeholder="Sacrament hymn title"
        defaultValue={meeting?.sacramentHymn.title}
        className="border rounded w-full p-2"
      />




      {/* Speakers */}

      <hr />

      <h2 className="text-xl font-bold">
        Speakers
      </h2>


      <input
        name="speaker1Name"
        placeholder="Speaker 1 name"
        defaultValue={meeting?.speakers[0]?.name}
        className="border rounded w-full p-2"
      />

      <input
        name="speaker1Topic"
        placeholder="Speaker 1 topic"
        defaultValue={meeting?.speakers[0]?.topic}
        className="border rounded w-full p-2"
      />


      <input
        name="speaker2Name"
        placeholder="Speaker 2 name"
        defaultValue={meeting?.speakers[1]?.name}
        className="border rounded w-full p-2"
      />

      <input
        name="speaker2Topic"
        placeholder="Speaker 2 topic"
        defaultValue={meeting?.speakers[1]?.topic}
        className="border rounded w-full p-2"
      />




      {/* Closing */}

      <hr />

      <h2 className="text-xl font-bold">
        Closing
      </h2>


      <input
        name="closingHymnNumber"
        type="number"
        placeholder="Closing hymn number"
        defaultValue={meeting?.closingHymn.number}
        className="border rounded w-full p-2"
      />


      <input
        name="closingHymnTitle"
        placeholder="Closing hymn title"
        defaultValue={meeting?.closingHymn.title}
        className="border rounded w-full p-2"
      />


      <input
        id="closingPrayer"
        name="closingPrayer"
        placeholder="Closing prayer"
        defaultValue={meeting?.closingPrayer}
        className="border rounded w-full p-2"
      />



      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isPending ? "Saving..." : submitText}
      </button>


      {state.message && (
        <p aria-live="polite">
          {state.message}
        </p>
      )}

    </form>
  );
}