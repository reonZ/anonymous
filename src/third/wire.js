import { getName, playersSeeName } from '../api'
import { getSetting } from '../module'

const SAVE = /\(dc \d+\)/gim

export function wireParseChat({ message, isAnonymous, $html }) {
    if (game.user.isGM) return

    if (isAnonymous) {
        if (getSetting('rolls')) {
            const $tooltips = $html.find('.dice-tooltip')
            $tooltips.empty()
            $tooltips.css('padding-top', 0)

            if (getSetting('criticals')) {
                $html.find('.dice-total').removeClass('critical fumble')
            }

            const $save = $html.find('.phase-saving-throws .phase-heading')
            $save.text($save.text().replace(SAVE, ''))
        }
    }

    // target

    const $target = $html.find('.phase-attack .token-info .token-name')
    const targetUUID = message.getFlag('wire', 'activation.attack.targetActorUuid')
    if ($target.length && targetUUID) {
        try {
            const target = fromUuidSync(targetUUID)?.actor
            if (target && !target.hasPlayerOwner && !playersSeeName(target)) {
                $target.text(getName(target))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const $targets = $html.find('.phase-saving-throws .saving-throw-target:has(.target-name)')
    const targetsUUID = message.getFlag('wire', 'activation.targetUuids')
    if ($targets.length && targetsUUID?.length) {
        try {
            for (const uuid of targetsUUID) {
                const target = fromUuidSync(uuid)?.actor
                if (target && !target.hasPlayerOwner && !playersSeeName(target)) {
                    $targets.filter(`[data-actor-id="${uuid}"]`).find('.target-name').text(getName(target))
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
}
