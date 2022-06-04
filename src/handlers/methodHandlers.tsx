import { v4 as uuidGenerate } from "uuid";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import Swal from 'sweetalert2'
import { BiCodeCurly } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";

interface i_method {
    accent: string;
}

interface i_methodProps {
    methodName: string;
    methodRoute: string;
    methodSummary: string;
    ref: React.RefObject<unknown>
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
    if (Object.keys(methods).includes(e.target.textContent.toUpperCase())) {
        type objectKey = keyof typeof methods;
        let key = e.target.textContent.toUpperCase() as objectKey;
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
    params: {
        heads: ["Name", "Description"],
        container: "MethodParametersContent"
    },
    responses: {
        heads: ["Code", "Description"],
        container: "MethodResponsesContent"
    }
};

const createNewTable = (e: any, paramOrResponse: string) => {
    if (!Object.keys(columns).includes(paramOrResponse))
        throw new Error(
            'Parameter 2 is unknown, It should either be "responses" or "params" '
        );

    e.currentTarget.removeChild(e.currentTarget.firstElementChild);

    e.currentTarget.querySelector("table").style.display = "table";
};

const addRow = (currentTarget: Element, codeOrName: string, setter: any, toPassOn: any, modelData: any) => {
    setter((prevValue: any) => {
        let clickedIndex = prevValue.findIndex(
            (x: any) => x.props.id === currentTarget.id
        );
        let beforeClicked = prevValue.slice(0, clickedIndex + 1);

        return beforeClicked
            .concat([
                <tr id={uuidGenerate()}>
                    <td suppressContentEditableWarning={true} contentEditable>
                        Name {prevValue.length + 1}
                    </td>
                    <td suppressContentEditableWarning={true} contentEditable>
                        Description {prevValue.length + 1}
                        <div className="ActualParams">
                            
                        </div>
                        <div className="tools">
                            <span className="tool" key={"object"} onClick={(e)=>addJSON(e, toPassOn.actualParams, toPassOn.setActualParams, e.currentTarget.parentElement?.parentElement?.parentElement?.id, modelData)}>
                                <BiCodeCurly />
                                <span>Add JSON / form-data</span>
                            </span>
                            <span className="tool" key={"query"} onClick={(e)=>{addQuery(e)}}>
                                <BsQuestionLg />
                                <span>Add Query Param</span>
                            </span>
                        </div>
                    </td>
                    <td className="ActionTD">
                        <IoIosClose
                            className="CancelRowBTN"
                            onClick={(e: any) => {
                                removeRow(e.currentTarget.parentElement.parentElement, setter);
                            }}
                        />{" "}
                        <IoIosAdd
                            onClick={(e: any) => {
                                addRow(
                                    e.currentTarget.parentElement.parentElement,
                                    "Name",
                                    setter,
                                    toPassOn,
                                    modelData
                                );
                            }}
                            className="AddRowBTN"
                        />
                    </td>
                </tr>
            ])
            .concat(prevValue.slice(clickedIndex + 1));
    });
};

const removeRow = (toRemove: any, setter: any) => {
    setter((prev: any) => {
        return prev.filter((x: any) => x.props.id !== toRemove.id);
    });
};

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
`;

const modelHTMLify = (model: object) => {
    // let modelName = `<span class="ModelName" contentEditable>${model.ModelName}</span>`
    let html = "<p>{</p>";
    Object.keys(model).forEach((key, i) => {
        html += `
        <div class="KeyValues">
            <div class="Key" contenteditable>${key}</div> 
            <div class="Values">
                <span class="type" contenteditable>${Object.values(model)[i].type}</span>
                <span class="example">example: ${Object.values(model)[i].example}</span>
            </div>
        </div>
        `;
    });

    html += "<p>}</p>";


    return html;
};

const makeModel = (data: object) => {
    let model: object = {};
    Object.keys(data).forEach((key, i) => {
        // type objectKey = keyof typeof data
        // key = key.toString() as objectKey
        Object.defineProperty(model, key, {
            value: {
                type: typeof Object.values(data)[i],
                example: Object.values(data)[i]
            },
            configurable: true,
            enumerable: true,
            writable: false
        });
    });

    return { model, htmlify: modelHTMLify };
};

const addJSON = (e: any, actualParams: any, setActualParams: any, id: any, modelData: any)=>{
    let [, setModels] = modelData
    let keys = Object.keys(e.currentTarget)

    type objectKey = keyof typeof keys
    let key = keys.find((x)=> x.includes('reactFiber')) as objectKey

    let theDIV = e.currentTarget.parentElement.previousElementSibling
    theDIV.innerHTML = jsonTemplate
    
    theDIV.querySelector("textarea").addEventListener('keydown', (e1: any)=>{
        if((e1.currentTarget.scrollHeight > 200) && (e1.currentTarget.scrollHeight < 400)){
            e1.currentTarget.style.height = (e1.currentTarget.scrollHeight + 10) + "px"
        }
        if (e1.key === 'Tab') {
            e1.preventDefault();
            var start = e1.currentTarget.selectionStart;
            var end = e1.currentTarget.selectionEnd;
        
            // set textarea value to: text before caret + tab + text after caret
            e1.currentTarget.value = e1.currentTarget.value.substring(0, start) +
              "\t" + e1.currentTarget.value.substring(end);
        
            // put caret at right position again
            e1.currentTarget.selectionStart =
              e1.currentTarget.selectionEnd = start + 1;
          }
    })

    for(let selector of theDIV.querySelectorAll(".selector")){
        selector.addEventListener('click', (_e: any)=>{
            if(!selector.classList.contains("ModelSelector")){
                theDIV.querySelector(".Model").style.display = "none"
                theDIV.querySelector("textarea").style.display = "revert"
            }else{
                theDIV.querySelector(".Model").style.display = "flex"
                theDIV.querySelector("textarea").style.display = "none"
            }
            document.querySelector('.Switcher .selector.active')?.classList.remove("active")
            _e.currentTarget.classList.add("active")
        })
    }

    theDIV.querySelector(".ModelSelector").addEventListener("click", async (e2: any)=>{
        /* actualParams is a function that returns the current value of the actual 'actualParams' object */
        if(!Object.keys(actualParams()).includes(id)) {
            let answer = await Swal.fire({
                title: "No model created",
                text: "Would you like to make the example a model?",
                showDenyButton: true,
                showConfirmButton: true,
                denyButtonText: 'Nah!',
                confirmButtonText: 'Yes'
            })
            if(answer.isConfirmed){
                try{
                    let modelData = JSON.parse(theDIV.querySelector("textarea").value)
                    // actualParams = makeModel(modelData)
                    setActualParams({key: id, value: makeModel(modelData)})

                    /* Use modelData as a template while actualParams hasn't been updated */
                    modelData = makeModel(modelData)
                    
                    setModels((prevValue: any)=>{
                        return [...prevValue, {key: id, modelData}]
                    })
                    theDIV.querySelector(".Model").innerHTML = `${modelData.htmlify(modelData.model)}`

                    theDIV.querySelector(".Model").style.display = "flex"
                    theDIV.querySelector("textarea").style.display = "none"
                    Swal.fire({
                        title: "Done",
                        text: "Converted the example into a model",
                        icon: 'success'
                    })
                }catch(e){
                    console.log(e)
                    Swal.fire({
                        title: "Invalid JSON",
                        text: "Check if the data in the example is valid JSON data",
                        icon: 'error'
                    })
                    theDIV.querySelector(".ExampleSelector").click()
                }
            }
        }
    })
}


const addQuery = (e: any)=>{
    let keys = Object.keys(e.currentTarget)
    type objectKey = keyof typeof keys
    let key = keys.find((x)=> x.includes('reactFiber')) as objectKey
    let reactDataKey = e.currentTarget[key].key
    
    Swal.fire(`Asked for ${reactDataKey}`)
}


export {
    changeMethod,
    createNewTable,
    addRow,
    removeRow,
    jsonTemplate,
    makeModel,
    addJSON,
    addQuery
};
export type { i_method, i_methodProps };
