import React, { useState } from "react";
import FeedCard from "./FeedCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";

const mentions = [
  {
    id: "1",
    title: "Glovo expands in Morocco",
    link: "https://example.com/thumb1.jpg ",
    postedDate: "2025-11-01",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo is expanding its delivery services to more cities in Morocco, aiming to cover both major urban centers and smaller towns. This expansion includes increasing the number of delivery partners, introducing faster delivery times, and offering more variety in the types of goods available for delivery. The company is also investing in local marketing campaigns to raise awareness and attract new users to its platform.",
    source: "facebook",
    type: "POSITIVE",
  },
  {
    id: "2",
    title: "Fast Delivery Trends 2025",
    link: "https://example.com/fast-delivery-trends",
    postedDate: "2025-10-28",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "The fast delivery market in North Africa is experiencing significant growth in 2025, with trends showing an increase in demand for same-day delivery, more sustainable packaging solutions, and innovative technology integration. Companies like Glovo and other regional players are adapting by expanding their networks, improving logistics efficiency, and offering a wider range of products, from groceries to electronics. Consumers are increasingly relying on app-based delivery services for convenience and speed.",
    source: "facebook",
    type: "POSITIVE",
  },
  {
    id: "3",
    title: "Glovo partners with local restaurants",
    link: "https://example.com/glovo-partners",
    postedDate: "2025-10-30",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Glovo has partnered with over 50 local restaurants in Casablanca to expand its offerings and provide more diverse meal options to customers. However, some restaurant owners have raised concerns about commission fees and delivery logistics. While Glovo aims to strengthen its presence in the Moroccan market, balancing profitability for the restaurants and customer satisfaction remains a key challenge. The partnership is expected to increase overall app usage and drive more orders, but the company will need to address these concerns carefully.",
    source: "instagram",
    type: "NEGATIVE",
  },
  {
    id: "4",
    title: "Rabat sees growth in app-based deliveries",
    link: "https://example.com/rabat-growth",
    postedDate: "2025-10-25",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Rabat has seen a remarkable growth in app-based delivery services this year, with a 35% increase in demand compared to the previous year. The surge is driven by changing consumer behavior, urbanization, and the increasing availability of smartphones. Businesses across the city are integrating delivery apps to meet customer expectations, and logistics companies are upgrading their infrastructure to handle higher order volumes. Experts predict that this trend will continue as more residents embrace digital solutions for everyday needs, from food delivery to groceries and retail products.",
    source: "instagram",
    type: "Article",
  },
  {
    id: "5",
    title: "Glovo job opportunities in Morocco",
    link: "https://example.com/glovo-jobs",
    postedDate: "2025-10-20",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo is actively hiring delivery partners, customer support staff, and other roles across Morocco as part of its expansion strategy. The company offers competitive benefits, flexible working hours, and opportunities for career growth. While some potential employees have expressed concerns about workload and job stability, Glovo continues to focus on creating an efficient recruitment process and training programs. The goal is to support the increasing demand for delivery services while maintaining high-quality service and customer satisfaction.",
    source: "tiktok",
    type: "NEGATIVE",
  },
  {
    id: "6",
    title: "Customer reviews highlight Glovo's reliability",
    link: "https://example.com/glovo-reviews",
    postedDate: "2025-11-12",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Recent customer reviews on social media platforms are overwhelmingly positive about Glovo's delivery service in Morocco. Users praise the app's user-friendly interface, accurate delivery times, and the quality of service provided by delivery partners. Many customers mention how Glovo has made their daily lives easier by providing quick access to essential goods and meals.",
    source: "twitter",
    type: "POSITIVE",
  },
  {
    id: "7",
    title: "Glovo introduces eco-friendly packaging",
    link: "https://example.com/glovo-eco",
    postedDate: "2025-11-10",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Glovo has announced a new initiative to reduce environmental impact by introducing biodegradable packaging options across all Moroccan cities. The company is partnering with local suppliers to source sustainable materials and aims to achieve 50% eco-friendly packaging usage by the end of 2025. This move is part of Glovo's broader sustainability goals.",
    source: "linkedin",
    type: "POSITIVE",
  },
  {
    id: "8",
    title: "Delivery delays frustrate customers",
    link: "https://example.com/delivery-delays",
    postedDate: "2025-11-08",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Several customers have reported experiencing significant delays in their Glovo deliveries during peak hours. While the company attributes this to high demand and traffic conditions, users are expressing frustration over the lack of real-time updates and compensation for late deliveries. Some customers are considering switching to competing services.",
    source: "facebook",
    type: "NEGATIVE",
  },
  {
    id: "9",
    title: "Glovo's impact on local businesses",
    link: "https://example.com/local-business-impact",
    postedDate: "2025-11-05",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "A recent study shows that Glovo's presence in Morocco has significantly boosted local businesses, particularly small restaurants and shops. The platform has helped increase visibility and sales for many establishments that previously struggled to reach customers beyond their immediate neighborhoods. However, some traditional businesses still view delivery apps as disruptive to their established customer relationships.",
    source: "instagram",
    type: "Article",
  },
  {
    id: "10",
    title: "New Glovo features announced",
    link: "https://example.com/new-features",
    postedDate: "2025-11-03",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Glovo has rolled out several new features including group ordering, scheduled deliveries, and enhanced tracking capabilities. The group ordering feature allows multiple people to contribute to a single order, making it perfect for office lunches or family gatherings. Users are excited about these improvements that promise to make the delivery experience even more convenient.",
    source: "tiktok",
    type: "POSITIVE",
  },
  {
    id: "11",
    title: "Glovo responds to customer feedback",
    link: "https://example.com/customer-feedback",
    postedDate: "2025-10-29",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Following customer complaints about delivery fees, Glovo has announced a revised pricing structure that offers more transparency and potentially lower costs for frequent users. The company has also improved its customer support response times and introduced a feedback system to continuously improve service quality.",
    source: "twitter",
    type: "POSITIVE",
  },
  {
    id: "13",
    title: "Glovo launches Ramadan delivery campaign",
    link: "https://example.com/ramadan-campaign",
    postedDate: "2025-11-15",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo has launched a special Ramadan delivery campaign in Morocco, offering free delivery for orders over 200 MAD and priority service for traditional Ramadan meals. The campaign includes partnerships with popular Moroccan restaurants serving iftar and suhoor meals, with dedicated Ramadan-themed packaging and faster delivery windows.",
    source: "facebook",
    type: "POSITIVE",
  },
  {
    id: "14",
    title: "Delivery riders protest working conditions",
    link: "https://example.com/riders-protest",
    postedDate: "2025-11-13",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "A group of Glovo delivery riders in Casablanca organized a protest today, demanding better pay, safer working conditions, and clearer employment contracts. The riders claim that current commission rates leave them with insufficient earnings, especially during off-peak hours. Glovo representatives have agreed to meet with rider representatives to discuss their concerns.",
    source: "instagram",
    type: "NEGATIVE",
  },
  {
    id: "15",
    title: "Glovo partners with Moroccan supermarkets",
    link: "https://example.com/supermarket-partnership",
    postedDate: "2025-11-11",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Glovo has expanded its grocery delivery service by partnering with major Moroccan supermarket chains including Marjane, Carrefour, and local cooperatives. This partnership allows customers to order full grocery baskets for same-day delivery, with special focus on fresh produce and traditional Moroccan ingredients.",
    source: "linkedin",
    type: "POSITIVE",
  },
  {
    id: "16",
    title: "Customer data breach concerns raised",
    link: "https://example.com/data-breach",
    postedDate: "2025-11-09",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Privacy advocates have raised concerns about a potential data breach affecting Glovo users in Morocco. While the company has not confirmed the incident, users are reporting unusual account activity and receiving verification emails. Glovo has advised users to change their passwords and enable two-factor authentication as a precaution.",
    source: "twitter",
    type: "NEGATIVE",
  },
  {
    id: "17",
    title: "Glovo introduces AI-powered recommendations",
    link: "https://example.com/ai-recommendations",
    postedDate: "2025-11-07",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Glovo has integrated artificial intelligence to provide personalized restaurant and product recommendations based on user preferences, order history, and local trends. The AI system analyzes customer behavior to suggest meals, suggest complementary items, and even predict optimal ordering times to avoid peak hour delays.",
    source: "tiktok",
    type: "POSITIVE",
  },
  {
    id: "18",
    title: "Traditional markets vs. delivery apps",
    link: "https://example.com/traditional-vs-delivery",
    postedDate: "2025-11-04",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "A recent economic analysis compares the impact of delivery apps like Glovo on traditional Moroccan markets. While delivery services have increased convenience and access to goods, some traditional merchants report declining foot traffic. However, many markets are adapting by offering their own delivery services and partnering with apps.",
    source: "instagram",
    type: "Article",
  },
  {
    id: "19",
    title: "Glovo expands to rural areas",
    link: "https://example.com/rural-expansion",
    postedDate: "2025-11-02",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo is piloting delivery services in rural Moroccan communities, starting with villages near major cities. The initiative aims to bridge the urban-rural divide by providing access to essential goods, medications, and services. Local entrepreneurs are being trained as delivery partners to create employment opportunities in these areas.",
    source: "facebook",
    type: "POSITIVE",
  },
  {
    id: "20",
    title: "App performance issues during peak hours",
    link: "https://example.com/app-performance",
    postedDate: "2025-10-31",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Users are reporting frequent app crashes and slow loading times during peak ordering hours on the Glovo platform. The issues seem to coincide with high demand periods, particularly around lunch and dinner times. Glovo technical teams are working to optimize server capacity and improve app stability.",
    source: "twitter",
    type: "NEGATIVE",
  },
  {
    id: "21",
    title: "Glovo's role in food waste reduction",
    link: "https://example.com/food-waste-reduction",
    postedDate: "2025-10-29",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "A new initiative by Glovo aims to reduce food waste by connecting restaurants with surplus food to customers at discounted prices. The 'Glovo Surplus' feature allows restaurants to offer unsold meals at the end of the day, helping to minimize waste while providing affordable options for budget-conscious customers.",
    source: "linkedin",
    type: "POSITIVE",
  },
  {
    id: "22",
    title: "Delivery service comparison: Glovo vs competitors",
    link: "https://example.com/service-comparison",
    postedDate: "2025-10-26",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "A comprehensive review compares Glovo with other delivery services operating in Morocco. While Glovo leads in restaurant variety and user interface, some competitors offer lower delivery fees and faster service in certain areas. The competition is driving innovation and better service quality across all platforms.",
    source: "instagram",
    type: "Article",
  },
  {
    id: "23",
    title: "Glovo introduces contactless delivery",
    link: "https://example.com/contactless-delivery",
    postedDate: "2025-10-24",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Following health and safety guidelines, Glovo has fully implemented contactless delivery across all Moroccan cities. Delivery partners now leave orders at the customer's doorstep and send digital notifications upon arrival. Customers can also request deliveries to be left with building security or neighbors.",
    source: "facebook",
    type: "POSITIVE",
  },
  {
    id: "24",
    title: "Rising fuel costs impact delivery prices",
    link: "https://example.com/fuel-costs",
    postedDate: "2025-10-22",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Due to increasing fuel prices, Glovo has announced a temporary adjustment to delivery fees in Morocco. The company states that this is necessary to maintain service quality and fair compensation for delivery partners. While some customers understand the necessity, others are concerned about the impact on food affordability.",
    source: "twitter",
    type: "NEGATIVE",
  },
  {
    id: "25",
    title: "Glovo's role in food waste reduction",
    link: "https://example.com/food-waste-reduction",
    postedDate: "2025-10-29",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "A new initiative by Glovo aims to reduce food waste by connecting restaurants with surplus food to customers at discounted prices. The 'Glovo Surplus' feature allows restaurants to offer unsold meals at the end of the day, helping to minimize waste while providing affordable options for budget-conscious customers.",
    source: "linkedin",
    type: "POSITIVE",
  },
  {
    id: "26",
    title: "Delivery service comparison: Glovo vs competitors",
    link: "https://example.com/service-comparison",
    postedDate: "2025-10-26",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "A comprehensive review compares Glovo with other delivery services operating in Morocco. While Glovo leads in restaurant variety and user interface, some competitors offer lower delivery fees and faster service in certain areas. The competition is driving innovation and better service quality across all platforms.",
    source: "instagram",
    type: "Article",
  },
];
const Mentions = () => {
  const [currentMentions, setCurrentMentions] = useState(mentions);
  // Modal / form state
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [source, setSource] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [thumbnail, setThumbnail] = useState("");

  const handleDelete = (id: string) => {
    setCurrentMentions((prev) => prev.filter((mention) => mention.id !== id));
  };

  const handleUpdateSentiment = (id: string, newType: string) => {
    setCurrentMentions((prev) =>
      prev.map((mention) =>
        mention.id === id ? { ...mention, type: newType } : mention
      )
    );
  };

  const handleAddMention = () => {
    if (!title) return; // minimal validation

    const newMention = {
      id: Date.now().toString(),
      title: title,
      link: link || "#",
      postedDate: date,
      thumbnail: thumbnail || "/mentions/glovo.webp",
      snippet: snippet,
      source: source || "facebook",
      type: sentiment || "NEUTRAL",
    };

    setCurrentMentions((prev) => [newMention, ...prev]);

    // reset form
    setLink("");
    setTitle("");
    setSnippet("");
    setSource("");
    setSentiment("");
    setDate(new Date().toISOString().slice(0, 10));
    setThumbnail("");

    // dialog will be closed by DialogClose wrapping the button
  };
  
  return (
    <Card className="flex flex-col relative">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Mentions Feed</CardTitle>
            <ToolTipsProvider title="Recent mentions feed displaying the latest social media conversations and insights." />
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Plus className="size-4" />
                  Ajouter une mention
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-none p-8">
                <DialogHeader>
                  <DialogTitle className="text-center">Ajouter une mention</DialogTitle>
                  {/* <DialogDescription>
                    Remplissez les champs pour ajouter manuellement une mention.
                  </DialogDescription> */}
                </DialogHeader>

                <div className="grid gap-3">
                  <Label>Link</Label>
                  <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />

                  <Label>Titre de la mention</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre de la mention" />

                  <Label>Snippet</Label>
                  <textarea
                    value={snippet}
                    onChange={(e) => setSnippet(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="Snippet"
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Source</Label>
                      <Select onValueChange={(v) => setSource(v)} defaultValue={source}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Source</SelectLabel>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="tiktok">Tiktok</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Sentiment</Label>
                      <Select onValueChange={(v) => setSentiment(v)} defaultValue={sentiment}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sentiment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sentiment</SelectLabel>
                            <SelectItem value="POSITIVE">Positive</SelectItem>
                            <SelectItem value="NEGATIVE">Negative</SelectItem>
                            <SelectItem value="NEUTRAL">Neutral</SelectItem>
                            <SelectItem value="Article">Article</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Date</Label>
                      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                  </div>

                  <Label>Miniature (URL)</Label>
                  <Input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="Image URL" />

                  <div className="flex items-center gap-2">
                    <input id="notify" type="checkbox" className="w-4 h-4" />
                    <Label htmlFor="notify">Send the notification by email & Whatsapp</Label>
                  </div>
                </div>

                <DialogFooter>
                  {/* Use a button that closes dialog after adding */}
                  <DialogClose asChild>
                    <Button
                      onClick={() => handleAddMention()}
                      className="bg-main text-white w-full"
                    >
                      Ajouter
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-none h-[2600px] overflow-y-auto">
        <div className="flex flex-col gap-2.5">
          {currentMentions.map((mention) => (
            <FeedCard key={mention.id} feed={mention} onDelete={handleDelete} onUpdateSentiment={handleUpdateSentiment} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Mentions;
