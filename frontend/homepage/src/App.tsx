import styled from "styled-components";

const StyledAppContainer = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
`;

export default function App() {
  return (
    <StyledAppContainer>
      <h1>TheSilican's Website</h1>
      <p>Welcome to my website! I should probably put something here...</p>
      <p>
        Go check out my{" "}
        <a
          href="https://github.com/thesilican"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        while I think about what to put here
      </p>
      <p>
        Or, you can check out my{" "}
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noreferrer"
        >
          blog
        </a>
        , where I post things that I've been up to (mostly related to
        programming)
      </p>
    </StyledAppContainer>
  );
}
