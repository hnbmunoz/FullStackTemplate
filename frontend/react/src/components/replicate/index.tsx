import React, { useState } from "react";
import classnames from "classnames";

interface Props {
  isChildren?: boolean;
  index?: number;
}

const SelfReplicateComponent : any = ({ isChildren, index }: Props) => {
  const [replicate, setReplicate] = useState<string[]>([]);
  const divClass = classnames({
    borders: !isChildren || replicate.length > 0,
    children: isChildren
  });

  return (
    <div className={divClass} style={{ border: "3px solid black" }}>
      <h2 onClick={() => setReplicate([...replicate, "value"])}>
        SelfReplicateComponent {isChildren !== undefined && "child"}{" "}
        {index !== undefined && `(${index})`}
      </h2>

      {replicate.map((r :any, idx : number) => (
        <SelfReplicateComponent isChildren={true} index={idx} />
      ))}
    </div>
  );
};

export default SelfReplicateComponent;
