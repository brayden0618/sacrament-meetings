export default function Footer() {
  return (
    <footer className="bg-gray-200 text-center py-4 mt-auto">
      <p>
        © {new Date().getFullYear()} YSA 1st Ward Sacrament Meeting Planner. All rights reserved.
      </p>
      <p className="text-sm">
        Sacrament Meeting Planner
      </p>
    </footer>
  );
}