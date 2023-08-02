import CardProps from "../interfaces/CardProps"

export default function Card({img, altText, headline, subhead, description} : CardProps) {
    return(
        <div className={`h-auto mx-5 rounded-xl bg-surface-highest ${ description ? "w-96" : "w-max max-w-sm" }`}>
            { img 
                ? <img className="rounded-t-xl w-full" src={img} alt={altText} />
                : <></> }
        <div className={`px-4 py-5 ${ description ? "w-11/12" : "w-max" }`}>
          <h2 className={`text-2xl ${ subhead || description ? "mb-2" : "" }`}>{headline}</h2>
          <h3 className={`text-base ${ description ? "mb-4" : "" }`}>{subhead}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    )
}