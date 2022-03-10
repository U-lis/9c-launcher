import { motion } from "framer-motion";
import React, { MouseEvent, useCallback } from "react";
import { T } from "src/renderer/i18n";
import { styled } from "src/v2/stitches.config";

const Button = styled(motion.button, {
  appearance: "none",
  backgroundColor: "#dc9c2d",
  border: "none",
  padding: "5px 1rem",
  "&:disabled": {
    backgroundColor: "$gray",
  },
});

interface ClaimButtonProps {
  onClick: () => void;
  loading: boolean;
}

export function ClaimButton({ loading, onClick }: ClaimButtonProps) {
  const eventListener = useCallback<(e: MouseEvent) => void>((e) => {
    e.stopPropagation();
    onClick();
  }, [onClick])

  return (
    <Button disabled={loading} onClick={eventListener}>
      <T _str="Get Rewards" _tags="v2/ClaimButton" />
    </Button>
  );
}
