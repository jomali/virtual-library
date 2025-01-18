import React from "react";
import { motion } from "motion/react";
import { styled, useTheme } from "@mui/material/styles";
import Gap from "../Gap";

const MotionContainer = styled(motion.div)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: theme.spacing(4, 6),
}));

const DetailAnimatedPanel: React.FC<IDetailAnimatedPanel> = (props) => {
  const { children, ...otherProps } = props;

  const theme = useTheme();

  const duration = React.useMemo(
    () => ({
      entering: theme.transitions.duration.short / 1000,
      leaving: theme.transitions.duration.shortest / 1000,
    }),
    [theme]
  );

  const variants = React.useMemo(
    () => ({
      active: { opacity: 1, x: 0 },
      enter: (direction: number) => ({
        opacity: 0.5,
        x: direction >= 0 ? "100%" : "-100%",
      }),
      exit: (direction: number) => ({
        opacity: 0.5,
        x: direction >= 0 ? "-100%" : "100%",
        transition: { duration: duration.leaving },
      }),
    }),
    [duration]
  );

  return (
    <MotionContainer
      animate={"active"}
      exit={"exit"}
      initial={"enter"}
      style={{}}
      transition={{ type: "tween", duration: duration.leaving }}
      variants={variants}
      {...otherProps}
    >
      {children}
      <Gap />
    </MotionContainer>
  );
};

export interface IDetailAnimatedPanel {
  children: React.ReactNode;
  custom: number;
  key: string;
}

export default DetailAnimatedPanel;
