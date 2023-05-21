'use client';

export enum state {
  story,
  tree,
}
export interface optiondata {
  id: number;
  text: string;
  parent_part: number;
  child_part: number|null;
}

export interface partdata {
  id: number;
  text: string;
  options: optiondata[];
}

export interface branch {
  data: partdata;
  subbranches: Record<number, branch>;
}

export interface maindata {
  tree: branch;
  setTree: (newTree: branch) => void;
  currentHistory: number[];
  setCurrentHistory: (newHistory: number[]) => void;
}

export interface switchbutton {
  name: string;
  select: () => void;
}

export function SwitchStateButton({ name, select }: switchbutton) {
  return (
    <div>
      <button className="switchStateButton" onClick={select}> {name} </button>
    </div>
  );
}

export const default_filler_leaf = {
  data: {
    id: -1,
    text: "filler",
    options: []
    },
  subbranches: {}
};

export const getpart_url = "https://build-your-own-adventure-backend.fly.dev/getpart?item_id="
export const newpart_url = "https://build-your-own-adventure-backend.fly.dev/newpart"

export function populateDefaultTree(setTree: (t: branch) => void) {
  const root_id = 1;
  fetch(getpart_url + root_id, {
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
        setTree({
          data: data,
          subbranches: []
        });
      });
}
