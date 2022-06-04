// import './config/config'
import React, { createContext, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import IntroAndSchemes from "./components/IntroAndSchemes";
import Tag from "./components/Tag";
import { v4 as uuidGenerate } from "uuid";
import Models from "./components/Models";

interface modelsContextInterface  {
    model: object,
    setModel: (m: object) => void

}


const modelsContext = createContext<modelsContextInterface | {}>({});

const App = (): JSX.Element => {
    let models: any = useState([]);
    const TagProps = {
        summary: "authentication related apis",
        name: "auth"
    };
    let [tags, setTags] = useState<any>([
        
    ]);
    let tagsArr: any = []
    const setTagsArr = (newValue: object)=>{
        tagsArr.push(newValue)
    }

    return (
        <modelsContext.Provider value={{models, tags: [tagsArr, setTagsArr]}}>
            <div className="App" spellCheck="false">
                <NavBar />
                {/* <TaskBar /> */}
                <IntroAndSchemes />
                <div className="Tags">{tags.map((x: any) => x)}</div>
                <div className="AddTag"
                    onClick={() => {
                        setTags((prev: any) => {
                            const key = uuidGenerate()
                            setTagsArr({key})
                            return [
                                ...prev,
                                [<Tag {...{tagKey: key, ...TagProps}} key={key} />]
                            ]
                        });
                    }}
                >
                    Add Tag
                </div>
                {/* models */}
                <Models />
            </div>
        </modelsContext.Provider>
    );
};

export default App;
export {modelsContext}
export type {modelsContextInterface} 
