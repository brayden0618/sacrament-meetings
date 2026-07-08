import Image from "next/image";

export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Image
            src="/sacrament-meeting.jpg"
            alt="Sacrament meeting congregation"
            width={80}
            height={80}
            className="rounded-md"
          />

          <div>
            <h1 className="text-3xl font-bold">
              YSA 1st Ward Sacrament Meeting Planner
            </h1>

            <p className="text-sm">
              Sacrament Meeting Planner
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-semibold">Today</p>
          <p>{today}</p>
        </div>
      </div>
    </header>
  );
}