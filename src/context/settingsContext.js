"use client";

import themeConfig from "@/configurations/theme/themeConfig";
import {
  getSettingsStorage,
  setSettingsStorage,
} from "@/helpers/settingsStorage";
import { createContext, useEffect, useState } from "react";
import Palette from "@/themes/palette";
import { useTheme } from "next-themes"; // 👈 import เพิ่ม

export const SettingsContext = createContext({
  settings: getSettingsStorage(),
  saveSettings: () => null,
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    let stored = getSettingsStorage();

    if (!stored || Object.keys(stored).length === 0) {
      setSettingsStorage(themeConfig);
      stored = themeConfig;
    }

    setSettings(stored);
    setIsHydrated(true);
  }, []);
  useEffect(() => {
    const stored = getSettingsStorage();
    setSettings(stored);
    setIsHydrated(true);
  }, []);

  const saveSettings = (updateSettings) => {
    if (updateSettings?.reset) {
      setSettingsStorage({
        ...themeConfig,
        autoNative: updateSettings.autoNative,
      });
    } else {
      setSettingsStorage(updateSettings);
    }
    const updated = getSettingsStorage();
    setSettings(updated);
  };

  useEffect(() => {
    if (!settings) return;

    const { palette, mode } = settings;
    const theme = Palette(palette, mode);
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    setTheme(mode === "Dark" ? "dark" : "light");
  }, [settings?.palette, settings?.mode]);

  useEffect(() => {
    if (!theme || !settings) return;

    const currentMode = theme === "dark" ? "Dark" : "Light";
    if (settings.mode !== currentMode) {
      saveSettings({ ...settings, mode: currentMode });
    }
  }, [theme]);

  // if (!isHydrated || !settings) return null;
  if (!isHydrated || !settings) return <div>Loading settings...</div>;
  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
