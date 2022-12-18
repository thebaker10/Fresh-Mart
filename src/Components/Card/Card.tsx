import { useNavigate } from "react-router-dom"
import { Rating } from "./Rating"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleMinus, faHeartCirclePlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IconItem } from "../Nav/IconItem";


type Props={
    productID: number,
    name: string,
    description: string,
    stars: number,
    price: number,
    image?: string,
    showDeal?: boolean,
    msrp?: number
}

export function Card(props: Props) {
  let [average, setAverageData] = useState<any>();
  const [userId, setUserId] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [isInCart, setIsInCart] = React.useState(false);
  const [addedFav, setAddedFav] = React.useState(false);
  const [isInFavorite, setIsInFavorite] = React.useState(false);
  const [loadingFav, setLoadingFav] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('Something went wrong while adding product to cart.');
  const [alertVisible, setAlertVisible] = React.useState(false);
  const navigate = useNavigate();


  function getCookie() {
    function escape(s: any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
    return match ? match[1] : null;
  }

  useEffect(() => {

    let cookie = getCookie();
    if(cookie != null){
      setUserId(cookie);

      fetch(process.env.REACT_APP_API_BASE+"/users/details/"+cookie)
            .then((response) => response.json())
            .then((data) => {
              console.log(data.data[0].shoppingCart.cartItems);
              data.data[0].shoppingCart.cartItems.forEach((e:any) => {
                if(props.productID == e.product.productId){
                  setIsInCart(true);
                }
              });
        })
    }
    fetch(process.env.REACT_APP_API_BASE+"/products/"+props.productID+"/reviews" )

      .then((response) => response.json())
      .then((data) => {
        let sum = 0;
        data.data.forEach((review: any) => sum += Number(review.rating));
        setAverageData(Math.round(sum / data.data.length));
      })
  }, []);

  function addToCart(e: any) {

    e.stopPropagation();
    if(userId == null){
      setAlertMessage("You must be logged in")
      setAlertVisible(true);
    }
    else if(!isInCart && !loading){
      setLoading(true);
      let data: any = {};
      data["userId"] = userId;
      data["productId"] = Number(props.productID);
      data["quantity"] = 1;

      fetch(process.env.REACT_APP_API_BASE + "/cart/", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then((response) => {
          response.json().then((body) => {
          if(body.statusCode === 500) {
              return;
          }else{
              setLoading(false);
              setIsInCart(true);   
          }
        });
      })
    }

  }
  function addToFavorites() {
    if (!isInFavorite && !loadingFav) {
      setLoadingFav(true);
      let data: any = {};
      data["userId"] = userId;
      data["productId"] = Number(props.productID);

      fetch(process.env.REACT_APP_API_BASE + "/favorite/", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then((response) => {
        response.json().then((body) => {
          if (body.statusCode === 500) {
            return;
          } else {
            setLoadingFav(false);
            setIsInFavorite(true);
            setAddedFav(true);
          }
        });
      }).catch((error) => {
        console.error(error)
      });
    } else if (isInFavorite || addedFav) {
      setLoadingFav(true);
      let data: any = {};
      data["userId"] = userId;
      data["productId"] = Number(props.productID);

      fetch(process.env.REACT_APP_API_BASE + "/favorite/remove", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then((response) => {
        response.json().then((body) => {
          if (body.statusCode === 500) {
            return;
          } else {
            setLoadingFav(false);
            setAddedFav(false);
            setIsInFavorite(false);
          }
        });
      })
    }
  }

  function goToProductPage() {
    navigate('/product/' + props.productID);
  }

  return (
    <div className="p-5 relative">
      <div className="flex max-w-md m-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={goToProductPage}>
        <div className="w-1/3">
          <img id="cardImage" src={"https://source.unsplash.com/400x600/?" + props.name + " food"} alt="" />

        </div>
        <div className="flex flex-col w-2/3 p-4">
          <div className="flex-auto mb-4">
            <h1 className="text-gray-900 font-bold text-xl">{props.name}</h1>

            <div className="h-auto max-h-16 w-auto">
              <p id="truncatedText" className="mt-2 text-black text-sm">{props.description}</p>
            </div>
          </div>
          <div className="flex-end">
            <div className="flex item-center mt-2">
              {average ? <Rating nStars={average}/> : <Rating nStars={0}/>}
            </div>
                { alertVisible && <div className="p-4 absolute bottom-14 right-8 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{alertMessage}</div> }
            <div className="flex  item-center justify-between mt-3">
              {props.showDeal?
              <h1 className={`text-black font-bold text-xl line-through decoration-red-600 decoration-[2.5px] decoration-wavy`}>${props.msrp?.toFixed(2)}</h1>:null}
              <h1 className={`text-black font-bold text-xl`}>${props.price.toFixed(2)}</h1>
              <button className="px-3 py-2 min-w-[50%] bg-green text-white text-xs font-bold uppercase rounded" onClick={(event) => addToCart(event)}>{loading ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"1x"} /> : isInCart ? "In Cart" : "Add To Cart"}</button>
            </div>
          </div>
          
        </div>
      </div>
      <button onClick={addToFavorites}
        className="absolute right-8 top-8 text-2xl">

        {loadingFav ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} size={"2x"} />
          : addedFav || isInFavorite ? <FontAwesomeIcon className="text-red-600" icon={faHeartCircleMinus} /> : <FontAwesomeIcon className="text-green" icon={faHeartCirclePlus} />}
      </button>
    </div>
  )
}