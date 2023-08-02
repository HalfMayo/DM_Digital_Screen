import ImageProps from "../interfaces/ImageProps";

export default function Image({url, altText} : ImageProps) {
    return(
        <div className="h-auto w-96 mx-5 rounded-xl">
            <img className="rounded-xl w-full" src={url} alt={altText} />
        </div>
    )
}