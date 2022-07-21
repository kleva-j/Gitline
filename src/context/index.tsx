import { createContext, ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

interface AppContextInterface {
  name: string;
  author: string;
  overlayVisible: boolean;
  setOverlayVisible: (v: boolean) => void
}

export const AppContext: AppContextInterface = {
  name: "Gitline",
  author: "kasmickleva",
  overlayVisible: false,
  setOverlayVisible: () => {}
};

export const AppCtx = createContext<AppContextInterface>(AppContext);

export const Provider = (props: ProviderProps) => (
  <AppCtx.Provider value={AppContext}>{props.children}</AppCtx.Provider>
);
