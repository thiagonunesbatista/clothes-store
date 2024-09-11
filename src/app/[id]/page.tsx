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
        const url = `http://localhost:3004/clothes/${params.id}`;

        try {
          const responseFromApi = await fetch(url);
          const parsedResponse = await responseFromApi.json();

          setClothes(parsedResponse);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      loadSingleClothFromApi();
    }
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
              <CardContent className='flex flex-col gap-5'>
                <p>Descrição: {clothes.description}</p>
                <p>R$ {clothes.price}</p>
                <p>Marca: {clothes.clothingBrand.name}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
