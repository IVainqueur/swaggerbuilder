interface i_event{
    target: any,
    currentTarget: any
}

const TagTitleClicked = (e: Partial<i_event>) => {
    if(e.target !== e.currentTarget)
    console.log("Title clicked", e.target)
    e.target.parentElement.classList.toggle("OpenTag")
}

export {TagTitleClicked}