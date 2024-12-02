import { useParams } from "react-router";
import { Background } from "./Background";
import styled from "styled-components";
import { Spacer } from "./Spacer";
import { useEffect, useState } from "react";
import { brainrot_focus_backend } from "declarations/brainrot_focus_backend";

export const Focus = () => {
  const { title } = useParams();

  const [joke, setJoke] = useState("");
  const [tokens, setTokens] = useState(0);
  const [task, setTask] = useState("");
  const [lastRewardedLength, setLastRewardedLength] = useState(0);
  const [content, setContent] = useState("");

  useEffect(() => {
    brainrot_focus_backend.getBalance().then((balance) => {
      setTokens(balance.toString());
    });
  }, []);

  const getJoke = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer sk--EWHmlHuLVURAf3Uk4VnnGxuCf5WFrF9nkLnZFcE_XT3BlbkFJwCnAIZPp-ReYSEe6wBwcpCWJ3bBDG2ia7nBAUR97IA"
    );

    const raw = JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content:
            "Give me a gen alpha humour (skbidi toilet, sigma, kai cenat, etc.) joke.",
        },
      ],
      temperature: 0.7,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
      .then(async (response) => {
        const r = await response.json();
        const R = r.choices[0].message.content;

        setJoke(R);
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getJoke();
  }, []);

  return (
    <Background>
      <Title>{title}</Title>
      <Spacer direction="bottom" size={10} />
      <Title>Tokens: {tokens}</Title>
      <Spacer direction="bottom" size={10} />
      <TypingArea
        placeholder="Describe your task"
        value={task}
        onChange={({ target: { value } }) => setTask(value)}
      ></TypingArea>
      <Spacer direction="bottom" size={10} />
      <TypingArea
        placeholder="Type your assignment"
        value={content}
        onChange={({ target: { value } }) => setContent(value)}
        rows={10}
      ></TypingArea>
      <Spacer direction="bottom" size={30} />
      <Button
        onClick={() => {
          if (content.split(" ").length - lastRewardedLength < 50)
            return alert("Add at least 50 new characters!");

          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append(
            "Authorization",
            "Bearer sk--EWHmlHuLVURAf3Uk4VnnGxuCf5WFrF9nkLnZFcE_XT3BlbkFJwCnAIZPp-ReYSEe6wBwcpCWJ3bBDG2ia7nBAUR97IA"
          );

          const raw = JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are an unbiased evaluator that will evaluate the user's response to a given task and see if it makes sense and is not just any random text they have typed in. Based on your evaluation of if the text is valid, I will reward the user with cryptocurrency. Respond with only 'valid' or 'invalid'. Do not consider the length of the content, only relevance.",
              },
              {
                role: "user",
                content: `Task: ${task}
                  Response: ${content}`,
              },
            ],
            temperature: 0.7,
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("https://api.openai.com/v1/chat/completions", requestOptions)
            .then(async (response) => {
              const r = await response.json();
              const R = r.choices[0].message.content;

              if (R == "invalid") return alert("Your content is not relevant!");

              alert(
                `Congrats, your content is relevant! Awarding ${
                  Math.floor(content.length / 10) * 5
                } tokens`
              );
              setLastRewardedLength(content.split(" ").length);
              brainrot_focus_backend
                .addReward(Math.floor(content.length / 10) * 5)
                .then((balance) => {
                  setTokens(balance.toString());
                });
              alert("Getting new joke!");
              getJoke();
            })
            .catch((error) => console.error(error));
        }}
      >
        Evaluate
      </Button>
      <Spacer direction={"bottom"} size={20} />
      <Joke>Your joke: {joke}</Joke>
    </Background>
  );
};

const Title = styled.h1`
  font-size: 5rem;
  text-align: center;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
`;

const TypingArea = styled.textarea`
  width: 50vw;
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: #fff;
  border: none;
`;

const Button = styled.div`
  background-color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 2.1rem;
  font-weight: 600;
  width: fit-content;
`;

const Joke = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  color: #fff;
  text-align: center;
`;
