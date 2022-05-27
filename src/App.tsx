import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import IntroAndSchemes from "./components/IntroAndSchemes";
import Tag from "./components/Tag";
import {v4 as uuidGenerate} from 'uuid'

const App = (): JSX.Element => {
    const TagProps = {
        summary: "authentication related apis",
        name: "auth"
    }
    let [tags, setTags] = useState([<Tag {...TagProps} key={uuidGenerate()}/>])
    return (
        <div className="App" spellCheck="false">
            <NavBar />
            {/* <TaskBar /> */}
            <IntroAndSchemes />
            <div className="Tags">
                {tags.map((x)=> x)}
            </div>
            <div className="AddTag" onClick={()=>{
                setTags((prev: any)=> [...prev, [<Tag {...TagProps} key={uuidGenerate()}/>]])
            }}>
                Add Tag
            </div>
        </div>
    );
};

export default App;
