'use client';

import type { optiondata, partdata, branch, maindata } from "~/models/utils";

import { default_filler_leaf, getpart_url, newpart_url  } from "~/models/utils";
import { useState } from "react";

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
  select: (history: number[], choice: optiondata) => void;
}

interface newoptiondata {
  text: string;
}

interface newpartdata {
  text: string;
  parent: number;
  options: newoptiondata[];
}

interface newpart {
  option: optiondata;
  create: (option: optiondata, data: newpartdata) => void;
}

export function Story({ tree, setTree, currentHistory, setCurrentHistory }: maindata) {

  // state vars
  
  const [newPart, setNewPart] = useState<optiondata|null>(null);


  // util functions
  function traverseTree(choices: number[], callback: (b: branch) => void): branch {
    if(!tree) {
      return default_filler_leaf;
    }
    let currentBranch = tree;
    callback(currentBranch);
    for(let choice of choices) {
      currentBranch = currentBranch.subbranches[choice];
      callback(currentBranch);
    }
    return currentBranch;
  }
  function getBranch(leaf: branch, newHistory: number[]): void {
    let choice = newHistory[newHistory.length - 1];
    fetch(getpart_url + choice, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
          if(response.ok) {
            return response.json();
          } else {
            return default_filler_leaf.data;
          }
        }).then((data) => {
          leaf.subbranches[choice] = {
            data: data,
            subbranches: []
          };
          setTree(tree);
          setCurrentHistory(newHistory);
        });
  }

  function createNewPart(option: optiondata, content: newpartdata): void {
    fetch(newpart_url, {
            method: "POST",
            body: JSON.stringify(content),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => (
          response.json()
        )).then((data) => {
          option.child_part = data.id;
          setTree(tree);
          setNewPart(null);
        });
  }

  function selectOption(history: number[], choice: optiondata): void {
    if(choice.child_part) {
      setNewPart(null);
      const newHistory = [...history, choice.child_part];
      let leaf = traverseTree(history, () => {});
      if(!(choice.child_part in leaf.subbranches)) {
        getBranch(leaf, newHistory);
      } else {
        setCurrentHistory(newHistory);
      }
    } else {
      setCurrentHistory(history);
      setNewPart(choice);
    }
  }

  let parts_data: partdata[] = [];
  traverseTree(currentHistory, (b) => parts_data.push(b.data));

  let chosen: number[] = parts_data.map((p, index) => {
    if(index >= currentHistory.length) {
      if(newPart) {
        return newPart.id;
      }
      return -1;
    }
    for(let option of p.options) {
      if(option.child_part === currentHistory[index]) {
        return option.id;
      }
    }
    return -1;
  });

  let parts: part[] = parts_data.map((p, index) => {
    return {
      data: p,
      history: currentHistory.slice(0, index),
      select: selectOption,
      chosen: chosen[index]
    }
  });


  return (
    <div className="story">
      {parts.map(( { data, history, select, chosen } ) => (
        <Part key={history.join("-")+"p"} data={data} history={history} select={select} chosen={chosen} />
      ))}
      {newPart ? (<CreatePart option={newPart} create={createNewPart} />) : ''}
    </div>
    );
}

function CreatePart({option, create}: newpart){
  const [mainText, setMainText] = useState('');
  const [options, setOptions] = useState<newoptiondata[]>([]);
  function setOption(value: string, index: number) {
    setOptions([...options.slice(0, index), {"text": value}, ...options.slice(index + 1) ]);
  }
  return (
    <div className="createPart">
      <h1> Create a new part! </h1>
      <p> You can finish the story, or leave room for someone else to extend it by adding options.</p>
      <span> Main Story Text: </span>
      <textarea className="mainText" value={mainText} onChange={(e) => setMainText(e.target.value)}/>
      <span> Options: </span>
      {options.map((option, index) => (
      	<div key={index+"-newoption"} className="optionDiv">
          <textarea 
              className="optionText"
              value={options[index].text}
              onChange={(e) => setOption(e.target.value, index)} />
          <button
              className="deleteOptionButton"
              onClick={() => setOptions([...options.slice(0, index),
                                         ...options.slice(index+1)])}>
          Delete option
          </button>
	</div>
      ))}
      <button className="newOptionButton" onClick={() => setOptions([...options, {text:''}])}> New Option</button>
      <button className="submitButton" onClick={() => create(option, {text:mainText, parent:option.id, options:options})}>Submit</button>
    </div>
  );
}

function Part({ data, history, select, chosen }: part) {
  return (
    <div className="part">
      <div className="partHeader"> {data.text} </div>
      {data.options.map((o: optiondata) => (
        <Option key={history.join("-")+"p"+o.id} data={o} history={history} selected={o.id === chosen} select={() => select(history, o)}/>
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
