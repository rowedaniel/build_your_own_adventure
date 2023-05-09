import { useState } from "react";

interface optiondata {
  id: number
  text: string;
}

interface partdata {
  text: string;
  options: optiondata[];
}

interface branch {
  data: partdata;
  subbranches: Record<number, branch>;
}

interface option {
  data: optiondata;
  history: number[];
  selected: boolean;
  select: () => void;
}

interface part {
  data: partdata;
  history: number[];
  chosen: number;
  select: (history: number[], name: number) => void;
}


export function Story() {

  // util functions
  function traverseTree(choices: number[]) {
    let currentBranch = tree;
    for(let choice of choices) {
      currentBranch = currentBranch.subbranches[choice];
    }
    return currentBranch;
  }
  function makeNewBranch(choices: number[]): branch {
    return {
      data: {
        text: choices.join(" "),
        options: [
          {
            id: 1,
            text: "option 1"
          },
          {
            id: 2,
            text: "option 2"
          }
        ]
      },
      subbranches: {}
    }
  }

  // state vars
  const [tree, setTree] = useState<branch>({
    data: {
            text: "Press 'start' to begin",
            options: [
              { id: 0, text: "START" }
            ]
          },
    subbranches: {}
  });
  const [currentHistory, setCurrentHistory] = useState<number[]>([]);


  function selectOption(history: number[], choice: number) {
    const newHistory = [...history, choice];
    let leaf = traverseTree(history);
    if(!(choice in leaf.subbranches)) {
      leaf.subbranches[choice] = makeNewBranch(newHistory);
      setTree(tree);
    }
    setCurrentHistory(newHistory);
  }

  let currentBranch = tree;
  let parts_data = [currentBranch.data];
  for(let choice of currentHistory) {
    currentBranch = currentBranch.subbranches[choice];
    parts_data.push(currentBranch.data);
  }

  let parts: part[] = parts_data.map((p, index) => {
    return {
      data: p,
      history: currentHistory.slice(0, index),
      select: selectOption,
      chosen: currentHistory[index]
    }
  });

  let histories = parts.map(({data,history,select}) => {return history})
  console.log(histories);
  let keys = histories.map((history) => {
    return history.join("-")+"o";
  });
  console.log(keys);

  return (
    <div className="story">
      {parts.map(( { data, history, select, chosen } ) => (
        <Part key={history.join("-")+"p"} data={data} history={history} select={select} chosen={chosen} />
      ))}
    </div>
    );
}

function Part({ data, history, select, chosen }: part) {
  return (
    <div className="part">
      <div className="partHeader"> {data.text} </div>
      {data.options.map((o: optiondata) => (
        <Option key={history.join("-")+"p"+o.id} data={o} history={history} selected={o.id === chosen} select={() => select(history, o.id)}/>
      ))}
    </div>
  );
}

function Option({ data, history, selected, select }: option ) {
  if(selected) {
    return (
      <button className="option selected" onClick={select}> {data.text} </button>
    );
  } else {
    return (
      <button className="option" onClick={select}> {data.text} </button>
    );
  }
}
