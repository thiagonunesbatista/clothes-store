"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useConsumer } from "@/app/context/ConsumerContext";

export default function Id({ params }) {
  const [clothes, setClothes] = useState<ClothesInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { isLogged, consumerInfo, setIsLogged, setConsumerInfo } =
    useConsumer();

  useEffect(() => {
    const savedConsumer = localStorage.getItem("savedConsumer");
    if (savedConsumer) {
      const parsedData = JSON.parse(savedConsumer);
      setIsLogged(parsedData.isLogged);
      setConsumerInfo(parsedData);
    }
  }, []);

  useEffect(() => {
    setIsLogged(isLogged);
  }, [isLogged]);

  useEffect(() => {
    const clothId = params?.id;

    if (clothId) {
      const loadSingleClothFromApi = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/clothes/${params.id}`;

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

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clothId = params?.id;

    if (!isLogged || !clothes) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ratings/${clothId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: consumerInfo.id,
            score: rating,
          }),
        }
      );

      if (response.ok) {
        const updatedClothes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/clothes/${params.id}`
        ).then((res) => res.json());
        setClothes(updatedClothes);
        setRating(0);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clothId = params?.id;
    if (!isLogged || !clothes) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${clothId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: consumerInfo.id,
            content: comment,
          }),
        }
      );

      if (response.ok) {
        const updatedClothes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/clothes/${params.id}`
        ).then((res) => res.json());
        setClothes(updatedClothes);
        setComment("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleStarClick = (clickedRating: number) => {
    setRating(clickedRating === rating ? 0 : clickedRating);
  };

  if (isLoading) {
    return <div>Carregando</div>;
  }

  return (
    <div>
      <title>Roupa Roupousa</title>

      <div className="max-w-[1180px] w-full mx-auto flex gap-10 flex-col py-10 px-10">
        {clothes && (
          <div>
            <h1 className="text-2xl">{clothes.name}</h1>

            <Card
              className={`w-[350px] ${
                clothes.highlight && "bg-yellow-300"
              } flex flex-col gap-2`}
            >
              <CardHeader className="flex flex-col gap-2">
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
              <CardContent className="flex flex-col gap-5">
                <p>{clothes.description}</p>
                <p>R$ {clothes.price}</p>
                <p>Marca: {clothes.clothingBrand.name}</p>
              </CardContent>
            </Card>

            <div className="mt-8">
              {!clothes.ratings.find(
                (current) => current?.userId === consumerInfo.id
              ) && (
                <Fragment>
                  <h2 className="text-xl font-semibold mb-4">
                    Adicionar Avaliação
                  </h2>
                  <form
                    onSubmit={handleRatingSubmit}
                    className="flex items-center gap-4 mb-4"
                  >
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`cursor-pointer ${
                            star <= rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleStarClick(star)}
                        />
                      ))}
                    </div>
                    <Button type="submit">Enviar Avaliação</Button>
                  </form>
                </Fragment>
              )}

              {!clothes.comments.find(
                (current) => current?.userId === consumerInfo.id
              ) && (
                <Fragment>
                  <h2 className="text-xl font-semibold mb-4">
                    Adicionar Comentário
                  </h2>
                  <form
                    onSubmit={handleCommentSubmit}
                    className="flex flex-col gap-4"
                  >
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Escreva seu comentário aqui"
                      className="w-full"
                    />
                    <Button type="submit">Enviar Comentário</Button>
                  </form>
                </Fragment>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Avaliações</h2>
              {clothes.ratings.map((rating) => (
                <div key={rating.id} className="mb-2 flex items-center">
                  <p className="mr-2">{rating.user.name}:</p>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= rating.score
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Comentários</h2>
              {clothes.comments.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <p className="font-semibold">{comment.user.name}:</p>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
