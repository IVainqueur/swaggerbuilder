import {v4 as uuidGenerate} from 'uuid'
import { IoIosAdd, IoIosClose } from "react-icons/io";

interface i_method {
    accent: string;
}

interface i_methodProps {
    methodName: string;
    methodRoute: string;
    methodSummary: string;
}

const methods: object = {
    DELETE: {
        accent: "#f93e3e"
    },
    POST: {
        accent: "#49cc90"
    },
    GET: {
        accent: "#61affe"
    },
    PUT: {
        accent: "#fca130"
    },
    HEAD: {
        accent: "#a94afc"
    },
    OPTIONS: {
        accent: "#0d5aa7"
    },
    PATCH: {
        accent: "#57e3c3"
    }
};


const changeMethod = (e: any) => {
    if (Object.keys(methods).includes(e.target.textContent)) {
        type objectKey = keyof typeof methods;
        let key = e.target.textContent.toString() as objectKey;
        let accentColor = (methods[key] as i_method).accent;
        
        e.target.style.background = accentColor;
        e.target.style.color = "white";
        e.target.parentElement.parentElement.style.background = `${accentColor}1a`;
        e.target.parentElement.parentElement.style.border = `1px solid ${accentColor}`;
    } else {
        e.target.style.background = "";
        e.target.style.color = "";
        e.target.parentElement.parentElement.style.background = ``;
        e.target.parentElement.parentElement.style.border = ``;
    }
};

/* 

* The method below creates a table for either the responses or the parameters containing corresponding
* rows 

*/

const columns = {
    "params": {
        heads: ["Name", "Description"], 
        container: "MethodParametersContent"
    },
    "responses": {
        heads: ["Code", "Description"], 
        container: "MethodResponsesContent"
    }
}

const createNewTable = (e: any, paramOrResponse: string) =>{
    if(!Object.keys(columns).includes(paramOrResponse)) throw new Error("Parameter 2 is unknown, It should either be \"responses\" or \"params\" ")

    e.currentTarget.removeChild(e.currentTarget.firstElementChild)

    e.currentTarget.querySelector('table').style.display = "table"

}

const addRow = (currentTarget: Element, codeOrName: string, setter: any) => {
    
    setter((prevValue: any) => {
        let clickedIndex = prevValue.findIndex((x: any)=> x.props.id === currentTarget.id)
        let beforeClicked = prevValue.slice(0, clickedIndex+1)

        return beforeClicked.concat([ <tr id={uuidGenerate()}>
            <td suppressContentEditableWarning={true} contentEditable>
                {codeOrName} {prevValue.length + 1}
            </td>
            <td suppressContentEditableWarning={true} contentEditable>
                Description {prevValue.length + 1}
            </td>
            <td className="ActionTD">
                <IoIosClose className="CancelRowBTN" onClick={(e: any)=>{
                        let curRow = e.currentTarget.parentElement.parentElement
                        removeRow(curRow, setter)
                    }}/> <IoIosAdd onClick={(e: any)=>{
                    addRow(e.currentTarget.parentElement.parentElement, codeOrName, setter)
                }} className="AddRowBTN" />
            </td>
        </tr>
    ]).concat(prevValue.slice(clickedIndex+1))
    })
}

const removeRow = (toRemove: any, setter: any) => {
    setter((prev: any)=>{
        return prev.filter((x: any) => x.props.id !== toRemove.id)
    })
}

const jsonTemplate = `
<div class="JSONTemplate" contenteditable="false">
    <div class="Switcher">
        <span class="ExampleSelector selector active">Example</span>
        <span class="ModelSelector selector">Model</span>
    </div>
    <div class="ActualContent">
        <textarea>{}
        </textarea>
        <div class="Model"></div>
    </div>
</div>
`

const makeModel = (data: object)=>{
    let model: object = {}
    for(let key of Object.keys(data)){
        type objectKey = keyof typeof data
        key = key.toString() as objectKey
        Object.defineProperty(model, key, {
            value: {
                example: data[key]
            }
        })
    }
}



export { changeMethod, createNewTable, addRow, removeRow, jsonTemplate}
export type {i_method, i_methodProps}