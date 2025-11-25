import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { CompactDatePicker } from "../ui/CompactDatePicker";
import { Button } from "../ui/button";
import { Filter, RotateCcw } from "lucide-react";

const media = [
  {
    label: "Instagram",
    image: "/media/instagram.png",
  },
  {
    label: "Youtube",
    image: "/media/youtube.png",
  },
  {
    label: "X",
    image: "/media/x.png",
  },
  {
    label: "Tiktok",
    image: "/media/tiktok.png",
  },
  {
    label: "Facebook",
    image: "/media/facebook.png",
  },
  {
    label: "Linkedin",
    image: "/media/linkedin.png",
  },
];
const languages = [
  {
    label: "Tous",
    image: "https://flagcdn.com/48x36/un.png", // UN flag for "Tous"
  },
  {
    label: "Arabe",
    image: "https://flagcdn.com/48x36/sa.png", // Saudi Arabia flag
  },
  {
    label: "Français",
    image: "https://flagcdn.com/48x36/fr.png", // France flag
  },
  {
    label: "Anglais",
    image: "https://flagcdn.com/48x36/gb.png", // United Kingdom flag
  },
];

const FilterOverView = () => {
  const [dateRange, setDateRange] = useState({
    from: undefined as Date | undefined,
    to: undefined as Date | undefined,
  });

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mt-5">
        <CompactDatePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Par source" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Par source</SelectLabel>
              {media.map((item) => (
                <SelectItem key={item.label} value={item.label}>
                  {item.label === "X" ? (
                    <Image
                      src="/media/x.png"
                      alt="X logo"
                      width={20}
                      height={20}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                          svg.setAttribute("width", "20");
                          svg.setAttribute("height", "20");
                          svg.setAttribute("viewBox", "0 0 24 24");
                          svg.innerHTML = '<path fill="black" d="M17.53 3H21L14.19 10.63L22.09 21H15.63L10.77 14.62L5.29 21H2L9.13 13L1.61 3H8.24L12.68 8.87L17.53 3ZM16.41 19H18.23L7.75 5H5.81L16.41 19Z"/>';
                          parent.insertBefore(svg, parent.firstChild);
                        }
                      }}
                    />
                  ) : item.image ? (
                    <Image
                      src={item.image}
                      alt={item.label}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <></>
                  )}
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Par sentiment" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Par sentiment </SelectLabel>
              {["Positif", "Neutre", "Négatif"].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Par auteur" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Par auteur </SelectLabel>
              {["Tous", "Grand public", "Influenceurs", "Médias", "Concurrents"].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Par format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Par format </SelectLabel>
              {["Tous", "Vidéo", "Publication", "Commentaire", "Article"].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Par langue" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Par langue </SelectLabel>
              {languages.map((item) => (
                <SelectItem key={item.label} value={item.label}>
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
        <div className="flex-1 flex items-center gap-2.5">
          <Button className="flex-1">
            <Filter />
            Filtrer
          </Button>
          <Button className="bg-transparent border border-main text-main">
            <RotateCcw />
          </Button>

        </div>
      </div>
    </div>
  );
};

export default FilterOverView;
