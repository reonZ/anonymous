import { getActorDirectoryEntryContext, onActorUpdate } from './actor'
import { getName, playersSeeName, refresh, toggleSeeName } from './api'
import { AnonymousNamesMenu } from './apps/names'
import { renderChatMessage } from './chat'
import { getCurrentModule, isGM, registerSetting, registerSettingMenu } from './module'
import { thirdPartyInitHooks, thirdPartyInitialization, thirdPartyReadyHooks } from './third'
import { preCreateToken, renderTokenHUD } from './token'
import { renderCombatTracker } from './tracker'

Hooks.once('init', () => {
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
