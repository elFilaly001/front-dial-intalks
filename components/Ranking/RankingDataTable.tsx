/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "../ui/button";
import Loading from "../ui/Loading";
import ranking from "@/data/ranking.json";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Account = {
  _id: string;
  categories: any[];
  industries: Record<string, any>;
  brand_categories: {
    primary: boolean;
    name: string;
    root: string;
    root_name: string;
    id: string;
    state: number;
  }[];
  brand_industries: Record<
    string,
    {
      id: string;
      name: string;
      niches: Record<
        string,
        {
          id: string;
          name: string;
          primary: boolean;
          state: number;
        }
      >;
    }
  >;
  niche_count: number;
  custom_tops: any[];
  oa_description_parsed: boolean;
  country: {
    name: string;
    code: string;
  };
  language: {
    name: string;
    native: string;
    id: string;
    code2: string;
    slug: string;
  };
  picture_url: string;
  full_name: string;
  biography: string;
  follower_count: number;
  typologie: string | null;
  title: string;
  age: number | null;
  gender: string | null;
  is_a_brand: boolean;
  networks: {
    instagram?: NetworkInfo;
    twitter?: NetworkInfo;
    tiktok?: NetworkInfo;
    youtube?: NetworkInfo;
    linkedin?: NetworkInfo;
  };
  score: {
    score: string;
    raw: number;
    tier: number;
  };
  growth: {
    percentage: string;
    absolute: string;
    type: "greater" | "lower";
  };
  badges: {
    exceptionalGrowth: boolean;
    linkedinTopVoice: boolean;
    looseFollowers: boolean;
    wroteABook: boolean;
    hasANewsletter: boolean;
    hasAPodcast: boolean;
    hasTopics: boolean;
    hasCause: boolean;
    isInactive: boolean;
    verifiedCreator: boolean;
  };
  custom_creators: any[];
  rank: {
    rank: number;
  };
};

type NetworkInfo = {
  network: string;
  follower_count: string;
  profile_url: string;
  score: string;
  score_raw: number;
  growth: {
    value: string;
    type: "greater" | "lower";
  };
  engagement_rate: string | null;
  profile_views: string;
};

// interface Pagination {
//   data: Account[];
//   total: number;
//   perPage: number;
//   currentPage: number;
//   lastPage: number;
//   nextPage: number;
//   prevPage: number;
// }

const secteurTranslations: Record<string, string> = {
  "Sports": "Sports",
  "Media": "Médias",
  "Fashion & Retail": "Mode & Commerce",
  "Nonprofit": "Association",
  "Technology": "Technologie",
  "Food & Beverage": "Alimentation & Boissons",
  "Beauty": "Beauté",
  "Health & Wellness": "Santé & Bien-être",
  "Travel & Tourism": "Voyage & Tourisme",
  "Travel & Hospitality": "Voyage & Hôtellerie",
  "Entertainment": "Divertissement",
  "Finance": "Finance",
  "Education": "Éducation",
  "Automotive": "Automobile",
  "Real Estate": "Immobilier",
};

const translateSecteur = (secteur: string): string => {
  return secteurTranslations[secteur] || secteur;
};

