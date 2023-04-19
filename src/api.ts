import { getFlag, setFlag } from '@utils/foundry/flags'
import { localize } from '@utils/foundry/localize'
import { updateActorTokens } from './token'
import { formatUnknown, getSavedNames } from './utils'

/**
 * @param {Actor | Combatant} doc
 * @returns {boolean} the current state of visibility
 */
export function playersSeeName(doc: Actor | Combatant): boolean {
    if (doc instanceof Combatant && doc.actor) doc = doc.actor
    if (doc instanceof Actor && doc.hasPlayerOwner) return true
    return !!getFlag(doc, 'showName')
}

/**
 * Toggles the state of visibility
 * This will trigger a refresh of different parts of the UI to reflect the new state
 *
 * @param {Actor | Combatant} doc
 * @returns {Promise<boolean>} a promise with the new state of visibility
 */
export async function toggleSeeName(doc: Actor | Combatant): Promise<boolean> {
    const showName = !playersSeeName(doc)

    if (doc instanceof Actor || !doc.actor) await setFlag(doc, 'showName', showName)
    else await setFlag(doc.actor, 'showName', showName)

    if (canvas.tokens.hud?.rendered) canvas.tokens.hud.render()

    const actor = doc instanceof Actor ? doc : doc.actor
    if (actor) updateActorTokens(actor, showName)

    return showName
}

/**
 * @param {Actor | Combatant} doc
 * @returns {string} the replacement name with no regard for the current state of visibility
 */
export function getName(doc: Actor | Combatant): string {
    const unknown = localize('unknown')
    const type = doc instanceof Actor ? doc.type : doc.actor?.type
    if (!type) return unknown

    const saved = (getSavedNames()[type] ?? '').trim()
    return saved || formatUnknown(unknown, type)
}
