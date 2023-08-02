import { setModuleID } from '@utils/module'
import { getCurrentModule } from '@utils/foundry/module'
import { registerSetting, registerSettingMenu } from '@utils/foundry/settings'
import { isGM } from '@utils/foundry/user'
import { getName, playersSeeName, toggleSeeName } from './api'
import { preCreateToken, renderTokenHUD, updateToken } from './token'
import { thirdPartyInitHooks, thirdPartyInitialization, thirdPartyReadyHooks } from './third'
import { refresh } from './utils'
import { renderCombatTracker } from './tracker'
import { renderChatMessage } from './chat'
import { getActorDirectoryEntryContext, onActorUpdate } from './actor'
import { AnonymousNamesMenu } from '@apps/names'

export const MODULE_ID = 'anonymous'
setModuleID(MODULE_ID)

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

    getCurrentModule<AnonymousApi>().api = {
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
Hooks.on('updateToken', updateToken)