const DataTableInfluencersRanking = () => {
  const [selectedSecteur, setSelectedSecteur] = useState<string | null>(null);
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null);
  const [uniqueSecteurs, setUniqueSecteurs] = useState<string[]>([]);
  const [secteurOpen, setSecteurOpen] = useState(false);

  const socialNetworks = [
    { id: "instagram", name: "Instagram", icon: "/media/instagram.png" },
    { id: "twitter", name: "Twitter", icon: "/media/twitter.png" },
    { id: "tiktok", name: "TikTok", icon: "/media/tiktok.png" },
    { id: "youtube", name: "YouTube", icon: "/media/youtube.png" },
    { id: "linkedin", name: "LinkedIn", icon: "/media/linkedin.png" },
  ];

  const columns: TableColumn<Account>[] = [
    {
      name: "Classement",
      sortable: true,
      id: "rank",
      width: "110px",
      selector: (row) => row._id,
      cell(row, rowIndex) {
        return (
          <div className="flex justify-center text-whiteColor">
            {[1, 2, 3].includes(++rowIndex) ? (
              <div className="flex gap-2">
                <Image
                  width={25}
                  height={25}
                  src={`/icons/${rowIndex}.png`}
                  alt={row.full_name}
                />
                <p className="text-lg"># {rowIndex}</p>
              </div>
            ) : (
              <>
                <p className="text-lg"># {rowIndex}</p>
              </>
            )}
          </div>
        );
      },
    },
    {
      name: "Marque",
      sortable: true,
      id: "name",
      selector: (row) => row.full_name,
      width: "20%",
      cell: (row) => (
        <Link href={`/report/${row._id}`} style={{ textDecoration: "none" }}>
          <div className="flex items-center py-2 gap-2">
            <span>
              <div
                className="rounded-full h-[50px] w-[50px] mx-auto flex justify-start"
                style={{
                  background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                }}
              >
                <div
                  className="rounded-full mx-auto w-12 h-12 bg-contain p-0.5"
                  style={{
                    backgroundImage: `url(${row.picture_url})`,
                  }}
                ></div>
              </div>
            </span>
            <div>
              <p className="text-sm">{row.full_name}</p>
              <p className="text-xs capitalize">{row.title}</p>
              <p className="text-xs text-gray-400">
                {row.biography.substring(0, 100)} ...
              </p>
            </div>
          </div>
        </Link>
      ),
    },
    {
      name: "Score",
      width: "20%",
      sortable: true,
      id: "growth",
      cell(row) {
        return (
          <Badge className="flex gap-1 items-center bg-emerald-500/20 text-black px-3 py-2 rounded-md text-xs">
            <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
            {row.networks.instagram?.engagement_rate} / 100
          </Badge>
        );
      },
    },
    {
      name: "Niche",
      sortable: false,
      id: "niche",
      width: "20%",
      selector: (row) => row.title,
      cell(row) {
        return (
          <div>
            {row.brand_categories.map((category) => (
              <Button
                key={category.name}
                size={"sm"}
                className="text-xs capitalize bg-bgDarkColor text-whiteColor rounded-md mr-1 mb-1 hover:bg-cyan-200 hover:text-black"
              >
                {category.name}
              </Button>
            ))}
          </div>
        );
      },
    },
    {
      name: "Abonnés",
      sortable: true,
      id: "followers",
      width: "20%",
      cell(row) {
        return (
          <div className={`flex py-2 flex-col gap-2`}>
            {Object.entries(row.networks)
              .slice(0, 4)
              .map(([key, value]) => (
                <div className="flex gap-1 items-center" key={key}>
                  <Image
                    width={15}
                    height={15}
                    src={`/media/${value.network}.png`}
                    alt={value.network}
                  />
                  {value.follower_count}
                </div>
              ))}
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState<any[]>();
  useEffect(() => {
    setData(ranking.influencers);
    setUniqueSecteurs(
      Array.from(
        new Set(
          ranking.influencers.flatMap((account) =>
            account.brand_categories.map((cat: any) => cat.root_name)
          )
        )
      ).filter((secteur) => secteur !== "City")
    );
  }, []);

  const filteredData = selectedSecteur
    ? data?.filter((account) =>
      account.brand_categories.some((cat: any) => cat.root_name === selectedSecteur)
    )
    : data;

  const finalFilteredData = selectedSocial
    ? filteredData?.filter((account) =>
      Object.keys(account.networks).includes(selectedSocial)
    )
    : filteredData;

  return (
    <>
      <div className="flex flex-wrap gap-4 ">
        {/* Social Networks Filter with Icons */}
        <div className="flex flex-col gap-2">
          {/* <label className="text-sm font-medium text-whiteColor">Réseau social</label> */}
          <div className="flex gap-2">
            <Button
              variant={selectedSocial === null ? "default" : "outline"}
              onClick={() => setSelectedSocial(null)}
              className={cn(
                "px-3 h-9 rounded-lg transition-all",
                selectedSocial === null
                  ? "bg-cyan-500 text-white border-blue-400 hover:bg-cyan-200 hover:text-black"
                  : "bg-bgDarkColor text-whiteColor border-gray-600 hover:border-blue-500"
              )}
            >
              Tous
            </Button>
            {socialNetworks.map((network) => (
              <Button
                key={network.id}
                variant={selectedSocial === network.id ? "default" : "outline"}
                onClick={() => setSelectedSocial(selectedSocial === network.id ? null : network.id)}
                className={cn(
                  "px-3 h-9 rounded-lg transition-all flex items-center gap-2",
                  selectedSocial === network.id
                    ? "bg-cyan-500 text-white border-blue-600 hover:bg-cyan-200 hover:text-black"
                    : "bg-bgDarkColor text-whiteColor border-gray-600 hover:border-blue-500"
                )}
              >
                <Image
                  src={network.icon}
                  alt={network.name}
                  width={18}
                  height={18}
                  className="rounded-sm"
                />
                <span className="hidden sm:inline">{network.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Searchable Secteur Select (Combobox) */}
        <div className="flex flex-col gap-2">
          {/* <label className="text-sm font-medium text-whiteColor">Secteur</label> */}
          <Popover open={secteurOpen} onOpenChange={setSecteurOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={secteurOpen}
                className="w-[250px] justify-between bg-bgDarkColor text-whiteColor border-gray-600 hover:border-blue-500"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  {selectedSecteur ? translateSecteur(selectedSecteur) : "Rechercher un secteur..."}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0 bg-white border-gray-300 z-[9999]">
              <Command className="bg-white">
                <CommandInput
                  placeholder="Rechercher un secteur..."
                  className="text-gray-900"
                />
                <CommandList className="bg-white">
                  <CommandEmpty className="text-gray-500 py-4 bg-white px-3">
                    Aucun secteur trouvé.
                  </CommandEmpty>
                  <CommandGroup className="bg-white">
                    <CommandItem
                      value=""
                      onSelect={() => {
                        setSelectedSecteur(null);
                        setSecteurOpen(false);
                      }}
                      className="text-gray-900 hover:bg-blue-100 cursor-pointer bg-white data-[selected=true]:bg-blue-100"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedSecteur === null ? "opacity-100" : "opacity-0"
                        )}
                      />
                      Tous les secteurs
                    </CommandItem>
                    {uniqueSecteurs.map((secteur) => (
                      <CommandItem
                        key={secteur}
                        value={translateSecteur(secteur)}
                        onSelect={() => {
                          setSelectedSecteur(secteur);
                          setSecteurOpen(false);
                        }}
                        className="text-gray-900 hover:bg-blue-100 cursor-pointer bg-white data-[selected=true]:bg-blue-100"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedSecteur === secteur ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {translateSecteur(secteur)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className={`dark-datatable`}>
        <DataTable
          columns={columns}
          // progressPending={}
          data={finalFilteredData || []}
          progressComponent={<Loading />}
          pagination={true}
        />
      </div>
    </>
  );
};

export default DataTableInfluencersRanking;
