import React, { createContext, useContext, useMemo } from 'react';
import { useTaskStore } from '@mindwtr/core';

const DEFAULT_FONT_SCALE = 1;

const FontScaleContext = createContext<number>(DEFAULT_FONT_SCALE);

export function FontScaleProvider({ children }: { children: React.ReactNode }) {
    const fontScalePercent = useTaskStore((state) => state.settings?.appearance?.fontScale);
    const scale = useMemo(
        () => (fontScalePercent != null ? fontScalePercent / 100 : DEFAULT_FONT_SCALE),
        [fontScalePercent],
    );

    return (
        <FontScaleContext.Provider value={scale}>
            {children}
        </FontScaleContext.Provider>
    );
}

export const useFontScale = () => useContext(FontScaleContext);
