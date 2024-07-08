/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { Row } from "react-bootstrap";

import { Inputs, RoundedContour } from "../../core";
import { MailIcon, PasswordIcon } from "../assets";
import { useSignUpBox } from "../hooks";

export const SignUpBox: FC = () => {
  const { data, setData, error, message, onClick } = useSignUpBox();

  return (
    <RoundedContour
      outsideStyling={css`
        padding: 1rem 2rem;

        input {
          margin: 0.3rem 0;
        }
      `}
    >
      <Row>
        <h2
          css={css`
            font-family: "Baloo2";
            font-weight: 500;
            text-align: center;
            margin-bottom: 0;
          `}
        >
          Register
        </h2>
      </Row>
      <hr />
      <Row>
        <Inputs.Text
          inputName="email"
          inputType="email"
          inputPlaceholder={"Email"}
          icon={MailIcon}
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          autocomplete="email"
          isRequired
        />
      </Row>
      <Row>
        <Inputs.Text
          inputName="current-password"
          autocomplete="current-password"
          inputType="password"
          inputPlaceholder={"Password"}
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          icon={PasswordIcon}
          length={{ min: 8, max: 128 }}
          isRequired
        />
      </Row>
      <Row>
        <Inputs.Button
          type="primary"
          buttonType="submit"
          optionalStyling={css`
            margin: 1rem 0;
          `}
          onClick={onClick}
        >
          Register
        </Inputs.Button>
        {message && (
          <Row
            css={css`
              color: ${error ? "red" : "inherit"};
            `}
          >
            {message}
          </Row>
        )}
      </Row>
    </RoundedContour>
  );
};
