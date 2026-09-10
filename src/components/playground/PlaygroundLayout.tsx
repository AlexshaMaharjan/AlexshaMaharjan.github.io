import { Outlet } from "react-router-dom";
import { gridBackground } from "./gridBackground";

export default function PlaygroundLayout() {
  return (
    <div className="relative min-h-screen bg-page" style={gridBackground}>
      <Outlet />
    </div>
  );
}
