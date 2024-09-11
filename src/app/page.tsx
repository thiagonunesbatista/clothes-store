"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import { ClothesInterface } from "../../global";

import ClothesCard from "@/components/ClothesCard";

import { Button } from "@/components/ui/button";

export default function Home() {
  const [clothes, setClothes] = useState<ClothesInterface[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clothesName, setClothesName] = useState("");

  const loadClothesFromApi = async () => {
    // const responseFromApi = await fetch(`/`);
    // const parsedResponse = await responseFromApi.json();

    const mockedResponse = [
      {
        id: 1,
        name: "Camiseta 1",
        price: 69,
        highlight: false,
        photo:
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        clothingBrandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Camiseta 2",
        price: 59,
        highlight: false,
        photo:
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        clothingBrandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Camiseta 3",
        price: 39,
        highlight: false,
        photo:
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        clothingBrandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    setClothes(mockedResponse);

    setIsLoading(false);
  };

  useEffect(() => {
    loadClothesFromApi();
  }, []);

  if (isLoading) {
    return <div>Carregando</div>;
  }

  const handleClothesNameChange = event => {
    setClothesName(event.target.value);
  };

  const handleClearName = async () => {
    setClothesName("");
    await loadClothesFromApi();
  };

  const handleSearchByName = async () => {
    try {
      setIsLoading(true);

      // const responseFromApi = await fetch(`/`);
      // const parsedResponse = await responseFromApi.json();

      const mockedResponse = [
        {
          id: 1,
          name: "Camiseta 1",
          price: 69,
          highlight: false,
          photo:
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          clothingBrandId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      setClothes(mockedResponse);
    } catch (error) {
      alert("Erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <title>Roupa Roupousa - Inicio</title>

      <div className='max-w-[1180px] w-full mx-auto flex gap-10 flex-col py-10 px-10'>
        <h1 className='text-2xl'>Catálogo de Roupas</h1>

        <div className='flex gap-2'>
          <Input
            type='text'
            placeholder='Pesquise por nome da roupa'
            value={clothesName}
            onChange={handleClothesNameChange}
          />
          <Button onClick={handleSearchByName}>Pesquisar</Button>
          <Button onClick={handleClearName}>Limpar</Button>
        </div>

        <div className='flex gap-6 flex-wrapp-10 '>
          {clothes?.map((currentClothes, index) => (
            <ClothesCard details={currentClothes} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
