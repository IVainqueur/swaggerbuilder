import "./Tag.css";
import { FaAngleDown } from "react-icons/fa";
import { TagTitleClicked } from "../handlers/tagsHandler";
import { IoIosAdd } from "react-icons/io";
import Method from "./Method";
import { useState } from "react";

interface TagProps {
    summary: string;
    name: string;
}


const Tag = (props: Partial<TagProps>): JSX.Element => {
    const methodProps = {
        methodName: "UNSET",
        methodRoute: "api/some/route",
        methodSummary: "Some brief description..."
    }
    const [methods, setMethods] = useState([<></>])
    const addMethod = (e: any)=>{
        e.currentTarget.parentElement.classList.add("OpenTag")
        setMethods((prevMethods)=> [...prevMethods, <Method {...methodProps}/>])
    }
    return (
        <div className="Tag">
            <div className="TagTitle" onClick={TagTitleClicked.bind(this)}>
                <p className="TagName" suppressContentEditableWarning={true} contentEditable>{props.name}</p>
                <p className="TagSummary" suppressContentEditableWarning={true} contentEditable>{props.summary}</p>
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
