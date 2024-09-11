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
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select";

import Image from "next/image";

interface ClothesCardProps {
  details: {
    id: number;
    name: string;
    price: number;
    highlight: boolean;
    photo: string;
    clothingBrandId: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function ClothesCard({
  details: { name, photo, price, highlight, id }
}: ClothesCardProps) {
  return (
    <Card
      className={`w-[350px] ${
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
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Link href={`/${id}`}>
          <Button>Ver Detalhes</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
