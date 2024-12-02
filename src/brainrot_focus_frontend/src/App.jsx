import { useState } from "react";
import styled from "styled-components";
import { Spacer } from "./Spacer";
import { Background } from "./Background";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  return (
    <Background>
      <Title>What would you like to focus on?</Title>
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={(e) => {
          e.preventDefault();

          navigate(`/focus/${title}`);
        }}
      >
        <Input
          style={{ width: `${Math.max(title.length, 10)}ch` }}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <Spacer direction="bottom" size={30} />
        <Button type="submit" onClick={() => navigate(`/focus/${title}`)}>
          Start
        </Button>
      </form>
    </Background>
  );
}

const Title = styled.h1`
  font-size: 5rem;
  text-align: center;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  font-size: 4rem;
  font-weight: 300;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid #eee;
  color: #fff;
  text-align: center;
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

export default App;
