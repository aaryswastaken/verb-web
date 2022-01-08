export default function Button({ text, subtext, onclick, grayed, grayedCallback }) {
    return (
        <div className={"buttonDiv"}>
            <button className={`button1 ${(grayed ? "grayed":"")}`} onClick={(grayed ? grayedCallback:onclick)}>
                <div>{text}</div>
                <div>{subtext}</div>
            </button>
        </div>
    )
}