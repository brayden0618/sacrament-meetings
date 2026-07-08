import NavLinks from "@/components/NavLinks";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <NavLinks />
      <hr className="my-4" />
      {children}
    </div>
  );
}