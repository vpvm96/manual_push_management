import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMediaQuery, useTheme } from "@mui/material";

interface LayoutContextValue {
  isMobile: boolean;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  // 1000px 미만을 모바일로 간주
  const isMobile = useMediaQuery("(max-width:1000px)");

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    // 화면이 데스크탑으로 전환되면 사이드바는 항상 열림
    if (!isMobile) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    []
  );

  const value = useMemo<LayoutContextValue>(
    () => ({
      isMobile,
      isSidebarOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
    }),
    [isMobile, isSidebarOpen, openSidebar, closeSidebar, toggleSidebar]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
};
