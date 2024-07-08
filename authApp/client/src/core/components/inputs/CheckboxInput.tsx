/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

type Props = {
  inputName: string;
  labelContent: ReactNode | string;
  onClick: () => void;
  checked: boolean;
};

export const CheckboxInput: FC<Props> = ({
  inputName,
  labelContent,
  onClick,
  checked,
}) => (
  <div
    css={css`
      display: flex;
      align-items: flex-start;
    `}
  >
    <input
      type="checkbox"
      id={inputName}
      name={inputName}
      onClick={onClick}
      checked={checked}
      //Ain't that beautiful?
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange={() => {}}
      css={css`
        place-items: start;
      `}
    />
    <label
      htmlFor={inputName}
      css={css`
        margin-left: 5px;
      `}
    >
      {labelContent}
    </label>
  </div>
);
