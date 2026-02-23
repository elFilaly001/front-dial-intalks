import React, { useState, useEffect } from "react";
import FeedCard from "./FeedCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import MentionPagination from "./MentionPagination";
import ExportButton from "../ui/ExportButton";
import { v1Api } from "@/services/axiosService";



const Mentions = () => {
  const [mentions, setMentions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);


  const [form, setForm] = useState({
    link: "",
    title: "",
    snippet: "",
    source: "",
    sentiment: "",
    date: new Date().toISOString().slice(0, 10),
    thumbnail: "",
    notify: false,
  });

  useEffect(() => {
    const fetchMentions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Directly use the full API URL for now
        const response = await v1Api.get("https://in-talks.hypeo-prod.xyz/api/v1/feeds");
        setMentions(response.data.feeds || []);
      } catch (err: any) {
        setError("Erreur lors du chargement des mentions.");
      } finally {
        setLoading(false);
      }
    };
    fetchMentions();
  }, []);

  const handleDelete = (id: string) => {
    setMentions(mentions.filter((mention) => mention.id !== id));
  };

  const handleUpdateSentiment = (id: string, newSentiment: string) => {
    setMentions(
      mentions.map((mention) =>
        mention.id === id ? { ...mention, type: newSentiment } : mention
      )
    );
  };

  // Prepare export data for mentions
  const exportHeaders = ["ID", "Titre", "Lien", "Date", "Miniature", "Extrait", "Source", "Sentiment"];
  const exportRows = mentions.map((m) => [
    m.id,
    m.title,
    m.link,
    m.postedDate,
    m.thumbnail,
    m.snippet,
    m.source,
    m.type,
  ]);

  return (
    <Card className="flex flex-col relative">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Feed des Mentions</CardTitle>
            <ToolTipsProvider title="Flux en temps réel regroupant toutes les mentions de la marque issues des réseaux sociaux et des sources médiatiques." />
          </div>
          <div className="flex items-center gap-2">
            <ExportButton
              data={{
                headers: exportHeaders,
                rows: exportRows,
                filename: `mentions-${new Date().toISOString().slice(0, 10)}`
              }}
            />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">Ajouter une mention</Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-5xl">
                <DialogHeader>
                  <DialogTitle className="text-center">Ajouter une mention</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  <label className="text-sm">Link</label>
                  <Input
                    placeholder="Link"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                  />
                  <label className="text-sm">Titre de la mention</label>
                  <Input
                    placeholder="Titre de la mention"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                  <label className="text-sm">Snippet</label>
                  <textarea
                    placeholder="Snippet"
                    className="min-h-[80px] resize-y rounded-md border bg-transparent px-3 py-2 text-base"
                    value={form.snippet}
                    onChange={(e) => setForm({ ...form, snippet: e.target.value })}
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm">Source</label>
                      <Input
                        placeholder="Source"
                        value={form.source}
                        onChange={(e) => setForm({ ...form, source: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm">Sentiment</label>
                      <Select onValueChange={(val) => setForm({ ...form, sentiment: val })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sentiment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="POSITIVE">POSITIVE</SelectItem>
                          <SelectItem value="NEGATIVE">NEGATIVE</SelectItem>
                          <SelectItem value="Article">Article</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm">Date</label>
                      <Input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={form.notify}
                        onCheckedChange={(val) => setForm({ ...form, notify: !!val })}
                      />
                      <span className="text-sm">Send the notification by email & Whatsapp</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <div className="flex w-full gap-2">
                    <Button className="w-full bg-main" size="sm" onClick={() => {
                      // minimal validation
                      if (!form.title || !form.snippet) {
                        // simple client-side guard
                        return;
                      }
                      const newMention = {
                        id: Date.now().toString(),
                        title: form.title,
                        link: form.link || "#",
                        postedDate: form.date,
                        thumbnail: form.thumbnail || "/mentions/glovo.webp",
                        snippet: form.snippet,
                        source: form.source || "unknown",
                        type: form.sentiment || "Article",
                      };
                      setMentions((prev) => [newMention, ...prev]);
                      setForm({
                        link: "",
                        title: "",
                        snippet: "",
                        source: "",
                        sentiment: "",
                        date: new Date().toISOString().slice(0, 10),
                        thumbnail: "",
                        notify: false,
                      });
                      setOpen(false);
                    }}>Ajouter</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-none h-[755px] overflow-y-auto">
        <div className="flex flex-col gap-2.5">
          {loading ? (
            <div className="text-center py-8">Chargement des mentions...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            mentions.map((mention) => (
              <FeedCard key={mention.id} feed={mention} onDelete={handleDelete} onUpdateSentiment={handleUpdateSentiment} />
            ))
          )}
        </div>
      </CardContent>
      <MentionPagination
        pagination={{ page: 1, pageSize: 10, total: 300, totalPages: 30 }}
      />
    </Card>
  );
};

export default Mentions;
