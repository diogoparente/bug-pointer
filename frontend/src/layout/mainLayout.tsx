import Navbar from "../components/navigation/navbar";
import { cn } from "@/utils/utils";

interface MainLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export default function MainLayout({ className, children }: MainLayoutProps) {
  return (
    <div className={cn(className)}>
      <Navbar />
      {children}
    </div>
  );
}
