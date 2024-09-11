import * as React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import Image from "next/image";

interface ClothesCardProps {
  details: {
    id: number;
    name: string;
    price: number;
    description: string;
    highlight: boolean;
    photo: string;
    clothingBrand: {
      id: number;
      name: string;
    };
    clothingBrandId: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function ClothesCard({
  details: { name, photo, price, highlight, id, clothingBrand }
}: ClothesCardProps) {
  return (
    <Card
      className={`w-full max-w-[300px] ${
        highlight && "bg-yellow-300"
      } flex flex-col gap-2`}
    >
      <CardHeader className='flex flex-col gap-2'>
        <CardTitle>{name}</CardTitle>

        <CardDescription>
          <Image width={100} height={100} alt={name} src={photo} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>R$ {price}</p>
        <p>Marca: {clothingBrand.name}</p>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Link href={`/${id}`}>
          <Button>Ver Detalhes</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
