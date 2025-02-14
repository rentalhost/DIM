import React from 'react';
import { isWellRested } from '../inventory/store/well-rested';
import { D2ManifestDefinitions } from '../destiny2/d2-definitions';
import BungieImage from '../dim-ui/BungieImage';
import {
  DestinyCharacterProgressionComponent,
  DestinySeasonDefinition
} from 'bungie-api-ts/destiny2';
import { numberFormatter } from 'app/utils/util';
import { settings } from 'app/settings/settings';

export default function WellRestedPerkIcon({
  defs,
  progressions,
  season
}: {
  defs: D2ManifestDefinitions;
  progressions: DestinyCharacterProgressionComponent;
  season: DestinySeasonDefinition | undefined;
}) {
  const wellRestedInfo = isWellRested(defs, season, progressions);

  if (!wellRestedInfo.wellRested) {
    return null;
  }
  const formatter = numberFormatter(settings.language);
  const wellRestedPerk = defs.SandboxPerk.get(2352765282);
  if (!wellRestedPerk) {
    console.error("Couldn't find Well Rested perk in manifest");
    return null;
  }
  const perkDisplay = wellRestedPerk.displayProperties;
  return (
    <div className="well-rested milestone-quest">
      <div className="milestone-icon">
        <BungieImage
          className="perk milestone-img"
          src={perkDisplay.icon}
          title={perkDisplay.description}
        />
        <span>
          {formatter.format(wellRestedInfo.progress!)}
          <wbr />/<wbr />
          {formatter.format(wellRestedInfo.requiredXP!)}
        </span>
      </div>
      <div className="milestone-info">
        <span className="milestone-name">{perkDisplay.name}</span>
        <div className="milestone-description">{perkDisplay.description}</div>
      </div>
    </div>
  );
}
