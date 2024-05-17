"use server";
import OpenAI from "openai";
const openai = new OpenAI();

const image_genertation = async (prompt) => {
  const result = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    // 이미지 베이스64로 받기
    response_format: "b64_json",
  });
  return result.data[0].b64_json;
};

export default image_genertation;
