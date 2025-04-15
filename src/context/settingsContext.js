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

    // 🖌️ Apply custom palette CSS variables
    const { palette, mode } = settings;
    const theme = Palette(palette, mode);
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // 🌙 Sync settings.mode to next-themes
    setTheme(mode === "Dark" ? "dark" : "light");
  }, [settings?.palette, settings?.mode]);

  useEffect(() => {
    if (!theme || !settings) return;

    const currentMode = theme === "dark" ? "Dark" : "Light";
    if (settings.mode !== currentMode) {
      saveSettings({ ...settings, mode: currentMode });
    }
  }, [theme]);

  if (!isHydrated || !settings) return null;

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
