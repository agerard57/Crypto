/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { Row, Container } from "react-bootstrap";

import { ColoredBackground } from "../../core";
import { SignInBox } from "./SignInBox";
import { SignUpBox } from "./SignUpBox";

export const LandingPage: FC = () => (
  <ColoredBackground>
    <Container
      css={css`
        padding: 0 8vw;
      `}
    >
      <Row
        css={css`
          padding: 0 0 5% 0;
        `}
      >
        <SignUpBox />
      </Row>
      <Row
        css={css`
          padding: 0 0 5% 0;
        `}
      >
        <SignInBox />
      </Row>
    </Container>
  </ColoredBackground>
);
