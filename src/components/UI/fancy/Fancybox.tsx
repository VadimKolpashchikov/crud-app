import React, { useRef, useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { ComponentOptionsType } from "@fancyapps/ui/types/Fancybox/options";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
interface FancyboxProps {
  delegate?: string;
  options?: ComponentOptionsType;
  children: React.ReactNode;
}

function Fancybox(props: FancyboxProps) {
  const containerRef = useRef(null);
  const root = document.getElementById("root");

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = { ...props.options, parentEl: root } || {
      parentEl: root,
    };

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return (
    <div className="fancy" ref={containerRef}>
      {props.children}
    </div>
  );
}

export default Fancybox;
