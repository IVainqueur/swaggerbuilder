import { useContext } from "react"
import { FaAngleDown } from "react-icons/fa"
import { modelsContext, modelsContextInterface } from "../App"
import Model from "./Model"
import "./Models.css" 

const Models = ()=>{
    const [models,] = useContext<modelsContextInterface | any>(modelsContext).models
    return (
        <div className="ModelsContainer">
            <div className="ModelsTitle" onClick={(e: any) => {
                    if (e.target !== e.currentTarget) return;
                    e.currentTarget.parentElement.classList.toggle(
                        "OpenMethod"
                    );
                }}>
                <span>Models</span>
                <FaAngleDown className="DownwardArrow" />
            </div>
            <div className="ModelsContent">
                {models.length === 0 ? <p>No models created yet</p>: models.map((x: any)=>{
                    console.log(x);
                return <Model content={x.modelData.htmlify(x.modelData.model)} ModelName={x.key}/>
                })}
            </div>
        </div>
    )
}

export default Models