import { getModule } from '@utils/foundry/module'
import { dnd5ParseChat } from './third/dnd5e'
import { pf2eInitHook, pf2eParseChat, pf2eReadyHook } from './third/pf2e'
import { wireParseChat } from './third/wire'

export const thirdPartyInitHooks = createThirdPartyListener<[isGM: boolean]>()
export const thirdPartyReadyHooks = createThirdPartyListener<[isGM: boolean]>()
export const thirdPartyChatParse = createThirdPartyListener<[args: ThirdPartyChatParseArgs]>()

export function thirdPartyInitialization() {
    switch (game.system.id) {
        case 'pf2e':
            thirdPartyInitHooks.add(pf2eInitHook)
            thirdPartyReadyHooks.add(pf2eReadyHook)
            thirdPartyChatParse.add(pf2eParseChat)
            break
        case 'dnd5e':
            // thirdPartyInitHooks.add(dnd5InitHook)
            thirdPartyChatParse.add(dnd5ParseChat)
            break
    }

    if (getModule('wire')?.active) {
        thirdPartyChatParse.add(wireParseChat)
    }
}

function createThirdPartyListener<TArgs extends any[], TFunction extends (...args: TArgs) => void = (...args: TArgs) => void>() {
    const a = [] as TFunction[]
    const f = function (...args: TArgs) {
        a.forEach(x => x(...args))
    }
    f.add = (fn: TFunction) => a.push(fn)
    return f
}
