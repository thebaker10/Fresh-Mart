import { useNavigate } from "react-router-dom"
import { Rating } from "./Rating"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type Props = {
  productID: number,
  name: string,
  description: string,
  stars: number,
  price: number,
  image?: string
}

export function Card(props: Props) {
  let [average, setAverageData] = useState<any>();
  const [userId, setUserId] = React.useState<any>();
  const [added, setAdded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isInCart, setIsInCart] = React.useState(false);
  const navigate = useNavigate();

  function getCookie() {
    function escape(s: any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
    return match ? match[1] : null;
  }

  useEffect(() => {

    let cookie = getCookie();

    setUserId(cookie);
    fetch(process.env.REACT_APP_API_BASE + "/users/details/" + cookie)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data[0].shoppingCart.cartItems);
        data.data[0].shoppingCart.cartItems.forEach((e: any) => {
          if (props.productID == e.product.productId) {
            setIsInCart(true);
          }
        });
      })
    fetch(process.env.REACT_APP_API_BASE + "/products/" + props.productID + "/reviews")


      .then((response) => response.json())
      .then((data) => {
        let sum = 0;
        data.data.forEach((review: any) => sum += Number(review.rating));
        setAverageData(Math.round(sum / data.data.length));
      })
  }, []);

  function addToCart(e: any) {
    e.stopPropagation();
    if (!isInCart && !loading) {
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
          if (body.statusCode === 500) {
            return;
          } else {
            setLoading(false);
            setAdded(true);
          }
        });
      })
    }
  }

  function goToProductPage() {
    navigate('/product/' + props.productID);
  }

  return (

    <div className="p-5">
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
              {average ? <Rating nStars={average} /> : <Rating nStars={0} />}
            </div>
            <div className="flex  item-center justify-between mt-3">
              <h1 className="text-black font-bold text-xl">${props.price.toFixed(2)}</h1>
              <button className="px-3 py-2 min-w-[50%] bg-green text-white text-xs font-bold uppercase rounded" onClick={(event) => addToCart(event)}>{loading ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"1x"} /> : added || isInCart ? "In Cart" : "Add To Cart"}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}