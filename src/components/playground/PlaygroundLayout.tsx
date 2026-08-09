import { Outlet } from "react-router-dom";

export default function PlaygroundLayout() {
  return (
    <div
      className="relative min-h-screen bg-page"
      style={{
        backgroundImage:
          "linear-gradient(rgba(78,96,135,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(78,96,135,0.055) 1px, transparent 1px), linear-gradient(rgba(78,96,135,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(78,96,135,0.025) 1px, transparent 1px)",
        backgroundSize: "32px 32px, 32px 32px, 8px 8px, 8px 8px",
      }}
    >
      <Outlet />
    </div>
  );
}
