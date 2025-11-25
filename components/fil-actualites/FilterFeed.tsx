

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Filter, RotateCcw } from "lucide-react";
import Link from "next/link";
// import { Input } from "../ui/input";
import Image from "next/image";
import { CompactDatePicker } from "../ui/CompactDatePicker";

const FilterFeed = () => {
  return (
    <div className="flex flex-col gap-5 h-[600px] sticky top-5 overflow-y-auto">
      {/* <Card>
        <CardHeader>
          <CardTitle className="font-semibold">Fil d’actualités</CardTitle>
        </CardHeader>
        <CardContent className=" ">
          <div className="flex justify-center items-center relative w-full">
            <Input placeholder="Search through mentions" />
            <Search className=" size-4 absolute right-3 text-gray-700 transform -translate-y-1/2 top-1/2" />
          </div>
        </CardContent>
      </Card> */}
      <OrderBy />
      <FilterSource />
      <FilterSentiment />
      <FilterAuthor />
      <FilterCity />
      <FilterPeriod />
      <FilterLangue />
      <div className="bg-white border rounded-md p-5 flex gap-2">
        <Button
          asChild
          className="bg-main border hover:bg-transparent border-main hover:text-main flex-1"
        >
          <Link href={"/social-listening"}>
            <Filter />
            Filter
          </Link>
        </Button>
        <Button
          asChild
          className="bg-transparent hover:bg-main text-main border border-main hover:text-white"
        >
          <Link href={"/social-listening"}>
            <RotateCcw />
          </Link>
        </Button>
      </div>
    </div>
  );
};

// ---------------- ORDER BY ----------------
const OrderBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOrder = searchParams.get("orderBy") || "";

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("orderBy", value);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Order by</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={handleChange} defaultValue={currentOrder}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Order By" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectLabel>Trier par</SelectLabel>
              <SelectItem value="desc">Plus récents en premier</SelectItem>
              <SelectItem value="asc">Plus anciens en premier</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

