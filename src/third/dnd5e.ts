import { getSetting } from '~src/@utils/foundry/settings'
import { replaceHTMLText } from '~src/@utils/jquery'
import type { ThirdPartyChatParseArgs } from '~src/third'

export function dnd5ParseChat({ message, $html, playersCanSee }: ThirdPartyChatParseArgs) {
    if (playersCanSee) return

    const isGM = game.user.isGM

    if (message.rolls.length && getSetting('criticals')) {
        const critical = game.i18n.localize('DND5E.CriticalHit')
        const powerful = game.i18n.localize('DND5E.PowerfulCritical')
        const regexp = new RegExp(` (\\(([\\w ]*)?(?:${critical}|${powerful})([\\w ]*)?\\))$`, 'i')
        const $flavor = $html.find('header .flavor-text')
        if (isGM) replaceHTMLText($flavor, regexp, ' <span class="anonymous-replaced">$1</span>', true)
        replaceHTMLText($flavor, regexp, '', true)
    }
}

export function dnd5InitHook(isGM: boolean) {}
