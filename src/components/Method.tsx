import { FaAngleDown } from "react-icons/fa";
import "./Method.css";
import {
    changeMethod,
    createNewTable,
    addRow,
    removeRow,
    jsonTemplate
} from "../handlers/methodHandlers";
import type { i_methodProps } from "../handlers/methodHandlers";
import { useState } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { BiCodeCurly } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";
import { v4 as uuidGenerate } from "uuid";
import Swal from "sweetalert2";


const Method = (props: Partial<i_methodProps>): JSX.Element => {
    const [isParamsTable, setParamsTable] = useState(false);
    const [isResponsesTable, setResponsesTable] = useState(false);

    let actualParams = {}
    const [responseContent, setResponseContent] = useState([<></>])

    const [params, setParams] = useState([
        <tr id={uuidGenerate()}>
            <td suppressContentEditableWarning={true} contentEditable>
                Name 1
            </td>
            <td suppressContentEditableWarning={true} contentEditable>
                Description 1
                <div className="ActualParams">
                    
                </div>
                <div className="tools">
                    <span className="tool" key={"object"} onClick={(e: any)=>{
                        let keys = Object.keys(e.currentTarget)
                        type objectKey = keyof typeof keys
                        let key = keys.find((x)=> x.includes('reactFiber')) as objectKey
                        let reactDataKey = e.currentTarget[key].key
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
                                }
                                document.querySelector('.Switcher .selector.active')?.classList.remove("active")
                                _e.currentTarget.classList.add("active")
                            })
                        }
                        theDIV.querySelector(".ModelSelector").addEventListener("click", async (e2: any)=>{
                            console.log(actualParams)
                            if(Object.keys(actualParams).length === 0) {
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
                                        actualParams = modelData
                                        console.log("New Params", actualParams)
                                        theDIV.querySelector(".Model").textContent = JSON.stringify(modelData, undefined, 4)
                                        theDIV.querySelector(".Model").style.display = "block"
                                        Swal.fire({
                                            title: "Done",
                                            text: "Converted the example into a model",
                                            icon: 'success'
                                        })
                                    }catch(e){
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
                    }}>
                        <BiCodeCurly />
                        <span>Add JSON / form-data</span>
                    </span>
                    <span className="tool" key={"query"} onClick={(e: any)=>{
                        let keys = Object.keys(e.currentTarget)
                        type objectKey = keyof typeof keys
                        let key = keys.find((x)=> x.includes('reactFiber')) as objectKey
                        let reactDataKey = e.currentTarget[key].key
                        
                        Swal.fire(`Asked for ${reactDataKey}`)
                    }}>
                        <BsQuestionLg />
                        <span>Add Query Param</span>
                    </span>
                </div>
            </td>
            <td className="ActionTD">
                <IoIosClose
                    className="CancelRowBTN"
                    onClick={(e: any) => {
                        let curRow =
                            e.currentTarget.parentElement.parentElement;
                        removeRow(curRow, setParams);
                    }}
                />{" "}
                <IoIosAdd
                    onClick={(e: any) => {
                        addRow(
                            e.currentTarget.parentElement.parentElement,
                            "Name",
                            setParams
                        );
                    }}
                    className="AddRowBTN"
                />
            </td>
        </tr>
    ]);
    const [responses, setResponses] = useState([
        <tr>
            <td suppressContentEditableWarning={true} contentEditable>
                Code 1
            </td>
            <td suppressContentEditableWarning={true} contentEditable>
                Description 1
            </td>
            <td className="ActionTD">
                <IoIosClose
                    className="CancelRowBTN"
                    onClick={(e: any) => {
                        let curRow =
                            e.currentTarget.parentElement.parentElement;
                        removeRow(curRow, setResponses);
                    }}
                />{" "}
                <IoIosAdd
                    onClick={(e: any) => {
                        addRow(
                            e.currentTarget.parentElement.parentElement,
                            "Code",
                            setResponses
                        );
                    }}
                    className="AddRowBTN"
                />
            </td>
        </tr>
    ]);

    return (
        <div className="Method">
            <div
                className="MethodTitle"
                onClick={(e: any) => {
                    if (e.target !== e.currentTarget) return;
                    e.currentTarget.parentElement.classList.toggle(
                        "OpenMethod"
                    );
                }}
            >
                <span
                    className="MethodName"
                    suppressContentEditableWarning={true}
                    contentEditable
                    onKeyUp={changeMethod}
                >
                    {props.methodName}
                </span>

                <span
                    className="MethodRoute"
                    suppressContentEditableWarning={true}
                    contentEditable
                >
                    {props.methodRoute}
                </span>
                <span
                    className="MethodSummary"
                    suppressContentEditableWarning={true}
                    contentEditable
                >
                    {props.methodSummary}
                </span>
                <FaAngleDown className="DownwardArrow" />
            </div>
            <div className="MethodContent">
                <div
                    className="MethodDescription"
                    suppressContentEditableWarning={true}
                    contentEditable
                >
                    The description of the method
                </div>
                <div className="MethodParameters">
                    <div className="MethodParametersTitle">
                        <span>Parameters</span>
                    </div>
                    <div
                        className="MethodParametersContent"
                        onClick={(e) => {
                            if (!isParamsTable) {
                                createNewTable(e, "params");
                                setParamsTable(true);
                            }
                        }}
                    >
                        <span>No parameters required</span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{params.map((x) => x)}</tbody>
                        </table>
                    </div>
                </div>
                <div className="MethodResponses">
                    <div className="MethodResponsesTitle">
                        <span>Responses</span>
                    </div>
                    <div
                        className="MethodResponsesContent"
                        onClick={(e) => {
                            if (!isResponsesTable) {
                                createNewTable(e, "responses");
                                setResponsesTable(true);
                            }
                        }}
                    >
                        <span>Opaque Response</span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{responses.map((x) => x)}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Method
