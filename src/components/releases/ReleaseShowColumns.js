import React from "react";
import moment from "moment";
import he from "he";
import { Columns } from "react-bulma-components";
import Markdown from "markdown-to-jsx";
import LeftColumn from "../common/LeftColumn";
import Metadata from "../common/Metadata";
import ReleaseImageGallery from "./ReleaseImageGallery";
import ReleaseTracklist from "./ReleaseTracklist";
import CreditList from "../credits/CreditList";
import EndorsementList from "../endorsements/EndorsementList";
import ReleaseVendorList from "../releasevendors/ReleaseVendorList";

const ReleaseShowColumns = props => {
  const releaseDate = moment(props.release.release_date).format('MMMM Do, YYYY');

  const metadata = [
    { key: "Label", value: props.release.label.name },
    { key: "Published", value: props.release.published ? "Yes" : "No" },
    { key: "Catalog Number", value: props.release.catalog_number },
    { key: "Release Date", value: releaseDate },
    { key: "Release Type", value: props.release.release_type },
  ];

  return (
    <Columns className="show-columns">
      <LeftColumn>
        <ReleaseImageGallery release={props.release} />
        <Metadata
          data={metadata}
        />
        <CreditList 
          credits={props.release.credits} 
          releaseSlug={props.release.slug} 
          onDelete={props.onCreditDelete}
        />
        <ReleaseVendorList
          vendors={props.release.vendors}
          releaseSlug={props.release.slug}
          onDelete={props.onVendorDelete}
        />
      </LeftColumn>
      <Columns.Column className="description">
        <div className="has-margin-bottom">
          <Markdown>{he.decode(props.release.description)}</Markdown>
        </div>

        {props.release.discs && 
          <ReleaseTracklist 
            discs={props.release.discs} 
            slug={props.release.slug} 
            onDiscDelete={props.onDiscDelete}
            onTrackDelete={props.onTrackDelete}
            user_id={props.release.user_id}
          />
        }

        {props.release.endorsements && 
          <EndorsementList 
            endorsements={props.release.endorsements}
            releaseSlug={props.release.slug}
            onDelete={props.onEndorsementDelete}
          />
        }
      </Columns.Column>
    </Columns>
  );
};

export default ReleaseShowColumns;
