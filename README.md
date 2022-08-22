![](https://img.shields.io/badge/Foundry-v0.10.0-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/johnnolan/encounter-stats/latest/module.zip)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fencounter-stats&colorB=4aa94a)
[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fencounter-stats%2Fshield%2Fendorsements)](https://www.foundryvtt-hub.com/package/encounter-stats/)
[![Foundry Hub Comments](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fencounter-stats%2Fshield%2Fcomments)](https://www.foundryvtt-hub.com/package/encounter-stats/)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X354DCG)

# Encounter Stats

## !IMPORTANT!

This package is being updated for V10. It should work now but with bugs. I will be updating it over the coming weeks to tighten the reporting up and will remove this section once ready for feedback.

### Current limitations and features are

* Only works with `midi-qol` and `dnd5e`
* Enemies must be targetted in order for kills to be registered
* Uses the new V10 Journal
* Campaign Stats are not currently enabled
* Due to time and life I will not be adding other systems except midi-qol

### Upcoming

* Vanilla foundry roll support
* Enabled Campaign Stats

## Individual Encounter

This module is designed to capture your 

- Players attacks
- Damage
- HP
- Round Damage
- Top stats
- Enemy data
- Healing
- Kills
- Support Actions
- Battlefield Actions

## Campaign Stats

It also stores your 

- Natural 1s
- Natural 20s
- Kills
- Heals

throughout your campaign currently split by day recorded. **Do not delete the 2 entries for this, you will lose your data!**

All this is stored in a Journal Entry with a summary of their stats for each after you end the Encounter. There is also a copy of the raw JSON data from each battle should you wish to do more analysis of the recorded data.

You have an option for AOE attacks to either use the dice roll damage or record the damage taken to creatures within the template area.

This can then be viewed post battle to look upon for the Players to analyse and celebrate their attacks and as a DM, give you a better idea of how to build your Encounters in the future.

The current module works on rolls from the following list.

* [midi-qol](https://gitlab.com/tposney/midi-qol)
* Vanilla Foundry

If you would like to see another module supported that isn't above then feel free to add it as a feature to the issues list in Github.

[![Example](https://raw.githubusercontent.com/johnnolan/encounter-stats/main/images/example.jpg)](https://raw.githubusercontent.com/johnnolan/encounter-stats/main/images/example.jpg)


## Simple Calendar Integration

The module optionally supports [Simple Calendar](https://foundryvtt.com/packages/foundryvtt-simple-calendar) dates for naming Journal entries and tracking Campaign Stats. This is enabled by default if the module is installed and can be turned off to use real dates from the settings.

## Installation

To install, follow these instructions:

- Inside Foundry, select the Game Modules tab in the Configuration and Setup menu.
- Click the Install Module button and enter the following URL: `https://github.com/johnnolan/encounter-stats/releases/latest/download/module.json`
- Click Install and wait for installation to complete.

Alternatively, use the integrated module manager in Foundry.

Foundry modules page: [https://foundryvtt.com/packages/encounter-stats](https://foundryvtt.com/packages/encounter-stats)

## Dependencies

* `dnd5e` game system

## Contact

For issues, please raise a bug in Github and use the Report a Bug option in the settings to get debug information to help me reproduce the issue easily on my computer. I will try and fix things depending on fatherhood responsibilities [https://github.com/johnnolan/encounter-stats/issues](https://github.com/johnnolan/encounter-stats/issues)

You can also find me lurking around on the Foundry VTT Discord [https://discord.gg/foundryvtt](https://discord.gg/foundryvtt). My Discord Tag is `JB#2780`.
