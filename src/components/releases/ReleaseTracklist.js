import React from "react";
import Disc from "../discs/Disc";

const ReleaseTracklist = props => {
  return (
    <div className="release-tracklist">
      {props.discs.map(disc => {
        return (
          <Disc 
            key={`disc-${disc.id}`}  
            slug={props.slug} 
            user_id={props.user_id} 
            onDelete={props.onDiscDelete}
            onTrackDelete={props.onTrackDelete}
            {...disc}
          />
        );
      })}
    </div>
  );
};

export default ReleaseTracklist;
