import { getSetting } from './@utils/foundry/settings'
import { capitalize } from './@utils/string'

export function refresh() {
    ui.combat.render()
}

export function getSavedNames() {
    return getSetting('names') as Record<string, string>
}

export function formatUnknown(unknown: string, type: string) {
    return `${unknown} ${capitalize(type)}`
}
