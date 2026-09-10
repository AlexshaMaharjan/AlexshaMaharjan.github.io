import { Outlet } from "react-router-dom";
import { dotBackground } from "./gridBackground";

export default function PlaygroundLayout() {
  return (
    <div className="pg-page relative min-h-screen" style={dotBackground}>
      <Outlet />
    </div>
  );
}
