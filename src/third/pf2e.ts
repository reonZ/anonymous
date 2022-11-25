import { getCurrentModule } from '~src/@utils/foundry/module'
import { warn } from '~src/@utils/foundry/notifications'
import { getSetting, registerSetting } from '~src/@utils/foundry/settings'
import { playersSeeName } from '~src/api'
import type { ThirdPartyChatParseArgs } from '~src/third'

export function pf2eInitHook(isGM: boolean) {
    registerSetting({
        name: 'pf2e.traits',
        type: String,
        default: 'never',
        config: true,
        choices: {
            never: 'never',
            rolls: 'rolls',
            always: 'always',
        },
    })
}

/** @type {ThirdPartyHook} */
export function pf2eReadyHook(isGM: boolean) {
    if (isGM) disableSettings()
}

function disableSettings() {
    let key = ''
    if (game.settings.settings.has('pf2e.metagame.tokenSetsNameVisibility')) key = 'metagame.tokenSetsNameVisibility'
    else if (game.settings.settings.has('pf2e.metagame_tokenSetsNameVisibility')) key = 'metagame_tokenSetsNameVisibility'
    if (!key || !game.settings.get('pf2e', key)) return

    const module = getCurrentModule().title
    const setting = game.i18n.localize('PF2E.SETTINGS.Metagame.TokenSetsNameVisibility.Name')

    game.settings.set('pf2e', key, false)
    warn('pf2e.disabled', { module, setting }, true)
}

export function pf2eParseChat({ message, playersCanSee, $html }: ThirdPartyChatParseArgs<ChatMessagePF2e>) {
    const isGM = game.user.isGM
    const target = message.target?.actor

    if (target && !target.hasPlayerOwner && !playersSeeName(target)) {
        const $targets = $html.find('header .flavor-text .target-dc [data-whose="target"]')
        if ($targets.length) {
            const $target = $targets.first()
            if (isGM) $target.attr('data-visibility', 'gm')
            else $target.remove()
        }
    }

    if (!isGM && !playersCanSee) {
        const traits = getSetting('pf2e.traits')

        if (message.rolls.length) {
            if (getSetting('rolls')) {
                const $tags = $html.find('header .flavor-text hr + .tags')
                if ($tags.length) {
                    $tags.prev('hr').remove()
                    $tags.remove()
                }

                if (getSetting('criticals')) {
                    $html.find('.message-content .dice-roll .dice-result .dice-total').removeClass('success failure')
                }

                if (traits !== 'never') {
                    $html.find('header .flavor-text .tags').remove()
                }
            } else if (traits === 'always') {
                $html.find('header .flavor-text .tags').first().remove()
            }
        } else if (traits === 'always') {
            $html.find('.message-content section.tags').remove()
        }
    }
}
