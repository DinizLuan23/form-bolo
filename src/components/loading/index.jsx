import Lottie from "lottie-react";

// Animations
import animation from "../../animations/cakeAnimation.json";

// Styles
import { ContainerLoading } from "./styles";

export function Loading() {
  return (
      <ContainerLoading>
         <Lottie animationData={animation} loop className="w-48" />
      </ContainerLoading>
  );
}
