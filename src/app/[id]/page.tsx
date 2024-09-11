"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import Image from "next/image";

import { ClothesInterface } from "../../../global";

export default function Id({ params }) {
  const [clothes, setClothes] = useState<ClothesInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const clothId = params?.id;

    if (clothId) {
      const loadSingleClothFromApi = async () => {
        // const responseFromApi = await fetch(`/${clothId}`);
        // const parsedResponse = await responseFromApi.json();

        const mockedResponse = {
          id: 1,
          name: "Camiseta 1",
          price: 69,
          highlight: false,
          photo:
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          clothingBrandId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        setClothes(mockedResponse);

        setIsLoading(false);
      };

      loadSingleClothFromApi();
    }

    console.log("clothId");
    console.log(clothId);
  }, [params?.id]);

  if (isLoading) {
    return <div>Carregando</div>;
  }

  return (
    <div>
      <title>Roupa Roupousa</title>

      <div className='max-w-[1180px] w-full mx-auto flex gap-10 flex-col py-10 px-10'>
        {clothes && (
          <div>
            <h1 className='text-2xl'>{clothes.name}</h1>

            <Card
              className={`w-[350px] ${
                clothes.highlight && "bg-yellow-300"
              } flex flex-col gap-2`}
            >
              <CardHeader className='flex flex-col gap-2'>
                <CardTitle>{clothes.name}</CardTitle>

                <CardDescription>
                  <Image
                    width={100}
                    height={100}
                    alt={clothes.name}
                    src={clothes.photo}
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>R$ {clothes.price}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
