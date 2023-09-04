import { dnd5ParseChat } from './third/dnd5e'
import { pf2eInitHook, pf2eParseChat, pf2eReadyHook } from './third/pf2e'
import { wireParseChat } from './third/wire'

export const thirdPartyInitHooks = createThirdPartyListener()
export const thirdPartyReadyHooks = createThirdPartyListener()
export const thirdPartyChatParse = createThirdPartyListener()

export function thirdPartyInitialization() {
    switch (game.system.id) {
        case 'pf2e':
            thirdPartyInitHooks.add(pf2eInitHook)
            thirdPartyReadyHooks.add(pf2eReadyHook)
            thirdPartyChatParse.add(pf2eParseChat)
            break
        case 'dnd5e':
            thirdPartyChatParse.add(dnd5ParseChat)
            break
    }

    if (game.modules.get('wire')?.active) {
        thirdPartyChatParse.add(wireParseChat)
    }
}

function createThirdPartyListener() {
    const a = []
    const f = function (...args) {
        a.forEach(x => x(...args))
    }
    f.add = fn => a.push(fn)
    return f
}
