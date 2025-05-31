"use client";

import { SidebarComponent } from "./Sidebar";
import ProtectedRoute from "../../utils/ProtectedRoute";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <SidebarComponent>
          <main className="flex-1">{children}</main>
        </SidebarComponent>

        <main className="flex-1">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
