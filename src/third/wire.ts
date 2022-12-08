import { getSetting } from '~src/@utils/foundry/settings'
import { getName, playersSeeName } from '~src/api'
import { ThirdPartyChatParseArgs } from '~src/third'

export function wireParseChat({ message, playersCanSee, $html }: ThirdPartyChatParseArgs) {
    if (game.user.isGM) return

    if (!playersCanSee) {
        if (getSetting('rolls')) {
            const $tooltips = $html.find('.dice-tooltip')
            $tooltips.empty()
            $tooltips.css('padding-top', 0)

            if (getSetting('criticals')) {
                $html.find('.dice-total').removeClass('critical fumble')
            }
        }
    }

    // target

    const $target = $html.find('.phase-attack .token-info .token-name')
    if (!$target) return

    const targetUUID = message.getFlag('wire', 'activation.attack.targetActorUuid') as string
    if (!targetUUID) return

    try {
        const target = (fromUuidSync(targetUUID) as TokenDocument | null)?.actor
        if (!target || target.hasPlayerOwner || playersSeeName(target)) return
        $target.text(getName(target))
    } catch {
        return
    }
}
