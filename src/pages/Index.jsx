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
  const [bulkUploadData, setBulkUploadData] = useState("");

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

  const handleBulkUpload = () => {
    const lines = bulkUploadData.split("\n");
    const newLinks = [];

    for (const line of lines) {
      const [name, url, tags] = line.split(",");
      if (!name || !url) {
        setError("Each line must contain a name and a URL.");
        return;
      }

      if (links.some((link) => link.name === name) || newLinks.some((link) => link.name === name)) {
        setError(`Link name "${name}" must be unique.`);
        return;
      }

      try {
        new URL(url);
      } catch (_) {
        setError(`Invalid URL "${url}".`);
        return;
      }

      newLinks.push({ name, url, tags: tags ? tags.split(";").map(tag => tag.trim()) : [], traffic: 0 });
    }

    setLinks([...links, ...newLinks]);
    setBulkUploadData("");
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
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Link Tracker</h1>
      <div className="mb-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
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
        <Alert className="mb-6 border-l-4 border-red-500 bg-red-100 text-red-700">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="mb-6">
        <Input
          placeholder="Search by name or URL"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 mx-auto"
        />
      </div>
      <div className="mb-6">
        <CSVLink data={csvData} filename={"links.csv"}>
          <Button className="w-full md:w-auto">Export to CSV</Button>
        </CSVLink>
      </div>
      <div className="mb-6">
        <Textarea
          placeholder="Bulk upload data (name,url,tags;tag2;tag3 per line)"
          value={bulkUploadData}
          onChange={(e) => setBulkUploadData(e.target.value)}
          className="w-full mb-4"
        />
        <Button className="w-full md:w-auto" onClick={handleBulkUpload}>Bulk Upload</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.map((link, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{link.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {link.url}
              </a>
              <div className="mt-2 text-gray-600">Tags: {link.tags.join(", ")}</div>
              <div className="mt-2 text-gray-600">Traffic: {link.traffic}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;