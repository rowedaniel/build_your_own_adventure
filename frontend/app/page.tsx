'use client';

import type { branch, switchbutton } from "~/models/utils";

import { useState } from "react";
import { Story } from "~/models/story";
import { Tree } from "~/models/tree";
import { SwitchStateButton, populateDefaultTree, state } from "~/models/utils";
import "~/styles/index.css";

export default function Index() {
  const [currentState, setCurrentState] = useState<state>(state.story);
  const [tree, setTree] = useState<branch>();
  const [currentHistory, setCurrentHistory] = useState<number[]>([]);

  if(!tree) {
    populateDefaultTree(setTree);
    return (
      <div></div>
    );
  }

  let body;
  let buttondata: switchbutton;
  switch(currentState) {
    case state.story:
      body = (
          <Story tree={tree}
                 setTree={setTree}
                 currentHistory={currentHistory}
                 setCurrentHistory={setCurrentHistory}/>
      );
      buttondata = {
        name: "tree",
        select: () => setCurrentState(state.tree)
      };
      break;
    case state.tree:
      body = (
          <div className="treeContainer">
            <Tree tree={tree}
                  setTree={setTree}
                  currentHistory={[1, ...currentHistory]}
                  setCurrentHistory={setCurrentHistory}/>
          </div>
      );
      buttondata = {
        name: "story",
        select: () => setCurrentState(state.story)
      };
      break;
      
  }

  return (
    <div>
      <SwitchStateButton name={buttondata.name} select={buttondata.select} />
      {body}
    </div>
  );
}
