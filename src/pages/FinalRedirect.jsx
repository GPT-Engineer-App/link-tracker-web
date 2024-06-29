import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const FinalRedirect = ({ links }) => {
  const { linkName } = useParams();
  const link = links.find((link) => link.name === linkName);

  useEffect(() => {
    if (link) {
      window.location.href = link.url;
    }
  }, [link]);

  if (!link) {
    return <div>Link not found</div>;
  }

  return null;
};

export default FinalRedirect;