import classNames from "classnames";
import { useRef, useState } from "react";
import Block from "../classes/Block";
import BlockElement from "./BlockElement";

type Props = {
  blockTable: Block[][]
  selectingID: number,
  onClick: (block: Block) => void
};

const blockWidth = 32;

const BlockTable = ({
  blockTable,
  selectingID,
  onClick,
}: Props) => {
  const [_, setEvent] = useState<UIEvent>();
  const time = useRef(Date.now());

  const isFlex = (blockTable.length > 0)
    ? window.innerWidth > (blockTable[0].length + 2) * blockWidth
    : true;

  const tableWrapperClassNames = classNames({
    "block-table-wrapper": true,
    "flex-center": isFlex
  });

  window.addEventListener("resize", (ev) => {
    const waitTime = 200;
    if (Date.now() - time.current > waitTime) {
      time.current = Date.now();
      setEvent(ev);
    }
  })

  return (
    <>
      <div className={tableWrapperClassNames}>
        <div className="block-table">
          <div className="block-row">
            <div className="block block-header"></div>
            {blockTable.length > 0 && blockTable[0].map((block, index) =>
              <div className="block block-header"
                key={block.blockID}
              >{index}</div>
            )}
          </div>
          {blockTable.map((blockRow, index) =>
            <div className="block-row" key={blockRow[0].blockID}>
              <div className="block block-header">{index}</div>
              {blockRow.map((block) =>
                <BlockElement block={block}
                  onClick={() => onClick(block)}
                  key={block.blockID}
                  isSelecting={selectingID === block.blockID}/>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default BlockTable;
