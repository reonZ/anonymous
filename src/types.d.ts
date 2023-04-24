interface ThirdPartyChatParseArgs {
    playersCanSee: boolean
    isAnonymous: boolean
    message: ChatMessage
    actor: Actor | null
    $html: JQuery
}
