
import { Preset, definePreset } from 'unocss'

export default definePreset((options?: Preset) => {
    return {
        name: 'my-preset',
        rules: [
            [
                /^marg-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` }),
                { autocomplete: 'marg-<num>' },
            ],
            [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
            [
                /^py-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px 0` }),
                { autocomplete: 'py-<num>' },
            ],
            [/^px-([\.\d]+)$/, ([_, num]) => ({ padding: `0 ${num}px` })],
        ],
        variants: [
            // hover:
            (matcher) => {
                if (!matcher.startsWith('hover:'))
                    return matcher
                return {
                    // slice `hover:` prefix and passed to the next variants and rules
                    matcher: matcher.slice(6),
                    selector: s => `${s}:hover`,
                }
            },
        ],
        shortcuts: [
            {
                'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
                'btn-hex': 'font-semibold rounded-lg shadow-md',
                'custom-btn': 'font-semibold rounded-lg shadow-md',
                'red': 'text-red-100',
                'hello-text': 'text-[#50d71e] hover:text-[#e1da5a] w-fit font-bold underline',
            },
            [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
            [/^custom-btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
            [/^btn-hex-(.*)$/, ([, c]) => `bg-[${c}] text-[#FFFFFF] font-bold rounded-lg`],
        ],
    }
})
