import React from "react";
import he from "he";
import { Columns } from "react-bulma-components";
import LeftColumn from "../common/LeftColumn";
import Metadata from "../common/Metadata";
import { imageUrl } from "../../models/banners";

const BannerShowColumns = props => {
  const metadata = [
    { key: "URL", value: props.banner.url },
    { key: "Alt Text", value: props.banner.alt },
    { key: "Published", value: props.banner.published ? "Yes" : "No" },
  ];

  return (
    <Columns className="show-columns">
      <LeftColumn>
        <Metadata
          data={metadata}
        />
      </LeftColumn>
      <Columns.Column className="description">
        <img 
          src={imageUrl(props.banner.desktop_url.large)} 
          alt={he.decode(props.banner.alt)}
        />
        <img 
          src={imageUrl(props.banner.mobile_url.large)} 
          alt={he.decode(props.banner.alt)}
          className="mobile-banner"
        />
      </Columns.Column>
    </Columns>
  );
};

export default BannerShowColumns;
