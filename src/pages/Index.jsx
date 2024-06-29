import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [links, setLinks] = useState([]);
  const [linkName, setLinkName] = useState("");
  const [linkURL, setLinkURL] = useState("");
  const [error, setError] = useState("");

  const handleAddLink = () => {
    if (!linkName || !linkURL) {
      setError("Both fields are required.");
      return;
    }

    if (links.some((link) => link.name === linkName)) {
      setError("Link name must be unique.");
      return;
    }

    try {
      new URL(linkURL);
    } catch (_) {
      setError("Invalid URL.");
      return;
    }

    setLinks([...links, { name: linkName, url: linkURL }]);
    setLinkName("");
    setLinkURL("");
    setError("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-4">Link Tracker</h1>
      <div className="mb-4">
        <Input
          placeholder="Link Name"
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
          className="mr-2"
        />
        <Input
          placeholder="Link URL"
          value={linkURL}
          onChange={(e) => setLinkURL(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleAddLink}>Add Link</Button>
      </div>
      {error && (
        <Alert className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{link.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;