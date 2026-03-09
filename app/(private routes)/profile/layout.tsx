import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - My Profile",
  description: "View and manage your NoteHub profile settings.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}