// ---------------- FILTER SOURCE ----------------
const FilterSource = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSources = searchParams.get("sources")?.split(",") || [];

  const sources = [
    { label: "Facebook", value: "Facebook" },
    { label: "Instagram", value: "Instagram" },
    { label: "Tiktok", value: "Tiktok" },
    { label: "Youtube", value: "YouTube" },
    { label: "Presse", value: "Presse" },
  ];

  const handleToggle = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSources = [...selectedSources];

    if (newSources.includes(value)) {
      newSources = newSources.filter((v) => v !== value);
    } else {
      newSources.push(value);
    }

    if (newSources.length === 0) {
      params.delete("sources");
    } else {
      params.set("sources", newSources.join(","));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" font-semibold">Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-5">
          {sources.map((source) => (
            <div key={source.value} className="flex items-center space-x-2">
              <Checkbox
                id={source.value}
                checked={selectedSources.includes(source.value)}
                onCheckedChange={() => handleToggle(source.value)}
              />

              <Label htmlFor={source.value}>
                <Image
                  src={`/media/${source.value.toLowerCase()}.png`}
                  alt={`/media/${source.value}.png`}
                  width={20}
                  height={20}
                />
                {source.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ---------------- FILTER SENTIMENT ----------------
const FilterSentiment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSentiments = searchParams.get("sentiments")?.split(",") || [];

  const sentiments = [
    { label: "Negative", value: "NEGATIVE" },
    { label: "Positive", value: "POSITIVE" },
    { label: "Neutral", value: "NEUTRAL" },
  ];

  const handleToggle = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSentiments = [...selectedSentiments];

    if (newSentiments.includes(value)) {
      newSentiments = newSentiments.filter((v) => v !== value);
    } else {
      newSentiments.push(value);
    }

    if (newSentiments.length === 0) {
      params.delete("sentiments");
    } else {
      params.set("sentiments", newSentiments.join(","));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" font-semibold">Sentiment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-5">
          {sentiments.map((sentiment) => (
            <div key={sentiment.value} className="flex items-center space-x-2">
              <Checkbox
                id={sentiment.value}
                checked={selectedSentiments.includes(sentiment.value)}
                onCheckedChange={() => handleToggle(sentiment.value)}
              />
              <Label htmlFor={sentiment.value}>{sentiment.label}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ---------------- FILTER PERIOD ----------------
const FilterPeriod = () => {

  const [dateRange, setDateRange] = useState({
        from: undefined as Date | undefined,
        to: undefined as Date | undefined,
      });
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" font-semibold">Period</CardTitle>
      </CardHeader>
      <CardContent>
        <CompactDatePicker
                          dateRange={dateRange}
                          onDateRangeChange={setDateRange}
                        />
      </CardContent>
    </Card>
  );
};

// ---------------- FILTER AUTHOR ----------------
const FilterAuthor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedAuthors = searchParams.get("authors")?.split(",") || [];

  const authors = [
    { label: "Grand public", value: "grandpublic" },
    { label: "Influenceurs", value: "influenceurs" },
    { label: "Médias", value: "medias" },
    { label: "Concurrents", value: "concurrents" },
  ];

  const handleToggle = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newAuthors = [...selectedAuthors];

    if (newAuthors.includes(value)) {
      newAuthors = newAuthors.filter((v) => v !== value);
    } else {
      newAuthors.push(value);
    }

    if (newAuthors.length === 0) {
      params.delete("authors");
    } else {
      params.set("authors", newAuthors.join(","));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" font-semibold">Author</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-5">
          {authors.map((author) => (
            <div key={author.value} className="flex items-center space-x-2">
              <Checkbox
                id={author.value}
                checked={selectedAuthors.includes(author.value)}
                onCheckedChange={() => handleToggle(author.value)}
              />
              <Label htmlFor={author.value}>{author.label}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ---------------- FILTER LANGUE ----------------
const FilterLangue = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedLanguages = searchParams.get("languages")?.split(",") || [];

  const languages = [
    { label: "Tous", value: "all", image: "https://flagcdn.com/48x36/un.png" },
    { label: "Arabe", value: "ar", image: "https://flagcdn.com/48x36/sa.png" },
    { label: "Français", value: "fr", image: "https://flagcdn.com/48x36/fr.png" },
    { label: "Anglais", value: "en", image: "https://flagcdn.com/48x36/gb.png" },
  ];

  const handleToggle = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newLanguages = [...selectedLanguages];

    if (newLanguages.includes(value)) {
      newLanguages = newLanguages.filter((v) => v !== value);
    } else {
      newLanguages.push(value);
    }

    if (newLanguages.length === 0) {
      params.delete("languages");
    } else {
      params.set("languages", newLanguages.join(","));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" font-semibold">Langue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-5">
          {languages.map((language) => (
            <div key={language.value} className="flex items-center space-x-2">
              <Checkbox
                id={language.value}
                checked={selectedLanguages.includes(language.value)}
                onCheckedChange={() => handleToggle(language.value)}
              />
              <Label htmlFor={language.value}>
                <Image src={language.image} alt={language.label} width={20} height={15} />
                {language.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ---------------- FILTER CITY ----------------
const FilterCity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" font-semibold">Ville</CardTitle>
      </CardHeader>
      <CardContent>
        
                        <Select>
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Par ville" />
                          </SelectTrigger>
                          <SelectContent className="h-[400px]">
                            <SelectGroup>
                              <SelectLabel>Par ville </SelectLabel>
                              {[
                                "Casablanca",
                                "Rabat",
                                "Fes",
                                "Marrakech",
                                "Tangier",
                                "Agadir",
                                "Meknes",
                                "Oujda",
                                "Kenitra",
                                "Tetouan",
                                "Safi",
                                "Mohammedia",
                                "Khouribga",
                                "El Jadida",
                                "Beni Mellal",
                                "Nador",
                                "Taza",
                                "Settat",
                                "Larache",
                                "Ksar El Kebir",
                              ].map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
      </CardContent>
    </Card>
  );
};

export default FilterFeed;
