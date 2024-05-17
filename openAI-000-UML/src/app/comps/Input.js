"use client";
import { text_generation } from "@/api/text_gen";
import css from "@/css/Input.module.css";
import { useCallback, useState } from "react";
import ViewResultPage from "./ViewResult";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const InputPage = () => {
  // data: session - session 이라는 이름으로 쓰겟음
  const { data: session, loading } = useSession();
  const router = useRouter();

  const [wait, setWait] = useState(false);
  const [resultText, setResultText] = useState("");
  const [prompt, setPrompt] = useState({
    diagram: "none",
    project: "",
    discription: "",
  });

  const onCreateHandler = useCallback(async () => {
    if (!session) {
      alert("로그인을 먼저 실행하세요");
      return router.push("/login");
    }

    const sendPrompt = `${prompt.project}를 구현하는데 필요한 
    ${prompt.diagram} 을 mermaid 스트립트 코드로 작성해 주세요
    그리고 다음의 내용을 포함하면 좋겠어요 ${prompt.discription}`;

    const result = await text_generation(sendPrompt);
    setResultText(result);
    // 이 값들이 변경되면 함수를 다시 생성해
  }, [prompt, session, router]);

  return (
    <>
      <form className={css.form}>
        <select
          className={css.diagram}
          name="diagram"
          value={prompt.diagram}
          onChange={(e) =>
            setPrompt({ ...prompt, diagram: e.target.value })
          }
        >
          <option value="none" disabled selected>
            생성할 Diagram 을 선택하세요
          </option>
          <option value="class">Class Diagram</option>
          <option value="erd">Entity Relation Diagram</option>
          <option value="sequence">Sequence Diagram</option>
        </select>
        <input
          placeholder="프로젝트 이름"
          value={prompt.project}
          onChange={(e) =>
            setPrompt({ ...prompt, project: e.target.value })
          }
        />
        <textarea
          placeholder="자세한 설명"
          rows={10}
          value={prompt.discription}
          onChange={(e) =>
            setPrompt({ ...prompt, discription: e.target.value })
          }
        ></textarea>
        <button
          type="button"
          onClick={onCreateHandler}
          className={css.btn_create}
        >
          {session?.user ? "생성하기" : "로그인을 먼저 실행하세요"}
        </button>
      </form>
      {resultText && <ViewResultPage resultText={resultText} />}
    </>
  );
};

export default InputPage;
