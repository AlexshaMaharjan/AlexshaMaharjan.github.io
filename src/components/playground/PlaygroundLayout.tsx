import { Outlet } from "react-router-dom";
import { gridBackground } from "./gridBackground";

export default function PlaygroundLayout() {
  return (
    <div className="pg-page relative min-h-screen" style={gridBackground}>
      <Outlet />
    </div>
  );
}
