import { capitalize, getFlag, getSetting, localize, setFlag } from './module'
import { updateActorTokens } from './token'

export function playersSeeName(doc) {
    if (doc instanceof Combatant && doc.actor) doc = doc.actor
    if (doc instanceof Actor && doc.hasPlayerOwner) return true
    return !!getFlag(doc, 'showName')
}

export async function toggleSeeName(doc) {
    const showName = !playersSeeName(doc)

    if (doc instanceof Actor || !doc.actor) await setFlag(doc, 'showName', showName)
    else await setFlag(doc.actor, 'showName', showName)

    if (canvas.tokens.hud?.rendered) canvas.tokens.hud.render()

    const actor = doc instanceof Actor ? doc : doc.actor
    if (actor) updateActorTokens(actor, showName)

    return showName
}

export function getName(doc) {
    const unknown = localize('unknown')
    const type = doc instanceof Actor ? doc.type : doc.actor?.type
    if (!type) return unknown

    const saved = (getSavedNames()[type] ?? '').trim()
    return saved || formatUnknown(unknown, type)
}

export function refresh() {
    ui.combat.render()
}

export function getSavedNames() {
    return getSetting('names')
}

export function formatUnknown(unknown, type) {
    return `${unknown} ${capitalize(type)}`
}
