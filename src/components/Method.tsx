import { FaAngleDown } from "react-icons/fa";
import "./Method.css";
import {
    changeMethod,
    createNewTable,
    addRow,
    removeRow,
    addJSON,
    addQuery
} from "../handlers/methodHandlers";
import type { i_methodProps } from "../handlers/methodHandlers";
import { useContext, useState } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { BiCodeCurly } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";
import { v4 as uuidGenerate } from "uuid";
import { modelsContext, modelsContextInterface } from "../App";


const Method = (props: Partial<i_methodProps>): JSX.Element => {
    const [models, setModels] = useContext<modelsContextInterface | any>(modelsContext).models
    const [isParamsTable, setParamsTable] = useState(false);
    const [isResponsesTable, setResponsesTable] = useState(false);

    let actualParams: any = {}
    const getActualParams = ()=>{
        return actualParams
    }
    const setActualParams = (newValue: any)=>{
        actualParams = {...actualParams, [newValue.key]: newValue.value}
    }
    // const [responseContent, setResponseContent] = useState([<></>])

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
                    <span className="tool" key={"object"} onClick={(e)=>{addJSON(e, getActualParams, setActualParams, e.currentTarget.parentElement?.parentElement?.parentElement?.id, [models, setModels])}}>
                        <BiCodeCurly />
                        <span>Add JSON / form-data</span>
                    </span>
                    <span className="tool" key={"query"} onClick={(e)=>{addQuery(e)}}>
                        <BsQuestionLg />
                        <span>Add Query Param, header, ...</span>
                    </span>
                </div>
            </td>
            <td className="ActionTD">
                <IoIosClose
                    className="CancelRowBTN"
                    onClick={(e: any) => {
                        removeRow(e.currentTarget.parentElement.parentElement, setParams);
                    }}
                />{" "}
                <IoIosAdd
                    onClick={(e: any) => {
                        addRow(
                            e.currentTarget.parentElement.parentElement,
                            "Name",
                            setParams,
                            {actualParams: getActualParams, setActualParams},
                            [models, setModels]
                        );
                    }}
                    className="AddRowBTN"
                />
            </td>
        </tr>
    ]);
    const [responses, setResponses] = useState([
        <tr id={uuidGenerate()} >
            <td suppressContentEditableWarning={true} contentEditable>
                Code 1
            </td>
            <td suppressContentEditableWarning={true} contentEditable>
                Description 1
                <div className="ActualResponses">
                    
                </div>
                <div className="tools">
                    <span className="tool" key={"object"} onClick={(e)=>{addJSON(e, getActualParams, setActualParams, e.currentTarget.parentElement?.parentElement?.parentElement?.id, [models, setModels])}}>
                        <BiCodeCurly />
                        <span>Add JSON / form-data</span>
                    </span>
                    <span className="tool" key={"query"} onClick={(e)=>{addQuery(e)}}>
                        <BsQuestionLg />
                        <span>Add text / html response</span>
                    </span>
                </div>
            </td>
            <td className="ActionTD">
                <IoIosClose
                    className="CancelRowBTN"
                    onClick={(e: any) => {
                        removeRow(e.currentTarget.parentElement.parentElement, setResponses);
                    }}
                />{" "}
                <IoIosAdd
                    onClick={(e: any) => {
                        addRow(
                            e.currentTarget.parentElement.parentElement,
                            "Code",
                            setResponses,
                            {actualParams: getActualParams, setActualParams},
                            [models, setModels]
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
