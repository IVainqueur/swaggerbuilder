import "./IntroAndSchemes.css";

const IntroAndSchemes = (props: object): JSX.Element => {
    const addSchemeClicked = (e: any) => {
        console.log(e.currentTarget.textContent)
        let schemeName = e.currentTarget.textContent
        if(e.currentTarget.classList.contains("addedScheme")) {
            e.currentTarget.classList.remove("addedScheme")
            let theOption = e.currentTarget.parentElement.querySelector(`select option[value=${schemeName}]`)
            e.currentTarget.parentElement.querySelector(`select`).removeChild(theOption)
            
        }else{
            e.currentTarget.classList.add("addedScheme")
            let option = Object.assign(document.createElement('option'), {textContent: schemeName, value: schemeName})
            e.currentTarget.parentElement.querySelector(`select`).appendChild(option)
        }
        // e.currentTarget.parentElement.querySelector('select').
    }
    return (
        <>
            <div className="Intro">
                <div className="AppTitleAndVersion">
                    <div >
                        <span className="AppName" suppressContentEditableWarning={true} contentEditable>App Name</span>
                        <span className="AppVersion" suppressContentEditableWarning={true} contentEditable>version</span>
                    </div>
                </div>
                <div className="BaseURL">
                    <pre>
                        [ Base URL: <span suppressContentEditableWarning={true} contentEditable>localhost:80/</span>]
                    </pre>
                </div>
                <div className="Description" suppressContentEditableWarning={true} contentEditable>
                    Describe your app...
                </div>
            </div>
            <div className="SchemesContainer">
                <div className="Schemes">
                    <p>Schemes</p>
                    <div className="Choices">
                        <select name="" id="">
                            
                        </select>
                        <span className="AddScheme adder" onClick={addSchemeClicked}>http</span>
                        <span className="AddScheme adder" onClick={addSchemeClicked}>https</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IntroAndSchemes;
