import { styled } from "styled-components";

export const StyledForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    .input {
      padding: 12px 16px;
      border-radius: 5px;
      border: 1px solid black;
      width: 100%;
    }
    .input.input-error {
      border: 1px solid red;
    }
  }
  .heading {
    text-align: left;
  }
  p.error {
    color: red;
    height: 24px;
    padding: 0;
    margin: 0;
  }

  .contact-section {
    margin-top: 50px;
  }
  .hidden {
    display: none;
  }

  ul {
    list-style: none;
    li {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      padding: 12px 16px;
    }
  }
`;
