import './NavBar.css'

const NavBar = (props: object): JSX.Element=>{
    return (
        <div className="NavBar">
            <img src="swaggerbuilder.svg" alt="Swagger logo"/>
            <div className="SearchBox">
                <input type="text" placeholder="" />
                <button>Explore</button>
            </div>
        </div>
    )
}


export default NavBar