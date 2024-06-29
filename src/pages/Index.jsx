import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";

const Index = () => {
  const [links, setLinks] = useState([]);
  const [linkName, setLinkName] = useState("");
  const [linkURL, setLinkURL] = useState("");
  const [tags, setTags] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

    setLinks([...links, { name: linkName, url: linkURL, tags: tags.split(",").map(tag => tag.trim()), traffic: 0 }]);
    setLinkName("");
    setLinkURL("");
    setTags("");
    setError("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLinks = links.filter(
    (link) =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const csvData = links.map(link => ({
    name: link.name,
    url: link.url,
    traffic: link.traffic,
    tags: link.tags.join(", ")
  }));

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
        <Textarea
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
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
      <div className="mb-4">
        <Input
          placeholder="Search by name or URL"
          value={searchTerm}
          onChange={handleSearch}
          className="mr-2"
        />
      </div>
      <div className="mb-4">
        <CSVLink data={csvData} filename={"links.csv"}>
          <Button>Export to CSV</Button>
        </CSVLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLinks.map((link, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{link.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
              <div>Tags: {link.tags.join(", ")}</div>
              <div>Traffic: {link.traffic}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;