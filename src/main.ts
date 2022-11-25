import { getCurrentModule } from './@utils/foundry/module'
import { registerSetting, registerSettingMenu } from './@utils/foundry/settings'
import { isGM } from './@utils/foundry/user'
import { registerLocalizeHelper } from './@utils/handlebars'
import { getActorDirectoryEntryContext, onActorUpdate } from './actor'
import { getName, playersSeeName, toggleSeeName } from './api'
import { AnonymousNamesMenu } from './apps/names'
import { renderChatMessage } from './chat'
import { thirdPartyInitHooks, thirdPartyInitialization, thirdPartyReadyHooks } from './third'
import { preCreateToken, renderTokenHUD } from './token'
import { renderCombatTracker } from './tracker'
import { refresh } from './utils'

Hooks.once('init', () => {
    registerLocalizeHelper()

    registerSetting({
        name: 'version',
        type: String,
        default: '',
    })

    registerSetting({
        name: 'names',
        type: Object,
        default: {},
        onChange: refresh,
    })

    registerSetting({
        name: 'token',
        type: Boolean,
        default: true,
        config: true,
    })

    registerSetting({
        name: 'rolls',
        type: Boolean,
        default: true,
        config: true,
    })

    registerSetting({
        name: 'criticals',
        type: Boolean,
        default: true,
        config: true,
    })

    registerSetting({
        name: 'cardContent',
        type: Boolean,
        default: false,
        config: true,
    })

    registerSetting({
        name: 'footer',
        type: Boolean,
        default: false,
        config: true,
    })

    registerSettingMenu({
        name: 'namesMenu',
        type: AnonymousNamesMenu,
    })

    getCurrentModule().api = {
        playersSeeName,
        toggleSeeName,
        getName,
    }

    const gm = isGM()

    if (gm) {
        Hooks.on('getActorDirectoryEntryContext', getActorDirectoryEntryContext)
        Hooks.on('renderTokenHUD', renderTokenHUD)
    }

    thirdPartyInitialization()
    thirdPartyInitHooks(gm)
})

Hooks.once('ready', () => {
    thirdPartyReadyHooks(game.user.isGM)
})

Hooks.on('renderCombatTracker', renderCombatTracker)
Hooks.on('renderChatMessage', renderChatMessage)
Hooks.on('preCreateToken', preCreateToken)
Hooks.on('updateActor', onActorUpdate)
