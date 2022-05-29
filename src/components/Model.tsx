interface i_modelProps {
    content: any,
    ModelName: string
}

const Model = (props: Partial<i_modelProps>)=>{
    let modelName = `<span class="ModelName" contentEditable>${props.ModelName}</span>`
    return (
        <div className="ModelContainer" dangerouslySetInnerHTML={{__html: modelName +  props.content}}>

        </div>
    )
}


export default Model