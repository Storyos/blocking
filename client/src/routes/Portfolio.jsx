import styled from "styled-components";
import MenubarLayout from "../components/MenubarLayout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  background-color: #f5f5f5;
`;

export default function Portfolio() {
  return (
    <Container>
      portfolio page
      <MenubarLayout />
    </Container>
  );
}
