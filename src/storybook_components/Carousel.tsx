import { useRef, useEffect, useState } from 'react'
import CardProps from "../interfaces/CardProps"
import ImageProps from '../interfaces/ImageProps'
import Card from "./Card"
import Image from './Image'
import SvgButton from './SvgButton'
import { ReactComponent as PreviousElement } from '../assets/svgs/left-chevron-svgrepo-com.svg';
import { ReactComponent as NextElement } from '../assets/svgs/right-chevron-svgrepo-com.svg'

interface Carousel {
    elements: CardProps[] | ImageProps[]
}

export default function Carousel({elements} : Carousel) {

    const [currentSlide, setCurrentSlide] = useState(1);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [disabledButtons, setDisabledButtons] = useState(false);
    const wrapperRef : any = useRef(null);

    function isCard(el: CardProps | ImageProps): el is CardProps {
        return (el as CardProps).headline !== undefined;
    }

    const list = elements.map((el, i) => {
        if(isCard(el)) { 
            return(
                <li key={i}>
                    <Card img={el.img} altText={el.altText} headline={el.headline} subhead={el.subhead} description={el.description} />
                </li>)
        } else {
            return(
                <li key={i}>
                    <Image url={el.url} altText={el.altText}/>
                </li>
            )
        }
    })
    
      function handleNext() {
        if(!disabledButtons) {
          setCurrentSlide(prev => prev + 1);
        }
      }
    
      function handlePrevious() {
        if(!disabledButtons) {
          setCurrentSlide(prev => prev - 1);
        }
      }
    
      function setLoop() {
        if(currentSlide === 0) {
          setDisabledButtons(true);
          setTransitionEnabled(false);
          setCurrentSlide(list.length);
        } else if (currentSlide === list.length + 1) {
          setDisabledButtons(true);
          setTransitionEnabled(false);
          setCurrentSlide(1)
        } else {
          setDisabledButtons(false);
        }
      }
    
      useEffect(() => {
        wrapperRef.current.addEventListener("transitionstart",() => {
          setDisabledButtons(true);
        })
      }, [])
    
      useEffect(() => {
        if(currentSlide === 1 || currentSlide === list.length) {
          setDisabledButtons(false);
          setTimeout(() => {
            setTransitionEnabled(true);
          }, 100)
        }
      }, [currentSlide])
    
    return(
        <div className="flex items-center gap-4">
            <SvgButton label="Previous Card" svg={PreviousElement} onClick={handlePrevious}/>
            <ul className="list-none w-[424px] overflow-hidden p-0">
                <div
                    className={`flex items-center m-0 p-0 ${transitionEnabled ? "transition duration-1000" : ""}`}
                    ref={wrapperRef} onTransitionEnd={setLoop}
                    style={{ transform: `translateX(-${100 * currentSlide}%)` }}
                >
                    {list[list.length - 1]}
                    {list}
                    {list[0]}
                </div>
            </ul>
            <SvgButton label="Next Card" svg={NextElement} onClick={handleNext}/>
        </div>
      )
}