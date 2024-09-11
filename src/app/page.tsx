"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import { ClothesInterface } from "../../global";

import ClothesCard from "@/components/ClothesCard";

import { Button } from "@/components/ui/button";

export default function Home() {
  const [clothes, setClothes] = useState<ClothesInterface[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clothesName, setClothesName] = useState("");

  const loadClothesFromApi = async () => {
    const url = "http://localhost:3004/clothes";

    const responseFromApi = await fetch(url);
    const parsedResponse = await responseFromApi.json();

    setClothes(parsedResponse);

    setIsLoading(false);
  };

  useEffect(() => {
    loadClothesFromApi();
  }, []);

  if (isLoading) {
    return <div>Carregando</div>;
  }

  const handleClothesNameChange = (event: InputEvent) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;

    setClothesName(value);
  };

  const handleClearName = async () => {
    setClothesName("");
    await loadClothesFromApi();
  };

  const handleSearchByName = async () => {
    try {
      setIsLoading(true);

      const url = `http://localhost:3004/clothes/pesquisa/${clothesName}`;

      const responseFromApi = await fetch(url);
      const parsedResponse = await responseFromApi.json();

      setClothes(parsedResponse);
    } catch (error) {
      alert("Erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <title>Roupa Roupousa - Inicio</title>

      <div className='max-w-[1180px] w-full mx-auto flex gap-10 flex-col flex-flex-wrap py-10 px-10'>
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

        {clothes.length === 0 && (
          <div>
            <p>Não há roupas cadastradas</p>
          </div>
        )}

        {clothes.length > 0 && (
          <div className='flex gap-6 flex-wrap p-10 justify-center items-center'>
            {clothes?.map((currentClothes, index) => (
              <ClothesCard details={currentClothes} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
