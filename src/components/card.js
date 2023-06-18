import { useEffect, useState } from "react";
import ActiveStar from "../img/избранное.svg";
import Star from "../img/избранное_unactive.svg";
import Avatar from "../img/Ellipse 1_avatar.png";
import Send from "../img/отправить Сообщение в титр_send.svg";
import Hide from "../img/скрыть сообщение_hide.svg";
import Settings from "../img/параметры.svg";

function Card({ id, date, author, content, attach }) {
  const [type, typeSet] = useState();
  const [url, urlSet] = useState();
  const [favorite, favoriteSet] = useState(false);
  
  function likeIt() {
    favoriteSet(!favorite)
    let prepList = []
    let myFavoriteList = localStorage.getItem("favorites");
    if(myFavoriteList.split(",").includes(id)){
      prepList= myFavoriteList.split(",").filter(element=>element !== id);
      localStorage.setItem("favorites", prepList);
    } else {
      prepList=[myFavoriteList,id];
      localStorage.setItem("favorites", prepList);
      favoriteSet(!favorite)
    }
    
    
    
  }

  useEffect(() => {
    if(localStorage.getItem("favorites").split(",").includes(id)){
      favoriteSet(!favorite)
    }
    attach.forEach(element => {
      typeSet(element.type);
      urlSet(element.url);
    });
  }, []);
  return (
    <div className='card'>
      <div className='card-head'>
        <div className='col-fst'>
          <img alt='avatar' src={Avatar} />
          <ul>
            <li>{author}</li>
            <li>Текст поста в соц. сетях если это комментарий</li>
          </ul>
        </div>
        <div className='col-snd'>
          <div>Левый</div>
          <div>Центр</div>
          <div>Правый</div>
        </div>
        <div className='col-trd'>
          <img alt='send' src={Send} />
          <img alt='hide' src={Hide} />
          <img alt='settings' src={Settings} />
          <img alt='best' onClick={likeIt} src={favorite === false ? Star : ActiveStar} />
        </div>
      </div>
      <div className='card-body'>
        <p className="time">{date.slice(11, 16)}</p>
        <div>
          <p>{content}</p>
          <p> <span>Далее</span> </p>
          {type === "video" ?
            <>
              <video width="750" height="500" controls >
                <source src={url} type="video/mp4" />
              </video>
            </>
            : type === "image" ?
              <img alt="banner" src={url} /> : ""}
        </div>
      </div>
      <div className='card-footer'>
        <ul>
          <li>#Новое</li>
          <li>#Эксперт</li>
        </ul>
      </div>

    </div>
  )
}

export default Card;