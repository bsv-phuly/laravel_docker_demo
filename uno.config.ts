// uno.config.ts
import { defineConfig } from "unocss";
import myPreset from './my-preset'
import presetAttributify from '@unocss/preset-attributify'
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
    presets: [
        myPreset,
        presetAttributify,
        presetRemToPx()
    ],
    transformers: [
        transformerDirectives(),
    ],
});
