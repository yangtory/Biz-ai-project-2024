"use server";
import OpenAI from "openai";

const openai = new OpenAI();

export const text_generation = async (prompt) => {
  // 프롬프트 전달하면 응답해주는 애
  const result = await openai.chat.completions.create({
    messages: [{ role: "assistant", content: prompt }],
    model: "gpt-4o",
  });
  console.log(result.choices[0]);
  // 응답 데이터
  return result.choices[0].message.content;
};
