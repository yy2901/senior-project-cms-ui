import {
  createContext,
  Dispatch,
  ReactChild,
  SetStateAction,
  useState,
} from "react";

export enum RightPanelModal {
  TRASHCAN,
  MEDIA,
  TEMPLATE,
  ROUTE,
  ENTRY,
}

type StoreContextType = {
  rightPanel: {
    modal: RightPanelModal | null;
    routeUrl: string | null;
    templateParent: string | null;
    entrySlug: string | null;
    setModal: Dispatch<SetStateAction<RightPanelModal | null>>;
    setRouteUrl: Dispatch<SetStateAction<string | null>>;
    setTemplateParent: Dispatch<SetStateAction<string | null>>;
    setEntrySlug: Dispatch<SetStateAction<string | null>>;
  };
};

const StoreContext = createContext<StoreContextType>({
  rightPanel: {
    modal: null,
    routeUrl: null,
    templateParent: null,
    entrySlug: null,
    setModal: () => {},
    setRouteUrl: () => {},
    setTemplateParent: () => {},
    setEntrySlug: () => {},
  },
});

export const StoreProvider = ({ children }: { children: ReactChild }) => {
  const [routeUrl, setRouteUrl] = useState<string | null>(null);
  const [modal, setModal] = useState<RightPanelModal | null>(null);
  const [entrySlug, setEntrySlug] = useState<string | null>(null);
  const [templateParent, setTemplateParent] = useState<string | null>(null);
  const value: StoreContextType = {
    rightPanel: {
      modal,
      routeUrl,
      templateParent,
      entrySlug,
      setModal,
      setRouteUrl,
      setTemplateParent,
      setEntrySlug,
    },
  };
  console.log(value);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContext;
