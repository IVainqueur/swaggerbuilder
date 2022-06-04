import "./Tag.css";
import { FaAngleDown } from "react-icons/fa";
import { TagTitleClicked } from "../handlers/tagsHandler";
import { IoIosAdd } from "react-icons/io";
import Method from "./Method";
import { createRef, useContext, useRef, useState } from "react";
import { modelsContext, modelsContextInterface } from "../App";
import { findInOArrayAndUpdate } from "../handlers/onliners";

interface TagProps {
    summary: string,
    name: string,
    tagKey: string
}


const Tag = (props: Partial<TagProps>): JSX.Element => {
    let [tagsArr,] = useContext<modelsContextInterface | any>(modelsContext).tags


    let methodProps = {
        methodName: "UNSET",
        methodRoute: "api/some/route",
        methodSummary: "Some brief description..."
    }


    const [methods, setMethods] = useState([<></>])


    const addMethod = (e: any)=>{
        e.currentTarget.parentElement.classList.add("OpenTag")
        setMethods((prevMethods)=> {
            let methodRef: any = createRef()
            // methodProps = Object.assign(methodProps, {ref: methodRef})
            tagsArr = findInOArrayAndUpdate(tagsArr, {key: props.tagKey},{ref: methodRef})
            console.log(tagsArr)
            return [...prevMethods, <Method {...methodProps} ref={methodRef}/>]
        })
    }


    return (
        <div className="Tag">
            <div className="TagTitle" onClick={TagTitleClicked.bind(this)}>
                <p className="TagName" 
                suppressContentEditableWarning={true} 
                contentEditable>
                    {props.name}
                </p>


                <p className="TagSummary" 
                suppressContentEditableWarning={true} 
                contentEditable>
                    {props.summary}
                </p>


                <FaAngleDown className="DownwardArrow" />
            </div>

            <div className="TagContent">
                {methods.map(x => x)}
            </div>
            
            <div className="AddRequest" onClick={(e)=>{addMethod(e)}}>
                <IoIosAdd className="adder" />
                <span>Add a method</span>
            </div>
        </div>
    );
};

export default Tag;
