import { dnd5ParseChat } from './third/dnd5e'
import { pf2eInitHook, pf2eParseChat, pf2eReadyHook } from './third/pf2e'

export interface ThirdPartyChatParseArgs<TChatMessage extends ChatMessage = ChatMessage, TActor extends Actor = Actor> {
    playersCanSee: boolean
    message: TChatMessage
    actor: TActor | null
    $html: JQuery
}

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
}

function createThirdPartyListener<TArgs extends any[], TFunction extends (...args: TArgs) => void = (...args: TArgs) => void>() {
    const a = [] as TFunction[]
    const f = function (...args: TArgs) {
        a.forEach(x => x(...args))
    }
    f.add = (fn: TFunction) => a.push(fn)
    return f
}
