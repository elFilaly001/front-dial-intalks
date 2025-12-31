import React, { useState, Suspense, use, useEffect } from "react";
import PostsTable, { PostRow } from "./PostsTable";
import PostCard from "./PostCard";
import Image from "next/image";
import { BookmarkIcon, LayoutGrid, List } from "lucide-react";
import OrderByFilter from "../FiltersInfluencers/OrderByFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import ExportButton from "../ui/ExportButton";
import {v1Api} from "@/services/axiosService";

const media = [
  {
    label: "Tous les réseaux sociaux",
    // no image for the 'All' option - render an icon instead
  },
  {
    label: "Instagram",
    image: "/media/instagram.png",
  },
  {
    label: "Youtube",
    image: "/media/youtube.png",
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
  {
    label: "X Platform",
    image: "/media/twitter.png",
  },
];
const influencer = {
  id: "cmhjwf16z0002kqz0qttwcbp8",
  avgLike: 305,
  avgComment: 27,
  avgViews: 327863,
  egRate: 0.3,
  username: "massinart.ma",
  verified: true,
  followersExact: 112206,
  accountLocation: "Morocco",
  name: "Massinart",
  bio: "Commandez tout ce dont vous avez besoin sur Massinart💛",
  followers: "112K",
  following: "13",
  postsCount: 392,
  profilePic: "/massinart.jpg",
  gender: "male",
  createdAt: "2025-11-04T01:36:56.267Z",
  updatedAt: "2025-11-04T01:36:56.267Z",
  categoryId: "cmhjwf11y0000kqz0qgcp56si",
  network: "instagram",
  countryId: "cmeu1k5h100020lsizz214mhf",
  accountId: null,
};

interface Post {
  id: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  url: string;
  picture: string;
  location: string | null;
  postedDate: string;
  caption: string;
  type: string;
  networkId: string;
  createdAt: string;
  updatedAt: string;
}

interface DataType {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

// const data: DataType = {
//   posts: [
//     {
//       id: "cmj0453qd00030l3mkagfxjzu",
//       viewsCount: 0,
//       likesCount: 0,
//       commentsCount: 0,
//       url: "https://www.instagram.com/massinart.ma/p/C-lZv_vNeOn/",
//       picture: "/massinart/125003786_190659399287819_7034797341339919248_n.jpg",
//       location: "Rabat, Morocco",
//       postedDate: "2024-08-12T21:08:49.000Z",
//       caption: "Nous sommes ravis de contribuer à l'élégance et au confort de vos appartements 🌟👌www.massinart.ma#hna7san #moroccanhospitality #hospitalitémarocaine #airbnb #moroccanhotels",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:11.078Z",
//       updatedAt: "2025-12-10T14:41:57.042Z"
//     },
//     {
//       id: "cmj04548w00040l3m0bdk0ejx",
//       viewsCount: 0,
//       likesCount: 0,
//       commentsCount: 0,
//       url: "https://www.instagram.com/massinart.ma/p/C2awZizNgYZ/",
//       picture: "/massinart/125501384_1524614727729320_763500987854682863_n.jpg",
//       location: "Marrakech, Morocco",
//       postedDate: "2024-01-22T21:43:55.000Z",
//       caption: "Our clients' real photos speak louder than words.Merci de nous avoir choisis ❤️www.massinart.ma#clientsatisfait #tableau #architectedinterieur #salonmarocain #decorationmaroc #interieurdesign #decoration #art #tableaux",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:11.745Z",
//       updatedAt: "2025-12-10T14:41:57.556Z"
//     },
//     {
//       id: "cmj0454qw00050l3mhozg3672",
//       viewsCount: 0,
//       likesCount: 0,
//       commentsCount: 0,
//       url: "https://www.instagram.com/massinart.ma/p/C1-EwMwt4on/",
//       picture: "/massinart/126553678_1055730511541447_6801924916327054791_n.jpg",
//       location: "Rabat, Morocco",
//       postedDate: "2024-01-11T18:23:48.000Z",
//       caption: "Le tableau n'est pas simplement décoratif, mais une expression puissante qui éclaire l'âme de l'espace 🪄Commandez votre nouveau tableau sur : www.massinart.ma#art #decoration #tableau #rbnb #hotel #bureau",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:12.392Z",
//       updatedAt: "2025-12-10T14:41:57.875Z"
//     },
//     {
//       id: "cmj04556e00060l3mdgrj5xo2",
//       viewsCount: 0,
//       likesCount: 279,
//       commentsCount: 33,
//       url: "https://www.instagram.com/massinart.ma/p/CwL0mLEtx2b/",
//       picture: "/massinart/137220838_812010759528813_6165508280218479197_n.jpg",
//       location: "Rabat, Morocco",
//       postedDate: "2023-08-20T23:23:38.000Z",
//       caption: "Chaque jour, nos clients nous surprennent avec leurs photos de nos tableaux livrés partout au Maroc.🪄🖼️ Découvrez les véritables chefs-d'œuvre dans leurs intérieurs !Commandez sur : www.massinart.ma#tableaux #tableau #tableaumaroc #artmural #ideecadeau #art #instamaroc #salonmarocain #marocaine #maroc #fes #tanger #meknes #agadir #marrakech #darwadecor #decorationinterieur #designintérieur #morocco #casablanca #décorationmaroc #décoration #rabat #oujda #nador",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:12.949Z",
//       updatedAt: "2025-12-10T14:41:58.214Z"
//     },
//     {
//       id: "cmj0455m500070l3m1rcb355o",
//       viewsCount: 0,
//       likesCount: 151,
//       commentsCount: 9,
//       url: "https://www.instagram.com/massinart.ma/p/CswjmfxNLyj/",
//       picture: "/massinart/153510614_885762142248884_4699986030568484371_n.jpg",
//       location: "Rabat, Morocco",
//       postedDate: "2023-05-27T19:41:27.000Z",
//       caption: "Sentez le rythme vibrant de portrait \"African Tribal\", une célébration de la diversité et de la fierté culturelle.Référence : TM296www.massinart.ma#africaine #portrait #portraitafricain #afro #art #artmural #tableau #tableaumaroc #culture #maroc #afrique #artiste #peinture #decoration #decomaison",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:13.518Z",
//       updatedAt: "2025-12-10T14:41:58.602Z"
//     },
//     {
//       id: "cmj04564l00080l3m2n4ohitu",
//       viewsCount: 0,
//       likesCount: 138,
//       commentsCount: 2,
//       url: "https://www.instagram.com/massinart.ma/p/Cnh84KtKhl4/",
//       picture: "/massinart/163110704_914373496048469_6893751915895547772_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2023-01-17T20:56:44.000Z",
//       caption: "Donnez un coup de frais à votre espace de travail en y intégrant de tableaux d'art pour une ambiance de travail positivePour chaque demande personnalisée, contactez-nous sur : massinart@gmail.com07 07 05 14 94#office #bureau #entreprise #ammeublement #artdeco #tableau #tableaudecoratif #societe #artmural #coworkingspace",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:14.181Z",
//       updatedAt: "2025-12-10T14:41:58.908Z"
//     },
//     {
//       id: "cmj0456dr00090l3mhp47gt4b",
//       viewsCount: 0,
//       likesCount: 369,
//       commentsCount: 36,
//       url: "https://www.instagram.com/massinart.ma/p/ChsiQ8EqZza/",
//       picture: "/massinart/164233082_2935753496711451_8231549723413694347_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2022-08-25T20:27:28.000Z",
//       caption: "Happy Clients, Happy Us ! Photos reçues de nos chers clients satisfaits à 100%Merci de nous avoir choisis ❤️@massinart.ma@massinart.ma#tableau #architectedinterieur #salonmarocain #decorationmaroc #interieurdesign #decoration #art #tableaux #design #art #instamaroc #maroc #rabat #fes #tanger #dakhla #agadir #marrakech #casablanca #المغرب",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:14.512Z",
//       updatedAt: "2025-12-10T14:41:59.232Z"
//     },
//     {
//       id: "cmj0456mm000a0l3me85qmysx",
//       viewsCount: 0,
//       likesCount: 0,
//       commentsCount: 4,
//       url: "https://www.instagram.com/massinart.ma/reel/Ce6i-FWKtYP/",
//       picture: "/massinart/174885747_813701786195615_7216069332923025101_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2022-06-17T17:35:05.000Z",
//       caption: "Regardez avant d'acheter !Désormais, @massinart.ma vous permet d'essayer +1000 tableaux en réalité augmentée. @massinart.ma @massinart.ma #Massinart#rabat#art#salonmarocain#décoration#maroc #casablanca#marrakech#tanger#agadir#صالون#صالون #مغربية #ديكورات #المغرب #اثاث #مغربي #فن",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:14.831Z",
//       updatedAt: "2025-12-10T14:41:59.558Z"
//     },
//     {
//       id: "cmj0456wj000b0l3mv4mxtr9g",
//       viewsCount: 0,
//       likesCount: 166,
//       commentsCount: 11,
//       url: "https://www.instagram.com/massinart.ma/p/Cdol7piqcqq/",
//       picture: "/massinart/175175018_1802736086574565_8294194785114657543_n.jpg",
//       location: "Casablanca الدار البيضاء",
//       postedDate: "2022-05-16T21:36:59.000Z",
//       caption: "#DÉCORATION AVANT ET APRÈS 👏Transformez votre décoration intérieure facilement !ما هو رأيكم في اللمسة الفنية للوحاتنا في الديكور؟..Le tableau, bijou de la maison ..@massinart.ma@massinart.ma...#maroc #tableaux #casablanca #instamaroc #massinart #tanger #meknes #agadir #marrakech #decor #rabat #fes #oujda #designintérieur #art #artmoderne#صالون #مغربية #ديكورات #منزلي #المغرب #اثاث #مغربي #لوحة #فن",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:15.187Z",
//       updatedAt: "2025-12-10T14:42:00.053Z"
//     },
//     {
//       id: "cmj04575n000c0l3m904zr0pm",
//       viewsCount: 0,
//       likesCount: 0,
//       commentsCount: 35,
//       url: "https://www.instagram.com/massinart.ma/reel/CcLzVHtqbog/",
//       picture: "/massinart/176786848_460305661746700_622098928093317882_n.jpg",
//       location: null,
//       postedDate: "2022-04-10T20:49:34.000Z",
//       caption: "Le tableau, Bijou de la maison ! اللوحة، جوهر الدار @massinart.ma ...#decoration #tableau #art #maroc #decorationinterieur #casablanca #marrakech #tanger #rabat #morocco🇲🇦 #المغرب #ديكور",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:15.515Z",
//       updatedAt: "2025-12-10T14:42:00.376Z"
//     },
//     {
//       id: "cmj0457g9000d0l3mtuctnvga",
//       viewsCount: 0,
//       likesCount: 0,
//       commentsCount: 198,
//       url: "https://www.instagram.com/massinart.ma/reel/CbNeLVXKh-V/",
//       picture: "/massinart/201351282_3049958388556759_4171216507597693472_n.jpg",
//       location: null,
//       postedDate: "2022-03-17T15:56:50.000Z",
//       caption: "Le tableau, Bijou de la maison.اللوحة جوهر الدار @massinart.ma ....#maroc #art #décoration #tableaux #casablanca #salonmarocain",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:15.897Z",
//       updatedAt: "2025-12-10T14:42:00.813Z"
//     },
//     {
//       id: "cmj0457ql000e0l3mob24vik2",
//       viewsCount: 0,
//       likesCount: 205,
//       commentsCount: 26,
//       url: "https://www.instagram.com/massinart.ma/p/Cap5Q_mqmDD/",
//       picture: "/massianrt/235784411_901307220497016_5778229906965051245_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2022-03-03T20:10:58.000Z",
//       caption: "Nos clients nous surprennent à chaque fois avec des photos qui montrent le rendu final ! 👌Que pensez vous du choix des couleurs ❓Commandez sur :www.massinart.ma#abstrait #art #architecture #artisanatmarocain #architectedinterieur #archi #interieurdesign #salonmarocain #salonmoderne #traditionnel #decomaison #tableaux #tableau #casablanca #rabat #artmoderne",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:16.269Z",
//       updatedAt: "2025-12-10T14:42:01.268Z"
//     },
//     {
//       id: "cmj04580f000f0l3m5omw8nsb",
//       viewsCount: 0,
//       likesCount: 101,
//       commentsCount: 2,
//       url: "https://www.instagram.com/massinart.ma/p/CZ4u47nqDC9/",
//       picture: "/massinart/242554827_256470663041829_692142427909223786_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2022-02-12T17:57:31.000Z",
//       caption: "Chaque salle de réunion portant un rappel d'une ville marocaine, c'est absolument une idée originale!@massinart.ma est intervenu pour ajouter une touche rafraîchissante à chaque espace pour le groupe @societegenerale ATSComme le bureau est un second lieu de vie, pourquoi ne pas le transférer à un environnement chaleureux et décontracté ?Pour chaque demande personnalisée, contactez-nous sur : massinart@gmail.com07 07 05 14 94#bureau #tableau #decorationbureau #amenagement #decoration #artmoderne #art #maroc #entreprise",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:16.623Z",
//       updatedAt: "2025-12-10T14:42:02.125Z"
//     },
//     {
//       id: "cmj0458f4000g0l3mxfkguozp",
//       viewsCount: 0,
//       likesCount: 0,
//       commentsCount: 4,
//       url: "https://www.instagram.com/massinart.ma/reel/CZhfT14ubsR/",
//       picture: "/massinart/271616226_267257558676290_6580051897749967944_n.jpg",
//       location: null,
//       postedDate: "2022-02-03T17:19:08.000Z",
//       caption: "Le tableau, Bijou de la maison ! اللوحة. جوهر الدارNouvelles créations chez @massinart.ma ®Soyez les premiers à les avoir !@massinart.ma@massinart.ma.....#maroc #tableaux #casablanca #instamaroc #massinart #tanger #meknes #agadir #marrakech #decor #rabat #fes #oujda #art #artmoderne #massinart #newyear #صالون #مغربية #ديكورات #منزلي #المغرب #اثاث #مغربي #لوحة #فن",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:17.152Z",
//       updatedAt: "2025-12-10T14:42:02.550Z"
//     },
//     {
//       id: "cmj0458qa000h0l3mqpydbwpd",
//       viewsCount: 0,
//       likesCount: 85,
//       commentsCount: 1,
//       url: "https://www.instagram.com/massinart.ma/p/CYpK4H2K8aA/",
//       picture: "/massinart/273833907_1853005521562056_7354083980177197073_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2022-01-12T20:22:50.000Z",
//       caption: "Assegwas Ameggaz 2972 🎉L'équipe #massinart vous transmet ses meilleurs voeux pour la nouvelle année 2972 Happy Yennayer !.....#asseggas_ameggaz #yennayer#yennayer2972 #2972 #Casablanca #agadir #nador #alhoceima #moderneart #interieurdesign #decorationmurale #kbaylia #amazigh #berber",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:17.554Z",
//       updatedAt: "2025-12-10T14:42:02.974Z"
//     },
//     {
//       id: "cmj04590s000i0l3m0iap4mtt",
//       viewsCount: 0,
//       likesCount: 737,
//       commentsCount: 38,
//       url: "https://www.instagram.com/massinart.ma/p/CUK5ETeqVeB/",
//       picture: "/massinart/275020494_121495286924472_6625934654837451704_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2021-09-23T16:04:25.000Z",
//       caption: "#DÉCORATION AVANT ET APRÈSQue pensez-vous de La touche apporté par nos tableaux décoratifs ?ما هو رأيكم في اللمسة الفنية للوحاتنا في الديكور؟@massinart.ma@massinart.ma...#maroc #tableaux #casablanca #instamaroc #massinart #tanger #meknes #agadir #marrakech #decor #rabat #fes #oujda #designintérieur #art #artmoderne#صالون #مغربية #ديكورات #منزلي #المغرب #اثاث #مغربي #لوحة #فن",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:17.932Z",
//       updatedAt: "2025-12-10T14:42:03.333Z"
//     },
//     {
//       id: "cmj04599t000j0l3mbmnziwwz",
//       viewsCount: 0,
//       likesCount: 548,
//       commentsCount: 75,
//       url: "https://www.instagram.com/massinart.ma/p/CSezsnJKNzh/",
//       picture: "/massinart/275950502_679084266464325_5405504300672906796_n.jpg",
//       location: null,
//       postedDate: "2021-08-12T16:39:31.000Z",
//       caption: "😍 مجموعة صور للّوحات الفنية بعد توصل الزبناء بها Photos réelles de nos tableaux livrés à nos clients partout dans le Maroc. 🎉@massinart.ma@massinart.ma..#maroc #fes #tanger #meknes #agadir #marrakech #darwadecor #decorationinterieur #designintérieur #morocco #casablanca #décorationmaroc #décoration #rabat #oujda #nador #tableaux #doré #art #instamaroc #salonmarocain #agadir #marocaine #مغربية #ديكور #المغرب #اثاث #صالون",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:18.257Z",
//       updatedAt: "2025-12-10T14:42:03.693Z"
//     },
//     {
//       id: "cmj0459kn000k0l3mknxw3vd8",
//       viewsCount: 0,
//       likesCount: 0,
//       commentsCount: 3,
//       url: "https://www.instagram.com/massinart.ma/reel/CQl8wtthuhv/",
//       picture: "/massinart/278257473_533120248174413_5171243576138254662_n.jpg",
//       location: null,
//       postedDate: "2021-06-26T18:11:09.000Z",
//       caption: "NOUVELLE COLLECTIONÉTÉ 2021Œuvres artistiques Made in Morocco.Qu'allez-vous choisir ? @massinart.ma@massinart.ma.......#maroc #tableaux #decoration #art #instamaroc #massinart #casablanca #marrakech #tableaux #riad #summer #été #2021 #lifestyle #luxe #salonmarocain #marocaine #المغرب #اثاث #صالون #مغربية",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:18.648Z",
//       updatedAt: "2025-12-10T14:42:04.164Z"
//     },
//     {
//       id: "cmj0459tx000l0l3mhdt7xruo",
//       viewsCount: 0,
//       likesCount: 74,
//       commentsCount: 6,
//       url: "https://www.instagram.com/massinart.ma/p/CQMElXXBn1U/",
//       picture: "/massinart/281712356_1058787735076559_1591863786797654739_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2021-06-16T16:58:43.000Z",
//       caption: "Envoyez-nous les photos de votre #intérieur et nous offrons du #conseil #gratuit en choix de #tableaux, couleurs et disposition. ❤️❤️❤️Cliquez ici et envoyez nous un message. @massinart.ma@massinart.ma#maroc #fes #tanger #meknes #agadir #marrakech #casablanca #ameublement #tableaux #decor #morocco #rabat #décoration #massinart",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:18.981Z",
//       updatedAt: "2025-12-10T14:42:04.507Z"
//     },
//     {
//       id: "cmj045a3t000m0l3mc4e2x6t4",
//       viewsCount: 0,
//       likesCount: 294,
//       commentsCount: 13,
//       url: "https://www.instagram.com/massinart.ma/reel/CPjCRx2BJjm/",
//       picture: "/massinart/289072254_1255518918524771_5435469611654265444_n.jpg",
//       location: null,
//       postedDate: "2021-05-31T18:30:01.000Z",
//       caption: "@massinart.ma#maroc#decoration#rabiiskalli",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:19.337Z",
//       updatedAt: "2025-12-10T14:42:04.926Z"
//     },
//     {
//       id: "cmj045aes000n0l3mjne8eocs",
//       viewsCount: 0,
//       likesCount: 149,
//       commentsCount: 21,
//       url: "https://www.instagram.com/massinart.ma/p/COG3qJghRS6/",
//       picture: "/massinart/301255078_1300574233812733_7064996373852705007_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2021-04-25T23:26:47.000Z",
//       caption: "Avant & Après (Swipe left⬅️) Un tableau peut devenir un point essentiel dans votre intérieur. Couleurs intenses sur murs, c'est une recette réussie pour un intérieur créatif. Commandez sur :www.massinart.ma#art #architecture #artisanatmarocain #architectedinterieur #mer #interieurdesign #salonmarocain #salonmoderne #traditionnel #decomaison #tableaux #tableau #casablanca #rabat #artmoderne",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:19.733Z",
//       updatedAt: "2025-12-10T14:42:05.282Z"
//     },
//     {
//       id: "cmj045anu000o0l3mcz91xxf0",
//       viewsCount: 0,
//       likesCount: 224,
//       commentsCount: 8,
//       url: "https://www.instagram.com/massinart.ma/p/CN24fSeBxvd/",
//       picture: "/massinart/325661969_830886068012069_3629094649346327945_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2021-04-19T18:26:11.000Z",
//       caption: "Avant & Après (Swipe left⬅️) Parmis nos objectifs c'est d'offrir les meilleurs conseils à nos clients pour choisir la bonne pièce d'art qui correspond à leurs espace Commandez sur :www.massinart.maNB : ce tableau est en dimension personnalisée de L150 x H100 cm. La grande taille disponible sur site c'est L120 x H80 cm#art #architecture #artisanatmarocain #architectedinterieur #archi #interieurdesign #salonmarocain #salonmoderne #traditionnel #decomaison #tableaux #tableau #casablanca #rabat #artmoderne",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:20.059Z",
//       updatedAt: "2025-12-10T14:42:05.628Z"
//     },
//     {
//       id: "cmj045azs000p0l3m1f279nmh",
//       viewsCount: 0,
//       likesCount: 332,
//       commentsCount: 47,
//       url: "https://www.instagram.com/massinart.ma/p/CN2zRaZBroK/",
//       picture: "/massinart/349043410_138277675921327_2277425053264836192_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2021-04-19T17:40:36.000Z",
//       caption: "✅ آراء الزبناء Avis Clients#ديكورات و تصاميم داخلية في غاية الروعة في صور وصلتنا من عند زبنائنا الكرام. شكرا على ثقتكم 🥰#Photos reçues de nos clients satisfaits à 100%. Merci pour votre confiance🥰@massinart.ma@massinart.ma#decoration #tableaux #design #art #instamaroc #maroc #rabat #fes #tanger #meknes #agadir #marrakech #casablanca #المغرب",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:20.489Z",
//       updatedAt: "2025-12-10T14:42:06.003Z"
//     },
//     {
//       id: "cmj045b9k000q0l3mngv0hxks",
//       viewsCount: 0,
//       likesCount: 335,
//       commentsCount: 14,
//       url: "https://www.instagram.com/massinart.ma/reel/CM-mOSNB2P9/",
//       picture: "/massinart/368559817_1358442528426242_1446705418111874576_n.jpg",
//       location: null,
//       postedDate: "2021-03-28T21:51:45.000Z",
//       caption: "كيف جاكم الديكور؟#maroc #décoration #morocco #beauty #décorationmaroc #marrakech #casablanca #instamaroc#صالون #مغربي #المغرب #اثاث #الدارالبيضاء #الديكور",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:20.841Z",
//       updatedAt: "2025-12-10T14:42:06.437Z"
//     },
//     {
//       id: "cmj045bin000r0l3m0f7e07rq",
//       viewsCount: 0,
//       likesCount: 251,
//       commentsCount: 20,
//       url: "https://www.instagram.com/massinart.ma/p/CM2uvfzBeYN/",
//       picture: "/massinart/418000684_758274452834235_8355134012781329223_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2021-03-25T20:29:38.000Z",
//       caption: "Mur de cadre boho design exclusivement chez @massinart.maتصميم حائط لوحات @massinart.maDans quelle chambre aimeriez vous faire un mur de cadre ?في اي غرفة تبغيو هاد حائط اللوحات؟ #bohostyle #maroc #bohemianstyle #décoration #designintérieur #decorationinterieure #rabat #tanger #marrakech #tableaux",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:21.168Z",
//       updatedAt: "2025-12-10T14:42:07.169Z"
//     },
//     {
//       id: "cmj045brp000s0l3m28mqfzfz",
//       viewsCount: 0,
//       likesCount: 127,
//       commentsCount: 7,
//       url: "https://www.instagram.com/massinart.ma/p/CMvKRFFBmDE/",
//       picture: "/massinart/420499106_879929837009432_8603143108007016780_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2021-03-22T21:56:13.000Z",
//       caption: "Un très bon choix de tableaux et de couleurs pour un appartement style traditionnel chicAménagement par l'architecte d'intérieur : @hindraouf_designcreations#collaborationwww.massinart.ma#art #architecture #artisanatmarocain #architectedinterieur #archi #interieurdesign #salonmarocain #salonmoderne #traditionnel #decomaison #tableaux #tableau #casablanca #rabat #temara #artmoderne",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:21.493Z",
//       updatedAt: "2025-12-10T14:42:07.640Z"
//     },
//     {
//       id: "cmj045c1b000t0l3maxjl9g2d",
//       viewsCount: 0,
//       likesCount: 64,
//       commentsCount: 6,
//       url: "https://www.instagram.com/massinart.ma/reel/CMsYPObBQuI/",
//       picture: "/massinart/455240892_534536952342245_5744003833059595640_n.jpg",
//       location: null,
//       postedDate: "2021-03-21T20:01:33.000Z",
//       caption: "Pursuit of daydreamsSet de tableaux sur toile encadréswww.massinart.ma#art #daydreams #tableau #décoration #salonmoderne #portrait #fashion #mindfulness #wings #inspiration #massinart #decorationinterieur #decomaison #tendance",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:21.839Z",
//       updatedAt: "2025-12-10T14:42:08.092Z"
//     },
//     {
//       id: "cmj045cb0000u0l3mx5atwfq5",
//       viewsCount: 0,
//       likesCount: 177,
//       commentsCount: 14,
//       url: "https://www.instagram.com/massinart.ma/reel/CMU3g1LBI-I/",
//       picture: "/massinart/491414354_1379320523110078_4383232083223684049_n.jpg",
//       location: null,
//       postedDate: "2021-03-12T16:52:16.000Z",
//       caption: "❤️",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:22.189Z",
//       updatedAt: "2025-12-10T14:42:08.578Z"
//     },
//     {
//       id: "cmj045cll000v0l3mbuwx5pla",
//       viewsCount: 0,
//       likesCount: 242,
//       commentsCount: 28,
//       url: "https://www.instagram.com/massinart.ma/p/CLpNcyeBej2/",
//       picture: "/massinart/491420756_1214022156792670_2884169272869220681_n.jpg",
//       location: null,
//       postedDate: "2021-02-23T17:57:12.000Z",
//       caption: "⭐⭐⭐⭐⭐ #Satisfaction 100 %Photos envoyées par les clients et on voit de très belles décorations et design d'intérieur complété par nos tableaux artistiques. Merci beaucoup pour votre confiance, nous sommes ravis de rendre votre intérieur plus convivial 🥰صور وصلتنا من عند زبنائنا الكرام وكنشوفو ديكورات و تصميمات داخلية في غاية الروعة، شكرا على تقثكم 🥰Commandez maintenant sur: @massinart.ma.....#maroc#decoration #marrakech #tanger #fes #decorationinterieur #designintérieur #morocco #instamaroc #casablanca #rabat #moderne #artmoderne #artistes",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:22.570Z",
//       updatedAt: "2025-12-10T14:42:09.014Z"
//     },
//     {
//       id: "cmj045cw3000w0l3my9kwhalb",
//       viewsCount: 0,
//       likesCount: 235,
//       commentsCount: 5,
//       url: "https://www.instagram.com/massinart.ma/reel/CKZIr3vh5pz/",
//       picture: "/massinart/491432465_2656888931173605_1303643778399308262_n.jpg",
//       location: null,
//       postedDate: "2021-01-23T15:36:38.000Z",
//       caption: "Merci @fatimazahraqanboua_ d'avoir choisi @massinart.ma ❤️",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:22.947Z",
//       updatedAt: "2025-12-10T14:42:09.660Z"
//     },
//     {
//       id: "cmj045d6c000x0l3mdnx3schb",
//       viewsCount: 0,
//       likesCount: 133,
//       commentsCount: 7,
//       url: "https://www.instagram.com/massinart.ma/p/CJ7BqHWBdgT/",
//       picture: "/massinart/495722788_976095874345407_7756316832290432771_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2021-01-11T22:57:42.000Z",
//       caption: "Assegas Ameggaz 2971 L'équipe #massinart vous transmet ses meilleurs voeux, de bonheur et de succès pour cet nouvel an amazigh 2971#asseggas_ameggaz #yennayer#yennayer2971 #2971 #Casablanca #agadir #nador #alhoceima #decorationmurale",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:23.316Z",
//       updatedAt: "2025-12-10T14:42:09.976Z"
//     },
//     {
//       id: "cmj045dg3000y0l3m1rrufuql",
//       viewsCount: 0,
//       likesCount: 0,
//       commentsCount: 9,
//       url: "https://www.instagram.com/massinart.ma/reel/CJtYYQUhGui/",
//       picture: "/massinart/496926111_1422903495391154_3966808635695215703_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2021-01-06T16:16:09.000Z",
//       caption: "Avez-vous des photos de vos meilleures moments ?Faites-en une jolie décoration.4 tableaux de vos #photos à 299 dh. Livraison à domicile #GRATUITE partout au #Maroc !Importez les photos de votre téléphone et commandez maintenant:@massinart.ma.............#travel #family #décoration #casablanca #souvenir #beauty #instamaroc #massinart #miniz #photography #mariage",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:23.667Z",
//       updatedAt: "2025-12-10T14:42:10.359Z"
//     },
//     {
//       id: "cmj045dtd000z0l3m0fgzw6zo",
//       viewsCount: 0,
//       likesCount: 668,
//       commentsCount: 63,
//       url: "https://www.instagram.com/massinart.ma/p/CH5NJUPB6ZK/",
//       picture: "/massinart/496958535_704515535326978_5268434188457367436_n.jpg",
//       location: "Casablanca, Morocco",
//       postedDate: "2020-11-22T12:56:48.000Z",
//       caption: "Nos clients ont du style 😍❤️❤️Très belles photos de #salon marocains envoyées par nos clients qui ont bien su choisir les couleurs et les designs de nos #tableaux qui s'alignent parfaitement avec leurs décoration intérieure.Merci beaucoup d'avoir fait confiance à @massinart.maQu'est-ce que vous pensez de ces décorations ? زبنائنا عندهم الستايل 😍صور جميلة لصالونات #مغربية توصلنا بها من عند الزبناء لي عرفو يختارو الالوان و التصميم ديال اللوحات لي كاتجي مع #الديكور الداخليشكرا لثقتكم ب @massinart.ma كيجاوكم هاد الديكورات؟ ...............#décoration #maroc #designintérieur #salonmarocain #marocaine #decor #design #casablanca #المغرب #اثاث #صالون #مغربي #الدارالبيضاء #tanger #meknes #agadir #marrakech #beauty",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:24.146Z",
//       updatedAt: "2025-12-10T14:42:10.692Z"
//     },
//     {
//       id: "cmj045e2d00100l3m465e44cp",
//       viewsCount: 0,
//       likesCount: 141,
//       commentsCount: 18,
//       url: "https://www.instagram.com/massinart.ma/p/CHlJqnPhai_/",
//       picture: "/massinart/527575859_1406512883975169_2743715454034500226_n.jpg",
//       location: "Marrakech",
//       postedDate: "2020-11-14T18:01:35.000Z",
//       caption: "Réalisation d'un mur de #cadres pour un hôtel à #marrakech en collaboration avec @atlashospitality@massinart.ma le pro de la #décoration en #tableaux au #maroc........#marocain #décorationmaroc #casablanca #hotel #riad #visitmorocco #beauty #maisondumonde #marocaine #decor #design #massinart",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:24.469Z",
//       updatedAt: "2025-12-10T14:42:11.236Z"
//     },
//     {
//       id: "cmj045ebc00110l3m2axdstuy",
//       viewsCount: 0,
//       likesCount: 180,
//       commentsCount: 21,
//       url: "https://www.instagram.com/massinart.ma/p/CHdVoyFBbtp/",
//       picture: "/massinart/530563596_1261656579078652_1092839393614727362_n.jpg",
//       location: "Grand Casablanca",
//       postedDate: "2020-11-11T17:12:16.000Z",
//       caption: "Nos #tableaux soigneusement crées par nos #artistes #designers font l'objet de #décoration de l' #appartement témoin de la résidence haut standing Anoual Plazza à #casablancaCe tableau dans le #salonmarocain moderne a donné un éclat extraordinaire au design global de l'appartement.@massinart.ma les pros de la décoration en tableaux depuis 2016Découvrez notre catalogue de plus de 500 modèles de tableaux sur @massinart.ma#maroc #fes #tanger #meknes #agadir #marrakech #marocaine #decor #design #salon #décorationmaroc",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:24.792Z",
//       updatedAt: "2025-12-10T14:42:11.541Z"
//     },
//     {
//       id: "cmj045elj00120l3msxpuncr3",
//       viewsCount: 0,
//       likesCount: 125,
//       commentsCount: 20,
//       url: "https://www.instagram.com/massinart.ma/reel/CGe95Xxh95D/",
//       picture: "/massinart/532880314_1820495578901430_8658396933510990986_n.jpg",
//       location: null,
//       postedDate: "2020-10-18T11:52:48.000Z",
//       caption: "#Tableau tbourida, signe de la culture marocaine. Découvrez plus de tableau sur @massinart.ma#maroc#decoration",
//       type: "Post",
//       networkId: "cmj0452qp00020l3mfzs6gi18",
//       createdAt: "2025-12-10T14:37:25.159Z",
//       updatedAt: "2025-12-10T14:42:11.908Z"
//     }
//   ],
//   pagination: { total: 36, page: 1, pageSize: 9, totalPages: 4 }
// };

const PostsGrid = () => {
  const [source, setSource] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [postsData, setPostsData] = useState<DataType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await v1Api.get('/posts');
        setPostsData(response.data);
        
      } catch (error) {
        console.error("Failed to fetch posts data:", error);
      }
    }
    fetchData();
  }, []);

  // Prepare export data for posts
  const exportHeaders = ["ID", "Légende", "URL", "Date", "Type", "Likes", "Commentaires", "Vues"];
  const exportRows = (postsData?.posts ?? []).map((post) => [
    post.id,
    post.caption,
    post.url,
    post.postedDate,
    post.type,
    post.likesCount,
    post.commentsCount,
    post.viewsCount,
  ]);

  // Map posts data to table rows for PostsTable
  const postsTableRows: PostRow[] = (postsData?.posts ?? []).map((post, idx) => {
    return {
      id: post.id,
      caption: post.caption,
      network: influencer?.network,
      likes: [12500, 45600, 8900, 3400][idx] || post.likesCount,
      comments: [234, 1800, 567, 156][idx] || post.commentsCount,
      shares: [null, 15300, null, 892][idx] || "-",
      views: [250300, 1200000, 150000, 89700][idx] || post.viewsCount,
      engagementRate: 9.9,
      date:
        ["15 Oct 25", "10 Oct 25", "5 Oct 25", "20 Oct 25"][idx] ||
        post.postedDate,
    };
  });

  return (
    <div>

      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Publication
          <div className="flex flex-row gap-1 mt-2  mb-4">
            <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
            <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>
      <div className="">

        <div className="flex justify-between items-center pt-4 pb-4">
          {/* Left side: Export button */}
          <div className="flex items-center">
            <ExportButton
              data={{
                headers: exportHeaders,
                rows: exportRows,
                filename: "publications"
              }}
            />

            {/* View mode segmented control (grid / list) */}
            <div
              className="ml-2 flex items-center rounded-md shadow-sm overflow-hidden"
              role="tablist"
              aria-label="View switch"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-r-none ${viewMode === "grid"
                  ? "bg-main text-white border-main"
                  : "text-gray-600"
                  }`}
              >
                <LayoutGrid
                  className={`h-4 w-4 ${viewMode === "grid" ? "text-white" : "text-gray-600"
                    }`}
                />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-l-none ${viewMode === "list"
                  ? "bg-main text-white border-main"
                  : "text-gray-600"
                  }`}
              >
                <List
                  className={`h-4 w-4 ${viewMode === "list" ? "text-white" : "text-gray-600"
                    }`}
                />
              </Button>
            </div>
          </div>

          {/* Right side: controls group */}
          <div className="flex items-center gap-2">
            <Suspense fallback={<div />}>
              <OrderByFilter />
            </Suspense>

            <Select value={source} onValueChange={(v) => setSource(v)}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Par source" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Par source</SelectLabel>
                  {media.map((item) => (
                    <SelectItem key={item.label} value={item.label}>
                      {item.image ? (
                        item.label === "X Platform" ? (
                          <Image
                            src={item.image}
                            alt={item.label}
                            width={20}
                            height={20}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const svg = document.createElementNS(
                                  "http://www.w3.org/2000/svg",
                                  "svg"
                                );
                                svg.setAttribute("width", "20");
                                svg.setAttribute("height", "20");
                                svg.setAttribute("viewBox", "0 0 24 24");
                                svg.innerHTML =
                                  '<path fill="black" d="M17.53 3H21L14.19 10.63L22.09 21H15.63L10.77 14.62L5.29 21H2L9.13 13L1.61 3H8.24L12.68 8.87L17.53 3ZM16.41 19H18.23L7.75 5H5.81L16.41 19Z"/>';
                                parent.insertBefore(svg, parent.firstChild);
                              }
                            }}
                          />
                        ) : (
                          <Image
                            src={item.image}
                            alt={item.label}
                            width={20}
                            height={20}
                          />
                        )
                      ) : (
                        <BookmarkIcon className="h-4 w-4 text-gray-500 mr-2" />
                      )}
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* <p className="text-xs">
              The audience data is based on {source ?? "All Social Medias"}
            </p> */}
          </div>
        </div>

        {viewMode === "list" ? (
          <PostsTable posts={postsTableRows} />
        ) : (
          <div className={`grid grid-cols-4 gap-3`}>
            {(postsData?.posts ?? []).length > 0 &&
              (postsData!.posts as Post[]).map((post) => (
                <PostCard key={post.id} post={post} influencer={influencer} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsGrid;
