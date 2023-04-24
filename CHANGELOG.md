# 1.3.0

the module now dissociates names and others settings when it comes to anonymity: up till now, if an actor's anonymity was removed, all the features of the module were disabled for said actor. with this version, while the actor's name will still be revealed, the other features will remain (hiding chat rolls, etc..)

-   now displays `Target: Unknown` instead of removing the line from the chat card in `pf2e` system

# 1.2.3

-   fix issue with `pf2e` critical roll result color still showing

# 1.2.2

-   the API function `playersSeeName` now also check if the actor is owned by a player, if so, it will always return true

# 1.2.1

-   fix a bug with `pf2e` lootable combatant permission

# 1.2.0

-   holding `shift` while toggling a name from the combat tracker will toggle the names of all the combatants with the same actor

# 1.1.3

-   added tooltips for the combat tracker and token HUD

# 1.1.2

-   fixed escaping bug that prevented the anonymity of actors with different names in token and alias

# 1.1.1

-   now also make saving throws anonymous in chat when using `Whistler's Item Rolls Extended`.

# 1.1.0

-   should now be compatible with the module `Whistler's Item Rolls Extended`.

# 1.0.7

-   fixed special characters when renaming chat messages

# 1.0.6

-   fixed bug with `PF2e Dorako UI` using a different element tree structure for chat cards.

# 1.0.5

-   fixed a bug with not fully provided speaker data on chat message create.

# 1.0.4

-   name parsing in chat messages is now case insensitive

# 1.0.3

-   fixed settings localization

# 1.0.2

-   cleaned debug stuff

# 1.0.1

-   fixed pf2e success degree showing

# 1.0.0

-   original release
