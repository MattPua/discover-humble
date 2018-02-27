#!/usr/bin/env python


from humblebundle import HumbleBundle
import api.config as app_config
import json
def main():
    hb = HumbleBundle(app_config.API_HUMBLE_BUNDLE['USERNAME'], app_config.API_HUMBLE_BUNDLE['PASSWORD'])

    print 'Updating Humble Bundle Library from Humble Bundle'
    hb.update()
    save_to_file(hb)



def save_to_file(hb):
    file_name = 'data/games.json'
    print 'Saving Humble Bundle Library to JSON file: %s ' % file_name
    games_only = []
    text_file = open(file_name, "w")
    for game in hb.games:
        if (hb.games[game]['payee']['machine_name'] != 'humblebundle'):
            games_only.append({'humbleBundle': hb.games[game]})
    print 'Adding %s items to the list' % len(games_only)
    text_file.write(json.dumps(games_only, sort_keys=True, indent=4))
    text_file.close()

if __name__ == "__main__":
    main()
