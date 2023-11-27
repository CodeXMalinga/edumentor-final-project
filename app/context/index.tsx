"use client";

import {
  ContextType,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type GlobalStateTyepe = {
  sideBarOpen: string;
  setSideBarOpen: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalStateVal = {
  sideBarOpen: "",
  setSideBarOpen: () => "",
};

export const GlobalContext = createContext<GlobalStateTyepe>(GlobalStateVal);

export default function GlobalState({ children }: PropsWithChildren) {
  const [sideBarOpen, setSideBarOpen] = useState<string>("");

  return (
    <GlobalContext.Provider value={{ sideBarOpen, setSideBarOpen }}>
      {children}
    </GlobalContext.Provider>
  );
}
