"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import FollowersDisptach from "./FollowersDisptach";
// import FollowersDisptach from "./FollowersDisptach";
// import { Account } from "@prisma/client";
// import { AxiosResponse } from "axios";
// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/api";
// import Error from "../layout/Error";
// import Loading from "../layout/Loading";

const data = {
  profil: "/glovo-logo.jpg",
  name: "Glovo Maroc",
  slug: "Glovo Maroc : Votre partenaire local de livraison pour tout",
  country: "Maroc",
  bio: `Glovo Maroc est un service de livraison qui connecte les clients aux commerces locaux, offrant une large gamme de produits allant de la nourriture aux courses. Leur présence sur les réseaux sociaux met en avant les partenariats avec les commerçants locaux, présentant des histoires de réussite et l'engagement communautaire. Les thèmes du contenu incluent les promotions du Ramadan, le support client et la mise en avant de la commodité du service. La marque engage activement son audience à travers des jeux concours et des publications interactives, favorisant un esprit de communauté et de soutien aux entreprises locales.`,
};
const Profil = () => {
  return (
    <Card>
      <CardContent>
        <div className="rounded-md p-5">
          <div className="grid grid-cols-5 justify-between">
            <div className="flex flex-col gap-5  col-span-3">
              <div className="flex items-center gap-5">
                <Image
                  src={data.profil}
                  className="rounded-full"
                  alt={data.name}
                  width={150}
                  height={150}
                />
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-xl">{data.name}</p>
                  <p className="text-sm">{data.slug}</p>
                  <div className="flex items-center gap-2">
                    <Image
                      src={"https://flagcdn.com/ma.svg"}
                      width={25}
                      height={25}
                      className="rounded-br-md rounded-tl-md"
                      alt="Morocco"
                    />
                    {data.country}
                  </div>
                </div>
              </div>
              <hr className="border-t border-gray-300/70" />
              <div>
                <p className="font-semibold mb-2">Aperçu du profil</p>
                <p className="text-sm"> {data.bio}</p>
              </div>
            </div>

            <div className="col-span-2 flex justify-end">
              <FollowersDisptach />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profil;
