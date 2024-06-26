import React, { useEffect, useState }  from 'react';
import './Services.css'
import Cardsrow from '../../Components/Cardsrow/Cardsrow.js';
import Loader from '../../Components/Loader/Loader';
import { Helmet } from 'react-helmet-async';


const Services = () => {
  //Responsiveness
  const [nbCards, setNbCards] = useState(2);
  const ajustCardsNumber = function() {
    if (window.innerWidth <= 1024 && window.innerWidth > 768) {
     setNbCards(2)
    } else if(window.innerWidth <= 768){
        setNbCards(1);
    }
    else setNbCards(2);
  };
  useEffect(ajustCardsNumber)
  window.onresize = ajustCardsNumber;

  const cover_animation = () => {
    const cardcontainers = document.querySelectorAll(".card-container");
    cardcontainers.forEach((container) => {
      const shadow_cover = container.children[0];
      const card_title = shadow_cover.children[0];
      container.addEventListener("mouseenter", () => {
        shadow_cover.classList.add("shadow-cover-visible");
        shadow_cover.classList.add("animate__fadeIn");
        shadow_cover.classList.add("animate__animated");
        card_title.classList.add("animate__animated");
        card_title.classList.add("animate__zoomIn");
      });
      container.addEventListener("mouseleave", () => {
        shadow_cover.classList.remove("shadow-cover-visible");
        shadow_cover.classList.remove("animate__animated");
        shadow_cover.classList.remove("animate__fadeIn");
        card_title.classList.remove("animate__animated");
        card_title.classList.remove("animate__zoomIn");
      });
    });
  };

    const [cards , setcards] = useState([])
    const [cards_loading , setcards_loading] = useState(true)

    const fetch_cards=() => {
        fetch(`http://localhost:5000/api/services/active/post`)
        .then(response => response.json())
        .then(data => {
            setcards(data.data)
            setcards_loading(false)
        })
    }

  useEffect(fetch_cards, []);
  useEffect(cover_animation);

  const cards_row_array = [];
  const slice_cards = (cards, row_length) => {
    const cards_copy = [...cards];
    while (cards_copy.length > 0) {
      let chunk = cards_copy.splice(0, row_length);
      cards_row_array.push(chunk);
    }
  };

  const create_cardsRow = (row_cards , index) => {
    return <Cardsrow key={index} cards={row_cards} />;
  };
  const generate_card_container = (cards) => {
    slice_cards(cards, nbCards);
    return cards_row_array.map((e,index) => create_cardsRow(e,index));
  };
  return (
    <div className="CardsContainer d-flex ">
      <Helmet>
          <meta name='description' content='Services Page' />
      </Helmet>
      {cards_loading ? <div className='card-loader d-flex'> <Loader/></div> : generate_card_container(cards)}
    </div>
  );
};

export default Services;
