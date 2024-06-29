import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectPage = ({ links, handleLinkClick }) => {
  const { linkName } = useParams();
  const link = links.find((link) => link.name === linkName);

  useEffect(() => {
    if (link) {
      handleLinkClick(linkName);
    }
  }, [linkName]);

  if (!link) {
    return <div>Link not found</div>;
  }

  return (
    <meta http-equiv="refresh" content={`0;url=${link.url}`} />
  );
};

export default RedirectPage;