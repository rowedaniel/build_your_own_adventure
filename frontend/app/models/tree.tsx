'use client';

import type { maindata } from "~/models/utils";

export function Tree({ tree, setTree, currentHistory, setCurrentHistory }: maindata ) {

  const subbranches = tree.data.options.map((option) => option.child_part);
  return (
    <div>
      <div className="treeLayer">
        <Node id={tree.data.id} selected={tree.data.id === currentHistory[0]} select={() => setCurrentHistory([])}/>
      </div>
      <div className="treeLayer">
        {subbranches.map((subbranch, index) => (
          subbranch && tree.subbranches[subbranch] ? (
            <Tree key={tree.data.id + "-" + subbranch}
                  tree={tree.subbranches[subbranch]}
                  setTree={setTree}
                  currentHistory={currentHistory.slice(1)}
                  setCurrentHistory={(hist: number[]) => {
                                        setCurrentHistory([subbranch, ...hist])
                                     }}
            />
          ) : (
            <UnexploredNode key={tree.data.id + "-" + index + "unexplored"}/>
          )
        ))}
      </div>
    </div>
  );
}

export function Node(
        { id, selected, select }: {id: number, selected: boolean, select: () => void}
    ) {
  if(selected) {
    return (
      <span className="node selected" onClick={select}> {id} </span>
    );
  } else {
    return (
      <span className="node" onClick={select}> {id} </span>
    );
  }
}

export function UnexploredNode() {
  return (
    <span className="unexplored node"> ??? </span>
  )
}
