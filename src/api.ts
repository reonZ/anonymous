import { getFlag, setFlag } from './@utils/foundry/flags'
import { localize } from './@utils/foundry/i18n'
import { updateActorTokens } from './token'
import { formatUnknown, getSavedNames } from './utils'

export function playersSeeName(doc: Actor | Combatant) {
    if (doc instanceof Actor || !doc.actor) return !!getFlag(doc, 'showName')
    return !!getFlag(doc.actor, 'showName')
}

export async function toggleSeeName(doc: Actor | Combatant) {
    const showName = !playersSeeName(doc)

    if (doc instanceof Actor || !doc.actor) await setFlag(doc, 'showName', showName)
    else await setFlag(doc.actor, 'showName', showName)

    if (canvas.tokens.hud?.rendered) canvas.tokens.hud.render()

    const actor = doc instanceof Actor ? doc : doc.actor
    if (actor) updateActorTokens(actor, showName)
}

export function getName(doc: Actor | Combatant) {
    const unknown = localize('unknown')
    const type = doc instanceof Actor ? doc.type : doc.actor?.type
    if (!type) return unknown

    const saved = (getSavedNames()[type] ?? '').trim()
    return saved || formatUnknown(unknown, type)
}
