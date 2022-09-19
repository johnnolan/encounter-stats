![](https://img.shields.io/badge/Foundry-v0.10.0-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/johnnolan/encounter-stats/latest/module.zip)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fencounter-stats&colorB=4aa94a)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=johnnolan_encounter-stats&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=johnnolan_encounter-stats)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=johnnolan_encounter-stats&metric=coverage)](https://sonarcloud.io/summary/new_code?id=johnnolan_encounter-stats)

[![Translation status](https://weblate.foundryvtt-hub.com/widgets/encounter-stats/-/287x66-black.png)](https://weblate.foundryvtt-hub.com/engage/encounter-stats/)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X354DCG)

# Encounter Statistics

### Current features are

* Works with standard roles, `midi-qol` and `dnd5e`
* [Track your own custom campaign events via Macros](#track-your-own-custom-campaign-events)
* Enemies must be targetted in order for kills to be registered
    * Multiple targets will show roll damage and roll damage x targets
* Optional Simple Calendar Integration for nicer Journal Entry names
* Can track multiple active combats at one time
* Optionally saves raw data output as JSON to the journal entry so you can export and manipulate the data as you want
* Import/Export campaign stats as JSON from the Settings menu.
    * **All campaign stats are saved against the Gamemaster. If you delete the Gamemaster user you will lose your data.**
    * Use this functionality to make backups before major changes to version upgrades and the Gamemaster user.

#### Encounter Tracking

- Players attacks
- Damage
- HP
- Round Damage
- Top stats
- Healing
- Kills
- Support Actions
- Battlefield Actions

[![Example](https://raw.githubusercontent.com/johnnolan/encounter-stats/main/images/example.jpg)](https://raw.githubusercontent.com/johnnolan/encounter-stats/main/images/example.jpg)
#### Campaign Stats

- Natural 1s
- Natural 20s
- Kills
- Heals
- Your own custom events!

[![Example Campaign](https://raw.githubusercontent.com/johnnolan/encounter-stats/main/images/example-campaign.jpg)](https://raw.githubusercontent.com/johnnolan/encounter-stats/main/images/example-campaign.jpg)

**Note: Due to time and life I will not be adding other systems or modules except midi-qol at this time**

## Simple Calendar Integration

If Simple Calendar module is enabled, the title of the Journal Entries will use the current day returned from it instead of the curent real world time.

## Track your own custom Campaign Events

You can create your own events in the campaign journal to remember certain points in time. These can be created by Macros run by the GM/Player or other module developers can add them from their modules.

Example macros are included in the `Compendium Macros` section called `Encounter Statistics`. These include...

- HDYWTDT (Select token before running to assign the event to that actor)
- Swear Word at the table (Select token before running to assign the event to that actor)
- Every time food at the table consumed
- Every time the GM says "You can certainly try"

### How to call the Hook

You can call the hook using the following example code.

``` javascript
Hooks.callAll(`encounter-stats.customEvent`, {
    EventName: "Expletive", // Unique name that all events triggered will be grouped by
    actorId: token.actor.id, // Optional actorId to assign the event to an individual Player
    FlavorText: formDataObject.expletive, // Whatever custom text you want to display
});
```

In the campaign report, the results look like so

[![Example Custom Campaign Report](https://raw.githubusercontent.com/johnnolan/encounter-stats/main/images/custom-events.jpg)](https://raw.githubusercontent.com/johnnolan/encounter-stats/main/images/custom-events.jpg)

## Dependencies

* `dnd5e` game system

## Contributing

The contributing guidelines can be found in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

Our Code of Conduct can also be found in the [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) file.

### Translations

This project is setup to use Weblate to make it easier to create translations by the community.

If you are amazing and want to contribute then you can visit this projects Weblate page at [https://weblate.foundryvtt-hub.com/engage/encounter-stats/](https://weblate.foundryvtt-hub.com/engage/encounter-stats/) and add translations yourself to be shared with the community.

## License

Encounter Statistics is released under the [MIT License](./LICENSE).

## Contact

For issues, please raise a bug in Github and use the Report a Bug option in the settings to get debug information to help me reproduce the issue easily on my computer. I will try and fix things depending on fatherhood responsibilities [https://github.com/johnnolan/encounter-stats/issues](https://github.com/johnnolan/encounter-stats/issues)

You can also find me lurking around on the Foundry VTT Discord [https://discord.gg/foundryvtt](https://discord.gg/foundryvtt). My Discord Tag is `JB#2780`.
