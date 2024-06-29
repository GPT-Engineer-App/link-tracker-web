import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const IntermediateRedirect = ({ links }) => {
  const { linkName } = useParams();
  const navigate = useNavigate();
  const link = links.find((link) => link.name === linkName);

  useEffect(() => {
    if (link) {
      setTimeout(() => {
        navigate(`/final-redirect/${linkName}`);
      }, 1000);
    }
  }, [linkName, navigate, link]);

  if (!link) {
    return <div>Link not found</div>;
  }

  return (
    <>
      <meta http-equiv="refresh" content="1;url=/final-redirect" />
    </>
  );
};

export default IntermediateRedirect;